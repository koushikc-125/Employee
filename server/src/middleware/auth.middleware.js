import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../user/model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  let token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token && req.headers.cookie) {
    const rawCookies = req.headers.cookie.split(";");
    const parsedToken = rawCookies
      .find((cookie) => cookie.trim().startsWith("accessToken="))
      ?.split("=")[1];
    if (parsedToken) {
      token = decodeURIComponent(parsedToken);
    }
  }

    if (!token) {
      throw new ApiError(401, "Unauthorized");
    }
    try {
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (decodedToken.type !== "access") {
        throw new ApiError(401, "Invalid token type");
      }

      const user = await User.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );

      if (!user) {
        throw new ApiError(401, "Unauthorized");
      }

      req.user = user;

      next();
    } catch (error) {
      throw new ApiError(401, error?.message || "Invalide access token");
    }
  });
