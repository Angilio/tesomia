import React, { useState } from 'react';
import { Link, Head, router } from '@inertiajs/react';

import Layout from '@/Layouts/Layout';

import {
    ArrowLeft,
    Building2,
    Home,
    Save,
    Users,
    Pencil,
} from 'lucide-react';

export default function Edit({ logement, types }) {

    const [values, setValues] = useState({
        name: logement.name,
        nbrPlace: logement.nbrPlace,
        type_logement_id: logement.type_logement_id,
    });

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        router.put(`/logements/${logement.id}`, values);
    };

    return (
        <Layout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black">
                            Modifier un logement
                        </h2>

                        <p className="text-sm opacity-60">
                            Mettre à jour les informations du logement
                        </p>
                    </div>

                    <Link
                        href={route('logements.index')}
                        className="btn btn-ghost rounded-full"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Tous les logements
                    </Link>
                </div>
            }
        >
            <Head title="Modifier un logement" />

            <div className="max-w-3xl mx-auto space-y-6">

                {/* HERO */}
                <div className="rounded-3xl bg-gradient-to-r from-warning to-orange-500 text-white p-6 md:p-8 shadow-xl">

                    <div className="flex items-center gap-5">

                        <div className="w-16 h-16 rounded-3xl bg-white/15 flex items-center justify-center">
                            <Pencil className="w-8 h-8" />
                        </div>

                        <div>

                            <h1 className="text-3xl font-black">
                                Modifier le logement
                            </h1>

                            <p className="mt-1 text-white/80">
                                Mettez à jour les informations du logement sélectionné.
                            </p>

                        </div>

                    </div>

                </div>

                {/* FORM */}
                <div className="card bg-base-100 border border-base-300 shadow-sm">

                    <div className="card-body p-6 md:p-8">

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            {/* NOM */}
                            <div className="form-control">

                                <label className="label">

                                    <span className="label-text font-semibold">
                                        Nom du logement
                                    </span>

                                </label>

                                <div className="relative">

                                    <Home className="
                                        absolute left-4 top-1/2
                                        -translate-y-1/2
                                        w-5 h-5 opacity-40
                                    " />

                                    <input
                                        type="text"
                                        name="name"
                                        className="
                                            input input-bordered
                                            w-full
                                            rounded-2xl
                                            pl-12
                                        "
                                        value={values.name}
                                        onChange={handleChange}
                                        placeholder="Ex : Bloc A, Chambre 12..."
                                        required
                                    />

                                </div>

                            </div>

                            {/* NOMBRE DE PLACES */}
                            <div className="form-control">

                                <label className="label">

                                    <span className="label-text font-semibold">
                                        Nombre de places
                                    </span>

                                </label>

                                <div className="relative">

                                    <Users className="
                                        absolute left-4 top-1/2
                                        -translate-y-1/2
                                        w-5 h-5 opacity-40
                                    " />

                                    <input
                                        type="number"
                                        name="nbrPlace"
                                        className="
                                            input input-bordered
                                            w-full
                                            rounded-2xl
                                            pl-12
                                        "
                                        value={values.nbrPlace}
                                        onChange={handleChange}
                                        placeholder="Ex : 4"
                                        min="1"
                                        required
                                    />

                                </div>

                            </div>

                            {/* TYPE */}
                            <div className="form-control">

                                <label className="label">

                                    <span className="label-text font-semibold">
                                        Type de logement
                                    </span>

                                </label>

                                <div className="relative">

                                    <Building2 className="
                                        absolute left-4 top-1/2
                                        -translate-y-1/2
                                        w-5 h-5 opacity-40 z-10
                                    " />

                                    <select
                                        name="type_logement_id"
                                        className="
                                            select select-bordered
                                            w-full
                                            rounded-2xl
                                            pl-12
                                        "
                                        value={values.type_logement_id}
                                        onChange={handleChange}
                                        required
                                    >

                                        {types.map((type) => (
                                            <option
                                                key={type.id}
                                                value={type.id}
                                            >
                                                {type.type}
                                            </option>
                                        ))}

                                    </select>

                                </div>

                            </div>

                            {/* ACTIONS */}
                            <div className="
                                flex flex-col sm:flex-row
                                sm:justify-end
                                gap-3
                                pt-4
                            ">

                                <Link
                                    href={route('logements.index')}
                                    className="btn btn-ghost rounded-2xl"
                                >
                                    Annuler
                                </Link>

                                <button
                                    type="submit"
                                    className="btn btn-warning rounded-2xl text-white"
                                >
                                    <Save className="w-4 h-4" />
                                    Mettre à jour
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </Layout>
    );
}