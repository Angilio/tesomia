import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';

import {
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronRight,
    X,
    Plus,
    Home,
    Building2,
    Filter,
} from 'lucide-react';

import Layout from '@/Layouts/Layout';

export default function Index({ logements }) {
    const [filterType, setFilterType] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [toDeleteId, setToDeleteId] = useState(null);

    const itemsPerPage = 5;
    const types = ['PV', 'PJ', 'Bloc', 'BM', 'BR'];

    const handleDelete = (id) => {
        router.delete(`/logements/${id}`);
        setModalOpen(false);
        setToDeleteId(null);
    };

    const confirmDelete = (id) => {
        setToDeleteId(id);
        setModalOpen(true);
    };

    const filtered = logements.filter((l) =>
        filterType === 'all' ? true : l.type_logement?.type === filterType
    );

    const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

    const handleFilterChange = (type) => {
        setFilterType(type);
        setCurrentPage(1);
    };

    return (
        <Layout
            header={
                <div>
                    <h2 className="text-2xl font-black">
                        Logements
                    </h2>
                    <p className="text-sm opacity-60">
                        Gestion des logements étudiants
                    </p>
                </div>
            }
        >
            <Head title="Les logements" />

            <div className="space-y-6">

                <div className="rounded-3xl bg-gradient-to-r from-primary to-secondary text-primary-content p-6 md:p-8 shadow-xl">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 mb-4">
                                <Building2 className="w-4 h-4" />
                                <span className="text-sm font-semibold">
                                    Commission logement
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-black">
                                Liste des logements
                            </h1>

                            <p className="mt-2 text-white/80">
                                Consultez, filtrez, ajoutez ou modifiez les logements disponibles.
                            </p>
                        </div>

                        <div className="stats bg-white/15 text-white shadow-none">
                            <div className="stat">
                                <div className="stat-title text-white/70">
                                    Total logements
                                </div>
                                <div className="stat-value">
                                    {logements.length}
                                </div>
                                <div className="stat-desc text-white/70">
                                    enregistrés
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
                                        onClick={() => handleFilterChange('all')}
                                        className={`btn rounded-full ${
                                            filterType === 'all'
                                                ? 'btn-primary'
                                                : 'btn-ghost'
                                        }`}
                                    >
                                        Tous
                                    </button>

                                    {types.map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => handleFilterChange(type)}
                                            className={`btn rounded-full ${
                                                filterType === type
                                                    ? 'btn-primary'
                                                    : 'btn-ghost'
                                            }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Link
                                href="/logements/create"
                                className="btn btn-primary rounded-full"
                            >
                                <Plus className="w-4 h-4" />
                                Ajouter un logement
                            </Link>

                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 border border-base-300 shadow-sm">
                    <div className="card-body">

                        <div className="flex items-center justify-between gap-4 mb-4">
                            <div>
                                <h3 className="text-xl font-black">
                                    Logements enregistrés
                                </h3>
                                <p className="text-sm opacity-60">
                                    {filtered.length} logement{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
                                </p>
                            </div>

                            <Home className="w-6 h-6 opacity-40" />
                        </div>

                        {currentItems.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="table table-zebra">
                                    <thead>
                                        <tr>
                                            <th>Nom</th>
                                            <th className="text-center">Nombre de places</th>
                                            <th className="text-center">Type</th>
                                            <th className="text-center">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {currentItems.map((logement) => (
                                            <tr key={logement.id}>
                                                <td className="font-semibold">
                                                    {logement.name}
                                                </td>

                                                <td className="text-center">
                                                    <span className="badge badge-outline">
                                                        {logement.nbrPlace} place{logement.nbrPlace > 1 ? 's' : ''}
                                                    </span>
                                                </td>

                                                <td className="text-center">
                                                    <span className="badge badge-primary badge-outline">
                                                        {logement.type_logement?.type}
                                                    </span>
                                                </td>

                                                <td>
                                                    <div className="flex gap-2 justify-center">
                                                        <Link
                                                            href={`/logements/${logement.id}/edit`}
                                                            className="btn btn-primary btn-sm btn-circle"
                                                            title="Modifier"
                                                        >
                                                            <Pencil size={16} />
                                                        </Link>

                                                        <button
                                                            onClick={() => confirmDelete(logement.id)}
                                                            className="btn btn-error btn-sm btn-circle"
                                                            title="Supprimer"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <Home className="w-16 h-16 mx-auto opacity-30 mb-4" />

                                <h3 className="text-xl font-black">
                                    Aucun logement trouvé
                                </h3>

                                <p className="opacity-60 mt-1">
                                    Aucun logement ne correspond au filtre sélectionné.
                                </p>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
                            <span className="text-sm opacity-60">
                                Page {currentPage} sur {totalPages}
                            </span>

                            <div className="join">
                                <button
                                    className="join-item btn btn-sm"
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.max(prev - 1, 1)
                                        )
                                    }
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft size={16} />
                                </button>

                                <button className="join-item btn btn-sm btn-ghost">
                                    {currentPage}
                                </button>

                                <button
                                    className="join-item btn btn-sm"
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.min(prev + 1, totalPages)
                                        )
                                    }
                                    disabled={currentPage === totalPages}
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                {modalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                        <div className="card bg-base-100 border border-base-300 shadow-2xl w-full max-w-md">
                            <div className="card-body">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-black">
                                        Confirmer la suppression
                                    </h3>

                                    <button
                                        onClick={() => setModalOpen(false)}
                                        className="btn btn-sm btn-circle btn-ghost"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                <p className="opacity-70">
                                    Voulez-vous vraiment supprimer ce logement ?
                                    Cette action est irréversible.
                                </p>

                                <div className="flex justify-end gap-2 mt-6">
                                    <button
                                        onClick={() => setModalOpen(false)}
                                        className="btn btn-ghost"
                                    >
                                        Annuler
                                    </button>

                                    <button
                                        onClick={() => handleDelete(toDeleteId)}
                                        className="btn btn-error"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </Layout>
    );
}