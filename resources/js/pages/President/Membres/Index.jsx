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
    Home,
    GraduationCap,
    Building2,
    ShieldCheck,
    UserRound,
    X,
    AlertTriangle,
} from 'lucide-react';
import { Fragment, useMemo, useState } from 'react';

export default function Index({
    membres,
    filters = {},
    niveaux = [],
    logements = [],
    classes = [],
    etablissements = [],
    typesLogements = [],
}) {
    const [deleteId, setDeleteId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [search, setSearch] = useState(filters.search || '');

    const membersData = membres?.data || [];
    const totalMembers = membres?.total ?? membersData.length;
    const currentPage = membres?.current_page ?? 1;
    const lastPage = membres?.last_page ?? 1;

    const cleanParams = (params) => {
        return Object.fromEntries(
            Object.entries(params).filter(
                ([, value]) => value !== '' && value !== null && value !== undefined
            )
        );
    };

    const activeFiltersCount = useMemo(() => {
        const keys = [
            'niveau',
            'logement',
            'classe',
            'etablissement',
            'type_logement',
        ];

        let count = keys.filter((key) => filters?.[key]).length;

        if (search) {
            count += 1;
        }

        return count;
    }, [filters, search]);

    const paginationPages = useMemo(() => {
        return makePagination(currentPage, lastPage);
    }, [currentPage, lastPage]);

    const groupedMembers = useMemo(() => {
        return groupMembersByQuartierAndLogement(membersData);
    }, [membersData]);

    const updateFilter = (key, value) => {
        const { page, ...rest } = filters;

        router.get(
            route('president.membres.index'),
            cleanParams({
                ...rest,
                [key]: value,
                search,
            }),
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const updateSearch = (e) => {
        const value = e.target.value;
        setSearch(value);

        const { page, ...rest } = filters;

        router.get(
            route('president.membres.index'),
            cleanParams({
                ...rest,
                search: value,
            }),
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const resetFilters = () => {
        setSearch('');

        router.get(
            route('president.membres.index'),
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setDeleteId(null);
    };

    const deleteMember = () => {
        if (!deleteId) return;

        router.delete(route('president.membres.destroy', deleteId), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: closeModal,
        });
    };

    const goToPage = (page) => {
        if (page < 1 || page > lastPage || page === currentPage) return;

        router.get(
            route('president.membres.index'),
            cleanParams({
                ...filters,
                search,
                page,
            }),
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    return (
        <Layout
            header={
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <Users className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="text-2xl font-black tracking-tight">
                                    Gestion des membres
                                </h2>
                                <p className="text-sm text-base-content/60">
                                    Administration, recherche et suivi des membres
                                </p>
                            </div>
                        </div>
                    </div>

                    <Link
                        href={route('president.membres.register')}
                        className="btn btn-primary rounded-2xl shadow-lg shadow-primary/20"
                    >
                        <Plus className="h-4 w-4" />
                        Ajouter un membre
                    </Link>
                </div>
            }
        >
            <Head title="Membres" />

            <div className="space-y-6">
                <section className="overflow-hidden rounded-[2rem] border border-base-300 bg-base-100 shadow-sm">
                    <div className="relative bg-gradient-to-br from-primary via-secondary to-primary p-6 text-primary-content md:p-8">
                        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
                        <div className="absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

                        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div className="max-w-2xl">
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
                                    <ShieldCheck className="h-4 w-4" />
                                    Espace président
                                </div>

                                <h1 className="text-3xl font-black leading-tight md:text-5xl">
                                    Administration des membres
                                </h1>

                                <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 md:text-base">
                                    Consultez rapidement les membres par quartier et par logement.
                                    Les membres qui habitent dans le même logement sont regroupés
                                    pour une lecture plus claire.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:min-w-[430px]">
                                <StatCard
                                    label="Total affiché"
                                    value={totalMembers}
                                    helper="membre(s)"
                                />

                                <StatCard
                                    label="Page"
                                    value={`${currentPage}/${lastPage}`}
                                    helper="pagination"
                                />

                                <StatCard
                                    label="Filtres"
                                    value={activeFiltersCount}
                                    helper="actif(s)"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="card border border-base-300 bg-base-100 shadow-sm">
                    <div className="card-body p-5 md:p-6">
                        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                    <Filter className="h-5 w-5" />
                                </div>

                                <div>
                                    <h3 className="text-lg font-black">
                                        Recherche et filtres
                                    </h3>
                                    <p className="text-sm text-base-content/60">
                                        Affinez la liste selon les informations disponibles.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={resetFilters}
                                className="btn btn-ghost rounded-2xl"
                            >
                                <RefreshCw className="h-4 w-4" />
                                Réinitialiser
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
                            <div className="xl:col-span-4">
                                <label className="mb-2 block text-xs font-black uppercase tracking-wider text-base-content/50">
                                    Recherche
                                </label>

                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/40" />

                                    <input
                                        type="text"
                                        placeholder="Rechercher par nom..."
                                        value={search}
                                        onChange={updateSearch}
                                        className="input input-bordered w-full rounded-2xl pl-12 pr-12"
                                    />

                                    {search && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSearch('');
                                                updateSearch({ target: { value: '' } });
                                            }}
                                            className="btn btn-ghost btn-xs absolute right-3 top-1/2 -translate-y-1/2 rounded-full"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <FilterSelect
                                label="Niveau"
                                value={filters.niveau || ''}
                                onChange={(value) => updateFilter('niveau', value)}
                                options={niveaux}
                                optionLabel="name"
                                placeholder="Tous les niveaux"
                                className="xl:col-span-2"
                            />

                            <FilterSelect
                                label="Logement"
                                value={filters.logement || ''}
                                onChange={(value) => updateFilter('logement', value)}
                                options={logements}
                                optionLabel="name"
                                placeholder="Tous les logements"
                                className="xl:col-span-2"
                            />

                            <FilterSelect
                                label="Classe"
                                value={filters.classe || ''}
                                onChange={(value) => updateFilter('classe', value)}
                                options={classes}
                                optionLabel="name"
                                placeholder="Toutes les classes"
                                className="xl:col-span-2"
                            />

                            <FilterSelect
                                label="Type logement"
                                value={filters.type_logement || ''}
                                onChange={(value) => updateFilter('type_logement', value)}
                                options={typesLogements}
                                optionLabel="type"
                                placeholder="Tous les types"
                                className="xl:col-span-2"
                            />

                            <FilterSelect
                                label="Établissement"
                                value={filters.etablissement || ''}
                                onChange={(value) => updateFilter('etablissement', value)}
                                options={etablissements}
                                optionLabel="name"
                                placeholder="Tous les établissements"
                                className="xl:col-span-4"
                            />
                        </div>
                    </div>
                </section>

                <section className="card border border-base-300 bg-base-100 shadow-sm">
                    <div className="card-body p-0">
                        <div className="flex flex-col gap-4 border-b border-base-300 p-5 md:flex-row md:items-center md:justify-between md:p-6">
                            <div>
                                <h3 className="text-xl font-black">
                                    Liste des membres par logement
                                </h3>
                                <p className="text-sm text-base-content/60">
                                    {totalMembers} résultat(s) trouvé(s)
                                </p>
                            </div>

                            <div className="badge badge-primary badge-lg rounded-full">
                                Page {currentPage} sur {lastPage}
                            </div>
                        </div>

                        <div className="hidden overflow-x-auto lg:block">
                            <table className="table">
                                <thead>
                                    <tr className="border-base-300 bg-base-200/60 text-xs uppercase tracking-wider text-base-content/60">
                                        <th className="pl-6">Logement</th>
                                        <th>Membre</th>
                                        <th>Niveau</th>
                                        <th>Classe</th>
                                        <th>Établissement</th>
                                        <th className="pr-6 text-center">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {groupedMembers.map((quartierGroup) => (
                                        <Fragment key={quartierGroup.name}>
                                            <tr className="bg-primary/5">
                                                <td colSpan={6} className="px-6 py-3">
                                                    <div className="flex items-center justify-between gap-3">
                                                        <div className="flex items-center gap-2 font-black text-primary">
                                                            <Home className="h-4 w-4" />
                                                            Quartier : {quartierGroup.name}
                                                        </div>

                                                        <span className="badge badge-primary badge-outline rounded-full">
                                                            {quartierGroup.total} membre(s)
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>

                                            {quartierGroup.logements.map((logementGroup) =>
                                                logementGroup.members.map((user, index) => (
                                                    <tr
                                                        key={user.id}
                                                        className="border-base-200 hover:bg-base-200/60"
                                                    >
                                                        {index === 0 && (
                                                            <td
                                                                rowSpan={logementGroup.members.length}
                                                                className="w-64 align-top border-r border-base-200 bg-base-200/40 pl-6"
                                                            >
                                                                <div className="py-3">
                                                                    <div className="flex items-start gap-3">
                                                                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                                                            <Home className="h-5 w-5" />
                                                                        </div>

                                                                        <div>
                                                                            <p className="font-black">
                                                                                {logementGroup.name}
                                                                            </p>

                                                                            <p className="mt-1 text-xs text-base-content/60">
                                                                                {logementGroup.members.length} membre(s)
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        )}

                                                        <td>
                                                            <div className="flex items-center gap-3">
                                                                <MemberAvatar user={user} />

                                                                <div>
                                                                    <p className="font-black">
                                                                        {user.name}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <ValueWithIcon
                                                                icon={GraduationCap}
                                                                value={user.niveau?.name}
                                                            />
                                                        </td>

                                                        <td>
                                                            <ValueWithIcon
                                                                icon={UserRound}
                                                                value={user.classe?.name}
                                                            />
                                                        </td>

                                                        <td>
                                                            <ValueWithIcon
                                                                icon={Building2}
                                                                value={user.etablissement?.name}
                                                            />
                                                        </td>

                                                        <td className="pr-6 text-center">
                                                            <button
                                                                type="button"
                                                                onClick={() => confirmDelete(user.id)}
                                                                className="btn btn-error btn-sm rounded-xl text-error-content"
                                                                title="Supprimer ce membre"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="grid grid-cols-1 gap-5 p-5 lg:hidden">
                            {groupedMembers.map((quartierGroup) => (
                                <div key={quartierGroup.name} className="space-y-4">
                                    <div className="rounded-3xl bg-primary/10 p-4 text-primary">
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-2 font-black">
                                                <Home className="h-4 w-4" />
                                                Quartier : {quartierGroup.name}
                                            </div>

                                            <span className="badge badge-primary rounded-full">
                                                {quartierGroup.total}
                                            </span>
                                        </div>
                                    </div>

                                    {quartierGroup.logements.map((logementGroup) => (
                                        <div
                                            key={logementGroup.name}
                                            className="rounded-[2rem] border border-base-300 bg-base-100 p-4 shadow-sm"
                                        >
                                            <div className="mb-4 flex items-center justify-between gap-3 rounded-3xl bg-base-200/70 p-4">
                                                <div>
                                                    <p className="text-xs font-bold uppercase tracking-wider text-base-content/50">
                                                        Logement
                                                    </p>

                                                    <h4 className="mt-1 font-black">
                                                        {logementGroup.name}
                                                    </h4>
                                                </div>

                                                <span className="badge badge-outline rounded-full">
                                                    {logementGroup.members.length} membre(s)
                                                </span>
                                            </div>

                                            <div className="space-y-3">
                                                {logementGroup.members.map((user) => (
                                                    <article
                                                        key={user.id}
                                                        className="rounded-3xl border border-base-300 bg-base-100 p-4"
                                                    >
                                                        <div className="flex items-start justify-between gap-3">
                                                            <div className="flex items-start gap-3">
                                                                <MemberAvatar user={user} />

                                                                <div>
                                                                    <h4 className="font-black leading-tight">
                                                                        {user.name}
                                                                    </h4>
                                                                </div>
                                                            </div>

                                                            <button
                                                                type="button"
                                                                onClick={() => confirmDelete(user.id)}
                                                                className="btn btn-error btn-sm rounded-xl text-error-content"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </div>

                                                        <div className="divider my-4" />

                                                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                                            <Info label="Niveau" value={user.niveau?.name} />
                                                            <Info label="Classe" value={user.classe?.name} />
                                                            <Info
                                                                label="Établissement"
                                                                value={user.etablissement?.name}
                                                            />
                                                        </div>
                                                    </article>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        {membersData.length === 0 && (
                            <div className="px-6 py-16 text-center">
                                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-base-200 text-base-content/40">
                                    <Users className="h-10 w-10" />
                                </div>

                                <h3 className="text-xl font-black">
                                    Aucun membre trouvé
                                </h3>

                                <p className="mx-auto mt-2 max-w-md text-sm text-base-content/60">
                                    Aucun résultat ne correspond aux critères sélectionnés.
                                    Essayez de modifier les filtres ou de réinitialiser la recherche.
                                </p>

                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="btn btn-primary mt-5 rounded-2xl"
                                >
                                    <RefreshCw className="h-4 w-4" />
                                    Réinitialiser les filtres
                                </button>
                            </div>
                        )}

                        {membersData.length > 0 && (
                            <div className="flex flex-col gap-4 border-t border-base-300 p-5 md:flex-row md:items-center md:justify-between md:p-6">
                                <p className="text-sm text-base-content/60">
                                    Affichage de {membersData.length} membre(s) sur{' '}
                                    {totalMembers}
                                </p>

                                <div className="join justify-center">
                                    <button
                                        type="button"
                                        className="btn join-item btn-sm"
                                        disabled={!membres?.prev_page_url}
                                        onClick={() => goToPage(currentPage - 1)}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </button>

                                    {paginationPages.map((page, index) =>
                                        page === '...' ? (
                                            <button
                                                key={`dots-${index}`}
                                                type="button"
                                                className="btn join-item btn-sm btn-disabled"
                                            >
                                                ...
                                            </button>
                                        ) : (
                                            <button
                                                key={page}
                                                type="button"
                                                onClick={() => goToPage(page)}
                                                className={`btn join-item btn-sm ${
                                                    currentPage === page
                                                        ? 'btn-primary'
                                                        : 'btn-ghost'
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        )
                                    )}

                                    <button
                                        type="button"
                                        className="btn join-item btn-sm"
                                        disabled={!membres?.next_page_url}
                                        onClick={() => goToPage(currentPage + 1)}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>

            {modalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box rounded-3xl">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-error/10 text-error">
                                <AlertTriangle className="h-6 w-6" />
                            </div>

                            <div>
                                <h3 className="text-xl font-black">
                                    Confirmer la suppression
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-base-content/70">
                                    Cette action supprimera définitivement ce membre.
                                    Voulez-vous continuer ?
                                </p>
                            </div>
                        </div>

                        <div className="modal-action">
                            <button
                                type="button"
                                className="btn btn-ghost rounded-2xl"
                                onClick={closeModal}
                            >
                                Annuler
                            </button>

                            <button
                                type="button"
                                className="btn btn-error rounded-2xl text-error-content"
                                onClick={deleteMember}
                            >
                                <Trash2 className="h-4 w-4" />
                                Supprimer
                            </button>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="modal-backdrop"
                        onClick={closeModal}
                    >
                        Fermer
                    </button>
                </div>
            )}
        </Layout>
    );
}

function StatCard({ label, value, helper }) {
    return (
        <div className="rounded-3xl bg-white/15 p-4 backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-wider text-white/70">
                {label}
            </p>
            <p className="mt-2 text-3xl font-black">{value}</p>
            <p className="mt-1 text-xs text-white/70">{helper}</p>
        </div>
    );
}

function FilterSelect({
    label,
    value,
    onChange,
    options = [],
    optionLabel = 'name',
    placeholder,
    className = '',
}) {
    return (
        <div className={className}>
            <label className="mb-2 block text-xs font-black uppercase tracking-wider text-base-content/50">
                {label}
            </label>

            <select
                className="select select-bordered w-full rounded-2xl"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">{placeholder}</option>

                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option[optionLabel]}
                    </option>
                ))}
            </select>
        </div>
    );
}

function MemberAvatar({ user }) {
    const image =
        user.profile_photo_url ||
        user.photo_url ||
        user.avatar_url ||
        user.image_url ||
        null;

    const initial = user.name?.charAt(0)?.toUpperCase() || 'M';

    if (image) {
        return (
            <div className="avatar shrink-0">
                <div className="h-11 w-11 rounded-2xl ring-1 ring-base-300">
                    <img src={image} alt={user.name || 'Membre'} />
                </div>
            </div>
        );
    }

    return (
        <div className="avatar placeholder shrink-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/10">
                <span className="text-sm font-black leading-none">
                    {initial}
                </span>
            </div>
        </div>
    );
}

function ValueWithIcon({ icon: Icon, value }) {
    return (
        <div className="flex items-center gap-2 text-sm">
            <Icon className="h-4 w-4 text-base-content/40" />
            <span className={value ? 'font-semibold' : 'text-base-content/40'}>
                {value || '-'}
            </span>
        </div>
    );
}

function Info({ label, value }) {
    return (
        <div className="rounded-2xl bg-base-200/70 p-3">
            <p className="text-xs font-bold uppercase tracking-wider text-base-content/40">
                {label}
            </p>

            <p className="mt-1 font-semibold">
                {value || '-'}
            </p>
        </div>
    );
}

function getQuartierName(user) {
    return (
        user.logement?.quartier?.name ||
        user.logement?.quartier?.nom ||
        user.logement?.quartier ||
        user.logement?.type_logement?.type ||
        user.logement?.type_logement?.name ||
        user.logement?.typeLogement?.type ||
        user.logement?.typeLogement?.name ||
        user.logement?.type?.type ||
        user.logement?.type?.name ||
        user.logement?.type ||
        'Sans quartier'
    );
}

function getLogementName(user) {
    return (
        user.logement?.name ||
        user.logement?.nom ||
        user.logement?.numero ||
        user.logement?.adresse ||
        'Non attribué'
    );
}

function groupMembersByQuartierAndLogement(members = []) {
    const quartierMap = new Map();

    members.forEach((member) => {
        const quartierName = getQuartierName(member);
        const logementName = getLogementName(member);

        if (!quartierMap.has(quartierName)) {
            quartierMap.set(quartierName, {
                name: quartierName,
                total: 0,
                logements: new Map(),
            });
        }

        const quartierGroup = quartierMap.get(quartierName);

        if (!quartierGroup.logements.has(logementName)) {
            quartierGroup.logements.set(logementName, {
                name: logementName,
                members: [],
            });
        }

        quartierGroup.logements.get(logementName).members.push(member);
        quartierGroup.total += 1;
    });

    return Array.from(quartierMap.values())
        .map((quartierGroup) => ({
            ...quartierGroup,
            logements: Array.from(quartierGroup.logements.values()).sort((a, b) =>
                a.name.localeCompare(b.name)
            ),
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
}

function makePagination(currentPage, lastPage) {
    if (lastPage <= 7) {
        return Array.from({ length: lastPage }, (_, index) => index + 1);
    }

    const pages = [];
    const delta = 1;

    for (let page = 1; page <= lastPage; page++) {
        const isFirst = page === 1;
        const isLast = page === lastPage;
        const isNearCurrent =
            page >= currentPage - delta && page <= currentPage + delta;

        if (isFirst || isLast || isNearCurrent) {
            pages.push(page);
        }
    }

    const result = [];
    let previousPage = null;

    pages.forEach((page) => {
        if (previousPage !== null) {
            if (page - previousPage === 2) {
                result.push(previousPage + 1);
            } else if (page - previousPage > 2) {
                result.push('...');
            }
        }

        result.push(page);
        previousPage = page;
    });

    return result;
}