import { Button } from "component/button";
import { Divider } from "component/divider";
import { InputField } from "component/input-field";
import { useState } from "react";
import { Link } from "react-router";

export default function Login() {
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
          <h1 className="text-3xl font-medium ">Welcome back</h1>
        </div>
        <Button onClick={login} text="Continue With Google" />
        <Divider />
        <InputField
          placeholder="Email"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          onClick={continueButton}
          text="Continue"
          textColor="text-(--background)"
          backgroundColor="bg-(--subdued)"
        />
        <span>Don't have an account? &nbsp;
          <Link to="/register" className="hover:text-(--default) transition-colors underline">Sign up</Link>
        </span>
      </section>
    </main>
  );
}
