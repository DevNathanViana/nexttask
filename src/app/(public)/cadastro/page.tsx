import CadastroForm from "./_components/cadastro-form";

export const metadata = {
  title: "Cadastro - NextTask",
  description: "Faça Cadastro no NextTask",
  icons: {
    icon: "/next_task_logo.png",
    shortcut: "/next_task_logo.png",
  },
};

export default function Home() {
  return <CadastroForm />
}
