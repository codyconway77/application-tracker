import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";

const Header = (): JSX.Element => {
    const { data: sessionData } = useSession();
    return (
        <header className="flex items-center justify-end px-6 top-0 h-16 w-full bg-neutral">
            <Link href={'/'}>
                <span className="text-primary/80 hover:text-primary text-xl mr-4">Home</span>
            </Link>
            <button
                className="rounded-full bg-primary/80 px-8 py-3 font-semibold text-black no-underline transition hover:bg-primary"
                onClick={sessionData ? () => signOut() : () => signIn()}
            >
                {sessionData ? "Sign out" : "Sign in"}
            </button>
        </header>
    )
}

export default Header;