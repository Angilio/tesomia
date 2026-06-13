import { Link } from '@inertiajs/react';
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function NavBar({ auth }) {

    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const saved = localStorage.getItem("theme") || "light";
        setTheme(saved);
        document.documentElement.setAttribute("data-theme", saved);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-base-300 bg-base-100/80 px-6 py-4 shadow-lg backdrop-blur-md">

            {/* LEFT : LOGO */}
            <div className="mx-auto flex max-w-7xl items-center justify-between">

                <Link href="/">
                    <ApplicationLogo className="w-20 fill-current text-primary transition hover:scale-105" />
                </Link>

                {/* RIGHT : SWITCH + AUTH */}
                <div className="flex items-center gap-3">

                    {/* THEME SWITCH */}
                    <button
                        onClick={toggleTheme}
                        className="btn btn-circle btn-ghost transition hover:bg-base-200"
                    >
                        {theme === "light" ? (
                            <Moon size={20} />
                        ) : (
                            <Sun size={20} />
                        )}
                    </button>

                    {/* AUTH BUTTON */}
                    {auth?.user ? (
                        <Link
                            href={route('dashboard')}
                            className="btn btn-primary rounded-xl px-5"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            href={route('login')}
                            className="btn btn-outline btn-primary rounded-xl px-5"
                        >
                            Connecter
                        </Link>
                    )}

                </div>

            </div>

        </nav>
    );
}