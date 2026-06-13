import Navbar from '@/Components/Navbar';

export default function GuestLayout({ children }) {
    return (
        <div className="relative min-h-screen overflow-hidden bg-base-200 text-base-content transition-colors duration-300">

            {/* BACKGROUND DECORATION */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
                <div className="absolute top-40 -right-32 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
                <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
            </div>

            {/* NAVBAR FIXE */}
            <div className="relative z-20">
                <Navbar />
            </div>

            {/* CONTENU */}
            <main className="relative z-10 px-4 pb-16 pt-5 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-7xl">
                    <div className="rounded-3xl border border-base-300/70 bg-base-100/80 p-4 shadow-xl backdrop-blur-md sm:p-6 lg:p-8">
                        {children}
                    </div>
                </div>
            </main>

        </div>
    );
}