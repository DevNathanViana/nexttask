import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import TasksClient from "./_components/TasksClient";

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
        <TasksClient />
    );
}
