import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

import {
    Home,
    Building2,
    PieChart as PieIcon,
    BarChart3,
} from 'lucide-react';

import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';

export default function Dashboard({ logementsParType = [] }) {
    const totalLogements = logementsParType.reduce(
        (sum, item) => sum + Number(item.logements_count || 0),
        0
    );

    const chartData = logementsParType.map((item) => ({
        type: item.type,
        logements: Number(item.logements_count || 0),
    }));

    const typeStyles = {
        PV: 'from-green-500 to-emerald-600',
        PJ: 'from-yellow-400 to-amber-500',
        BM: 'from-orange-500 to-orange-600',
        BR: 'from-red-500 to-rose-600',
        Bloc: 'from-blue-500 to-sky-600',
        default: 'from-primary to-secondary',
    };

    const chartColors = [
        '#22c55e',
        '#eab308',
        '#f97316',
        '#ef4444',
        '#3b82f6',
        '#8b5cf6',
    ];

    return (
        <Layout
            header={
                <div>
                    <h2 className="text-2xl font-black">
                        Tableau de bord - Commission Logement
                    </h2>
                    <p className="text-sm opacity-60">
                        Vue générale des logements enregistrés par type
                    </p>
                </div>
            }
        >
            <Head title="Dashboard Commission" />

            <div className="space-y-6">

                <div className="rounded-3xl bg-gradient-to-r from-primary to-secondary text-primary-content p-6 md:p-8 shadow-xl">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 mb-4">
                                <Building2 className="w-4 h-4" />
                                <span className="text-sm font-semibold">
                                    Commission logement
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-black">
                                Suivi des logements
                            </h1>

                            <p className="mt-2 text-white/80">
                                Analyse rapide du nombre de logements par catégorie.
                            </p>
                        </div>

                        <div className="stats bg-white/15 text-white shadow-none">
                            <div className="stat">
                                <div className="stat-title text-white/70">
                                    Total logements
                                </div>
                                <div className="stat-value">
                                    {totalLogements}
                                </div>
                                <div className="stat-desc text-white/70">
                                    enregistrés
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {logementsParType.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {logementsParType.map((item) => {
                                const gradient =
                                    typeStyles[item.type] || typeStyles.default;

                                return (
                                    <div
                                        key={item.id}
                                        className={`rounded-3xl bg-gradient-to-br ${gradient} text-white shadow-xl p-6`}
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            <div>
                                                <p className="text-white/75 text-sm font-medium">
                                                    Type de logement
                                                </p>

                                                <h2 className="text-3xl font-black mt-1">
                                                    {item.type}
                                                </h2>
                                            </div>

                                            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">
                                                <Home size={30} />
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <p className="text-5xl font-black">
                                                {item.logements_count}
                                            </p>

                                            <p className="text-white/75 mt-1">
                                                logements enregistrés
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                            <ChartCard
                                icon={<BarChart3 className="w-5 h-5 text-primary" />}
                                title="Répartition par type"
                                subtitle="Histogramme des logements enregistrés"
                            >
                                <ResponsiveContainer width="100%" height={320}>
                                    <BarChart data={chartData}>
                                        <XAxis dataKey="type" />
                                        <YAxis allowDecimals={false} />
                                        <Tooltip />
                                        <Legend />
                                        <Bar
                                            dataKey="logements"
                                            name="Logements"
                                            fill="#3b82f6"
                                            radius={[10, 10, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartCard>

                            <ChartCard
                                icon={<PieIcon className="w-5 h-5 text-primary" />}
                                title="Pourcentage par type"
                                subtitle="Vue circulaire de la répartition"
                            >
                                <ResponsiveContainer width="100%" height={320}>
                                    <PieChart>
                                        <Pie
                                            data={chartData}
                                            dataKey="logements"
                                            nameKey="type"
                                            outerRadius={110}
                                            label
                                        >
                                            {chartData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${entry.type}`}
                                                    fill={chartColors[index % chartColors.length]}
                                                />
                                            ))}
                                        </Pie>

                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </ChartCard>

                        </div>
                    </>
                ) : (
                    <div className="card bg-base-100 border border-base-300 shadow-sm">
                        <div className="card-body text-center py-16">
                            <Home className="w-16 h-16 mx-auto opacity-30 mb-4" />

                            <h3 className="text-xl font-black">
                                Aucun logement enregistré
                            </h3>

                            <p className="opacity-60">
                                Les statistiques apparaîtront ici dès qu’il y aura des logements.
                            </p>
                        </div>
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