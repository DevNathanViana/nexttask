import { useState } from "react";
import { Task } from "@/generated/prisma";

type CardProps = {
    task: Task;
    onUpdateStatus: (id: string, newStatus: Task["status"]) => void;
    onDelete: (id: string) => void;
};

export default function Card({ task, onUpdateStatus, onDelete }: CardProps) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const statusColor = {
        pending: "bg-blue-100 text-blue-400",
        inProgress: "bg-orange-100 text-orange-400",
        done: "bg-green-100 text-green-400",
    }[task.status!] || "bg-gray-100 text-gray-800";

    return (
        <div className="w-full md:w-full min-h-40 max-h-40 border border-gray-200 rounded-lg p-4 flex flex-col justify-between shadow hover:shadow-md transition-shadow duration-300 bg-white cursor-pointer">
            <div className="w-full md:w-full flex justify-between">
                <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{task.title}</h3>
                <button
                    onClick={() => setConfirmOpen(true)}
                    className="px-4 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer hover:scale-95 transition-all duration-700"
                >
                    deletar
                </button>
            </div>

            <p className="text-gray-700 text-sm flex-1 overflow-y-auto">{task.description}</p>

            <div className="flex justify-between items-center mt-3">
                <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${statusColor}`}>
                    {task.status}
                </span>

                <div className="flex flex-col md:flex-row gap-2">
                    {task.status === "pending" && (
                        <>
                            <button
                                onClick={() => onUpdateStatus(task.id, "inProgress")}
                                className="px-2 py-1 text-xs bg-orange-500 text-white rounded hover:bg-orange-600 cursor-pointer hover:scale-95 transition-all duration-700"
                            >
                                Em progresso
                            </button>
                            <button
                                onClick={() => onUpdateStatus(task.id, "done")}
                                className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer hover:scale-95 transition-all duration-700"
                            >
                                Finalizar
                            </button>
                        </>
                    )}
                    {task.status === "inProgress" && (
                        <>
                            <button
                                onClick={() => onUpdateStatus(task.id, "pending")}
                                className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer hover:scale-95 transition-all duration-700"
                            >
                                Pendente
                            </button>
                            <button
                                onClick={() => onUpdateStatus(task.id, "done")}
                                className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer hover:scale-95 transition-all duration-700"
                            >
                                Finalizar
                            </button>
                        </>
                    )}
                    {task.status === "done" && (
                        <>
                            <button
                                onClick={() => onUpdateStatus(task.id, "pending")}
                                className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer hover:scale-95 transition-all duration-700"
                            >
                                Pendente
                            </button>
                            <button
                                onClick={() => onUpdateStatus(task.id, "inProgress")}
                                className="px-2 py-1 text-xs bg-orange-500 text-white rounded hover:bg-orange-600 cursor-pointer hover:scale-95 transition-all duration-700"
                            >
                                Em progresso
                            </button>
                        </>
                    )}
                </div>
            </div>

            {confirmOpen && (
                <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-80 flex flex-col gap-4 shadow-lg">
                        <h3 className="text-lg font-bold text-gray-800">Confirmação</h3>
                        <p className="text-gray-700 text-sm">Tem certeza que deseja deletar esta task?</p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setConfirmOpen(false)}
                                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 hover:scale-95 transition-all duration-700 cursor-pointer"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    onDelete(task.id);
                                    setConfirmOpen(false);
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 hover:scale-95 transition-all duration-700 cursor-pointer"
                            >
                                Deletar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
