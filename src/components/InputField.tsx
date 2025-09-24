import { ChangeEvent } from "react";

type PropsInput = {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    fieldError?: string;
};

type PropsTextArea = {
    id: string;
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    fieldError?: string;
};

export function InputField({ id, label, type = "text", placeholder, value, onChange, fieldError }: PropsInput) {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                value={value}
                placeholder={placeholder}
                type={type}
                className={`w-full h-12 border-2 rounded focus:ring-2 outline-none p-2
                    ${fieldError
                        ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:border-gray-400 focus:ring-gray-200"
                    }`} onChange={onChange}
            />
            {fieldError && <p className="text-red-500 text-sm pt-1">{fieldError}</p>} <p></p>
        </div>
    );
}

export function InputTextAreaField({ id, label, placeholder, value, onChange, fieldError }: PropsTextArea) {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <textarea
                id={id}
                rows={3}
                value={value}
                placeholder={placeholder}
                className={`w-full border-2 rounded focus:ring-2 outline-none p-2
                    ${fieldError
                        ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:border-gray-400 focus:ring-gray-200"
                    }`}
                onChange={onChange}
            />
            {fieldError && <p className="text-red-500 text-sm pt-1">{fieldError}</p>} <p></p>
        </div>
    );
}
