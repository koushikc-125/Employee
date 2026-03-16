import axios from "axios";
import { useState, useEffect } from "react";

export default function Welcome() {
    const [healthCheck, setHealthCheck] = useState()

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/healthcheck")
            .then((res) => {
                setHealthCheck(res.data.message)
            })
            .catch((err) => {
                setHealthCheck(err.message)
                console.log(err.message);
            })
    }, [])

    return (
        <main className="flex items-center justify-center flex-col">
            <section className="w-175 px-4 ">
                <h1 className="text-4xl pt-46.5">Welcome
                    <span className="text-(--default) font-semibold">&nbsp;{healthCheck}</span>
                </h1>
            </section>
        </main>
    )
}