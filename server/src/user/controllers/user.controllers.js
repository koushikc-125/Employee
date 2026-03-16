import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";
import { verifyJWT } from "../../middleware/auth.middleware.js";

const generateAccessAndRefreshToken = async (userId, { userAgent, ipAddress }) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(400, "User doesn't exists");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    await User.findByIdAndUpdate(userId, {
      $set: {
        refreshToken: [
          {
            token: refreshToken,
            userAgent: userAgent || "unknown",
            ipAddress: ipAddress || "unknown",
            issuedAt: new Date(),
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        ],
      },
    });

    return { accessToken };
  } catch (error) {
    throw new ApiError(
      500,
      `Something went wrong while generating access and refresh tokens ${error}`
    );
  }
};

const findUser = asyncHandler(async (req, res) => {
  if (!req.body) {
    throw new ApiError(400, "Body shoud contain email");
  }

  const existedUser = await User.findOne({ email });
  if (!existedUser) {
    throw new ApiError(400, "User is not exists");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully"));
});

const registerUser = asyncHandler(async (req, res) => {
  if (!req.body) {
    throw new ApiError(400, "Body shoud contain name, email, password");
  }
  const { name, email, password } = req.body;
  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(400, "User with email already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering a user");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  if (!req.body) {
    throw new ApiError(400, "Body should contain Email and Password fields.");
  }

  const { email, password } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Email and Password fields are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken } = await generateAccessAndRefreshToken(
    user._id,
    {
      userAgent: req.headers["user-agent"],
      ipAddress: req.ip,
    }
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!loggedInUser) {
    throw new ApiError(404, "User not found");
  }

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .cookies("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    { new: true }
  );
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-password -refreshToken"
    );;
    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          user,
          "Current User Check successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      `Something went wrong while checking current user ${error}`
    );
  }
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const expiredAccessToken =
    req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");

  if (!expiredAccessToken) {
    throw new ApiError(401, "Access token is required");
  }

  try {
    const decodedToken = jwt.verify(
      expiredAccessToken,
      process.env.ACCESS_TOKEN_SECRET,
      { ignoreExpiration: true }
    );
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }
    const storedToken = user.refreshToken.find(
      (t) => t.expiresAt > new Date()
    );

    if (!storedToken) {
      throw new ApiError(401, "Refresh token is expired or already used");
    }

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    const { accessToken } =
      await generateAccessAndRefreshToken(
        user._id,
        {
          userAgent: req.headers["user-agent"],
          ipAddress: req.ip,
        });

    return res
      .status(200)
      .cookies("accessToken", accessToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken },
          "Access token refreshed successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      `Something went wrong while refreshing access token ${error}`
    );
  }
});

export {
  findUser,
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  refreshAccessToken,
};
