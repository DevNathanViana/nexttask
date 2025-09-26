import { ReactNode } from "react";

type Props = {
    icon?: ReactNode;
    children: ReactNode;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
};

export default function SocialButton({ icon, children, onClick, disabled }: Props) {
    return (
        <button disabled={disabled} onClick={onClick} className="w-full h-12 border-2 border-gray-300 rounded cursor-pointer flex justify-center items-center gap-4 text-sm truncate">
            {icon && <span className=" hidden md:block">{icon}</span>}
            {children}
        </button>
    );
}
