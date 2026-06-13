import Layout from '@/Layouts/Layout';
import { Head, router, Link } from '@inertiajs/react';
import {
    Trash2,
    RefreshCw,
    ChevronLeft,
    ChevronRight,
    Plus,
    Search,
    Users,
    Filter,
} from 'lucide-react';
import { useState } from 'react';

export default function Index({
    membres,
    filters,
    niveaux,
    logements,
    classes,
    etablissements,
    roles,
    typesLogements
}) {
    const [deleteId, setDeleteId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [search, setSearch] = useState(filters.search || '');

    const updateFilter = (key, value) => {
        router.get(route('president.membres.index'), {
            ...filters,
            [key]: value,
            search,
        }, { preserveState: true, replace: true });
    };

    const updateSearch = (e) => {
        const value = e.target.value;
        setSearch(value);

        router.get(route('president.membres.index'), {
            ...filters,
            search: value,
        }, { preserveState: true, replace: true });
    };

    const resetFilters = () => {
        setSearch('');
        router.get(route('president.membres.index'), {}, {
            preserveState: true,
            replace: true,
        });
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
        setModalOpen(true);
    };

    const deleteMember = () => {
        if (!deleteId) return;

        router.delete(route('president.membres.destroy', deleteId), {
            preserveState: true,
            onSuccess: () => {
                setModalOpen(false);
                setDeleteId(null);
            },
        });
    };

    const goToPage = (page) => {
        router.get(route('president.membres.index'), {
            ...filters,
            search,
            page,
        }, { preserveState: true, replace: true });
    };

    return (
        <Layout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black">
                            Gestion des membres
                        </h2>
                        <p className="text-sm opacity-60">
                            Liste, recherche et filtrage des membres
                        </p>
                    </div>

                    <Link
                        href={route('president.membres.register')}
                        className="btn btn-primary rounded-full"
                    >
                        <Plus className="w-4 h-4" />
                        Ajouter un membre
                    </Link>
                </div>
            }
        >
            <Head title="Membres" />

            <div className="space-y-6">

                <div className="rounded-3xl bg-gradient-to-r from-primary to-secondary text-primary-content p-6 md:p-8 shadow-xl">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 mb-4">
                                <Users className="w-4 h-4" />
                                <span className="text-sm font-semibold">
                                    Espace membres
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-black">
                                Administration des membres
                            </h1>

                            <p className="mt-2 text-white/80">
                                Recherchez, filtrez et gérez les membres enregistrés.
                            </p>
                        </div>

                        <div className="stats bg-white/15 text-white shadow-none">
                            <div className="stat">
                                <div className="stat-title text-white/70">
                                    Membres affichés
                                </div>
                                <div className="stat-value">
                                    {membres.total ?? membres.data.length}
                                </div>
                                <div className="stat-desc text-white/70">
                                    résultat(s)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 border border-base-300 shadow-sm">
                    <div className="card-body">
                        <div className="flex items-center gap-2 mb-4">
                            <Filter className="w-5 h-5 text-primary" />
                            <h3 className="font-black">Filtres</h3>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-6 gap-3">
                            <div className="relative lg:col-span-2">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
                                <input
                                    type="text"
                                    placeholder="Rechercher par nom..."
                                    value={search}
                                    onChange={updateSearch}
                                    className="input input-bordered w-full rounded-2xl pl-12"
                                />
                            </div>

                            <select className="select select-bordered rounded-2xl" onChange={(e) => updateFilter('niveau', e.target.value)} value={filters.niveau || ''}>
                                <option value="">Tous les niveaux</option>
                                {niveaux.map((n) => <option key={n.id} value={n.id}>{n.name}</option>)}
                            </select>

                            <select className="select select-bordered rounded-2xl" onChange={(e) => updateFilter('logement', e.target.value)} value={filters.logement || ''}>
                                <option value="">Tous les logements</option>
                                {logements.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
                            </select>

                            <select className="select select-bordered rounded-2xl" onChange={(e) => updateFilter('classe', e.target.value)} value={filters.classe || ''}>
                                <option value="">Toutes les classes</option>
                                {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>

                            <button onClick={resetFilters} className="btn btn-ghost rounded-2xl">
                                <RefreshCw size={18} />
                                Réinitialiser
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mt-3">
                            <select className="select select-bordered rounded-2xl" onChange={(e) => updateFilter('etablissement', e.target.value)} value={filters.etablissement || ''}>
                                <option value="">Tous les établissements</option>
                                {etablissements.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
                            </select>

                            <select className="select select-bordered rounded-2xl" onChange={(e) => updateFilter('type_logement', e.target.value)} value={filters.type_logement || ''}>
                                <option value="">Tous les types</option>
                                {typesLogements.map((t) => <option key={t.id} value={t.id}>{t.type}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 border border-base-300 shadow-sm">
                    <div className="card-body">
                        <div className="flex items-center justify-between gap-4 mb-4">
                            <div>
                                <h3 className="text-xl font-black">
                                    Liste des membres
                                </h3>
                                <p className="text-sm opacity-60">
                                    Page {membres.current_page} sur {membres.last_page}
                                </p>
                            </div>
                        </div>

                        <div className="hidden lg:block overflow-x-auto">
                            <table className="table table-zebra">
                                <thead>
                                    <tr>
                                        <th>Nom</th>
                                        <th>Email</th>
                                        <th>Niveau</th>
                                        <th>Logement</th>
                                        <th>Classe</th>
                                        <th>Établissement</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {membres.data.map((user) => (
                                        <tr key={user.id}>
                                            <td className="font-semibold">{user.name}</td>
                                            <td className="opacity-70">{user.email}</td>
                                            <td>{user.niveau?.name || '-'}</td>
                                            <td>{user.logement?.name || '-'}</td>
                                            <td>{user.classe?.name || '-'}</td>
                                            <td>{user.etablissement?.name || '-'}</td>
                                            <td className="text-center">
                                                <button
                                                    onClick={() => confirmDelete(user.id)}
                                                    className="btn btn-sm btn-circle btn-error"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="grid grid-cols-1 gap-4 lg:hidden">
                            {membres.data.map((user) => (
                                <div key={user.id} className="rounded-3xl border border-base-300 bg-base-200 p-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h4 className="font-black">{user.name}</h4>
                                            <p className="text-sm opacity-60 break-all">{user.email}</p>
                                        </div>

                                        <button
                                            onClick={() => confirmDelete(user.id)}
                                            className="btn btn-sm btn-circle btn-error"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    <div className="divider my-3" />

                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <Info label="Niveau" value={user.niveau?.name} />
                                        <Info label="Logement" value={user.logement?.name} />
                                        <Info label="Classe" value={user.classe?.name} />
                                        <Info label="Établissement" value={user.etablissement?.name} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {membres.data.length === 0 && (
                            <div className="text-center py-16">
                                <Users className="w-16 h-16 mx-auto opacity-30 mb-4" />
                                <h3 className="text-xl font-black">Aucun membre trouvé</h3>
                                <p className="opacity-60">Aucun résultat ne correspond aux filtres.</p>
                            </div>
                        )}

                        <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
                            <button
                                className="btn btn-sm"
                                disabled={!membres.prev_page_url}
                                onClick={() => goToPage(membres.current_page - 1)}
                            >
                                <ChevronLeft size={16} />
                            </button>

                            {Array.from({ length: membres.last_page }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goToPage(i + 1)}
                                    className={`btn btn-sm ${
                                        membres.current_page === i + 1
                                            ? 'btn-primary'
                                            : 'btn-ghost'
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                className="btn btn-sm"
                                disabled={!membres.next_page_url}
                                onClick={() => goToPage(membres.current_page + 1)}
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {modalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-black text-xl">Confirmation</h3>
                        <p className="py-4 opacity-70">
                            Êtes-vous sûr de vouloir supprimer ce membre ?
                        </p>

                        <div className="modal-action">
                            <button className="btn btn-error" onClick={deleteMember}>
                                Supprimer
                            </button>

                            <button className="btn btn-ghost" onClick={() => setModalOpen(false)}>
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </Layout>
    );
}

function Info({ label, value }) {
    return (
        <div>
            <p className="opacity-50">{label}</p>
            <p className="font-semibold">{value || '-'}</p>
        </div>
    );
}