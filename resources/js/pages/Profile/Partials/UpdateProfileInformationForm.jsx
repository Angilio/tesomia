import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import {
    BadgeCheck,
    CheckCircle2,
    Mail,
    Save,
    ShieldCheck,
    User,
} from 'lucide-react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const {
        data,
        setData,
        post,
        errors,
        processing,
        recentlySuccessful,
        clearErrors,
    } = useForm({
        _method: 'patch',
        name: user.name || '',
        email: user.email || '',
    });

    const submit = (e) => {
        e.preventDefault();
        clearErrors();

        post(route('profile.update'), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <section className={className}>
            <div className="overflow-hidden rounded-[2rem] border border-base-300 bg-base-100 shadow-sm">
                <div className="border-b border-base-300 bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/10">
                                <User className="h-7 w-7" />
                            </div>

                            <div>
                                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-primary">
                                    <ShieldCheck className="h-3.5 w-3.5" />
                                    Compte utilisateur
                                </div>

                                <h2 className="text-2xl font-black tracking-tight text-base-content">
                                    Informations du profil
                                </h2>

                                <p className="mt-1 max-w-2xl text-sm leading-6 text-base-content/60">
                                    Modifiez votre nom et votre adresse email. Ces informations
                                    seront utilisées dans votre espace personnel et dans les
                                    différentes pages de l’application.
                                </p>
                            </div>
                        </div>

                        {user.email_verified_at ? (
                            <div className="badge badge-success badge-lg gap-2 rounded-full text-success-content">
                                <BadgeCheck className="h-4 w-4" />
                                Email vérifié
                            </div>
                        ) : (
                            <div className="badge badge-warning badge-lg gap-2 rounded-full">
                                Email non vérifié
                            </div>
                        )}
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6 p-6">
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                        <div className="rounded-3xl border border-base-300 bg-base-100 p-5">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                    <User className="h-5 w-5" />
                                </div>

                                <div>
                                    <h3 className="font-black text-base-content">
                                        Nom complet
                                    </h3>
                                    <p className="text-xs text-base-content/60">
                                        Votre nom visible dans le système
                                    </p>
                                </div>
                            </div>

                            <InputLabel htmlFor="name" value="Nom" />

                            <TextInput
                                id="name"
                                type="text"
                                className="mt-2 block w-full rounded-2xl"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                isFocused
                                autoComplete="name"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div className="rounded-3xl border border-base-300 bg-base-100 p-5">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                                    <Mail className="h-5 w-5" />
                                </div>

                                <div>
                                    <h3 className="font-black text-base-content">
                                        Adresse email
                                    </h3>
                                    <p className="text-xs text-base-content/60">
                                        Email utilisé pour la connexion
                                    </p>
                                </div>
                            </div>

                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                className="mt-2 block w-full rounded-2xl"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                            />

                            <InputError className="mt-2" message={errors.email} />
                        </div>
                    </div>

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div className="rounded-3xl border border-warning/30 bg-warning/10 p-5">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h3 className="font-black text-warning">
                                        Adresse email non vérifiée
                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-base-content/70">
                                        Votre adresse email n’est pas encore vérifiée.
                                        Vous pouvez demander un nouveau lien de vérification.
                                    </p>
                                </div>

                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="btn btn-warning rounded-2xl"
                                >
                                    Renvoyer le lien
                                </Link>
                            </div>

                            {status === 'verification-link-sent' && (
                                <div className="mt-4 rounded-2xl bg-success/10 p-3 text-sm font-semibold text-success">
                                    Un nouveau lien de vérification a été envoyé à votre adresse email.
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex flex-col gap-4 border-t border-base-300 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-sm text-base-content/60">
                            Vérifiez bien les informations avant d’enregistrer.
                        </div>

                        <div className="flex items-center gap-4">
                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out duration-300"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in-out duration-300"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <p className="flex items-center gap-2 text-sm font-semibold text-success">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Profil enregistré
                                </p>
                            </Transition>

                            <button
                                type="submit"
                                disabled={processing}
                                className="btn btn-primary rounded-2xl shadow-lg shadow-primary/20"
                            >
                                {processing ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm" />
                                        Enregistrement...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4" />
                                        Enregistrer
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}