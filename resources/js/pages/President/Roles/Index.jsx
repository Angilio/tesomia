import React, { useEffect, useMemo, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import {
    AlertCircle,
    CheckCircle2,
    Crown,
    Mail,
    Save,
    Search,
    ShieldCheck,
    UserCog,
    Users,
    RefreshCw,
    ChevronLeft,
    ChevronRight,
    Filter,
} from 'lucide-react';

export default function Index({
    users = {},
    roles = [],
    filters = {},
    stats = {},
}) {
    const userList = users.data || [];

    const [search, setSearch] = useState(filters.search || '');
    const [roleFilter, setRoleFilter] = useState(filters.role || '');
    const [perPage, setPerPage] = useState(filters.per_page || 15);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRoles, setSelectedRoles] = useState([]);

    useEffect(() => {
        const delay = setTimeout(() => {
            router.get(
                route('president.roles.index'),
                {
                    search,
                    role: roleFilter,
                    per_page: perPage,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                }
            );
        }, 400);

        return () => clearTimeout(delay);
    }, [search, roleFilter, perPage]);

    const openUser = (user) => {
        setSelectedUser(user);
        setSelectedRoles(user.roles || []);
    };

    const closePanel = () => {
        setSelectedUser(null);
        setSelectedRoles([]);
    };

    const toggleRole = (roleName) => {
        setSelectedRoles((prev) =>
            prev.includes(roleName)
                ? prev.filter((role) => role !== roleName)
                : [...prev, roleName]
        );
    };

    const hasChanges = useMemo(() => {
        if (!selectedUser) {
            return false;
        }

        return !sameRoles(selectedRoles, selectedUser.roles || []);
    }, [selectedRoles, selectedUser]);

    const resetRoles = () => {
        if (!selectedUser) {
            return;
        }

        setSelectedRoles(selectedUser.roles || []);
    };

    const saveRoles = () => {
        if (!selectedUser) {
            return;
        }

        if (selectedRoles.length === 0) {
            alert('Veuillez sélectionner au moins un rôle.');
            return;
        }

        router.put(
            route('president.roles.update', selectedUser.id),
            {
                roles: selectedRoles,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    closePanel();
                },
            }
        );
    };

    const getInitial = (name) => {
        return name?.charAt(0)?.toUpperCase() || 'U';
    };

    return (
        <Layout
            header={
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <UserCog className="h-6 w-6" />
                    </div>

                    <div>
                        <h2 className="text-2xl font-black tracking-tight">
                            Gestion des rôles
                        </h2>
                        <p className="text-sm text-base-content/60">
                            Administration professionnelle des accès utilisateurs
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Gestion des rôles" />

            <div className="space-y-6">
                <section className="overflow-hidden rounded-[2rem] border border-base-300 bg-base-100 shadow-sm">
                    <div className="relative bg-gradient-to-br from-slate-950 via-primary to-secondary p-6 text-white md:p-8">
                        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                        <div className="absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

                        <div className="relative gap-6 xl:flex-row xl:items-center xl:justify-between">
                            <div className="max-w-3xl">
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
                                    <ShieldCheck className="h-4 w-4" />
                                    Espace Président
                                </div>

                                <h1 className="text-3xl inline-flex font-black leading-tight md:text-5xl">
                                    Centre de contrôle des rôles
                                </h1>

                                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80 md:text-base">
                                    Recherchez un utilisateur, filtrez par rôle, puis modifiez ses accès.
                                    La page charge uniquement les utilisateurs nécessaires.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 xl:min-w-[620px]">
                                <StatCard
                                    label="Utilisateurs"
                                    value={stats.total_users || 0}
                                    helper="total"
                                    icon={<Users className="h-5 w-5" />}
                                />

                                <StatCard
                                    label="Présidents"
                                    value={stats.total_presidents || 0}
                                    helper="actifs"
                                    icon={<Crown className="h-5 w-5" />}
                                />

                                <StatCard
                                    label="Trésoriers"
                                    value={stats.total_tresoriers || 0}
                                    helper="actifs"
                                    icon={<ShieldCheck className="h-5 w-5" />}
                                />

                                <StatCard
                                    label="Sans rôle"
                                    value={stats.users_without_role || 0}
                                    helper="à vérifier"
                                    icon={<AlertCircle className="h-5 w-5" />}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="rounded-[2rem] border border-base-300 bg-base-100 shadow-sm">
                    <div className="border-b border-base-300 p-5 md:p-6">
                        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                            <div>
                                <h3 className="text-xl font-black">
                                    Utilisateurs
                                </h3>

                                <p className="text-sm text-base-content/60">
                                    {users.total || 0} utilisateur(s) trouvé(s).
                                    Page {users.current_page || 1} sur {users.last_page || 1}.
                                </p>
                            </div>

                            <div className="grid w-full gap-3 md:grid-cols-3 xl:max-w-4xl">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/40" />

                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Rechercher nom ou email..."
                                        className="input input-bordered w-full rounded-2xl pl-12"
                                    />
                                </div>

                                <div className="relative">
                                    <Filter className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/40" />

                                    <select
                                        value={roleFilter}
                                        onChange={(e) => setRoleFilter(e.target.value)}
                                        className="select select-bordered w-full rounded-2xl pl-12"
                                    >
                                        <option value="">Tous les rôles</option>

                                        {roles.map((role) => (
                                            <option key={role} value={role}>
                                                {role}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <select
                                    value={perPage}
                                    onChange={(e) => setPerPage(Number(e.target.value))}
                                    className="select select-bordered w-full rounded-2xl"
                                >
                                    <option value={10}>10 par page</option>
                                    <option value={15}>15 par page</option>
                                    <option value={25}>25 par page</option>
                                    <option value={50}>50 par page</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {roles.length === 0 && (
                        <div className="p-5">
                            <div className="alert alert-warning rounded-3xl">
                                <AlertCircle className="h-5 w-5" />
                                <span>
                                    Aucun rôle trouvé. Vérifiez la table roles de Spatie.
                                </span>
                            </div>
                        </div>
                    )}

                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr className="border-base-300">
                                    <th>Utilisateur</th>
                                    <th>Email</th>
                                    <th>Rôles</th>
                                    <th className="text-right">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {userList.length > 0 ? (
                                    userList.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="border-base-300 hover:bg-base-200/70"
                                        >
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar placeholder shrink-0">
                                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                                            <span className="text-sm font-black">
                                                                {getInitial(user.name)}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <p className="font-black">
                                                            {user.name}
                                                        </p>

                                                        <p className="text-xs text-base-content/50">
                                                            ID #{user.id}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td>
                                                <span className="text-sm text-base-content/70">
                                                    {user.email || 'Non défini'}
                                                </span>
                                            </td>

                                            <td>
                                                <div className="flex flex-wrap gap-2">
                                                    {user.roles?.length > 0 ? (
                                                        user.roles.map((role) => (
                                                            <RoleBadge key={role} role={role} />
                                                        ))
                                                    ) : (
                                                        <span className="badge badge-neutral rounded-full">
                                                            Aucun rôle
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="text-right">
                                                <button
                                                    type="button"
                                                    onClick={() => openUser(user)}
                                                    className="btn btn-primary btn-sm rounded-xl"
                                                >
                                                    Gérer les rôles
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">
                                            <div className="flex flex-col items-center justify-center p-10 text-center">
                                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-base-200 text-base-content/40">
                                                    <Users className="h-8 w-8" />
                                                </div>

                                                <p className="font-black">
                                                    Aucun utilisateur trouvé
                                                </p>

                                                <p className="mt-1 text-sm text-base-content/60">
                                                    Aucun résultat ne correspond à votre recherche.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <Pagination links={users.links || []} />
                </section>
            </div>

            {selectedUser && (
                <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
                    <div className="h-full w-full max-w-xl overflow-y-auto bg-base-100 shadow-2xl">
                        <div className="sticky top-0 z-10 border-b border-base-300 bg-base-100/95 p-5 backdrop-blur md:p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="text-2xl font-black">
                                        Modifier les rôles
                                    </h3>

                                    <p className="mt-1 text-sm text-base-content/60">
                                        Gestion des accès de l’utilisateur sélectionné
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={closePanel}
                                    className="btn btn-circle btn-ghost"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6 p-5 md:p-6">
                            <div className="rounded-3xl border border-base-300 bg-base-100 p-4">
                                <div className="flex items-center gap-4">
                                    <div className="avatar placeholder shrink-0">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-content">
                                            <span className="text-xl font-black">
                                                {getInitial(selectedUser.name)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="min-w-0">
                                        <p className="truncate text-lg font-black">
                                            {selectedUser.name}
                                        </p>

                                        <p className="mt-1 flex items-center gap-2 truncate text-sm text-base-content/60">
                                            <Mail className="h-4 w-4 shrink-0" />
                                            {selectedUser.email || 'Email non défini'}
                                        </p>

                                        <p className="mt-1 text-xs text-base-content/40">
                                            ID #{selectedUser.id}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="mb-3 flex items-center justify-between">
                                    <p className="font-black">
                                        Rôles disponibles
                                    </p>

                                    <span className="badge badge-primary rounded-full">
                                        {selectedRoles.length} sélectionné(s)
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    {roles.map((roleName) => {
                                        const checked = selectedRoles.includes(roleName);

                                        return (
                                            <button
                                                key={roleName}
                                                type="button"
                                                onClick={() => toggleRole(roleName)}
                                                className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
                                                    checked
                                                        ? 'border-primary bg-primary/10 text-primary'
                                                        : 'border-base-300 bg-base-100 hover:border-primary hover:bg-primary/5'
                                                }`}
                                            >
                                                <div>
                                                    <p className="font-bold">
                                                        {roleName}
                                                    </p>

                                                    <p className="text-xs text-base-content/50">
                                                        {getRoleDescription(roleName)}
                                                    </p>
                                                </div>

                                                {checked ? (
                                                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                                                ) : (
                                                    <span className="h-5 w-5 shrink-0 rounded-full border border-base-300" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {hasChanges && (
                                <div className="alert alert-info rounded-3xl">
                                    <AlertCircle className="h-5 w-5" />
                                    <span>
                                        Des modifications ne sont pas encore enregistrées.
                                    </span>
                                </div>
                            )}

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <button
                                    type="button"
                                    onClick={resetRoles}
                                    disabled={!hasChanges}
                                    className="btn btn-outline rounded-2xl"
                                >
                                    <RefreshCw className="h-4 w-4" />
                                    Réinitialiser
                                </button>

                                <button
                                    type="button"
                                    onClick={saveRoles}
                                    disabled={!hasChanges}
                                    className="btn btn-success rounded-2xl text-success-content shadow-lg shadow-success/20"
                                >
                                    <Save className="h-4 w-4" />
                                    Enregistrer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}

function Pagination({ links = [] }) {
    if (!links || links.length <= 3) {
        return null;
    }

    return (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-base-300 p-5">
            <div className="text-sm text-base-content/60">
                Navigation des pages
            </div>

            <div className="join">
                {links.map((link, index) => {
                    const label = cleanPaginationLabel(link.label);

                    return (
                        <button
                            key={index}
                            type="button"
                            disabled={!link.url}
                            onClick={() => {
                                if (link.url) {
                                    router.visit(link.url, {
                                        preserveScroll: true,
                                        preserveState: true,
                                    });
                                }
                            }}
                            className={`btn join-item btn-sm ${
                                link.active ? 'btn-primary' : 'btn-outline'
                            }`}
                        >
                            {label === 'previous' ? (
                                <ChevronLeft className="h-4 w-4" />
                            ) : label === 'next' ? (
                                <ChevronRight className="h-4 w-4" />
                            ) : (
                                label
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function cleanPaginationLabel(label) {
    if (label.includes('Previous') || label.includes('&laquo;')) {
        return 'previous';
    }

    if (label.includes('Next') || label.includes('&raquo;')) {
        return 'next';
    }

    return label.replace('&laquo;', '').replace('&raquo;', '');
}

function sameRoles(a = [], b = []) {
    const first = [...a].sort();
    const second = [...b].sort();

    if (first.length !== second.length) {
        return false;
    }

    return first.every((role, index) => role === second[index]);
}

function getRoleDescription(role) {
    const descriptions = {
        Président: 'Accès de supervision générale.',
        'Trésorier(ère)': 'Gestion des finances et rapports.',
        'Commission de logement': 'Gestion des logements et attributions.',
        Membres: 'Accès simple membre utilisateur.',
    };

    return descriptions[role] || 'Rôle personnalisé de la plateforme.';
}

function RoleBadge({ role }) {
    const className = getRoleBadgeClass(role);

    return (
        <span className={`badge rounded-full ${className}`}>
            {role}
        </span>
    );
}

function getRoleBadgeClass(role) {
    if (role === 'Président') {
        return 'badge-primary';
    }

    if (role === 'Trésorier(ère)') {
        return 'badge-success';
    }

    if (role === 'Commission de logement') {
        return 'badge-warning';
    }

    if (role === 'Membres') {
        return 'badge-info';
    }

    return 'badge-neutral';
}

function StatCard({ label, value, helper, icon }) {
    return (
        <div className="rounded-3xl bg-white/15 p-4 backdrop-blur">
            <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-xs font-bold uppercase tracking-wider text-white/70">
                    {label}
                </p>

                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/15">
                    {icon}
                </div>
            </div>

            <p className="text-3xl font-black">
                {value}
            </p>

            <p className="mt-1 text-xs text-white/70">
                {helper}
            </p>
        </div>
    );
}