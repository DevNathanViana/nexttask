// Tasks/TasksClient.tsx (Client Component)
"use client";

import { useEffect, useState } from "react";
import { ButtonNewTask } from "./ButtonNewTask";
import { ButtonSignOut } from "./ButtonSignOut";
import { ModalTasks } from "./ModalTasks";
import { InputField, InputTextAreaField } from "@/components/InputField";
import { getUserTasks, saveTask } from "./Actions";
import Tasks from "../page";
import Card from "./Card";


export default function TasksClient() {
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [tasks, setTasks] = useState<any[]>([]);

    const loadTasks = async () => {
        const data = await getUserTasks()
        setTasks(data)
    }

    useEffect(() => {
        loadTasks()
    }, [])

    return (
        <div className="w-screen h-screen flex flex-col bg-white-200">
            <nav className="w-full min-h-16 bg-gray-100 border-b border-gray-300 flex items-center justify-between px-6">
                <div className="text-xl font-bold text-gray-800">NextTask</div>

                <div className="flex gap-3">
                    <ButtonNewTask setModal={setModal} />
                    <ButtonSignOut />
                </div>
            </nav>

            <div className="flex flex-1 p-6 gap-4">

                <div className="w-1/3 md:max-w-1/3 max-h-[87vh] border border-gray-200 rounded p-0 flex flex-col justify-start items-center overflow-y-hidden">
                    <div className="w-full min-h-10 border border-blue-200 flex flex-col justify-center items-center bg-blue-100">
                        <p className="text-blue-400 text-start">Tasks para fazer</p>
                    </div>
                    <div className="w-full md:w-full h-full border border-gray-200 rounded p-2 flex flex-col justify-start items-center gap-2 overflow-y-scroll">
                        {tasks.map((task) => {
                            return (
                                <Card task={task} key={task.id} />
                            )
                        })}
                    </div>
                </div>

                <div className="w-1/3 md:max-w-1/3 max-h-[87vh] h-full border border-gray-200 rounded p-0 flex flex-col justify-start items-center">
                    <div className="w-full h-10 border border-orange-200 flex flex-col justify-center items-center bg-orange-100">
                        <p className="text-orange-400 text-start">Tasks em andamento</p>
                    </div>
                </div>

                <div className="w-1/3 md:max-w-1/3 max-h-[87vh] h-full border border-gray-200 rounded p-0 flex flex-col justify-start items-center">
                    <div className="w-full h-10 border border-green-200 flex flex-col justify-center items-center bg-green-100">
                        <p className="text-green-400 text-start">Tasks concluídas</p>
                    </div>
                </div>
            </div>

            <ModalTasks isOpen={modal} onClose={() => setModal(false)}>
                <h2 className="text-xl font-bold mb-4">Criar Nova Task</h2>
                <div className="w-full h-full flex flex-col gap-3">
                    <InputField id="titulo" label="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <InputTextAreaField id="descricao" label="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="w-full h-full flex gap-3 justify-end pt-2">
                    <button
                        onClick={async () => {
                            await saveTask(title, description)
                            setModal(false)
                            loadTasks()
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
