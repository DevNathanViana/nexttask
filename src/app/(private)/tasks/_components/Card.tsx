import { Task } from "@/generated/prisma";

type CardProps = {
    task: Task
};

export default function Card({ task }: CardProps) {
    const statusColor = {
        Pendente: "bg-blue-100 text-blue-400",
        Andamento: "bg-orange-100 text-orange-400",
        Concluída: "bg-green-100 text-green-400"
    }[task.status!] || "bg-gray-100 text-gray-800";

    return (
        <div className="w-full md:w-full min-h-40 max-h-40 border border-gray-200 rounded-lg p-4 flex flex-col justify-between shadow hover:shadow-md transition-shadow duration-300 bg-white cursor-pointer">
            <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{task.title}</h3>
            <p className="text-gray-700 text-sm flex-1 overflow-y-auto">{task.description}</p>
            <span className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded ${statusColor}`}>
                {task.status}
            </span>
        </div>
    )
}
