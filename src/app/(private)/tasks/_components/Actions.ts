'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

// Criar nova task
export async function saveTask(title: string, description: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session?.user) throw new Error("Usuário não autenticado")

    return prisma.task.create({
        data: {
            title,
            description,
            status: "pending",
            user: {
                connect: { id: session.user.id }
            }
        }
    })
}

export async function updateTaskStatus(
    id: string,
    status: "pending" | "inProgress" | "done"
) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user) throw new Error("Usuário não autenticado");

    return prisma.task.update({
        where: { id },
        data: { status },
    });
}

export async function deleteTask(
    id: string,
) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user) throw new Error("Usuário não autenticado");

    return prisma.task.delete({
        where: { id },
    });
}


export async function getUserTasks() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session?.user) throw new Error("Usuário não autenticado")

    return prisma.task.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" }
    })
}

export async function getUserTasksByStatus(status: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session?.user) throw new Error("Usuário não autenticado")

    return prisma.task.findMany({
        where: {
            userId: session.user.id,
            status
        },
        orderBy: { createdAt: "desc" }
    })
}
