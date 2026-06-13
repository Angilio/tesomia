import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Sun, Moon, User, LogOut, Settings } from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const saved = localStorage.getItem('theme') || 'light';
        setTheme(saved);
        document.documentElement.setAttribute('data-theme', saved);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-100">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    const userImage = user.image ? `/storage/${user.image}` : null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 text-base-content">

            <nav className="sticky top-0 z-50 backdrop-blur-xl bg-base-100/80 border-b border-base-300 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="navbar px-0">

                        <div className="flex-1">
                            <Link href="/" className="flex items-center gap-3">
                                <div className="p-2 rounded-2xl bg-primary/10">
                                    <ApplicationLogo className="h-9 w-auto" />
                                </div>

                                <div className="hidden sm:block">
                                    <h1 className="font-extrabold text-lg leading-none">
                                        Dashboard
                                    </h1>
                                    <p className="text-xs opacity-60">
                                        Espace utilisateur
                                    </p>
                                </div>
                            </Link>
                        </div>

                        <div className="flex-none flex items-center gap-3">

                            <button
                                onClick={toggleTheme}
                                className="btn btn-circle btn-ghost hover:bg-primary/10 hover:text-primary transition-all"
                                title="Changer le thème"
                            >
                                {theme === 'light'
                                    ? <Moon size={20} />
                                    : <Sun size={20} />}
                            </button>

                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center gap-3 px-2 py-1 rounded-full hover:bg-base-200 transition-all">

                                        <div className="hidden md:block text-right">
                                            <p className="text-sm font-bold leading-none">
                                                {user.name}
                                            </p>
                                            <p className="text-xs opacity-60">
                                                Connecté
                                            </p>
                                        </div>

                                        {userImage ? (
                                            <img
                                                src={userImage}
                                                alt={user.name}
                                                className="w-11 h-11 rounded-full object-cover border-2 border-primary shadow-md"
                                            />
                                        ) : (
                                            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-content flex items-center justify-center font-black shadow-md">
                                                {user.name?.charAt(0).toUpperCase()}
                                            </div>
                                        )}

                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>
                                        <span className="flex items-center gap-2">
                                            <Settings size={16} />
                                            Compte utilisateur
                                        </span>
                                    </Dropdown.Link>

                                    <Dropdown.Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                    >
                                        <span className="flex items-center gap-2 text-error">
                                            <LogOut size={16} />
                                            Déconnexion
                                        </span>
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>

                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-base-100/70 backdrop-blur border-b border-base-300 shadow-sm">
                    <div className="container mx-auto px-4 py-6">
                        <div className="rounded-3xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-base-300 p-6 shadow-sm">
                            {header}
                        </div>
                    </div>
                </header>
            )}

            <main className="container mx-auto px-4 py-8">
                <div className="animate-fadeIn">
                    {children}
                </div>
            </main>
        </div>
    );
}