import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
import { Link, Head } from '@inertiajs/react';
import { User } from '@/types';
import { motion } from "framer-motion";

interface PageProps {
    auth: {
        user: User | null;
    };
    flash: {
        message?: string;
        status?: string;
        errors?: Record<string, string[]>;
    };
}

interface WelcomeProps extends PageProps {}

declare function route(name: string, params?: any): string;

export default function Welcome({ auth, flash }: WelcomeProps) {
    const user = auth.user;
    return (
        <>
            <Head title="Welcome" />
            <main className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-blue-50 to-yellow-50">
                {/* Navigation */}
                <nav className="w-full flex items-center justify-between px-4 py-4 md:px-8 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-20 border-b border-indigo-100">
                    <div className="flex items-center gap-3">
                        <motion.span 
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-indigo-600 to-yellow-400 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.2" fill="none" />
                                <path d="M8 15h8M8 11h8M8 7h8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                            </svg>
                        </motion.span>
                        <span className="font-bold text-xl md:text-2xl bg-gradient-to-r from-indigo-900 to-indigo-700 bg-clip-text text-transparent tracking-tight ml-2">Mekelle University</span>
                    </div>
                    <div className="flex gap-3 hidden md:flex">
                        <Button asChild variant="outline" className="rounded-full font-semibold border-indigo-200 text-indigo-900 hover:bg-indigo-50 hover:scale-105 transition-all duration-300">
                            <Link href={route('login')}>Login</Link>
                        </Button>
                            <Button asChild variant="default" className="rounded-full font-semibold bg-gradient-to-r from-yellow-400 to-yellow-500 text-indigo-900 hover:from-yellow-500 hover:to-yellow-600 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg">
                                <Link href={route('register')}>Signup (Complainers)</Link>
                            </Button>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="flex flex-col items-center justify-center text-center px-4 pt-12 pb-8 md:pt-20 md:pb-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-yellow-500 to-indigo-900 mb-6 leading-tight drop-shadow-sm">
                            Mekelle University <span className="block text-3xl md:text-5xl font-bold text-indigo-900 mt-2">Complaint Management System</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-700 mb-10 font-medium max-w-2xl mx-auto leading-relaxed">
                            A modern, secure, and efficient platform for managing and resolving complaints at <span className="font-semibold text-indigo-800">Mekelle University</span>. Your voice matters—let's make our campus better together.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                            <Button asChild variant="outline" className="rounded-full font-semibold border-indigo-200 text-indigo-900 hover:bg-indigo-50 hover:scale-105 transition-all duration-300 px-8">
                                <Link href={route('login')}>Login</Link>
                            </Button>
                                <Button asChild variant="default" className="rounded-full font-semibold bg-gradient-to-r from-yellow-400 to-yellow-500 text-indigo-900 hover:from-yellow-500 hover:to-yellow-600 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg px-8">
                                    <Link href={route('register')}>Signup (Complainers)</Link>
                                </Button> 
                        </div>
                    </motion.div>
                    {/* Decorative SVG divider */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="w-full flex justify-center mt-12"
                    >
                        <svg height="32" width="180" className="text-indigo-200" viewBox="0 0 180 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 16 Q45 32 90 16 T180 16" stroke="currentColor" strokeWidth="3" fill="none" />
                        </svg>
                    </motion.div>
                </section>

                {/* Flash messages */}
                {(flash.message || flash.status) && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mx-auto mt-4 w-full max-w-md"
                    >
                        <Card className="bg-green-50 border-green-200 animate-in fade-in slide-in-from-top-4 shadow-lg">
                            <div className="text-green-800 text-center font-medium py-3">
                                {flash.message && <div>{flash.message}</div>}
                                {flash.status && <div>{flash.status}</div>}
                            </div>
                        </Card>
                    </motion.div>
                )}

                {/* Footer */}
                <footer className="w-full text-center py-10 bg-gradient-to-r from-indigo-900 to-indigo-800 mt-auto">
                    <div className="text-white text-sm md:text-base font-medium">
                        &copy; {new Date().getFullYear()} Mekelle University &mdash; Helping resolve issues effectively and efficiently.
                    </div>
                    <div className="mt-3 text-indigo-200 text-xs">Contact: info@mu.edu.et | +251-XXX-XXXXXX</div>
                </footer>
            </main>
        </>
    );
} 
