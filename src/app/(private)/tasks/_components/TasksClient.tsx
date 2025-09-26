// Tasks/TasksClient.tsx (Client Component)
"use client";

import { useEffect, useState } from "react";
import { ButtonNewTask } from "./ButtonNewTask";
import { ButtonSignOut } from "./ButtonSignOut";
import { ModalTasks } from "./ModalTasks";
import { InputField, InputTextAreaField } from "@/components/InputField";
import { deleteTask, getUserTasksByStatus, saveTask, updateTaskStatus } from "./Actions";
import Card from "./Card";
import z, { ZodError } from "zod";
import Loading from "@/app/_components/loading";


export default function TasksClient() {
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [tasksPending, setTasksPending] = useState<any[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [tasksInProgress, setTasksInProgress] = useState<any[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [tasksDone, setTasksDone] = useState<any[]>([]);
    const [errors, setErrors] = useState<{ title?: string, description?: string }>({});
    const [loading, setLoading] = useState(false);

    const loadTasks = async () => {
        try {
            setLoading(true);
            const dataTasksPending = await getUserTasksByStatus("pending");
            const dataTasksInProgress = await getUserTasksByStatus("inProgress");
            const dataTasksDone = await getUserTasksByStatus("done");
            setTasksPending(dataTasksPending);
            setTasksInProgress(dataTasksInProgress);
            setTasksDone(dataTasksDone);
        } finally {
            setLoading(false);
        }
    };


    const Task = z.object({
        title: z.string().min(1, { message: 'O título deve conter pelo menos 1 caracteres.' }),
        description: z.string().min(1, { message: 'A descrição deve conter pelo menos 1 caracteres.' })
    })

    useEffect(() => {
        loadTasks()
    }, [])

    const handleSaveTask = async () => {
        try {
            Task.parse({ title, description });
            setErrors({});
            setLoading(true);
            await saveTask(title, description);
            setModal(false);
            await loadTasks();
        } catch (err) {
            if (err instanceof ZodError) {
                const fieldErrors = err.flatten().fieldErrors as Record<"title" | "description", string[] | undefined>;
                setErrors({
                    title: fieldErrors.title?.[0],
                    description: fieldErrors.description?.[0],
                });
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setTitle('')
        setDescription('')
    }, [modal])

    return (
        <div className="w-screen h-screen flex flex-col bg-white-200">

            {loading && (
                <Loading />
            )}

            <nav className="w-full min-h-16 bg-gray-100 border-b border-gray-300 flex items-center justify-between px-6">
                <div className="text-xl font-bold text-gray-800">NextTask</div>

                <div className="flex gap-3">
                    <ButtonNewTask setModal={setModal} />
                    <ButtonSignOut setLoading={setLoading} />
                </div>
            </nav>

            <div className="flex flex-col flex-1 p-6 gap-4 md:flex-row">

                <div className="w-full h-1/3 md:w-1/3 md:h-full max-h-[87vh] border border-gray-200 rounded p-0 flex flex-col justify-start items-center overflow-y-hidden">
                    <div className="w-full min-h-10 border border-blue-200 flex flex-col justify-center items-center bg-blue-100">
                        <p className="text-blue-400 text-start">Tasks para fazer</p>
                    </div>
                    <div className="w-full h-full border border-gray-200 rounded p-2 flex flex-col justify-start items-center gap-2 overflow-y-scroll">
                        {tasksPending.map((task) => (
                            <Card
                                onDelete={async (id) => {
                                    setLoading(true);
                                    await deleteTask(id);
                                    await loadTasks();
                                    setLoading(false);
                                }}
                                task={task}
                                key={task.id}
                                onUpdateStatus={async (id, newStatus) => {
                                    setLoading(true);
                                    await updateTaskStatus(id, newStatus as "pending" | "inProgress" | "done");
                                    await loadTasks();
                                    setLoading(false);
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="w-full h-1/3 md:w-1/3 md:h-full max-h-[87vh] border border-gray-200 rounded p-0 flex flex-col justify-start items-center">
                    <div className="w-full h-10 border border-orange-200 flex flex-col justify-center items-center bg-orange-100">
                        <p className="text-orange-400 text-start">Tasks em andamento</p>
                    </div>
                    <div className="w-full h-full border border-gray-200 rounded p-2 flex flex-col justify-start items-center gap-2 overflow-y-scroll">
                        {tasksInProgress.map((task) => (
                            <Card
                                onDelete={async (id) => {
                                    setLoading(true);
                                    await deleteTask(id);
                                    await loadTasks();
                                    setLoading(false);
                                }}
                                task={task}
                                key={task.id}
                                onUpdateStatus={async (id, newStatus) => {
                                    setLoading(true);
                                    await updateTaskStatus(id, newStatus as "pending" | "inProgress" | "done");
                                    await loadTasks();
                                    setLoading(false);
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="w-full h-1/3 md:w-1/3 md:h-full max-h-[87vh] border border-gray-200 rounded p-0 flex flex-col justify-start items-center">
                    <div className="w-full h-10 border border-green-200 flex flex-col justify-center items-center bg-green-100">
                        <p className="text-green-400 text-start">Tasks concluídas</p>
                    </div>
                    <div className="w-full h-full border border-gray-200 rounded p-2 flex flex-col justify-start items-center gap-2 overflow-y-scroll">
                        {tasksDone.map((task) => (
                            <Card
                                onDelete={async (id) => {
                                    setLoading(true);
                                    await deleteTask(id);
                                    await loadTasks();
                                    setLoading(false);
                                }}
                                task={task}
                                key={task.id}
                                onUpdateStatus={async (id, newStatus) => {
                                    setLoading(true);
                                    await updateTaskStatus(id, newStatus as "pending" | "inProgress" | "done");
                                    await loadTasks();
                                    setLoading(false);
                                }}
                            />
                        ))}
                    </div>
                </div>

            </div>

            <ModalTasks isOpen={modal} onClose={() => setModal(false)}>
                <h2 className="text-xl font-bold mb-4">Criar Nova Task</h2>
                <div className="w-full h-full flex flex-col gap-3">
                    <InputField id="titulo" label="Título" value={title} onChange={(e) => setTitle(e.target.value)} fieldError={errors.title} />
                    <InputTextAreaField id="descricao" label="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} fieldError={errors.description} />
                </div>
                <div className="w-full h-full flex gap-3 justify-end pt-2">
                    <button
                        onClick={async () => {
                            handleSaveTask()
                        }}
                        className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 cursor-pointer hover:scale-95 transition-all duration-700"
                    >
                        Salvar
                    </button>
                    <button
                        onClick={() => setModal(false)}
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 cursor-pointer hover:scale-95 transition-all duration-700"
                    >
                        Fechar
                    </button>
                </div>
            </ModalTasks>

        </div>
    );
}
