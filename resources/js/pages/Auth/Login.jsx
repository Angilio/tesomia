import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

import { Head, Link, useForm } from '@inertiajs/react';

import {
    Mail,
    Lock,
    Users,
    CalendarDays,
    Wallet,
    ShieldCheck,
    Sun,
    Moon,
    ArrowLeft
} from 'lucide-react';

import { useEffect, useState } from 'react';

export default function Login({ status, canResetPassword }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [theme, setTheme] = useState('light');

    useEffect(() => {

        const saved = localStorage.getItem('theme') || 'light';

        setTheme(saved);

        document.documentElement.setAttribute('data-theme', saved);

    }, []);

    const toggleTheme = () => {

        const newTheme = theme === 'light'
            ? 'dark'
            : 'light';

        setTheme(newTheme);

        document.documentElement.setAttribute('data-theme', newTheme);

        localStorage.setItem('theme', newTheme);
    };

    const submit = (e) => {

        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Connexion" />

            <div className="min-h-screen bg-base-200 flex items-center justify-center">

                <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2">

                    {/* LEFT SIDE */}
                    <div className="
                        hidden lg:flex
                        relative overflow-hidden
                        bg-gradient-to-br
                        from-green-600
                        via-blue-500
                        to-pink-500
                        text-white
                        items-center
                        justify-center
                        p-12
                    ">

                        <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>

                        <div className="absolute bottom-10 right-10 w-52 h-52 bg-yellow-300/20 rounded-full blur-3xl"></div>

                        <div className="relative z-10 max-w-xl">

                            <div className="mb-8">

                                <h1 className="text-5xl font-extrabold leading-tight">
                                    Bienvenue sur <br />

                                    <span className="text-yellow-300">
                                        TESOMIA
                                    </span>
                                </h1>

                                <p className="mt-5 text-lg text-white/90 leading-relaxed">
                                    Gérez facilement les membres,
                                    les cotisations,
                                    les événements et les activités
                                    de votre association.
                                </p>

                            </div>

                            <div className="grid grid-cols-2 gap-5">

                                <FeatureCard
                                    icon={<Users className="w-9 h-9 mb-3" />}
                                    title="Membres"
                                    text="Gestion complète"
                                />

                                <FeatureCard
                                    icon={<Wallet className="w-9 h-9 mb-3" />}
                                    title="Finances"
                                    text="Suivi des cotisations"
                                />

                                <FeatureCard
                                    icon={<CalendarDays className="w-9 h-9 mb-3" />}
                                    title="Événements"
                                    text="Activités organisées"
                                />

                                <FeatureCard
                                    icon={<ShieldCheck className="w-9 h-9 mb-3" />}
                                    title="Sécurité"
                                    text="Accès protégé"
                                />

                            </div>

                        </div>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex items-center justify-center px-6 py-10">

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

                                <button
                                    onClick={toggleTheme}
                                    className="btn btn-circle btn-ghost"
                                >

                                    {theme === 'light'
                                        ? <Moon className="w-5 h-5" />
                                        : <Sun className="w-5 h-5" />
                                    }

                                </button>

                            </div>

                            <div className="lg:hidden text-center mb-8">

                                <h1 className="text-4xl font-extrabold text-primary">
                                    TESOMIA
                                </h1>

                                <p className="text-base-content/60 mt-2">
                                    Gestion interne de l'association
                                </p>

                            </div>

                            <div className="
                                bg-base-100
                                rounded-3xl
                                shadow-2xl
                                border border-base-300
                                p-8
                            ">

                                <div className="mb-8 text-center">

                                    <h2 className="text-3xl font-extrabold">
                                        Se connecter
                                    </h2>

                                    <p className="mt-2 text-base-content/60">
                                        Accédez à votre espace de gestion
                                    </p>

                                </div>

                                {status && (

                                    <div className="alert alert-success mb-5">
                                        <span>{status}</span>
                                    </div>

                                )}

                                <form onSubmit={submit} className="space-y-5">

                                    {/* EMAIL */}
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
                                                autoComplete="username"
                                                isFocused={true}
                                                placeholder="E-mail ou numéro de mobile"
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

                                    {/* PASSWORD */}
                                    <div>

                                        <label
                                            htmlFor="password"
                                            className="block mb-2 text-sm font-semibold"
                                        >
                                            Mot de passe
                                        </label>

                                        <div className="relative">

                                            <Lock className="
                                                absolute left-4 top-1/2
                                                -translate-y-1/2
                                                w-5 h-5 opacity-50
                                            " />

                                            <TextInput
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                className="
                                                    input input-bordered
                                                    w-full
                                                    pl-12
                                                    rounded-2xl
                                                "
                                                autoComplete="current-password"
                                                placeholder="Mot de passe"
                                                onChange={(e) =>
                                                    setData('password', e.target.value)
                                                }
                                            />

                                        </div>

                                        <InputError
                                            message={errors.password}
                                            className="mt-2"
                                        />

                                    </div>

                                    {/* REMEMBER */}
                                    <div className="flex items-center justify-between gap-4">

                                        <label className="flex items-center gap-2 cursor-pointer">

                                            <Checkbox
                                                name="remember"
                                                checked={data.remember}
                                                onChange={(e) =>
                                                    setData('remember', e.target.checked)
                                                }
                                            />

                                            <span className="text-sm opacity-70">
                                                Se souvenir de moi
                                            </span>

                                        </label>

                                        {canResetPassword && (

                                            <Link
                                                href={route('password.request')}
                                                className="text-sm link link-hover text-primary"
                                            >
                                                Mot de passe oublié ?
                                            </Link>

                                        )}

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
                                            ? 'Connexion...'
                                            : 'Se connecter'}
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

            </div>
        </>
    );
}

function FeatureCard({ icon, title, text }) {

    return (

        <div className="
            bg-white/15
            backdrop-blur-md
            rounded-3xl
            p-5
            shadow-lg
        ">

            {icon}

            <h3 className="font-bold">
                {title}
            </h3>

            <p className="text-sm text-white/80">
                {text}
            </p>

        </div>

    );
}