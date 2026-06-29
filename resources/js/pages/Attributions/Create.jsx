import React, { useMemo, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import {
    AlertCircle,
    CalendarDays,
    CheckCircle,
    ClipboardList,
    Home,
    Plus,
    Save,
    Search,
    Trash2,
    Users,
} from 'lucide-react';

export default function Create({ users = [], logements = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        attributions: [],
    });

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedLogement, setSelectedLogement] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [search, setSearch] = useState('');

    const usedUsers = useMemo(() => {
        return data.attributions.flatMap((attr) =>
            attr.user_ids.map((id) => String(id))
        );
    }, [data.attributions]);

    const filteredUsers = useMemo(() => {
        const value = search.toLowerCase().trim();

        if (!value) {
            return users;
        }

        return users.filter((user) =>
            user.name?.toLowerCase().includes(value)
        );
    }, [users, search]);

    const selectedLogementObject = useMemo(() => {
        return logements.find(
            (logement) => String(logement.id) === String(selectedLogement)
        );
    }, [logements, selectedLogement]);

    const toggleUser = (id) => {
        const userId = String(id);

        if (usedUsers.includes(userId)) {
            return;
        }

        setSelectedUsers((prev) =>
            prev.includes(userId)
                ? prev.filter((item) => item !== userId)
                : [...prev, userId]
        );
    };

    const addAttribution = () => {
        if (!selectedLogement || selectedUsers.length === 0 || !dateDebut) {
            alert('Veuillez sélectionner au moins un étudiant, un logement et une date de début.');
            return;
        }

        setData('attributions', [
            ...data.attributions,
            {
                logement_id: selectedLogement,
                user_ids: selectedUsers,
                date_debut: dateDebut,
                date_fin: dateFin,
            },
        ]);

        setSelectedUsers([]);
        setSelectedLogement('');
        setDateDebut('');
        setDateFin('');
        setSearch('');
    };

    const removeAttribution = (index) => {
        const newAttributions = [...data.attributions];
        newAttributions.splice(index, 1);
        setData('attributions', newAttributions);
    };

    const getLogementName = (id) => {
        const logement = logements.find((item) => String(item.id) === String(id));
        return logement ? logement.name : `Logement #${id}`;
    };

    const getUserNames = (ids) => {
        return users
            .filter((user) => ids.map(String).includes(String(user.id)))
            .map((user) => user.name)
            .join(', ');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (data.attributions.length === 0) {
            alert('Ajoutez au moins une attribution avant d’enregistrer.');
            return;
        }

        post(route('attributions.store'), {
            preserveScroll: true,
        });
    };

    return (
        <Layout
            header={
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <Home className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="text-2xl font-black tracking-tight">
                                    Attribution des logements
                                </h2>
                                <p className="text-sm text-base-content/60">
                                    Attribuez un ou plusieurs étudiants à un logement
                                </p>
                            </div>
                        </div>
                    </div>

                    <Link
                        href="/attributions"
                        className="btn btn-primary rounded-2xl shadow-lg shadow-primary/20"
                    >
                        <ClipboardList className="h-4 w-4" />
                        Toutes les attributions
                    </Link>
                </div>
            }
        >
            <Head title="Attribuer un logement" />

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <section className="overflow-hidden rounded-[2rem] border border-base-300 bg-base-100 shadow-sm">
                    <div className="relative bg-gradient-to-br from-primary via-secondary to-primary p-6 text-primary-content md:p-8">
                        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
                        <div className="absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

                        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div className="max-w-2xl">
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
                                    <ClipboardList className="h-4 w-4" />
                                    Nouvelle attribution
                                </div>

                                <h1 className="text-3xl font-black leading-tight md:text-5xl">
                                    Créer des attributions
                                </h1>

                                <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 md:text-base">
                                    Sélectionnez les étudiants, choisissez un logement,
                                    indiquez la période d’attribution, puis ajoutez le groupe.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:min-w-[430px]">
                                <StatCard
                                    label="Étudiants"
                                    value={users.length}
                                    helper="disponibles"
                                />

                                <StatCard
                                    label="Logements"
                                    value={logements.length}
                                    helper="enregistrés"
                                />

                                <StatCard
                                    label="Groupes"
                                    value={data.attributions.length}
                                    helper="créé(s)"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {errors.attributions && (
                    <div className="alert alert-error rounded-3xl">
                        <AlertCircle className="h-5 w-5" />
                        <span>{errors.attributions}</span>
                    </div>
                )}

                <section className="grid gap-6 xl:grid-cols-3">
                    <div className="rounded-[2rem] border border-base-300 bg-base-100 p-5 shadow-sm md:p-6">
                        <div className="mb-5 flex items-center justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-black">
                                    Étudiants
                                </h3>
                                <p className="text-sm text-base-content/60">
                                    {selectedUsers.length} sélectionné(s)
                                </p>
                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <Users className="h-6 w-6" />
                            </div>
                        </div>

                        <div className="relative mb-4">
                            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/40" />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Rechercher un étudiant..."
                                className="input input-bordered w-full rounded-2xl pl-12"
                            />
                        </div>

                        <div className="max-h-[520px] space-y-2 overflow-y-auto pr-1">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => {
                                    const userId = String(user.id);
                                    const isUsed = usedUsers.includes(userId);
                                    const isSelected = selectedUsers.includes(userId);

                                    return (
                                        <button
                                            type="button"
                                            key={user.id}
                                            disabled={isUsed}
                                            onClick={() => toggleUser(user.id)}
                                            className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
                                                isUsed
                                                    ? 'cursor-not-allowed border-base-300 bg-base-200 opacity-50'
                                                    : isSelected
                                                        ? 'border-primary bg-primary/10 text-primary'
                                                        : 'border-base-300 bg-base-100 hover:border-primary hover:bg-primary/5'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <MemberAvatar user={user} />

                                                <div>
                                                    <p className="font-bold">
                                                        {user.name}
                                                    </p>

                                                    {user.email && (
                                                        <p className="text-xs text-base-content/50">
                                                            {user.email}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {isUsed ? (
                                                <span className="badge badge-neutral rounded-full">
                                                    Déjà ajouté
                                                </span>
                                            ) : isSelected ? (
                                                <CheckCircle className="h-5 w-5 text-primary" />
                                            ) : (
                                                <span className="h-5 w-5 rounded-full border border-base-300" />
                                            )}
                                        </button>
                                    );
                                })
                            ) : (
                                <EmptyState
                                    icon={<Users className="h-7 w-7" />}
                                    title="Aucun étudiant"
                                    text="Aucun étudiant ne correspond à votre recherche."
                                />
                            )}
                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-base-300 bg-base-100 p-5 shadow-sm md:p-6">
                        <div className="mb-5 flex items-center justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-black">
                                    Logement et période
                                </h3>
                                <p className="text-sm text-base-content/60">
                                    Choisissez le logement cible
                                </p>
                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                                <Home className="h-6 w-6" />
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="mb-2 block text-sm font-bold">
                                    Logement
                                </label>

                                <select
                                    value={selectedLogement}
                                    onChange={(e) => setSelectedLogement(e.target.value)}
                                    className="select select-bordered w-full rounded-2xl"
                                >
                                    <option value="">Choisir un logement</option>

                                    {logements.map((logement) => (
                                        <option key={logement.id} value={logement.id}>
                                            {logement.name}
                                            {logement.nbrPlace
                                                ? ` — ${logement.nbrPlace} place(s)`
                                                : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-bold">
                                        Date début
                                    </label>

                                    <div className="relative">
                                        <CalendarDays className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/40" />

                                        <input
                                            type="date"
                                            value={dateDebut}
                                            onChange={(e) => setDateDebut(e.target.value)}
                                            className="input input-bordered w-full rounded-2xl pl-12"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-bold">
                                        Date fin
                                    </label>

                                    <div className="relative">
                                        <CalendarDays className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/40" />

                                        <input
                                            type="date"
                                            value={dateFin}
                                            onChange={(e) => setDateFin(e.target.value)}
                                            className="input input-bordered w-full rounded-2xl pl-12"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-3xl border border-primary/20 bg-primary/10 p-4">
                                <div className="mb-2 flex items-center gap-2 font-black text-primary">
                                    <AlertCircle className="h-4 w-4" />
                                    Résumé de sélection
                                </div>

                                <div className="space-y-1 text-sm text-base-content/70">
                                    <p>
                                        Étudiants sélectionnés :{' '}
                                        <span className="font-bold">
                                            {selectedUsers.length}
                                        </span>
                                    </p>

                                    <p>
                                        Logement :{' '}
                                        <span className="font-bold">
                                            {selectedLogementObject?.name || 'Non sélectionné'}
                                        </span>
                                    </p>

                                    <p>
                                        Date début :{' '}
                                        <span className="font-bold">
                                            {dateDebut || 'Non définie'}
                                        </span>
                                    </p>

                                    <p>
                                        Date fin :{' '}
                                        <span className="font-bold">
                                            {dateFin || 'Non définie'}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={addAttribution}
                                disabled={
                                    !selectedLogement ||
                                    selectedUsers.length === 0 ||
                                    !dateDebut
                                }
                                className="btn btn-primary w-full rounded-2xl shadow-lg shadow-primary/20"
                            >
                                <Plus className="h-5 w-5" />
                                Ajouter au groupe
                            </button>
                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-base-300 bg-base-100 p-5 shadow-sm md:p-6">
                        <div className="mb-5 flex items-center justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-black">
                                    Groupes créés
                                </h3>
                                <p className="text-sm text-base-content/60">
                                    {data.attributions.length} attribution(s)
                                </p>
                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-success/10 text-success">
                                <ClipboardList className="h-6 w-6" />
                            </div>
                        </div>

                        <div className="max-h-[520px] space-y-3 overflow-y-auto pr-1">
                            {data.attributions.length > 0 ? (
                                data.attributions.map((attr, index) => (
                                    <div
                                        key={index}
                                        className="rounded-3xl border border-base-300 bg-base-100 p-4 shadow-sm"
                                    >
                                        <div className="mb-3 flex items-start justify-between gap-3">
                                            <div>
                                                <p className="font-black">
                                                    {getLogementName(attr.logement_id)}
                                                </p>

                                                <p className="text-xs text-base-content/60">
                                                    {attr.user_ids.length} étudiant(s)
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeAttribution(index)}
                                                className="btn btn-error btn-sm rounded-xl text-error-content"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>

                                        <div className="rounded-2xl bg-base-200/70 p-3">
                                            <p className="text-xs font-bold uppercase tracking-wider text-base-content/50">
                                                Étudiants
                                            </p>

                                            <p className="mt-1 text-sm font-semibold">
                                                {getUserNames(attr.user_ids)}
                                            </p>
                                        </div>

                                        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                            <Info label="Date début" value={attr.date_debut} />
                                            <Info
                                                label="Date fin"
                                                value={attr.date_fin || 'Non définie'}
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <EmptyState
                                    icon={<ClipboardList className="h-7 w-7" />}
                                    title="Aucun groupe"
                                    text="Les attributions ajoutées apparaîtront ici."
                                />
                            )}
                        </div>
                    </div>
                </section>

                <section className="sticky bottom-4 z-20 rounded-[2rem] border border-base-300 bg-base-100/90 p-4 shadow-2xl backdrop-blur">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="font-black">
                                Enregistrement final
                            </p>

                            <p className="text-sm text-base-content/60">
                                {data.attributions.length} groupe(s) prêt(s) à être enregistré(s).
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={processing || data.attributions.length === 0}
                            className="btn btn-success rounded-2xl text-success-content shadow-lg shadow-success/20"
                        >
                            <Save className="h-5 w-5" />
                            {processing
                                ? 'Enregistrement...'
                                : 'Enregistrer les attributions'}
                        </button>
                    </div>
                </section>
            </form>
        </Layout>
    );
}

function MemberAvatar({ user }) {
    const image =
        user.profile_photo_url ||
        user.photo_url ||
        user.avatar_url ||
        user.image_url ||
        null;

    const initial = user.name?.charAt(0)?.toUpperCase() || 'E';

    if (image) {
        return (
            <div className="avatar shrink-0">
                <div className="h-10 w-10 rounded-2xl ring-1 ring-base-300">
                    <img src={image} alt={user.name || 'Étudiant'} />
                </div>
            </div>
        );
    }

    return (
        <div className="avatar placeholder shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/10">
                <span className="text-sm font-black leading-none">
                    {initial}
                </span>
            </div>
        </div>
    );
}

function StatCard({ label, value, helper }) {
    return (
        <div className="rounded-3xl bg-white/15 p-4 backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-wider text-white/70">
                {label}
            </p>

            <p className="mt-2 text-3xl font-black">
                {value}
            </p>

            <p className="mt-1 text-xs text-white/70">
                {helper}
            </p>
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

function EmptyState({ icon, title, text }) {
    return (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-base-300 bg-base-200/40 p-8 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-base-100 text-base-content/40">
                {icon}
            </div>

            <p className="font-black">
                {title}
            </p>

            <p className="mt-1 text-sm text-base-content/60">
                {text}
            </p>
        </div>
    );
}