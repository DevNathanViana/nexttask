"use client";

import { useEffect, useState } from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export function ModalTasks({ isOpen, onClose, children }: ModalProps) {
    const [visible, setVisible] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setVisible(true);
        } else {
            const timeout = setTimeout(() => setVisible(false), 500);
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    if (!visible) return null;

    return (
        <div className={`fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>
            <div className={`bg-white rounded-2xl shadow-lg w-96 p-6 relative  transform transition-all duration-300 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-red-500">
                    ✕
                </button>
                <div>{children}</div>
            </div>
        </div>
    );
}
