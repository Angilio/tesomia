import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

import {
    Users,
    Wallet,
    CalendarDays,
    Mail,
    TrendingUp,
    ShieldCheck,
    BarChart3,
    UserPlus,
} from 'lucide-react';

export default function Welcome({ auth }) {

    const stats = [
        {
            icon: <Users className="w-8 h-8 text-info" />,
            label: 'Membres',
            value: '142',
            color: 'from-blue-500 to-blue-700',
        },
        {
            icon: <Wallet className="w-8 h-8 text-success" />,
            label: 'Cotisations',
            value: '87%',
            color: 'from-green-500 to-green-700',
        },
        {
            icon: <CalendarDays className="w-8 h-8 text-warning" />,
            label: 'Événements',
            value: '3',
            color: 'from-orange-500 to-orange-700',
        },
        {
            icon: <Mail className="w-8 h-8 text-secondary" />,
            label: 'Messages',
            value: '12',
            color: 'from-pink-500 to-pink-700',
        },
    ];

    const recentMembers = [
        { name: 'Marie Dupont', role: 'Trésorière' },
        { name: 'Jean Rakoto', role: 'Membre actif' },
        { name: 'Sofia Andria', role: 'Secrétaire' },
    ];

    const features = [
        {
            icon: <Users className="w-10 h-10 text-info" />,
            title: 'Gestion des membres',
            desc: 'Suivi complet des adhérents',
        },
        {
            icon: <Wallet className="w-10 h-10 text-success" />,
            title: 'Cotisations',
            desc: 'Gestion financière simplifiée',
        },
        {
            icon: <CalendarDays className="w-10 h-10 text-warning" />,
            title: 'Événements',
            desc: 'Organisation des activités',
        },
        {
            icon: <BarChart3 className="w-10 h-10 text-secondary" />,
            title: 'Statistiques',
            desc: 'Analyse des performances',
        },
    ];

    const cardClass =
        'bg-base-100 border border-base-300 shadow-sm hover:shadow-xl transition-all duration-300';

    return (
        <GuestLayout>
            <Head title="Accueil" />

            <div className="space-y-2 md:p-6">

                {/* HERO */}
                <div className="hero rounded-[2rem] bg-gradient-to-r from-blue-600 to-pink-500 text-white shadow-2xl overflow-hidden">

                    <div className="hero-content py-16 px-8 md:px-12 w-full justify-start">

                        <div className="max-w-3xl">

                            <div className="inline-flex items-center gap-2 px-2 rounded-full bg-white/15 backdrop-blue-md border border-white/20 mb-6">
                                <ShieldCheck className="w-4 h-4" />

                                <span className="text-sm font-semibold">
                                    Plateforme sécurisée
                                </span>
                            </div>

                            <h1 className="text-2xl md:text-3xl font-black leading-tight tracking-tight">
                                <span className="text-yellow-300">TE</span>raka{' '}
                                <span className="text-yellow-300">SO</span>fia{' '}
                                <span className="text-yellow-300">MI</span>anatra{' '}
                                <span className="text-yellow-300">A</span>ntsiranana
                            </h1>

                            <p className="mt-5 text-lg md:text-xl text-white/90 leading-relaxed">
                                Plateforme moderne de gestion interne de l’association :
                                membres, finances, événements et statistiques centralisés.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-4">

                                <button className="btn btn-primary btn-lg rounded-full bg-white text-red-600 border-none hover:bg-base-100">
                                    Commencer
                                </button>

                                <button className="btn btn-outline btn-lg rounded-full border-white text-white hover:bg-white hover:text-red-600">
                                    En savoir plus
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                    {stats.map((item) => (

                        <div
                            key={item.label}
                            className={`group rounded-3xl overflow-hidden ${cardClass}`}
                        >

                            <div className={`h-2 bg-gradient-to-r ${item.color}`} />

                            <div className="p-6 flex items-center justify-between">

                                <div>

                                    <p className="text-sm opacity-60">
                                        {item.label}
                                    </p>

                                    <h2 className="text-3xl font-black mt-1">
                                        {item.value}
                                    </h2>

                                    <div className="flex items-center gap-1 mt-2 text-success text-sm font-medium">
                                        <TrendingUp className="w-4 h-4" />
                                        +12% ce mois
                                    </div>

                                </div>

                                <div className="bg-base-200 p-4 rounded-2xl group-hover:scale-110 transition">
                                    {item.icon}
                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                {/* MAIN CONTENT */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                    {/* DASHBOARD */}
                    <div className={`xl:col-span-2 rounded-3xl p-6 ${cardClass}`}>

                        <div className="flex items-center justify-between mb-6">

                            <div>

                                <h2 className="text-2xl font-black">
                                    Vue générale
                                </h2>

                                <p className="opacity-60">
                                    Aperçu rapide de l’association
                                </p>

                            </div>

                            <div className="bg-error/10 text-error p-3 rounded-2xl">
                                <BarChart3 className="w-7 h-7" />
                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {stats.map((item) => (

                                <div
                                    key={item.label}
                                    className="
                                        rounded-3xl
                                        p-5
                                        bg-base-200
                                        border border-base-300
                                        hover:-translate-y-1
                                        transition
                                    "
                                >

                                    <div className="flex items-center justify-between">

                                        {item.icon}

                                        <span className="text-sm font-medium text-success">
                                            Progression
                                        </span>

                                    </div>

                                    <h3 className="mt-4 text-lg font-semibold">
                                        {item.label}
                                    </h3>

                                    <p className="text-3xl font-black mt-1">
                                        {item.value}
                                    </p>

                                </div>

                            ))}

                        </div>

                    </div>

                    {/* MEMBERS */}
                    <div className={`rounded-3xl p-6 ${cardClass}`}>

                        <div className="flex items-center justify-between mb-6">

                            <div>

                                <h2 className="text-2xl font-black">
                                    Membres récents
                                </h2>

                                <p className="opacity-60">
                                    Nouveaux adhérents
                                </p>

                            </div>

                            <div className="bg-info/10 text-info p-3 rounded-2xl">
                                <UserPlus className="w-7 h-7" />
                            </div>

                        </div>

                        <div className="space-y-4">

                            {recentMembers.map((m) => (

                                <div
                                    key={m.name}
                                    className="
                                        flex items-center justify-between
                                        p-4 rounded-3xl
                                        bg-base-200
                                        border border-base-300
                                        hover:-translate-y-1
                                        transition
                                    "
                                >

                                    <div className="flex items-center gap-3">

                                        <div className="
                                            w-12 h-12 rounded-2xl
                                            bg-gradient-to-r from-red-600 to-orange-500
                                            flex items-center justify-center
                                            text-white font-black shadow-lg
                                        ">
                                            {m.name.charAt(0)}
                                        </div>

                                        <div>

                                            <p className="font-bold">
                                                {m.name}
                                            </p>

                                            <p className="text-sm opacity-60">
                                                {m.role}
                                            </p>

                                        </div>

                                    </div>

                                    <span className="badge badge-success badge-outline">
                                        Actif
                                    </span>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

                {/* FEATURES */}
                <div>

                    <div className="mb-6">

                        <h2 className="text-3xl font-black">
                            Fonctionnalités
                        </h2>

                        <p className="opacity-60 mt-1">
                            Outils principaux disponibles dans la plateforme
                        </p>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                        {features.map((f) => (

                            <div
                                key={f.title}
                                className={`group rounded-3xl p-6 ${cardClass}`}
                            >

                                <div className="
                                    w-16 h-16 rounded-2xl
                                    bg-base-200
                                    flex items-center justify-center
                                    mb-5
                                    group-hover:scale-110
                                    transition
                                ">
                                    {f.icon}
                                </div>

                                <h3 className="text-xl font-black">
                                    {f.title}
                                </h3>

                                <p className="mt-2 opacity-60 text-sm leading-relaxed">
                                    {f.desc}
                                </p>

                                <div className="mt-4 flex items-center gap-2 text-error font-medium text-sm">
                                    <ShieldCheck className="w-4 h-4" />
                                    Système sécurisé
                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </GuestLayout>
    );
}