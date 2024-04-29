"use client";
import { useAuth } from "@/app/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignInOut = () => {
    const { auth, setAuth } = useAuth();
    const router = useRouter();

    const logout = () => {
        setAuth(null);
        router.push("/login");
    };

    return (
        <div>
            {auth ? (
                <>
                    <span className="mx-2">
                        Hello,{" "}
                        <span className="font-bold">
                            {auth?.name.split(" ")[0]}
                        </span>
                    </span>
                    <span className="mx-1">|&nbsp;</span>
                    <a className="cursor-pointer" onClick={logout}>
                        Logout
                    </a>
                </>
            ) : (
                <Link href="/login">Login</Link>
            )}
        </div>
    );
};

export default SignInOut;
