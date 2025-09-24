'use client'

type ButtonNewTaskProps = {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ButtonNewTask({ setModal }: ButtonNewTaskProps) {

    return (
        <button onClick={() => setModal(true)} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer hover:scale-95 transition-all duration-700">
            Nova Task
        </button>
    )

}
