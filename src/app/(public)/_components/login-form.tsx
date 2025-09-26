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
import Loading from "@/app/_components/loading";

export default function LoginForm() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [errors, setErrors] = useState<{ email?: string; senha?: string }>({});
    const router = useRouter()

    const User = z.object({
        email: z.string().email('Email Inválido'),
        senha: z.string().min(8, { message: 'A senha deve conter pelo menos 8 caracteres.' })
    });

    const onSubmit = async (email: string, senha: string) => {
        const { } = await authClient.signIn.email({
            email: email,
            password: senha
        }, {
            onRequest: () => {
                setLoading(true)
            },

            onSuccess: (ctx) => {
                console.log(ctx)
                toast.success('Entrando...')
                setLoading(false)
                router.replace("/tasks")
            },

            onError: (ctx) => {
                console.log(ctx)
                toast.error('Erro ao entrar.')
                setLoading(false)
                console.log('error encontrado')
            }
        })
    }

    const handleLogin = () => {
        try {
            User.parse({ email, senha });
            setErrors({});
            onSubmit(email, senha);
        } catch (err) {
            if (err instanceof ZodError) {
                const fieldErrors = err.flatten().fieldErrors as Record<"email" | "senha", string[] | undefined>;
                setErrors({
                    email: fieldErrors.email?.[0],
                    senha: fieldErrors.senha?.[0],
                });
            }
        }
    };

    const loginWithGoogle = async () => {
        await authClient.signIn.social(
            {
                provider: "google", callbackURL: '/tasks'
            },
            {
                onRequest: () => {
                    setLoading(true);
                },
                onSuccess: (ctx) => {
                    console.log("Google login sucesso:", ctx);
                    setLoading(false);
                },
                onError: (err) => {
                    console.error("Erro no login Google:", err);
                    toast.error("Erro ao logar com Google.");
                    setLoading(false);
                },
            }
        );
    };


    const loginWithGitHub = async () => {
        await authClient.signIn.social({
            provider: "github", callbackURL: '/tasks'
        },
            {
                onRequest: () => {
                    setLoading(true);
                },
                onSuccess: (ctx) => {
                    console.log("GitHub login sucesso:", ctx);
                    setLoading(false);
                },
                onError: (err) => {
                    console.error("Erro no login GitHub:", err);
                    toast.error("Erro ao logar com GitHub.");
                    setLoading(false);
                },
            }
        )
    }


    return (
        <div className="w-1/2 h-1/2 flex flex-col gap-7 justify-center items-center">
            <h1 className="text-black-300 text-5xl pb-3">Bem Vindo</h1>

            <div className="flex flex-col w-full gap-4">
                <SocialButton onClick={loginWithGoogle} icon={<FaGoogle size={20} />}>Entre com o Google</SocialButton>
                <SocialButton onClick={loginWithGitHub} icon={<FaGithub size={20} />}>Entre com o Github</SocialButton>
            </div>

            <div className="flex items-center w-full py-5">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="px-3 text-gray-500">ou</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="flex flex-col w-full gap-6">
                <InputField
                    id="email"
                    label="Email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    fieldError={errors.email}
                />

                <InputField
                    id="senha"
                    label="Senha"
                    type="password"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    fieldError={errors.senha}
                />

                <div className="pt-4">
                    <button
                        onClick={handleLogin}
                        className="w-full h-12 bg-[linear-gradient(0deg,rgba(26,145,86,1)_0%,rgba(0,191,73,1)_100%)] active:scale-95 rounded cursor-pointer text-white font-semibold transition-all duration-300 "
                    >
                        Entrar
                    </button>
                </div>

                <div className="pt-2 w-full flex justify-center items-center flex-col gap-2">
                    <p className="text-[rgba(26,145,86,1)] cursor-pointer hover:scale-95 transition-all duration-700">
                        <Link href={"/cadastro"}>Novo aqui? Crie uma conta!</Link>
                    </p>
                </div>
            </div>


            {loading && (
                <Loading />
            )}

        </div>
    );
}
