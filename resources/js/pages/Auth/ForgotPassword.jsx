import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

import GuestLayout from '@/Layouts/GuestLayout';

import { Head, Link, useForm } from '@inertiajs/react';

import {
    Mail,
    ArrowLeft
} from 'lucide-react';

export default function ForgotPassword({ status }) {

    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {

        e.preventDefault();

        post(route('password.email'));
    };

    return (

        <GuestLayout>

            <Head title="Mot de passe oublié" />

            <div className="
                min-h-[80vh]
                flex items-center justify-center
                px-4
            ">

                <div className="w-full max-w-md">

                    {/* TOP ACTIONS */}
                    <div className="flex items-center justify-between mb-5">

                        <Link
                            href="/"
                            className="btn btn-ghost rounded-full"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Accueil
                        </Link>

                    </div>

                    {/* CARD */}
                    <div className="
                        card
                        bg-base-100
                        border border-base-300
                        shadow-2xl
                    ">

                        <div className="card-body p-8">

                            {/* HEADER */}
                            <div className="text-center mb-8">

                                <div className="
                                    w-16 h-16 mx-auto mb-5
                                    rounded-3xl
                                    bg-primary/10
                                    text-primary
                                    flex items-center justify-center
                                ">
                                    <Mail className="w-8 h-8" />
                                </div>

                                <h1 className="text-3xl font-black">
                                    Mot de passe oublié
                                </h1>

                                <p className="mt-3 text-base-content/60 leading-relaxed">
                                    Entrez votre adresse email pour recevoir
                                    un lien de réinitialisation du mot de passe.
                                </p>

                            </div>

                            {/* STATUS */}
                            {status && (

                                <div className="alert alert-success mb-6">
                                    <span>{status}</span>
                                </div>

                            )}

                            {/* FORM */}
                            <form
                                onSubmit={submit}
                                className="space-y-5"
                            >

                                <div>

                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-semibold"
                                    >
                                        Adresse email
                                    </label>

                                    <div className="relative">

                                        <Mail className="
                                            absolute left-4 top-1/2
                                            -translate-y-1/2
                                            w-5 h-5 opacity-50
                                        " />

                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="
                                                input input-bordered
                                                w-full
                                                pl-12
                                                rounded-2xl
                                            "
                                            isFocused={true}
                                            placeholder="Votre adresse email"
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                        />

                                    </div>

                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />

                                </div>

                                {/* BUTTON */}
                                <PrimaryButton
                                    className="
                                        btn btn-primary
                                        w-full
                                        rounded-2xl
                                        text-base
                                        border-none
                                    "
                                    disabled={processing}
                                >
                                    {processing
                                        ? 'Envoi...'
                                        : 'Envoyer le lien'}
                                </PrimaryButton>

                            </form>

                            <div className="divider my-7">
                                TESOMIA
                            </div>

                            <div className="text-center">

                                <p className="text-sm opacity-60">
                                    Plateforme sécurisée
                                </p>

                                <p className="mt-2 text-lg font-bold">
                                    TESOMIA
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </GuestLayout>

    );
}