import { Button } from "component/button";
import { Divider } from "component/divider";
import { InputField } from "component/input-field";
import { useState } from "react";
import { Form, Link, redirect, useActionData, useNavigation, useSubmit  } from "react-router";
import { authApi } from "~/api/authApi";
import type { Route } from "./+types/password";

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const response = await authApi.register(name, email, password);
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

export default function Password() {
    const [showPasswordField, setShowPasswordField] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");

    const actionData = useActionData() as { error?: string } | undefined;
    const navigation = useNavigation();
    const submit = useSubmit();
    const isSubmitting = navigation.state === "submitting";

    const [text, setText] = useState("")

  async function continueButton() {
    setEmailError("");
    try {
      const response = await authApi.findUser(email);
      if (response.message === "User is not exists") {
        setShowPasswordField(true);
      } else {
        setEmailError("Email found. Please login.");
      }
    } catch (err: any) {
      setEmailError(err?.response?.data?.message || "Error validating email.");
    }
  }

  function handleMainButtonClick(e: React.MouseEvent) {
    e.preventDefault();
    if (!showPasswordField) {
      continueButton();
    } else {
      submit({ name, email, password }, { method: "post" });
    }
  }

    function login() {
        console.log("Continue Button Pressed")
    }

    return (
        <main className="flex items-center justify-center flex-col">
            <header className="pt-4 max-[800px]:pt-9  ps-6 w-full pb-16 max-[800px]:ps-0 max-[800px]:pb-6 max-[800px]:justify-center flex">
                <p className="text-(--default) text-xl max-[800px]:text-lg">Employee</p>
            </header>
            <section className="flex max-[800px]:pt-0 pt-3 justify-center items-center w-93 flex-col px-4 gap-6">
                <div className="flex justify-center pb-2">
                    <h1 className="text-3xl font-medium ">Enter your password</h1>
                </div>
                <InputField
                    placeholder="Email"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <InputField
                    placeholder="Password"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <Link to="/reset-password" className="w-full text-sm hover:text-(--default) transition-colors underline">Forgot Password?</Link>
                <Button
                    onClick={continueButton}
                    text="Continue"
                    textColor="text-(--background)"
                    backgroundColor="bg-(--subdued)"
                />
                <span>Don't have an account? &nbsp;
                    <Link to="/register" className="hover:text-(--default) transition-colors underline">Sign up</Link>
                </span>
                <Divider />
                <Button
                    onClick={login}
                    text="Log in with one-time code"
                />
            </section>
        </main>
    );
}
