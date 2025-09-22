import { ReactNode } from "react";

type Props = {
    icon?: ReactNode;
    children: ReactNode;
};

export default function SocialButton({ icon, children }: Props) {
    return (
        <button className="w-full h-12 border-2 border-gray-300 rounded cursor-pointer flex justify-center items-center gap-4 text-sm truncate">
            {icon && <span className=" hidden md:block">{icon}</span>}
            {children}
        </button>
    );
}
