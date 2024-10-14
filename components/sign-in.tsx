
import { signIn } from "@/auth"
import Image from "next/image"
 
export default function SignIn() {
  return (
    <>
    <form
      action={async () => {
        "use server"
        await signIn("github")
      }}
    >
      <button type="submit" className="flex items-center gap-2 shadow-md rounded-md p-3">
        <Image src='/img/github-mark.svg' alt="github mark" width={16} height={16}></Image>
        <span>Signin with GitHub</span>
        </button>
    </form>
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button type="submit" className="flex items-center gap-2 shadow-md rounded-md p-3">
        <Image src='/img/google-mark.png' alt="google mark" width={16} height={16}></Image>
        <span>Signin with Google</span>
        </button>
    </form>
    </>
    
  )
} 