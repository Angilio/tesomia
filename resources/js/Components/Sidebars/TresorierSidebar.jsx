import React from 'react';

import {
    Home,
    DollarSign,
    FileText,
    WalletCards
} from 'lucide-react';

import { Link } from '@inertiajs/react';

export default function TresorierSidebar() {

    const isActive = (name) => route().current(name);

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

    return (

        <div className="
            h-full
            flex flex-col
            bg-base-100
        ">

            {/* HEADER */}
            <div className="
                p-6
                border-b border-base-300
            ">

                <div className="flex items-center gap-4">

                    <div className="
                        w-14 h-14
                        rounded-2xl
                        bg-gradient-to-br
                        from-green-500
                        to-emerald-600
                        text-white
                        flex items-center justify-center
                        shadow-lg
                    ">
                        <WalletCards size={26} />
                    </div>

                    <div>

                        <h2 className="
                            font-black
                            text-lg
                            leading-tight
                        ">
                            Trésorier
                        </h2>

                        <p className="
                            text-sm
                            opacity-60
                        ">
                            Gestion financière
                        </p>

                    </div>

                </div>

            </div>

            {/* NAVIGATION */}
            <div className="flex-1 p-4">

                <div className="mb-4 px-2">

                    <p className="
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        opacity-50
                    ">
                        Navigation
                    </p>

                </div>

                <ul className="space-y-2">

                    {/* DASHBOARD */}
                    <li>

                        <Link
                            href={route('tresorier.dashboard')}
                            className={linkClass(
                                isActive('tresorier.dashboard')
                            )}
                        >

                            <div className="
                                w-9 h-9
                                rounded-xl
                                bg-base-100/20
                                flex items-center justify-center
                            ">
                                <Home size={18} />
                            </div>

                            <span>
                                Tableau de bord
                            </span>

                        </Link>

                    </li>

                    {/* FINANCES */}
                    <li>

                        <Link
                            href={route('tresorier.finances')}
                            className={linkClass(
                                isActive('tresorier.finances')
                            )}
                        >

                            <div className="
                                w-9 h-9
                                rounded-xl
                                bg-base-100/20
                                flex items-center justify-center
                            ">
                                <DollarSign size={18} />
                            </div>

                            <span>
                                Gestion des finances
                            </span>

                        </Link>

                    </li>

                    {/* RAPPORTS */}
                    <li>

                        <Link
                            href={route('tresorier.rapports')}
                            className={linkClass(
                                isActive('tresorier.rapports')
                            )}
                        >

                            <div className="
                                w-9 h-9
                                rounded-xl
                                bg-base-100/20
                                flex items-center justify-center
                            ">
                                <FileText size={18} />
                            </div>

                            <span>
                                Rapports
                            </span>

                        </Link>

                    </li>

                </ul>

            </div>

            {/* FOOTER */}
            <div className="
                p-4
                border-t border-base-300
            ">

                <div className="
                    rounded-2xl
                    bg-base-200
                    px-4 py-3
                ">

                    <p className="
                        text-sm font-semibold
                    ">
                        TESOMIA
                    </p>

                    <p className="
                        text-xs opacity-60 mt-1
                    ">
                        Suivi et gestion des finances
                    </p>

                </div>

            </div>

        </div>

    );
}