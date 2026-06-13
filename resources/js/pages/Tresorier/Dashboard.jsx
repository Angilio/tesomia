import { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Head, router } from '@inertiajs/react';

import {
    ArrowUpCircle,
    ArrowDownCircle,
    CreditCard,
    CalendarDays,
    WalletCards,
    TrendingUp
} from 'lucide-react';

import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

export default function Dashboard({
    annees,
    annee_selectionnee,
    totauxMois
}) {
    const [annee, setAnnee] = useState(annee_selectionnee);
    const [mois, setMois] = useState(new Date().getMonth() + 1);

    const moisLabels = [
        'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin',
        'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'
    ];

    const moisActuel = totauxMois[mois] || {
        entrees: 0,
        sorties: 0,
        solde: 0
    };

    const changerAnnee = (newAnnee) => {
        setAnnee(newAnnee);

        router.get(
            route('tresorier.dashboard'),
            { annee: newAnnee },
            { preserveState: true }
        );
    };

    const dataChart = Object.keys(totauxMois).map((m) => ({
        mois: parseInt(m),
        entrees: totauxMois[m].entrees,
        sorties: totauxMois[m].sorties,
        solde: totauxMois[m].solde,
    }));

    const formatMoney = (value) =>
        new Intl.NumberFormat('fr-FR').format(value) + ' Ar';

    return (
        <Layout
            header={
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-black">
                        Tableau de bord - Trésorier
                    </h2>

                    <p className="text-sm opacity-60">
                        Suivi mensuel et annuel des finances de l’association
                    </p>
                </div>
            }
        >
            <Head title="Dashboard Trésorier" />

            <div className="space-y-6">

                {/* HERO */}
                <div className="rounded-3xl bg-gradient-to-r from-green-600 to-emerald-500 text-white p-6 md:p-8 shadow-xl">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 mb-4">
                                <WalletCards className="w-4 h-4" />
                                <span className="text-sm font-semibold">
                                    Espace financier
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-black">
                                Vue financière {annee}
                            </h1>

                            <p className="mt-2 text-white/80">
                                Analyse des entrées, sorties et soldes mensuels.
                            </p>
                        </div>

                        <div className="rounded-3xl bg-white/15 backdrop-blur-md p-5 min-w-56">
                            <p className="text-sm text-white/70">
                                Mois sélectionné
                            </p>

                            <p className="text-2xl font-black">
                                {moisLabels[mois - 1]} {annee}
                            </p>
                        </div>

                    </div>
                </div>

                {/* FILTRES */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                    <div className="card bg-base-100 border border-base-300 shadow-sm">
                        <div className="card-body">
                            <div className="flex items-center gap-3 mb-4">
                                <CalendarDays className="w-5 h-5 text-primary" />
                                <h3 className="font-black">
                                    Année
                                </h3>
                            </div>

                            <div className="flex gap-2 flex-wrap">
                                {annees.map((a) => (
                                    <button
                                        key={a}
                                        className={`btn rounded-full ${
                                            a === annee
                                                ? 'btn-primary'
                                                : 'btn-ghost'
                                        }`}
                                        onClick={() => changerAnnee(a)}
                                    >
                                        {a}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 border border-base-300 shadow-sm">
                        <div className="card-body">
                            <div className="flex items-center gap-3 mb-4">
                                <TrendingUp className="w-5 h-5 text-primary" />
                                <h3 className="font-black">
                                    Mois
                                </h3>
                            </div>

                            <div className="flex gap-2 flex-wrap">
                                {moisLabels.map((label, idx) => (
                                    <button
                                        key={idx}
                                        className={`btn btn-sm rounded-full ${
                                            mois === idx + 1
                                                ? 'btn-primary'
                                                : 'btn-ghost'
                                        }`}
                                        onClick={() => setMois(idx + 1)}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                {/* CARTES */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <StatCard
                        title="Entrées"
                        value={formatMoney(moisActuel.entrees)}
                        icon={<ArrowDownCircle size={42} />}
                        className="from-green-600 to-emerald-500"
                    />

                    <StatCard
                        title="Sorties"
                        value={formatMoney(moisActuel.sorties)}
                        icon={<ArrowUpCircle size={42} />}
                        className="from-red-600 to-rose-500"
                    />

                    <StatCard
                        title="Solde"
                        value={formatMoney(moisActuel.solde)}
                        icon={<CreditCard size={42} />}
                        className="from-blue-600 to-sky-500"
                    />

                </div>

                {/* HISTOGRAMME */}
                <ChartCard title="Évolution financière annuelle" subtitle="Histogramme des entrées, sorties et solde">
                    <ResponsiveContainer width="100%" height={320}>
                        <BarChart data={dataChart}>
                            <XAxis
                                dataKey="mois"
                                tickFormatter={(m) => moisLabels[m - 1]}
                            />
                            <YAxis />
                            <Tooltip formatter={(value) => formatMoney(value)} />
                            <Legend />
                            <Bar dataKey="entrees" name="Entrées" fill="#22c55e" radius={[8, 8, 0, 0]} />
                            <Bar dataKey="sorties" name="Sorties" fill="#ef4444" radius={[8, 8, 0, 0]} />
                            <Bar dataKey="solde" name="Solde" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                {/* COURBE */}
                <ChartCard title="Tendance financière" subtitle="Courbe mensuelle des mouvements financiers">
                    <ResponsiveContainer width="100%" height={320}>
                        <LineChart data={dataChart}>
                            <XAxis
                                dataKey="mois"
                                tickFormatter={(m) => moisLabels[m - 1]}
                            />
                            <YAxis />
                            <Tooltip formatter={(value) => formatMoney(value)} />
                            <Legend />
                            <Line type="monotone" dataKey="entrees" stroke="#22c55e" strokeWidth={3} name="Entrées" />
                            <Line type="monotone" dataKey="sorties" stroke="#ef4444" strokeWidth={3} name="Sorties" />
                            <Line type="monotone" dataKey="solde" stroke="#3b82f6" strokeWidth={4} name="Solde" />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>

            </div>
        </Layout>
    );
}

function StatCard({ title, value, icon, className }) {
    return (
        <div className={`rounded-3xl bg-gradient-to-br ${className} text-white p-6 shadow-xl`}>
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-white/75 font-medium">
                        {title}
                    </p>

                    <h3 className="text-2xl md:text-3xl font-black mt-2">
                        {value}
                    </h3>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center">
                    {icon}
                </div>
            </div>
        </div>
    );
}

function ChartCard({ title, subtitle, children }) {
    return (
        <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body">
                <div className="mb-4">
                    <h2 className="text-xl font-black">
                        {title}
                    </h2>

                    <p className="text-sm opacity-60">
                        {subtitle}
                    </p>
                </div>

                <div className="w-full overflow-x-auto">
                    <div className="min-w-[720px]">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}