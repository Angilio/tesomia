import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import {
    CheckCircle2,
    Eye,
    EyeOff,
    KeyRound,
    Lock,
    Save,
    ShieldCheck,
} from 'lucide-react';
import { useRef, useState } from 'react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef(null);
    const currentPasswordInput = useRef(null);

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
        clearErrors,
    } = useForm({
        _method: 'put',
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();
        clearErrors();

        post(route('password.update'), {
            preserveScroll: true,
            forceFormData: true,

            onSuccess: () => {
                reset('current_password', 'password', 'password_confirmation');
                setShowCurrentPassword(false);
                setShowPassword(false);
                setShowPasswordConfirmation(false);
            },

            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <div className="overflow-hidden rounded-[2rem] border border-base-300 bg-base-100 shadow-sm">
                <div className="border-b border-base-300 bg-gradient-to-br from-secondary/10 via-base-100 to-primary/10 p-6">
                    <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary/10 text-secondary ring-1 ring-secondary/10">
                            <KeyRound className="h-7 w-7" />
                        </div>

                        <div>
                            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-secondary/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-secondary">
                                <ShieldCheck className="h-3.5 w-3.5" />
                                Sécurité du compte
                            </div>

                            <h2 className="text-2xl font-black tracking-tight text-base-content">
                                Modifier le mot de passe
                            </h2>

                            <p className="mt-1 max-w-2xl text-sm leading-6 text-base-content/60">
                                Utilisez un mot de passe sécurisé pour protéger votre compte.
                                Il est conseillé d’utiliser au moins 8 caractères avec des lettres,
                                des chiffres et des symboles.
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={updatePassword} className="space-y-6 p-6">
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                        <PasswordField
                            id="current_password"
                            label="Mot de passe actuel"
                            description="Saisissez votre mot de passe actuel"
                            value={data.current_password}
                            onChange={(value) => setData('current_password', value)}
                            error={errors.current_password}
                            inputRef={currentPasswordInput}
                            autoComplete="current-password"
                            show={showCurrentPassword}
                            setShow={setShowCurrentPassword}
                            iconClass="bg-warning/10 text-warning"
                        />

                        <PasswordField
                            id="password"
                            label="Nouveau mot de passe"
                            description="Choisissez un nouveau mot de passe"
                            value={data.password}
                            onChange={(value) => setData('password', value)}
                            error={errors.password}
                            inputRef={passwordInput}
                            autoComplete="new-password"
                            show={showPassword}
                            setShow={setShowPassword}
                            iconClass="bg-primary/10 text-primary"
                        />

                        <PasswordField
                            id="password_confirmation"
                            label="Confirmation"
                            description="Confirmez le nouveau mot de passe"
                            value={data.password_confirmation}
                            onChange={(value) =>
                                setData('password_confirmation', value)
                            }
                            error={errors.password_confirmation}
                            autoComplete="new-password"
                            show={showPasswordConfirmation}
                            setShow={setShowPasswordConfirmation}
                            iconClass="bg-success/10 text-success"
                        />
                    </div>

                    <div className="rounded-3xl border border-base-300 bg-base-200/50 p-5">
                        <div className="flex items-start gap-3">
                            <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <Lock className="h-4 w-4" />
                            </div>

                            <div>
                                <h3 className="font-black text-base-content">
                                    Conseil de sécurité
                                </h3>

                                <p className="mt-1 text-sm leading-6 text-base-content/60">
                                    Ne partagez jamais votre mot de passe. Après la modification,
                                    utilisez uniquement le nouveau mot de passe lors de votre
                                    prochaine connexion.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 border-t border-base-300 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-sm text-base-content/60">
                            Les champs du mot de passe seront vidés après l’enregistrement.
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
                                    Mot de passe modifié
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

function PasswordField({
    id,
    label,
    description,
    value,
    onChange,
    error,
    inputRef,
    autoComplete,
    show,
    setShow,
    iconClass = 'bg-primary/10 text-primary',
}) {
    return (
        <div className="rounded-3xl border border-base-300 bg-base-100 p-5">
            <div className="mb-4 flex items-center gap-3">
                <div
                    className={`flex h-10 w-10 items-center justify-center rounded-2xl ${iconClass}`}
                >
                    <Lock className="h-5 w-5" />
                </div>

                <div>
                    <h3 className="font-black text-base-content">
                        {label}
                    </h3>
                    <p className="text-xs text-base-content/60">
                        {description}
                    </p>
                </div>
            </div>

            <InputLabel htmlFor={id} value={label} />

            <div className="relative mt-2">
                <TextInput
                    id={id}
                    ref={inputRef}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    type={show ? 'text' : 'password'}
                    className="block w-full rounded-2xl pr-12"
                    autoComplete={autoComplete}
                />

                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="btn btn-ghost btn-sm absolute right-2 top-1/2 -translate-y-1/2 rounded-xl"
                    tabIndex={-1}
                >
                    {show ? (
                        <EyeOff className="h-4 w-4" />
                    ) : (
                        <Eye className="h-4 w-4" />
                    )}
                </button>
            </div>

            <InputError message={error} className="mt-2" />
        </div>
    );
}