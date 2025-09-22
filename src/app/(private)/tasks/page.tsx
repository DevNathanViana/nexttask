import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ButtonSignOut } from "./_components/ButtonSignOut";

export const metadata = {
    title: "Tasks - NextTask",
    description: "Gerencie suas atividades",
    icons: {
        icon: "/next_task_logo.png",
        shortcut: "/next_task_logo.png",
    },
};

export default async function Tasks() {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect("/login")
    }

    return (
        <div className="w-screen h-screen flex flex-col bg-white-200">
            <nav className="w-full h-16 bg-gray-100 border-b border-gray-300 flex items-center justify-between px-6">
                <div className="text-xl font-bold text-gray-800">NextTask</div>

                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer hover:scale-95 transition-all duration-700">
                        Nova Task
                    </button>
                    <ButtonSignOut />
                </div>
            </nav>

            <div className="flex flex-1 p-4 gap-4">

                <div className="w-full md:w-1/3 h-full border border-gray-200 rounded p-0 flex flex-col justify-start items-center">
                    <div className="w-full h-10 border border-blue-200 flex flex-col justify-center items-center bg-blue-100">
                        <p className="text-blue-400 text-start">Tasks para fazer</p>
                    </div>

                    <div>

                    </div>

                </div>

                <div className="w-full md:w-1/3 h-full border border-gray-200 rounded p-0 flex flex-col justify-start items-center">
                    <div className="w-full h-10 border border-orange-200 flex flex-col justify-center items-center bg-orange-100">
                        <p className="text-orange-400 text-start">Tasks em andamento</p>
                    </div>

                    <div>

                    </div>
                </div>

                <div className="w-full md:w-1/3 h-full border border-gray-200 rounded p-0 flex flex-col justify-start items-center">
                    <div className="w-full h-10 border border-green-200 flex flex-col justify-center items-center bg-green-100">
                        <p className="text-green-400 text-start">Tasks concluídas</p>
                    </div>

                    <div>

                    </div>
                </div>
            </div>
        </div>
    );
}
