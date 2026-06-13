import { useState, useMemo } from 'react';
import { useForm, Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

import {
    Wallet,
    ArrowDownCircle,
    ArrowUpCircle,
    PlusCircle,
    Filter,
    CalendarDays,
    Coins,
    FilePlus,
} from 'lucide-react';

export default function Finances({ entrees, sorties, ressources, users }) {
    const [filter, setFilter] = useState('toutes');
    const [openEntree, setOpenEntree] = useState(false);
    const [openSortie, setOpenSortie] = useState(false);
    const [openRessource, setOpenRessource] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    const entreeForm = useForm({
        ressource_id: '',
        user_id: '',
    });

    const sortieForm = useForm({
        montant: '',
        raison: '',
    });

    const ressourceForm = useForm({
        ressource: '',
        prix: '',
    });

    const operations = useMemo(() => {
        const all = [
            ...entrees.map(e => ({ ...e, type: 'Entrée' })),
            ...sorties.map(s => ({ ...s, type: 'Sortie' })),
        ];

        return [...all].sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
    }, [entrees, sorties]);

    const totalEntrees = useMemo(
        () => entrees.reduce((sum, e) => sum + Number(e.montant), 0),
        [entrees]
    );

    const totalSorties = useMemo(
        () => sorties.reduce((sum, s) => sum + Number(s.montant), 0),
        [sorties]
    );

    const solde = totalEntrees - totalSorties;

    const selectedRessource = useMemo(() => {
        return ressources.find(
            (ressource) => Number(ressource.id) === Number(entreeForm.data.ressource_id)
        );
    }, [ressources, entreeForm.data.ressource_id]);

    const prixAutomatique = selectedRessource ? Number(selectedRessource.prix) : 0;

    const formatMoney = (value) => {
        const number = Number(value || 0);

        return new Intl.NumberFormat('fr-FR').format(number) + ' Ar';
    };

    const submitEntree = (e) => {
        e.preventDefault();

        entreeForm.post(route('tresorier.entrees.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setOpenEntree(false);
                entreeForm.reset();
            },
        });
    };

    const submitSortie = (e) => {
        e.preventDefault();

        sortieForm.post(route('tresorier.sorties.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setOpenSortie(false);
                sortieForm.reset();
            },
        });
    };

    const submitRessource = (e) => {
        e.preventDefault();

        ressourceForm.post(route('tresorier.ressources.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setOpenRessource(false);
                ressourceForm.reset();
            },
        });
    };

    const filteredOperations = operations.filter(op =>
        filter === 'toutes'
            ? true
            : filter === 'entrees'
                ? op.type === 'Entrée'
                : op.type === 'Sortie'
    );

    const paginatedOperations = filteredOperations.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <Layout
            header={
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black">
                            Finances
                        </h1>

                        <p className="text-sm opacity-60">
                            Gestion des entrées, sorties et ressources
                        </p>
                    </div>

                    <div className="stats bg-base-200 border border-base-300 shadow-sm">
                        <div className="stat py-3">
                            <div className="stat-title">
                                Solde actuel
                            </div>

                            <div className={`stat-value text-2xl ${solde >= 0 ? 'text-success' : 'text-error'}`}>
                                {formatMoney(solde)}
                            </div>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title="Finances" />

            <div className="space-y-6">

                {/* HERO */}
                <div className="rounded-3xl bg-gradient-to-r from-green-600 to-emerald-500 text-white p-6 md:p-8 shadow-xl">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 mb-4">
                                <Wallet className="w-4 h-4" />
                                <span className="text-sm font-semibold">
                                    Espace trésorerie
                                </span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-black">
                                Suivi financier
                            </h2>

                            <p className="mt-2 text-white/80">
                                Consultez, filtrez et ajoutez les mouvements financiers.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <MiniStat
                                label="Entrées"
                                value={formatMoney(totalEntrees)}
                            />

                            <MiniStat
                                label="Sorties"
                                value={formatMoney(totalSorties)}
                            />

                            <MiniStat
                                label="Opérations"
                                value={operations.length}
                            />
                        </div>
                    </div>
                </div>

                {/* SUMMARY CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <SummaryCard
                        title="Total entrées"
                        value={formatMoney(totalEntrees)}
                        icon={<ArrowDownCircle className="w-8 h-8" />}
                        badgeClass="bg-success/10 text-success"
                    />

                    <SummaryCard
                        title="Total sorties"
                        value={formatMoney(totalSorties)}
                        icon={<ArrowUpCircle className="w-8 h-8" />}
                        badgeClass="bg-error/10 text-error"
                    />

                    <SummaryCard
                        title="Solde"
                        value={formatMoney(solde)}
                        icon={<Coins className="w-8 h-8" />}
                        badgeClass={solde >= 0 ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}
                    />
                </div>

                {/* CONTROLS */}
                <div className="card bg-base-100 border border-base-300 shadow-sm">
                    <div className="card-body">
                        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Filter className="w-5 h-5 text-primary" />
                                    <h3 className="font-black">
                                        Filtres
                                    </h3>
                                </div>

                                <div className="flex gap-2 flex-wrap">
                                    <button
                                        className={`btn rounded-full ${filter === 'toutes' ? 'btn-primary' : 'btn-ghost'}`}
                                        onClick={() => {
                                            setFilter('toutes');
                                            setCurrentPage(1);
                                        }}
                                    >
                                        Toutes
                                    </button>

                                    <button
                                        className={`btn rounded-full ${filter === 'entrees' ? 'btn-success' : 'btn-ghost'}`}
                                        onClick={() => {
                                            setFilter('entrees');
                                            setCurrentPage(1);
                                        }}
                                    >
                                        Entrées
                                    </button>

                                    <button
                                        className={`btn rounded-full ${filter === 'sorties' ? 'btn-error' : 'btn-ghost'}`}
                                        onClick={() => {
                                            setFilter('sorties');
                                            setCurrentPage(1);
                                        }}
                                    >
                                        Sorties
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setOpenEntree(true)}
                                    className="btn btn-success rounded-full"
                                >
                                    <PlusCircle className="w-4 h-4" />
                                    Entrée
                                </button>

                                <button
                                    onClick={() => setOpenSortie(true)}
                                    className="btn btn-error rounded-full"
                                >
                                    <PlusCircle className="w-4 h-4" />
                                    Sortie
                                </button>

                                <button
                                    onClick={() => setOpenRessource(true)}
                                    className="btn btn-primary rounded-full"
                                >
                                    <FilePlus className="w-4 h-4" />
                                    Ressource
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

                {/* LISTE */}
                <div className="card bg-base-100 border border-base-300 shadow-sm">
                    <div className="card-body">
                        <div className="flex items-center justify-between gap-4 mb-4">
                            <div>
                                <h2 className="text-xl font-black">
                                    Historique des opérations
                                </h2>

                                <p className="text-sm opacity-60">
                                    {filteredOperations.length} opération(s) trouvée(s)
                                </p>
                            </div>

                            <CalendarDays className="w-6 h-6 opacity-40" />
                        </div>

                        {paginatedOperations.length === 0 ? (
                            <div className="text-center py-14">
                                <Wallet className="w-14 h-14 mx-auto opacity-30 mb-4" />

                                <p className="font-semibold">
                                    Aucune opération
                                </p>

                                <p className="text-sm opacity-60">
                                    Ajoutez une entrée ou une sortie pour commencer.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Type</th>
                                            <th>Détail</th>
                                            <th>Date</th>
                                            <th className="text-right">Montant</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {paginatedOperations.map(op => (
                                            <tr key={`${op.type}-${op.id}`} className="hover">
                                                <td>
                                                    <span className={`badge ${op.type === 'Entrée' ? 'badge-success' : 'badge-error'}`}>
                                                        {op.type}
                                                    </span>
                                                </td>

                                                <td className="font-medium">
                                                    {op.ressource
                                                        ? (
                                                            <div>
                                                                <p className="font-bold">
                                                                    {op.ressource.ressource}
                                                                </p>

                                                                <p className="text-xs opacity-60">
                                                                    {op.user?.name || 'Membre non précisé'}
                                                                </p>
                                                            </div>
                                                        )
                                                        : op.raison || 'Non précisé'}
                                                </td>

                                                <td className="text-sm opacity-60 whitespace-nowrap">
                                                    {new Date(op.created_at).toLocaleString('fr-FR', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </td>

                                                <td className={`text-right font-black whitespace-nowrap ${op.type === 'Entrée' ? 'text-success' : 'text-error'}`}>
                                                    {op.type === 'Entrée' ? '+' : '-'} {formatMoney(op.montant)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {filteredOperations.length > itemsPerPage && (
                            <div className="flex justify-center gap-2 mt-6 flex-wrap">
                                {Array.from(
                                    { length: Math.ceil(filteredOperations.length / itemsPerPage) },
                                    (_, i) => (
                                        <button
                                            key={i}
                                            className={`btn btn-sm rounded-full ${currentPage === i + 1 ? 'btn-primary' : 'btn-ghost'}`}
                                            onClick={() => setCurrentPage(i + 1)}
                                        >
                                            {i + 1}
                                        </button>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* MODALS */}
            {openEntree && (
                <Modal title="Ajouter une entrée" onClose={() => setOpenEntree(false)}>
                    <form onSubmit={submitEntree} className="space-y-4">
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Membre
                                </span>
                            </label>

                            <select
                                className="select select-bordered w-full"
                                value={entreeForm.data.user_id}
                                onChange={e => entreeForm.setData('user_id', e.target.value)}
                                required
                            >
                                <option value="">Choisir un membre</option>

                                {users.map(u => (
                                    <option key={u.id} value={u.id}>
                                        {u.name}
                                    </option>
                                ))}
                            </select>

                            {entreeForm.errors.user_id && (
                                <FormError message={entreeForm.errors.user_id} />
                            )}
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Ressource
                                </span>
                            </label>

                            <select
                                className="select select-bordered w-full"
                                value={entreeForm.data.ressource_id}
                                onChange={e => entreeForm.setData('ressource_id', e.target.value)}
                                required
                            >
                                <option value="">Choisir une ressource</option>

                                {ressources.map(r => (
                                    <option key={r.id} value={r.id}>
                                        {r.ressource} - {formatMoney(r.prix)}
                                    </option>
                                ))}
                            </select>

                            {entreeForm.errors.ressource_id && (
                                <FormError message={entreeForm.errors.ressource_id} />
                            )}
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Montant automatique
                                </span>
                            </label>

                            <div className="rounded-2xl border border-base-300 bg-base-200 p-4">
                                {selectedRessource ? (
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-sm opacity-60">
                                                Prix de la ressource sélectionnée
                                            </p>

                                            <p className="text-2xl font-black text-success">
                                                {formatMoney(prixAutomatique)}
                                            </p>
                                        </div>

                                        <Coins className="w-8 h-8 text-success" />
                                    </div>
                                ) : (
                                    <p className="text-sm opacity-60">
                                        Le montant s’affichera automatiquement après le choix d’une ressource.
                                    </p>
                                )}
                            </div>

                            {entreeForm.errors.montant && (
                                <FormError message={entreeForm.errors.montant} />
                            )}
                        </div>

                        <ModalActions
                            processing={entreeForm.processing}
                            onCancel={() => setOpenEntree(false)}
                        />
                    </form>
                </Modal>
            )}

            {openSortie && (
                <Modal title="Ajouter une sortie" onClose={() => setOpenSortie(false)}>
                    <form onSubmit={submitSortie} className="space-y-4">
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Montant
                                </span>
                            </label>

                            <input
                                type="number"
                                min="1"
                                step="0.01"
                                placeholder="Montant"
                                className="input input-bordered w-full"
                                value={sortieForm.data.montant}
                                onChange={e => sortieForm.setData('montant', e.target.value)}
                                required
                            />

                            {sortieForm.errors.montant && (
                                <FormError message={sortieForm.errors.montant} />
                            )}
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Raison
                                </span>
                            </label>

                            <input
                                type="text"
                                placeholder="Raison"
                                className="input input-bordered w-full"
                                value={sortieForm.data.raison}
                                onChange={e => sortieForm.setData('raison', e.target.value)}
                            />

                            {sortieForm.errors.raison && (
                                <FormError message={sortieForm.errors.raison} />
                            )}
                        </div>

                        <ModalActions
                            processing={sortieForm.processing}
                            onCancel={() => setOpenSortie(false)}
                        />
                    </form>
                </Modal>
            )}

            {openRessource && (
                <Modal title="Ajouter une ressource" onClose={() => setOpenRessource(false)}>
                    <form onSubmit={submitRessource} className="space-y-4">
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Nom de la ressource
                                </span>
                            </label>

                            <input
                                type="text"
                                placeholder="Ex : Droit annuel, cotisation, don..."
                                className="input input-bordered w-full"
                                value={ressourceForm.data.ressource}
                                onChange={e => ressourceForm.setData('ressource', e.target.value)}
                                required
                            />

                            {ressourceForm.errors.ressource && (
                                <FormError message={ressourceForm.errors.ressource} />
                            )}
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Prix
                                </span>
                            </label>

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Prix de la ressource"
                                className="input input-bordered w-full"
                                value={ressourceForm.data.prix}
                                onChange={e => ressourceForm.setData('prix', e.target.value)}
                                required
                            />

                            {ressourceForm.errors.prix && (
                                <FormError message={ressourceForm.errors.prix} />
                            )}
                        </div>

                        <ModalActions
                            processing={ressourceForm.processing}
                            onCancel={() => setOpenRessource(false)}
                        />
                    </form>
                </Modal>
            )}

        </Layout>
    );
}

function MiniStat({ label, value }) {
    return (
        <div className="rounded-2xl bg-white/15 px-5 py-4 backdrop-blur-md">
            <p className="text-sm text-white/70">
                {label}
            </p>

            <p className="text-lg font-black">
                {value}
            </p>
        </div>
    );
}

function SummaryCard({ title, value, icon, badgeClass }) {
    return (
        <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-sm opacity-60">
                            {title}
                        </p>

                        <h3 className="text-2xl font-black mt-1">
                            {value}
                        </h3>
                    </div>

                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${badgeClass}`}>
                        {icon}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Modal({ title, children, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="card bg-base-100 border border-base-300 shadow-2xl w-full max-w-md">
                <div className="card-body">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-black">
                            {title}
                        </h2>

                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-sm btn-circle btn-ghost"
                        >
                            ✕
                        </button>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}

function ModalActions({ processing, onCancel }) {
    return (
        <div className="flex justify-end gap-2 pt-2">
            <button
                type="button"
                onClick={onCancel}
                className="btn btn-ghost"
            >
                Annuler
            </button>

            <button
                type="submit"
                className="btn btn-primary"
                disabled={processing}
            >
                Enregistrer
            </button>
        </div>
    );
}

function FormError({ message }) {
    return (
        <span className="text-error text-sm block mt-1">
            {message}
        </span>
    );
}