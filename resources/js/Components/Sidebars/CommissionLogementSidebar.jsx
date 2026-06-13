import { Link } from '@inertiajs/react';

import {
    Home,
    Building2,
    CheckCircle,
    Building,
} from 'lucide-react';

export default function CommissionLogementSidebar() {

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
                        from-primary
                        to-secondary
                        text-primary-content
                        flex items-center justify-center
                        shadow-lg
                    ">
                        <Building size={26} />
                    </div>

                    <div>

                        <h2 className="
                            font-black
                            text-lg
                            leading-tight
                        ">
                            Commission
                            <br />
                            logement
                        </h2>

                        <p className="
                            text-sm
                            opacity-60
                        ">
                            Gestion des logements
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
                            href={route('dashboard.logements')}
                            className={linkClass(
                                isActive('dashboard.logements')
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

                    {/* LOGEMENTS */}
                    <li>

                        <Link
                            href={route('logements.index')}
                            className={linkClass(
                                isActive('logements.*')
                            )}
                        >

                            <div className="
                                w-9 h-9
                                rounded-xl
                                bg-base-100/20
                                flex items-center justify-center
                            ">
                                <Building2 size={18} />
                            </div>

                            <span>
                                Logements
                            </span>

                        </Link>

                    </li>

                    {/* ATTRIBUTIONS */}
                    <li>

                        <Link
                            href={route('attributions.index')}
                            className={linkClass(
                                isActive('attributions.*')
                            )}
                        >

                            <div className="
                                w-9 h-9
                                rounded-xl
                                bg-base-100/20
                                flex items-center justify-center
                            ">
                                <CheckCircle size={18} />
                            </div>

                            <span>
                                Attributions
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
                        Gestion des logements étudiants
                    </p>

                </div>

            </div>

        </div>

    );
}