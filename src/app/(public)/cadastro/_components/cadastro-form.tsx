'use client'

import { InputField } from "@/components/InputField";
import SocialButton from "@/components/SocialButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { z, ZodError } from "zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

export default function CadastroForm() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");
    const [errors, setErrors] = useState<{ nome?: string; email?: string; senha?: string, confirmaSenha?: string }>({});
    const router = useRouter()

    const User = z.object({
        nome: z.string().min(2, { message: 'O nome deve conter pelo menos 2 caracteres.' }),
        email: z.string().email('Email Inválido'),
        senha: z.string().min(8, { message: 'A senha deve conter pelo menos 8 caracteres.' }),
        confirmaSenha: z.string().min(8, { message: "A senha deve conter pelo menos 8 caracteres." }),
    }).refine(data => data.senha === data.confirmaSenha, {
        message: "As senhas não conferem",
        path: ["confirmaSenha"],
    });

    const onSubmit = async (name: string, email: string, senha: string) => {
        const { } = await authClient.signUp.email({
            name: name,
            email: email,
            password: senha
        }, {
            onSuccess: (ctx) => {
                console.log(ctx)
                toast.success('Conta criada com sucesso!')
                router.replace("/tasks")
            },

            onError: (ctx) => {
                console.log(ctx)
                toast.error('Erro ao criar conta.')
                console.log('error encontrado')
            }
        })
    }

    const handleLogin = () => {
        try {
            User.parse({ nome, email, senha, confirmaSenha });
            setErrors({});
            onSubmit(nome, email, senha);
        } catch (err) {
            if (err instanceof ZodError) {
                const fieldErrors = err.flatten().fieldErrors as Record<"nome" | "email" | "senha" | "confirmaSenha", string[] | undefined>;
                setErrors({
                    nome: fieldErrors.nome?.[0],
                    email: fieldErrors.email?.[0],
                    senha: fieldErrors.senha?.[0],
                    confirmaSenha: fieldErrors.confirmaSenha?.[0],
                });
            }
        }
    };

    const loginWithGoogle = async () => {
        await authClient.signIn.social({
            provider: "google", callbackURL: '/tasks'
        })
    }

    const loginWithGitHub = async () => {
        await authClient.signIn.social({
            provider: "github", callbackURL: '/tasks'
        })
    }


    return (
        <div className="w-1/2 h-1/2 flex flex-col gap-7 justify-center items-center">
            <h1 className="text-black-300 text-5xl pb-3">Welcome</h1>

            <div className="flex flex-col w-full gap-4">
                <SocialButton onClick={loginWithGoogle} icon={<FaGoogle size={20} />}>Sign in with Google</SocialButton>
                <SocialButton onClick={loginWithGitHub} icon={<FaGithub size={20} />}>Sign in with Github</SocialButton>
            </div>

            <div className="flex items-center w-full py-5">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="px-3 text-gray-500">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="flex flex-col w-full gap-6">
                <InputField id="name" label="Name" placeholder="John Example" value={nome} onChange={(e) => setNome(e.target.value)} fieldError={errors.nome} />
                <InputField id="email" label="Email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} fieldError={errors.email} />
                <InputField id="senha" label="Password" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} fieldError={errors.senha} />
                <InputField id="confirmaSenha" label="Confirm Password" type="password" value={confirmaSenha} onChange={(e) => setConfirmaSenha(e.target.value)} fieldError={errors.confirmaSenha} />

                <div className="pt-4">
                    <button onClick={handleLogin} className="w-full h-12 bg-[linear-gradient(0deg,rgba(26,145,86,1)_0%,rgba(0,191,73,1)_100%)] active:scale-95 rounded cursor-pointer text-white font-semibold transition-all duration-300 ">
                        Login
                    </button>
                </div>

                <div className="pt-2 w-full flex flex-col justify-center items-center gap-2">
                    <p className="text-[#5a5a5a] cursor-pointer hover:scale-95 transition-all duration-700"><Link href={"/login"}>Already have an account? Sign in!</Link></p>
                    <p className="text-[rgba(26,145,86,1)] cursor-pointer hover:scale-95 transition-all duration-700">Forgot password?</p>
                </div>
            </div>

        </div>
    );
}
