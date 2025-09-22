'use client'

import { authClient } from "@/lib/auth-client"
import { useRouter } from 'next/navigation'
export function ButtonSignOut() {
    const router = useRouter()

    async function signOut() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess() {
                    router.replace("/login")
                },
            }
        })
    }


    return (
        <button onClick={signOut} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer hover:scale-95 transition-all duration-700">
            Logout
        </button>
    )

}
