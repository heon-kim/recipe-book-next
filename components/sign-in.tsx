
import { signIn } from "@/auth"
import Image from "next/image"
 
export default function SignIn() {
  return (
    <div className="shadow-md p-8 flex flex-col gap-4">
    <h2 className="text-lg font-bold">로그인</h2>
    <form action="">
        <label htmlFor="email">
            <span>이메일</span>
            <p>
        <input type="email" name="email" id="email" placeholder="your-email@example.com"/>
        </p>
        </label>
        
        <label htmlFor="password">
            <p>비밀번호</p>  
        <input type="password" name="password" id="password" placeholder="비밀번호를 입력하세요"/>
        </label>
        

        <button className="block bg-blue-500 text-white">로그인</button>
    </form>
    <form
      action={async () => {
        "use server"
        await signIn("github")
      }}
    >
      <button type="submit" className="flex items-center gap-2 border rounded-md p-3">
        <Image src='/img/github-mark.svg' alt="github mark" width={16} height={16}></Image>
        <span>Sign In with GitHub</span>
        </button>
    </form>
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button type="submit" className="flex items-center gap-2 border rounded-md p-3">
        <Image src='/img/google-mark.png' alt="google mark" width={16} height={16}></Image>
        <span>Sign In with Google</span>
        </button>
    </form>
    </div>
    
  )
} 