import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export const Login = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                if (userCredential.user.email === 'pratham.solanki30@gmail.com') {
                    navigate('/admin');
                } else {
                    navigate('/dashboard');
                }
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                // New users default to dashboard unless specifically the admin email (unlikely for new signup unless re-registering)
                if (userCredential.user.email === 'pratham.solanki30@gmail.com') {
                    navigate('/admin');
                } else {
                    navigate('/dashboard');
                }
            }
        } catch (err: any) {
            setError(err.message.replace('Firebase: ', ''));
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            if (result.user.email === 'pratham.solanki30@gmail.com') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (err: any) {
            setError(err.message.replace('Firebase: ', ''));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white font-sans">
            {/* Left Side - Visual */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-black overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                <div className="relative z-10 flex flex-col justify-end p-20 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="font-display font-medium text-6xl text-white leading-tight mb-6 tracking-tighter">
                            Everything you need,<br />to make anything you want.
                        </h1>
                        <p className="text-gray-400 text-lg font-light max-w-md">
                            Dozens of creative projects to ideate, generate and edit content like never before.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-white relative">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left mb-10">
                        <Link to="/" className="inline-block mb-12">
                            <span className="font-display font-bold text-2xl tracking-tighter">
                                CAMPUS<span className="text-pinnacle-green">HUB</span>
                            </span>
                        </Link>
                        <h2 className="font-display font-medium text-4xl mb-3 tracking-tight">
                            {isLogin ? 'Welcome back' : 'Create your account'}
                        </h2>
                        <p className="text-gray-500">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-pinnacle-purple font-semibold hover:underline transition-colors"
                            >
                                {isLogin ? 'Sign up for free' : 'Log in'}
                            </button>
                        </p>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-5">
                        <div className="space-y-5">
                            <div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Username or Email"
                                    className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                                />
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg border border-red-100">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white font-medium py-3.5 rounded-full hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-[15px]"
                        >
                            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (isLogin ? 'Log in' : 'Sign up')}
                        </button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase text-gray-400 font-medium tracking-wider">
                            <span className="bg-white px-4">OR</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors bg-white font-medium text-gray-700 text-[15px]"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Log in with Google
                        </button>
                    </div>

                    <div className="text-center mt-8">
                        <button className="text-sm text-gray-400 hover:text-gray-600 font-medium transition-colors">
                            Forgot Password
                        </button>
                    </div>

                    <div className="mt-8 text-center">
                        <Link to="/community" className="text-xs text-gray-300 hover:text-gray-500 font-medium transition-colors">
                            Back to Community
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
