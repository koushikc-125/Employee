import { Button } from "component/button";
import { Divider } from "component/divider";
import { InputField } from "component/input-field";
import { useState } from "react";
import { Link } from "react-router";

export default function Password() {
    const [text, setText] = useState("")

    function continueButton() {
        console.log(text);
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
