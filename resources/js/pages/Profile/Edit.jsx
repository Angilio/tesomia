import Layout from '@/Layouts/Layout';
import { Head, usePage, useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { Camera, Mail, Phone, User } from 'lucide-react';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;
    const user = auth.user;

    const fileInput = useRef();

    const { data, setData, post, processing } = useForm({
        image: null
    });

    const handleImageChange = (e) => {
        setData('image', e.target.files[0]);
    };

    const submitImage = () => {
        post(route('profile.photo'), {
            forceFormData: true,
        });
    };

    const imageUrl = user.image ? `/storage/${user.image}` : null;

    return (
        <Layout
            header={
                <div>
                    <h2 className="text-2xl font-black text-base-content">
                        Profil utilisateur
                    </h2>
                    <p className="text-sm opacity-70">
                        Gérez vos informations personnelles
                    </p>
                </div>
            }
        >
            <Head title="Modifier le profil" />

            <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 py-10 px-4">
                <div className="mx-auto max-w-5xl space-y-8">

                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-secondary to-accent p-1 shadow-2xl">
                        <div className="bg-base-100 rounded-[1.35rem] p-6 md:p-8">

                            <div className="flex flex-col md:flex-row items-center gap-8">

                                <div className="relative">
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt={user.name}
                                            className="w-36 h-36 rounded-full object-cover border-4 border-primary shadow-xl"
                                        />
                                    ) : (
                                        <div className="w-36 h-36 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-content flex items-center justify-center text-5xl font-black shadow-xl">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                    )}

                                    <button
                                        type="button"
                                        onClick={() => fileInput.current.click()}
                                        className="absolute bottom-2 right-2 btn btn-circle btn-primary shadow-lg"
                                    >
                                        <Camera size={20} />
                                    </button>

                                    <input
                                        type="file"
                                        ref={fileInput}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </div>

                                <div className="flex-1 text-center md:text-left space-y-4">
                                    <div>
                                        <h1 className="text-3xl md:text-4xl font-black">
                                            {user.name}
                                        </h1>
                                        <p className="opacity-70">
                                            Compte utilisateur
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        <div className="rounded-2xl bg-base-200 p-4">
                                            <User size={18} className="mx-auto md:mx-0 mb-2 text-primary" />
                                            <p className="text-xs opacity-60">Nom</p>
                                            <p className="font-bold truncate">{user.name}</p>
                                        </div>

                                        <div className="rounded-2xl bg-base-200 p-4">
                                            <Mail size={18} className="mx-auto md:mx-0 mb-2 text-secondary" />
                                            <p className="text-xs opacity-60">Email</p>
                                            <p className="font-bold truncate">{user.email}</p>
                                        </div>

                                        <div className="rounded-2xl bg-base-200 p-4">
                                            <Phone size={18} className="mx-auto md:mx-0 mb-2 text-accent" />
                                            <p className="text-xs opacity-60">Contact</p>
                                            <p className="font-bold truncate">{user.contact || 'Non défini'}</p>
                                        </div>
                                    </div>

                                    {data.image && (
                                        <button
                                            onClick={submitImage}
                                            disabled={processing}
                                            className="btn btn-primary rounded-2xl shadow-lg"
                                        >
                                            {processing ? 'Enregistrement...' : 'Enregistrer la photo'}
                                        </button>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="
                        bg-base-100/90 backdrop-blur rounded-3xl shadow-xl border border-base-300 p-6 md:p-8
                        [&_input]:input
                        [&_input]:input-bordered
                        [&_input]:rounded-2xl
                        [&_input]:bg-base-100
                        [&_input]:text-base-content
                        [&_input]:w-full
                        [&_input:focus]:outline-none
                        [&_input:focus]:ring-2
                        [&_input:focus]:ring-primary
                        [&_label]:text-base-content
                    ">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </div>

                    <div className="
                        bg-base-100/90 backdrop-blur rounded-3xl shadow-xl border border-base-300 p-6 md:p-8
                        [&_input]:input
                        [&_input]:input-bordered
                        [&_input]:rounded-2xl
                        [&_input]:bg-base-100
                        [&_input]:text-base-content
                        [&_input]:w-full
                        [&_input:focus]:outline-none
                        [&_input:focus]:ring-2
                        [&_input:focus]:ring-primary
                        [&_label]:text-base-content
                    ">
                        <h3 className="text-xl font-black mb-5 text-base-content">
                            Sécurité du compte
                        </h3>

                        <UpdatePasswordForm />
                    </div>

                </div>
            </div>
        </Layout>
    );
}