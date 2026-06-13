import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Layout from '@/Layouts/Layout';

export default function Register({
    etablissements,
    niveaux,
    classes,
    logements,
    entites
}) {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        contact: '',
        image: null,
        password: '',
        password_confirmation: '',
        etablissement_id: '',
        niveau_id: '',
        classe_id: '',
        logement_id: '',
        entite_id: '',
    });

    const [filteredClasses, setFilteredClasses] = useState(classes);

    useEffect(() => {

        if (!data.niveau_id) {
            setFilteredClasses(classes);
        } else {

            const filtered = classes.filter(
                cls => cls.niveau_id == data.niveau_id
            );

            setFilteredClasses(filtered);

            if (!filtered.some(cls => cls.id == data.classe_id)) {
                setData('classe_id', '');
            }
        }

    }, [data.niveau_id]);

    const submit = (e) => {
        e.preventDefault();

        post(route('president.membres.register'), {
            forceFormData: true,
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <Layout
            header={
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-base-content">
                            Ajouter un membre
                        </h2>

                        <p className="text-sm opacity-70">
                            Gestion des nouveaux membres
                        </p>
                    </div>

                    <Link
                        href={route('president.membres.index')}
                        className="btn btn-primary btn-sm md:btn-md rounded-xl shadow-lg"
                    >
                        Tous les membres
                    </Link>
                </div>
            }
        >
            <Head title="Ajouter un membre" />

            <div className="min-h-screen py-10 px-4">

                <div className="max-w-5xl mx-auto">

                    <div
                        className="
                            bg-base-100/80
                            backdrop-blur-xl
                            border border-base-300
                            shadow-2xl
                            rounded-3xl
                            overflow-hidden
                        "
                    >

                        {/* HEADER */}
                        <div
                            className="
                                bg-gradient-to-r
                                from-primary
                                via-secondary
                                to-accent
                                p-8
                                text-primary-content
                            "
                        >
                            <h1 className="text-3xl md:text-4xl font-extrabold">
                                Nouveau membre
                            </h1>

                            <p className="opacity-90 mt-2">
                                Remplissez les informations ci-dessous
                            </p>
                        </div>

                        {/* FORM */}
                        <form
                            onSubmit={submit}
                            className="p-6 md:p-10 space-y-8"
                        >

                            {/* SECTION INFOS */}
                            <div className="space-y-6">

                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-8 bg-primary rounded-full"></div>

                                    <h3 className="text-xl font-bold">
                                        Informations personnelles
                                    </h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    {/* NOM */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">
                                                Nom complet
                                            </span>
                                        </label>

                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData('name', e.target.value)
                                            }
                                            className="
                                                input input-bordered
                                                rounded-2xl
                                                h-14
                                                focus:input-primary
                                                transition-all duration-300
                                            "
                                            placeholder="Entrer le nom"
                                            required
                                        />

                                        <InputError
                                            message={errors.name}
                                            className="text-error mt-2"
                                        />
                                    </div>

                                    {/* EMAIL */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">
                                                Adresse email
                                            </span>
                                        </label>

                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                            className="
                                                input input-bordered
                                                rounded-2xl
                                                h-14
                                                focus:input-primary
                                            "
                                            placeholder="example@email.com"
                                            required
                                        />

                                        <InputError
                                            message={errors.email}
                                            className="text-error mt-2"
                                        />
                                    </div>

                                </div>

                                {/* CONTACT + ENTITE */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    <div className="form-control">

                                        <label className="label">
                                            <span className="label-text font-semibold">
                                                Contact
                                            </span>
                                        </label>

                                        <div
                                            className="
                                                border border-base-300
                                                rounded-2xl
                                                px-4
                                                py-3
                                                bg-base-100
                                                focus-within:border-primary
                                                transition-all
                                            "
                                        >
                                            <PhoneInput
                                                defaultCountry="MG"
                                                international
                                                value={data.contact}
                                                onChange={(value) =>
                                                    setData('contact', value)
                                                }
                                                className="w-full"
                                            />
                                        </div>

                                        <InputError
                                            message={errors.contact}
                                            className="text-error mt-2"
                                        />

                                    </div>

                                    <div className="form-control">

                                        <label className="label">
                                            <span className="label-text font-semibold">
                                                Sous entité
                                            </span>
                                        </label>

                                        <select
                                            value={data.entite_id}
                                            onChange={(e) =>
                                                setData(
                                                    'entite_id',
                                                    e.target.value
                                                )
                                            }
                                            className="
                                                select select-bordered
                                                rounded-2xl
                                                h-14
                                                focus:select-primary
                                            "
                                            required
                                        >
                                            <option value="">
                                                Sélectionner
                                            </option>

                                            {entites.map((entite) => (
                                                <option
                                                    key={entite.id}
                                                    value={entite.id}
                                                >
                                                    {entite.entite}
                                                </option>
                                            ))}
                                        </select>

                                        <InputError
                                            message={errors.entite_id}
                                            className="text-error mt-2"
                                        />

                                    </div>

                                </div>

                            </div>

                            {/* SECTION ACADÉMIQUE */}
                            <div className="space-y-6">

                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-8 bg-secondary rounded-full"></div>

                                    <h3 className="text-xl font-bold">
                                        Informations académiques
                                    </h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    <select
                                        value={data.etablissement_id}
                                        onChange={(e) =>
                                            setData(
                                                'etablissement_id',
                                                e.target.value
                                            )
                                        }
                                        className="select select-bordered rounded-2xl h-14"
                                        required
                                    >
                                        <option value="">
                                            Établissement
                                        </option>

                                        {etablissements.map((etab) => (
                                            <option
                                                key={etab.id}
                                                value={etab.id}
                                            >
                                                {etab.name}
                                            </option>
                                        ))}
                                    </select>

                                    <select
                                        value={data.niveau_id}
                                        onChange={(e) =>
                                            setData(
                                                'niveau_id',
                                                e.target.value
                                            )
                                        }
                                        className="select select-bordered rounded-2xl h-14"
                                        required
                                    >
                                        <option value="">
                                            Niveau
                                        </option>

                                        {niveaux.map((n) => (
                                            <option
                                                key={n.id}
                                                value={n.id}
                                            >
                                                {n.name}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    <select
                                        value={data.classe_id}
                                        onChange={(e) =>
                                            setData(
                                                'classe_id',
                                                e.target.value
                                            )
                                        }
                                        className="select select-bordered rounded-2xl h-14"
                                        required
                                        disabled={!data.niveau_id}
                                    >
                                        <option value="">
                                            Classe
                                        </option>

                                        {filteredClasses.map((cls) => (
                                            <option
                                                key={cls.id}
                                                value={cls.id}
                                            >
                                                {cls.name}
                                            </option>
                                        ))}
                                    </select>

                                    <select
                                        value={data.logement_id}
                                        onChange={(e) =>
                                            setData(
                                                'logement_id',
                                                e.target.value
                                            )
                                        }
                                        className="select select-bordered rounded-2xl h-14"
                                        required
                                    >
                                        <option value="">
                                            Logement
                                        </option>

                                        {logements.map((log) => (
                                            <option
                                                key={log.id}
                                                value={log.id}
                                            >
                                                {log.name}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                            </div>

                            {/* MOT DE PASSE */}
                            <div className="space-y-6">

                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-8 bg-accent rounded-full"></div>

                                    <h3 className="text-xl font-bold">
                                        Sécurité
                                    </h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    <div className="form-control">

                                        <input
                                            type="password"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    'password',
                                                    e.target.value
                                                )
                                            }
                                            className="
                                                input input-bordered
                                                rounded-2xl
                                                h-14
                                            "
                                            placeholder="Mot de passe"
                                            required
                                        />

                                        <InputError
                                            message={errors.password}
                                            className="text-error mt-2"
                                        />

                                    </div>

                                    <div className="form-control">

                                        <input
                                            type="password"
                                            value={
                                                data.password_confirmation
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    'password_confirmation',
                                                    e.target.value
                                                )
                                            }
                                            className="
                                                input input-bordered
                                                rounded-2xl
                                                h-14
                                            "
                                            placeholder="Confirmation"
                                            required
                                        />

                                    </div>

                                </div>

                            </div>

                            {/* BUTTON */}
                            <div className="pt-6">

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="
                                        btn btn-primary
                                        w-full
                                        h-14
                                        rounded-2xl
                                        text-lg
                                        font-bold
                                        shadow-xl
                                        hover:scale-[1.01]
                                        transition-all duration-300
                                    "
                                >
                                    {processing
                                        ? 'Ajout en cours...'
                                        : 'Ajouter un nouveau membre'}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </Layout>
    );
}