import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

import {
    Home,
    Users,
    BarChart3,
    PieChart as PieIcon,
    Crown,
} from 'lucide-react';

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from 'recharts';

export default function Dashboard({ typesLogements = [], totalMembres = 0 }) {
    const COLORS = ['#22c55e', '#eab308', '#f97316', '#ef4444', '#3b82f6'];

    const data = typesLogements.map((type) => ({
        name: type.type,
        value: type.membres_count,
    }));

    return (
        <Layout
            header={
                <div>
                    <h2 className="text-2xl font-black">
                        Tableau de bord - Président
                    </h2>

                    <p className="text-sm opacity-60">
                        Vue générale des membres par type de logement
                    </p>
                </div>
            }
        >
            <Head title="Dashboard Président" />

            <div className="space-y-6">

                {/* HERO */}
                <div className="rounded-3xl bg-gradient-to-r from-primary to-secondary text-primary-content p-6 md:p-8 shadow-xl">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 mb-4">
                                <Crown className="w-4 h-4" />
                                <span className="text-sm font-semibold">
                                    Espace président
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-black">
                                Suivi global des membres
                            </h1>

                            <p className="mt-2 text-white/80">
                                Analyse rapide de la répartition des membres selon les logements.
                            </p>
                        </div>

                        <div className="stats bg-white/15 text-white shadow-none">
                            <div className="stat">
                                <div className="stat-title text-white/70">
                                    Total membres
                                </div>

                                <div className="stat-value">
                                    {totalMembres}
                                </div>

                                <div className="stat-desc text-white/70">
                                    enregistrés
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CARDS */}
                {typesLogements.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {typesLogements.map((type, index) => (
                            <div
                                key={type.id}
                                className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-xl transition-all duration-300"
                            >
                                <div className="card-body">
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-sm opacity-60">
                                                Type de logement
                                            </p>

                                            <h2 className="text-2xl font-black mt-1">
                                                {type.type}
                                            </h2>
                                        </div>

                                        <div
                                            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white"
                                            style={{
                                                backgroundColor:
                                                    COLORS[index % COLORS.length],
                                            }}
                                        >
                                            <Home className="w-7 h-7" />
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <p className="text-4xl font-black">
                                            {type.membres_count}
                                        </p>

                                        <p className="text-sm opacity-60">
                                            membre{type.membres_count > 1 ? 's' : ''}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="card bg-base-100 border border-base-300 shadow-sm">
                        <div className="card-body text-center py-16">
                            <Users className="w-16 h-16 mx-auto opacity-30 mb-4" />

                            <h3 className="text-xl font-black">
                                Aucune donnée disponible
                            </h3>

                            <p className="opacity-60">
                                Les statistiques apparaîtront dès que des membres seront enregistrés.
                            </p>
                        </div>
                    </div>
                )}

                {/* CHARTS */}
                {data.length > 0 && (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                        <ChartCard
                            icon={<PieIcon className="w-5 h-5 text-primary" />}
                            title="Répartition des membres"
                            subtitle="Vue circulaire par type de logement"
                        >
                            <ResponsiveContainer width="100%" height={330}>
                                <PieChart>
                                    <Pie
                                        data={data}
                                        dataKey="value"
                                        nameKey="name"
                                        outerRadius={115}
                                        innerRadius={70}
                                        label
                                    >
                                        {data.map((entry, index) => (
                                            <Cell
                                                key={`cell-${entry.name}`}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>

                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartCard>

                        <ChartCard
                            icon={<BarChart3 className="w-5 h-5 text-primary" />}
                            title="Histogramme des membres"
                            subtitle="Comparaison du nombre de membres"
                        >
                            <ResponsiveContainer width="100%" height={330}>
                                <BarChart data={data}>
                                    <XAxis dataKey="name" />
                                    <YAxis allowDecimals={false} />
                                    <Tooltip />
                                    <Bar
                                        dataKey="value"
                                        name="Membres"
                                        fill="#3b82f6"
                                        radius={[10, 10, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartCard>

                    </div>
                )}

            </div>
        </Layout>
    );
}

function ChartCard({ icon, title, subtitle, children }) {
    return (
        <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
                        {icon}
                    </div>

                    <div>
                        <h2 className="text-xl font-black">
                            {title}
                        </h2>

                        <p className="text-sm opacity-60">
                            {subtitle}
                        </p>
                    </div>
                </div>

                <div className="w-full overflow-x-auto">
                    <div className="min-w-[420px]">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}