import LoginForm from "./_components/login-form";

export const metadata = {
  title: "Login - NextTask",
  description: "Faça login no NextTask",
  icons: {
    icon: "/next_task_logo.png",
    shortcut: "/next_task_logo.png",
  },
};

export default function Home() {
  return <LoginForm />
}
