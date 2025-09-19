import { FaGithub, FaGoogle } from "react-icons/fa";

export const metadata = {
  title: "Login - NextTask",
  description: "Faça login no NextTask",
  icons: {
    icon: "/next_task_logo.png",
    shortcut: "/next_task_logo.png",
  },
};

export default function Home() {
  return (
    <div className="w-screen h-screen bg-white-200 flex p-4">

      <div className="w-1/2 h-full border-1 border-gray-200 rounded p-10 flex flex-col justify-center items-center">
        <div className="w-1/2 h-1/2 flex flex-col gap-7 flex flex-col justify-center items-center">

          <h1 className="text-black-300 text-5xl pb-3">Welcome</h1>

          <div className="flex flex-col w-full gap-4">
            <button className="w-full h-12 border-2 border-gray-300 rounded cursor-pointer flex justify-center items-center gap-4"><FaGoogle size={24} />Sign in with Google</button>
            <button className="w-full h-12 border-2 border-gray-300 rounded cursor-pointer flex justify-center items-center gap-4"><FaGithub size={24} />Sign in with Github</button>
          </div>

          <div className="flex items-center w-full py-5">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex flex-col w-full gap-6">
            <div>
              <label htmlFor="email">Email</label>
              <input
                placeholder="example@gmail.com"
                id="email"
                className="w-full h-12 border-2 border-gray-300 rounded focus:border-gray-400 focus:ring-2 focus:ring-gray-200 outline-none p-2"
                type="text"
              />
            </div>

            <div>
              <label htmlFor="senha">Password</label>
              <input
                id="senha"
                placeholder=""
                className="w-full h-12 border-2 border-gray-300 rounded focus:border-gray-400 focus:ring-2 focus:ring-gray-200 outline-none p-2"
                type="password"
              />
            </div>

            <div className="pt-4">
              <button className="w-full h-12 bg-[linear-gradient(0deg,rgba(26,145,86,1)_0%,rgba(0,191,73,1)_100%)] active:scale-95 rounded cursor-pointer text-white font-semibold transition-all duration-300 ">
                Login
              </button>
            </div>

            <div className="pt-2 w-full flex justify-center items-center">
              <p>Forgot password?</p>
            </div>
          </div>

        </div>
      </div>

      <div
        className="w-1/2 h-full border border-gray-200 rounded bg-cover bg-center"
        style={{ backgroundImage: "url('/fundo_login.jpg')" }}
      >
      </div>

    </div>
  );
}
