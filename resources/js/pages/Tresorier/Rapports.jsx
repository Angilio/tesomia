import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';

import {
    Users,
    CheckCircle,
    XCircle,
    Filter,
    Home,
    FileText,
    ShieldCheck,
    FileDown,
} from 'lucide-react';

export default function Rapports({
    membres = [],
    totalMembres = 0,
    filtre = 'tous',
}) {
    const [filtreActif, setFiltreActif] = useState(filtre || 'tous');

    useEffect(() => {
        setFiltreActif(filtre || 'tous');
    }, [filtre]);

    const estPaye = (membre) => {
        return membre.paye === true || membre.paye === 1 || membre.paye === '1';
    };

    const changerFiltre = (valeur) => {
        setFiltreActif(valeur);

        const url = `${route('tresorier.rapports.index')}?filtre=${valeur}`;
        window.history.replaceState({}, '', url);
    };

    const membresAffiches = useMemo(() => {
        if (filtreActif === 'actifs') {
            return membres.filter((membre) => estPaye(membre));
        }

        if (filtreActif === 'non_actifs') {
            return membres.filter((membre) => !estPaye(membre));
        }

        return membres;
    }, [membres, filtreActif]);

    const logementsGroupes = useMemo(() => {
        const groupes = {};

        membresAffiches.forEach((membre) => {
            const logement = membre.logement || membre.adresse || 'Non attribué';

            if (!groupes[logement]) {
                groupes[logement] = {
                    logement,
                    membres: [],
                };
            }

            groupes[logement].membres.push(membre);
        });

        return Object.values(groupes).sort((a, b) => {
            if (a.logement === 'Non attribué') return 1;
            if (b.logement === 'Non attribué') return -1;

            return a.logement.localeCompare(b.logement);
        });
    }, [membresAffiches]);

    const membresPayes = membres.filter((membre) => estPaye(membre)).length;
    const membresNonPayes = membres.length - membresPayes;

    return (
        <Layout
            header={
                <div>
                    <h2 className="text-2xl font-black text-base-content">
                        Rapport des Membres
                    </h2>

                    <p className="text-sm text-base-content/60">
                        Suivi du paiement du droit annuel des membres
                    </p>
                </div>
            }
        >
            <Head title="Rapports" />

            <div className="space-y-6 p-4 md:p-6">

                {/* HERO */}
                <div className="card bg-gradient-to-r from-warning via-orange-500 to-yellow-400 text-white shadow-xl">
                    <div className="card-body p-6 md:p-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                            <div>
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2">
                                    <FileText className="h-4 w-4" />

                                    <span className="text-sm font-semibold">
                                        Rapport annuel
                                    </span>
                                </div>

                                <h1 className="text-3xl font-black md:text-4xl">
                                    Droits annuels des membres
                                </h1>

                                <p className="mt-2 max-w-2xl text-sm text-white/85 md:text-base">
                                    Consultez les membres ayant payé, les membres non payés,
                                    leur logement attribué et le statut de paiement du droit annuel.
                                </p>
                            </div>

                            <div className="rounded-3xl bg-white/15 p-5 backdrop-blur">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-2xl bg-white/20 p-4">
                                        <ShieldCheck className="h-8 w-8" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-white/80">
                                            Membres affichés
                                        </p>

                                        <p className="text-4xl font-black">
                                            {membresAffiches.length}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                    <StatCard
                        title="Total membres"
                        value={totalMembres}
                        icon={<Users className="h-8 w-8" />}
                        iconClassName="bg-warning/15 text-warning"
                    />

                    <StatCard
                        title="Payés"
                        value={membresPayes}
                        icon={<CheckCircle className="h-8 w-8" />}
                        iconClassName="bg-success/15 text-success"
                    />

                    <StatCard
                        title="Non payés"
                        value={membresNonPayes}
                        icon={<XCircle className="h-8 w-8" />}
                        iconClassName="bg-error/15 text-error"
                    />

                </div>

                {/* FILTRES */}
                <div className="card border border-base-300 bg-base-100 shadow-sm">
                    <div className="card-body p-5">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                            <div>
                                <div className="mb-3 flex items-center gap-2">
                                    <Filter className="h-5 w-5 text-warning" />

                                    <h3 className="font-black text-base-content">
                                        Filtres
                                    </h3>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        onClick={() => changerFiltre('tous')}
                                        className={`btn btn-sm rounded-full ${
                                            filtreActif === 'tous'
                                                ? 'btn-warning text-white'
                                                : 'btn-outline btn-warning'
                                        }`}
                                    >
                                        Tous
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => changerFiltre('actifs')}
                                        className={`btn btn-sm rounded-full ${
                                            filtreActif === 'actifs'
                                                ? 'btn-success text-white'
                                                : 'btn-outline btn-success'
                                        }`}
                                    >
                                        Payés
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => changerFiltre('non_actifs')}
                                        className={`btn btn-sm rounded-full ${
                                            filtreActif === 'non_actifs'
                                                ? 'btn-error text-white'
                                                : 'btn-outline btn-error'
                                        }`}
                                    >
                                        Non payés
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <div className="badge badge-outline gap-2 p-4 font-bold">
                                    <Users className="h-4 w-4" />
                                    {membresAffiches.length} membre(s)
                                </div>

                                <div className="badge badge-outline gap-2 p-4 font-bold">
                                    <Home className="h-4 w-4" />
                                    {logementsGroupes.length} logement(s)
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* LISTE GROUPEE PAR LOGEMENT */}
                <div className="card border border-base-300 bg-base-100 shadow-sm">
                    <div className="card-body p-5">

                        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h3 className="text-xl font-black text-base-content">
                                    Liste des membres par logement
                                </h3>

                                <p className="text-sm text-base-content/60">
                                    Affichage des logements, des membres qui y demeurent et du statut du droit annuel.
                                </p>
                            </div>

                            <a
                                href={`${route('tresorier.rapports.pdf')}?filtre=${filtreActif}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-warning text-white shadow-lg"
                            >
                                <FileDown className="h-5 w-5" />
                                Exporter PDF
                            </a>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="table min-w-[850px]">
                                <thead>
                                    <tr className="bg-base-200 text-base-content/70">
                                        <th className="w-[28%]">Logement</th>
                                        <th className="w-[42%]">Membres qui y demeurent</th>
                                        <th className="w-[30%]">Statut du droit annuel</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {logementsGroupes.length > 0 ? (
                                        logementsGroupes.map((groupe) => (
                                            <tr
                                                key={groupe.logement}
                                                className="align-top hover:bg-base-200/60"
                                            >
                                                <td>
                                                    <div className="flex items-start gap-3">
                                                        <div
                                                            className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                                                                groupe.logement === 'Non attribué'
                                                                    ? 'bg-error/15 text-error'
                                                                    : 'bg-warning/15 text-warning'
                                                            }`}
                                                        >
                                                            <Home className="h-5 w-5" />
                                                        </div>

                                                        <div>
                                                            <p
                                                                className={`font-black ${
                                                                    groupe.logement === 'Non attribué'
                                                                        ? 'text-error'
                                                                        : 'text-base-content'
                                                                }`}
                                                            >
                                                                {groupe.logement}
                                                            </p>

                                                            <p className="mt-1 text-xs text-base-content/60">
                                                                {groupe.membres.length} membre(s)
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="space-y-2">
                                                        {groupe.membres.map((membre) => (
                                                            <div
                                                                key={membre.id}
                                                                className="flex items-center gap-3 rounded-2xl bg-base-200/60 px-3 py-2"
                                                            >
                                                                <div className="avatar placeholder">
                                                                    <div className="w-9 rounded-full bg-warning/20 text-warning">
                                                                        <span className="text-xs font-black">
                                                                            {membre.name?.charAt(0)?.toUpperCase() || 'M'}
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                <div>
                                                                    <p className="font-bold text-base-content">
                                                                        {membre.name}
                                                                    </p>

                                                                    <p className="text-xs text-base-content/60">
                                                                        Membre SAVA-U
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="space-y-2">
                                                        {groupe.membres.map((membre) => (
                                                            <div
                                                                key={membre.id}
                                                                className="flex min-h-[52px] items-center"
                                                            >
                                                                <span
                                                                    className={`badge gap-2 font-bold text-white ${
                                                                        estPaye(membre)
                                                                            ? 'badge-success'
                                                                            : 'badge-error'
                                                                    }`}
                                                                >
                                                                    {estPaye(membre) ? (
                                                                        <CheckCircle className="h-4 w-4" />
                                                                    ) : (
                                                                        <XCircle className="h-4 w-4" />
                                                                    )}

                                                                    {estPaye(membre) ? 'Payé' : 'Non payé'}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3">
                                                <div className="py-12 text-center">
                                                    <Users className="mx-auto mb-3 h-12 w-12 text-base-content/30" />

                                                    <p className="font-bold text-base-content">
                                                        Aucun membre trouvé
                                                    </p>

                                                    <p className="text-sm text-base-content/60">
                                                        Aucun résultat ne correspond au filtre sélectionné.
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

            </div>
        </Layout>
    );
}

function StatCard({ title, value, icon, iconClassName }) {
    return (
        <div className="card border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="card-body p-5">
                <div className="flex items-center justify-between gap-4">

                    <div>
                        <p className="text-sm text-base-content/60">
                            {title}
                        </p>

                        <h3 className="mt-1 text-3xl font-black text-base-content">
                            {value}
                        </h3>
                    </div>

                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconClassName}`}>
                        {icon}
                    </div>

                </div>
            </div>
        </div>
    );
}