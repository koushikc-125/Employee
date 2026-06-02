import { Button } from "component/button";
import { Divider } from "component/divider";
import { InputField } from "component/input-field";
import { useState } from "react";
import { Link } from "react-router";
import { Form, redirect, useActionData, useNavigation, useSubmit } from "react-router";
import type { Route } from "./+types/password";
import { authApi } from '../api/authApi';

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await authApi.login(email, password);
    const resData = response.data?.data;

    if (resData) {
      const backendCookies = response.headers['set-cookie'];
      const responseHeaders = new Headers();

      if (backendCookies) {
        backendCookies.forEach((cookie: string) => responseHeaders.append("Set-Cookie", cookie));
      }

      return redirect("/", { headers: responseHeaders });
    }
  } catch (error: any) {
    return { error: error?.response?.data?.message || "Invalid credentials" };
  }
  return null;
}

export default function Login() {
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const actionData = useActionData() as { error?: string } | undefined;
  const navigation = useNavigation();
  const submit = useSubmit();
  const isSubmitting = navigation.state === "submitting";

  async function continueButton() {
    setEmailError("");
    try {
      const response = await authApi.findUser(email);
      
      if (response.data.data === "User registered successfully") {
        setShowPasswordField(true);
      } else {
        setEmailError("Email not found. Please register.");
      }
    } catch (err: any) {
      setEmailError(err?.response?.data?.data?.message || "Error validating email.");
    }
  }

  function handleMainButtonClick(e: React.MouseEvent) {
    e.preventDefault();
    if (!showPasswordField) {
      continueButton();
    } else {
      submit({ email, password }, { method: "post" });
    }
  }

  function login() {
    console.log("Continue Button Pressed")
  }

  async function passwordButton() {
    const res = await authApi.login(email, password)
    console.log(res);
    console.log(password);
  }

  return (
    <main className="flex items-center justify-center flex-col">
      <header className="pt-4 max-[800px]:pt-9  ps-6 w-full pb-16 max-[800px]:ps-0 max-[800px]:pb-6 max-[800px]:justify-center flex">
        <p className="text-(--default) text-xl max-[800px]:text-lg">Employee</p>
      </header>

      <Form method="post" className="flex max-[800px]:pt-0 pt-3 justify-center items-center w-93 flex-col px-4 gap-6">
        <div className="flex justify-center pb-2">
          <h1 className="text-3xl font-medium">Welcome back</h1>
        </div>
        <Button onClick={login} text="Continue With Google" />
        <Divider />

        <InputField
          placeholder="Email"
          value={email}
          disabled={showPasswordField || isSubmitting}
          onChange={(e) => setEmail(e.target.value)}
        />

        {showPasswordField && (
          <InputField
            placeholder="Password"
            value={password}
            disabled={isSubmitting}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}

        {(actionData?.error || emailError) && (
          <p className="text-red-500 text-sm self-start px-2">
            {actionData?.error || emailError}
          </p>
        )}

        <Button
          onClick={handleMainButtonClick}
          text={isSubmitting ? "Logging in..." : "Continue"}
          textColor="text-(--background)"
          backgroundColor="bg-(--subdued)"
          disabled={isSubmitting}
        />
        <span>Don't have an account? &nbsp;
          <Link to="/register" className="hover:text-(--default) transition-colors underline">Sign up</Link>
        </span>
      </Form>
    </main>
  );
}
