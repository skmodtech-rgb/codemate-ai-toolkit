import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { TbApiApp } from "react-icons/tb";
import { useStore } from '../store/useStore';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const navigate = useNavigate();
    const { login } = useStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/login', {
                email, password
            });
            login(data);
            navigate('/app');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed. Try demo@toolmate.ai and demo123');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020817] flex items-center justify-center p-4 overflow-hidden relative selection:bg-brand-500/30">
            {/* Animated Background Gradients */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-600/20 rounded-full blur-[120px] mix-blend-screen animate-blob" />
            <div className="absolute top-[50%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000" />
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="glass-card rounded-2xl p-8 relative overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Lock className="w-48 h-48 rotate-12" />
                    </div>
                    
                    <div className="mb-8 flex flex-col items-center">
                        <div className="w-12 h-12 bg-gradient-to-tr from-brand-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-brand-500/20">
                            <TbApiApp className="w-8 h-8 text-white relative z-10" />
                        </div>
                        <h2 className="text-3xl font-bold text-white text-center tracking-tight mb-2">Welcome Back</h2>
                        <p className="text-slate-400 text-center">Enter your details to access your dashboard</p>
                    </div>

                    {error && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 flex rounded-lg mb-6">
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input 
                                    type="email" 
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="demo@toolmate.ai"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input 
                                    type="password" 
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="demo123"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" className="rounded-md border-white/10 bg-black/20 text-brand-500 focus:ring-brand-500/50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50" />
                                <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Remember me</span>
                            </label>
                            <a href="#" className="text-sm text-brand-400 hover:text-brand-300 transition-colors">Forgot password?</a>
                        </div>

                        <button 
                            disabled={loading}
                            type="submit" 
                            className="w-full relative group mt-6 h-12 flex justify-center items-center rounded-xl bg-gradient-to-r from-brand-600 to-indigo-500 text-white font-semibold text-sm shadow-xl shadow-brand-500/20 hover:shadow-brand-500/40 transition-all overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 mix-blend-overlay"></div>
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                <span className="flex items-center gap-2">Sign In <ArrowRight className="w-4 h-4" /></span>
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-slate-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-brand-400 font-semibold hover:text-brand-300 transition-colors">Create one</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
