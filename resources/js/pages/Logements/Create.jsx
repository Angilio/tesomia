import React, { useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

import {
    ArrowLeft,
    Building2,
    Home,
    Save,
    Users,
} from 'lucide-react';

export default function Create({ types }) {
    const [values, setValues] = useState({
        name: '',
        nbrPlace: '',
        type_logement_id: '',
    });

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post('/logements', values);
    };

    return (
        <Layout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black">
                            Ajouter un logement
                        </h2>

                        <p className="text-sm opacity-60">
                            Enregistrer un nouveau logement étudiant
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
            <Head title="Ajouter un logement" />

            <div className="max-w-3xl mx-auto space-y-6">

                <div className="rounded-3xl bg-gradient-to-r from-primary to-secondary text-primary-content p-6 md:p-8 shadow-xl">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-3xl bg-white/15 flex items-center justify-center">
                            <Building2 className="w-8 h-8" />
                        </div>

                        <div>
                            <h1 className="text-3xl font-black">
                                Nouveau logement
                            </h1>

                            <p className="mt-1 text-white/80">
                                Remplissez les informations du logement à ajouter.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 border border-base-300 shadow-sm">
                    <div className="card-body p-6 md:p-8">

                        <form onSubmit={handleSubmit} className="space-y-5">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        Nom du logement
                                    </span>
                                </label>

                                <div className="relative">
                                    <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />

                                    <input
                                        type="text"
                                        name="name"
                                        className="input input-bordered w-full rounded-2xl pl-12"
                                        value={values.name}
                                        onChange={handleChange}
                                        placeholder="Ex : Bloc A, Chambre 12..."
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        Nombre de places
                                    </span>
                                </label>

                                <div className="relative">
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />

                                    <input
                                        type="number"
                                        name="nbrPlace"
                                        className="input input-bordered w-full rounded-2xl pl-12"
                                        value={values.nbrPlace}
                                        onChange={handleChange}
                                        placeholder="Ex : 4"
                                        min="1"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        Type de logement
                                    </span>
                                </label>

                                <select
                                    name="type_logement_id"
                                    className="select select-bordered w-full rounded-2xl"
                                    value={values.type_logement_id}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">
                                        Choisir le type de logement
                                    </option>

                                    {types.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.type}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-4">
                                <Link
                                    href={route('logements.index')}
                                    className="btn btn-ghost rounded-2xl"
                                >
                                    Annuler
                                </Link>

                                <button
                                    type="submit"
                                    className="btn btn-primary rounded-2xl"
                                >
                                    <Save className="w-4 h-4" />
                                    Enregistrer
                                </button>
                            </div>

                        </form>

                    </div>
                </div>

            </div>
        </Layout>
    );
}