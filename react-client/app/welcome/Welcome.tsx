import { useUser } from "~/hook/useUser"

export default function Welcome() {
    const user = useUser()
    
    //Load the pages link according the user type
    if (user?.role == "user") {

    } else {

    }

    return (
        <main className="flex items-center justify-center flex-col">
            <section className="w-175 px-4 ">
                <h1 className="text-4xl pt-46.5">Welcome
                    <span className="text-(--default) font-semibold">&nbsp;{user?.name} </span>
                </h1>
            </section>
        </main>
    )
}