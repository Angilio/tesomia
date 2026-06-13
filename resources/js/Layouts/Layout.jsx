import { usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

import AuthenticatedLayout from './AuthenticatedLayout';
import { roleSidebarMap } from './RoleSidebarMap';

export default function Layout({ children, header = null }) {
    const { auth } = usePage().props;
    const roleName = auth?.user?.roles?.[0]?.name;

    const SidebarComponent = roleSidebarMap[roleName];

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <AuthenticatedLayout>
            <div className="min-h-screen bg-base-200 text-base-content">

                {/* MOBILE SIDEBAR OVERLAY */}
                {SidebarComponent && sidebarOpen && (
                    <div className="fixed inset-0 z-50 flex md:hidden">

                        <div
                            className="fixed inset-0 bg-black/40"
                            onClick={() => setSidebarOpen(false)}
                        />

                        <aside className="relative z-50 w-80 max-w-[85%] h-full bg-base-100 border-r border-base-300 shadow-2xl">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-base-300">
                                <span className="font-bold">Menu</span>

                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="btn btn-sm btn-circle btn-ghost"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <SidebarComponent />
                        </aside>

                    </div>
                )}

                <div className="flex min-h-screen w-full overflow-hidden">

                    {/* DESKTOP SIDEBAR */}
                    {SidebarComponent && (
                        <aside className="hidden md:flex w-72 shrink-0 p-4">
                            <div className="
                                w-full
                                rounded-3xl
                                bg-base-100
                                border border-base-300
                                shadow-xl
                                overflow-hidden
                            ">
                                <SidebarComponent />
                            </div>
                        </aside>
                    )}

                    {/* CONTENU */}
                    <div className="flex-1 flex flex-col min-w-0 p-3 md:p-4 md:pl-0">

                        {/* MOBILE TOP BAR */}
                        {SidebarComponent && (
                            <div className="mb-3 flex items-center justify-between rounded-2xl bg-base-100 border border-base-300 px-4 py-3 shadow-sm md:hidden">
                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    className="btn btn-sm btn-ghost"
                                >
                                    <Menu size={18} />
                                    Menu
                                </button>

                                <span className="text-sm font-semibold opacity-70">
                                    {roleName ?? 'Utilisateur'}
                                </span>
                            </div>
                        )}

                        {/* HEADER OPTIONNEL */}
                        {header && (
                            <header className="
                                mb-4
                                rounded-2xl
                                md:rounded-3xl
                                bg-base-100
                                border border-base-300
                                shadow-sm
                            ">
                                <div className="mx-auto max-w-7xl px-4 py-4 md:px-6 md:py-5">
                                    {header}
                                </div>
                            </header>
                        )}

                        {/* MAIN */}
                        <main className="
                            flex-1
                            overflow-x-auto
                            rounded-2xl
                            md:rounded-3xl
                            bg-base-100
                            border border-base-300
                            shadow-sm
                        ">
                            <div className="p-4 md:p-6">
                                {children}
                            </div>
                        </main>

                    </div>

                </div>

            </div>
        </AuthenticatedLayout>
    );
}