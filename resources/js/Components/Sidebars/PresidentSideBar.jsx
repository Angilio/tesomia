import React from 'react';

import {
    Home,
    User2,
    Banknote,
    ShieldCheck,
    UserCog,
} from 'lucide-react';

import { Link } from '@inertiajs/react';

export default function PresidentSidebar() {
    const isActive = (name) => route().current(name);

    const isFinanceActive =
        route().current('president.finances.*') ||
        route().current('tresorier.dashboard');

    const isRolesActive =
        route().current('president.roles.*');

    const linkClass = (active) =>
        active
            ? `
                flex items-center gap-3
                rounded-2xl
                bg-primary
                text-primary-content
                px-4 py-3
                font-semibold
                shadow-lg
                shadow-primary/20
                transition-all
              `
            : `
                flex items-center gap-3
                rounded-2xl
                px-4 py-3
                text-base-content/80
                hover:bg-base-300
                hover:text-base-content
                transition-all duration-200
              `;

    const iconBoxClass = (active) =>
        active
            ? `
                w-9 h-9
                rounded-xl
                bg-white/20
                flex items-center justify-center
              `
            : `
                w-9 h-9
                rounded-xl
                bg-base-200
                flex items-center justify-center
              `;

    return (
        <div className="h-full flex flex-col bg-base-100">
            {/* HEADER */}
            <div className="p-6 border-b border-base-300">
                <div className="flex items-center gap-4">
                    <div
                        className="
                            w-14 h-14
                            rounded-2xl
                            bg-gradient-to-br
                            from-red-600
                            to-orange-500
                            text-white
                            flex items-center justify-center
                            shadow-lg
                        "
                    >
                        <ShieldCheck size={26} />
                    </div>

                    <div>
                        <h2 className="font-black text-lg leading-tight">
                            Président
                        </h2>

                        <p className="text-sm opacity-60">
                            Espace de gestion
                        </p>
                    </div>
                </div>
            </div>

            {/* NAVIGATION */}
            <div className="flex-1 p-4">
                <div className="mb-4 px-2">
                    <p
                        className="
                            text-xs
                            font-bold
                            uppercase
                            tracking-wider
                            opacity-50
                        "
                    >
                        Navigation
                    </p>
                </div>

                <ul className="space-y-2">
                    {/* DASHBOARD */}
                    <li>
                        <Link
                            href={route('president.dashboard')}
                            className={linkClass(isActive('president.dashboard'))}
                        >
                            <div className={iconBoxClass(isActive('president.dashboard'))}>
                                <Home size={18} />
                            </div>

                            <span>
                                Tableau de bord
                            </span>
                        </Link>
                    </li>

                    {/* MEMBRES */}
                    <li>
                        <Link
                            href={route('president.membres.index')}
                            className={linkClass(route().current('president.membres.*'))}
                        >
                            <div className={iconBoxClass(route().current('president.membres.*'))}>
                                <User2 size={18} />
                            </div>

                            <span>
                                Gestion des membres
                            </span>
                        </Link>
                    </li>

                    {/* GESTION DES RÔLES */}
                    <li>
                        <Link
                            href={route('president.roles.index')}
                            className={linkClass(isRolesActive)}
                        >
                            <div className={iconBoxClass(isRolesActive)}>
                                <UserCog size={18} />
                            </div>

                            <span>
                                Gestion des rôles
                            </span>
                        </Link>
                    </li>

                    {/* FINANCES */}
                    <li>
                        <Link
                            href={route('president.finances.index')}
                            className={linkClass(isFinanceActive)}
                        >
                            <div className={iconBoxClass(isFinanceActive)}>
                                <Banknote size={18} />
                            </div>

                            <span>
                                Supervision finances
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>

            {/* FOOTER */}
            <div className="p-4 border-t border-base-300">
                <div className="rounded-2xl bg-base-200 px-4 py-3">
                    <p className="text-sm font-semibold">
                        TESOMIA
                    </p>

                    <p className="text-xs opacity-60 mt-1">
                        Plateforme associative
                    </p>
                </div>
            </div>
        </div>
    );
}