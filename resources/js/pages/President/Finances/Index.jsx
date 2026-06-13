import Layout from '@/Layouts/Layout';
import { Head, router, useForm, Link } from '@inertiajs/react';
import { Trash2, Pencil, BarChart3, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { useState, useMemo } from 'react';

export default function Index({ entrees, sorties }) {
    const [editItem, setEditItem] = useState(null);
    const [type, setType] = useState(null);
    const [deleteItemState, setDeleteItemState] = useState(null);
    const [filter, setFilter] = useState('toutes');
    const [page, setPage] = useState(1);

    const perPage = 10;

    const form = useForm({
        montant: '',
        raison: ''
    });

    const openEdit = (item, t) => {
        setEditItem(item);
        setType(t);

        form.setData({
            montant: item.montant,
            raison: item.raison || ''
        });
    };

    const submitUpdate = (e) => {
        e.preventDefault();

        const routeName =
            type === 'entree'
                ? 'president.finances.entrees.update'
                : 'president.finances.sorties.update';

        form.put(route(routeName, editItem.id), {
            onSuccess: () => setEditItem(null)
        });
    };

    const confirmDelete = (item, t) => {
        setDeleteItemState({ item, type: t });
    };

    const deleteItem = () => {
        router.delete(
            route('president.finances.destroy', {
                type: deleteItemState.type,
                id: deleteItemState.item.id
            }),
            {
                onSuccess: () => setDeleteItemState(null)
            }
        );
    };

    const operations = useMemo(() => {
        const all = [
            ...entrees.map(e => ({ ...e, type: 'entree' })),
            ...sorties.map(s => ({ ...s, type: 'sortie' })),
        ];

        return all.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }, [entrees, sorties]);

    const filtered = operations.filter(op => {
        if (filter === 'toutes') return true;
        return op.type === filter;
    });

    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    const totalEntrees = entrees.reduce((sum, e) => sum + Number(e.montant), 0);
    const totalSorties = sorties.reduce((sum, s) => sum + Number(s.montant), 0);
    const solde = totalEntrees - totalSorties;

    return (
        <Layout
            header={
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-extrabold">
                            Supervision finances
                        </h2>
                        <p className="text-sm opacity-70">
                            Suivi des entrées, sorties et opérations financières
                        </p>
                    </div>

                    <Link
                        href={route('tresorier.dashboard')}
                        className="btn btn-primary rounded-2xl shadow-lg gap-2"
                    >
                        <BarChart3 size={18} />
                        Voir évolution financière
                    </Link>
                </div>
            }
        >
            <Head title="Finances Président" />

            <div className="p-4 md:p-8 space-y-8">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="card bg-base-100 shadow-xl border border-base-300">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <span className="text-sm opacity-70">Entrées</span>
                                <ArrowUpCircle className="text-success" />
                            </div>
                            <h3 className="text-2xl font-black text-success">
                                + {totalEntrees.toLocaleString('fr-FR')} Ar
                            </h3>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl border border-base-300">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <span className="text-sm opacity-70">Sorties</span>
                                <ArrowDownCircle className="text-error" />
                            </div>
                            <h3 className="text-2xl font-black text-error">
                                - {totalSorties.toLocaleString('fr-FR')} Ar
                            </h3>
                        </div>
                    </div>

                    <div className="card bg-gradient-to-br from-primary to-secondary text-primary-content shadow-xl">
                        <div className="card-body">
                            <span className="text-sm opacity-90">Solde actuel</span>
                            <h3 className="text-3xl font-black">
                                {solde.toLocaleString('fr-FR')} Ar
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-2xl border border-base-300 rounded-3xl">
                    <div className="card-body space-y-6">

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-bold">
                                    Liste des opérations
                                </h3>
                                <p className="text-sm opacity-70">
                                    {filtered.length} opération(s) trouvée(s)
                                </p>
                            </div>

                            <div className="join">
                                {['toutes', 'entree', 'sortie'].map(item => (
                                    <button
                                        key={item}
                                        className={`btn join-item ${
                                            filter === item ? 'btn-primary' : 'btn-ghost'
                                        }`}
                                        onClick={() => {
                                            setFilter(item);
                                            setPage(1);
                                        }}
                                    >
                                        {item === 'toutes'
                                            ? 'Toutes'
                                            : item === 'entree'
                                                ? 'Entrées'
                                                : 'Sorties'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            {paginated.map(op => (
                                <div
                                    key={`${op.type}-${op.id}`}
                                    className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 rounded-2xl bg-base-200/60 border border-base-300 hover:shadow-lg transition-all"
                                >
                                    <div className="flex items-start gap-4">
                                        <div
                                            className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                                                op.type === 'entree'
                                                    ? 'bg-success/10 text-success'
                                                    : 'bg-error/10 text-error'
                                            }`}
                                        >
                                            {op.type === 'entree'
                                                ? <ArrowUpCircle />
                                                : <ArrowDownCircle />}
                                        </div>

                                        <div>
                                            <div className="font-bold">
                                                {op.type === 'entree'
                                                    ? op.user?.name || 'Entrée'
                                                    : op.raison || 'Sortie'}
                                            </div>

                                            <div className="text-xs opacity-60">
                                                {new Date(op.created_at).toLocaleString('fr-FR')}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between md:justify-end gap-4">
                                        <span
                                            className={`font-black text-lg ${
                                                op.type === 'entree'
                                                    ? 'text-success'
                                                    : 'text-error'
                                            }`}
                                        >
                                            {op.type === 'entree' ? '+' : '-'} {Number(op.montant).toLocaleString('fr-FR')} Ar
                                        </span>

                                        <button
                                            onClick={() => openEdit(op, op.type)}
                                            className="btn btn-sm btn-warning btn-outline rounded-xl"
                                        >
                                            <Pencil size={16} />
                                        </button>

                                        <button
                                            onClick={() => confirmDelete(op, op.type)}
                                            className="btn btn-sm btn-error btn-outline rounded-xl"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {paginated.length === 0 && (
                            <div className="text-center py-12 opacity-70">
                                Aucune opération trouvée.
                            </div>
                        )}

                        <div className="flex justify-center flex-wrap gap-2 pt-4">
                            {Array.from(
                                { length: Math.ceil(filtered.length / perPage) },
                                (_, i) => (
                                    <button
                                        key={i}
                                        className={`btn btn-sm rounded-xl ${
                                            page === i + 1 ? 'btn-primary' : 'btn-ghost'
                                        }`}
                                        onClick={() => setPage(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                )
                            )}
                        </div>

                    </div>
                </div>

            </div>

            {editItem && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <form
                        onSubmit={submitUpdate}
                        className="bg-base-100 text-base-content p-6 rounded-3xl w-full max-w-md space-y-4 shadow-2xl border border-base-300"
                    >
                        <h2 className="font-black text-2xl">Modifier l’opération</h2>

                        <input
                            className="input input-bordered w-full rounded-2xl"
                            value={form.data.montant}
                            onChange={e => form.setData('montant', e.target.value)}
                            placeholder="Montant"
                        />

                        <input
                            className="input input-bordered w-full rounded-2xl"
                            value={form.data.raison}
                            onChange={e => form.setData('raison', e.target.value)}
                            placeholder="Raison"
                        />

                        <div className="flex justify-end gap-2 pt-3">
                            <button
                                type="button"
                                onClick={() => setEditItem(null)}
                                className="btn btn-ghost rounded-xl"
                            >
                                Annuler
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary rounded-xl"
                            >
                                Sauvegarder
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {deleteItemState && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-base-100 text-base-content p-6 rounded-3xl w-full max-w-md space-y-5 shadow-2xl border border-base-300">
                        <h2 className="font-black text-2xl text-error">
                            Confirmation
                        </h2>

                        <p className="opacity-80">
                            Voulez-vous vraiment supprimer cette opération ?
                        </p>

                        <div className="flex justify-end gap-2">
                            <button
                                className="btn btn-ghost rounded-xl"
                                onClick={() => setDeleteItemState(null)}
                            >
                                Annuler
                            </button>

                            <button
                                className="btn btn-error rounded-xl"
                                onClick={deleteItem}
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </Layout>
    );
}