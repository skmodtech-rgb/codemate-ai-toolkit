import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Cpu, FileImage, FileText, Send } from 'lucide-react';
import { TbApiApp } from "react-icons/tb";

export default function Home() {
    return (
        <div className="min-h-screen bg-[#020817] text-slate-100 overflow-hidden selection:bg-brand-500/30">
            {/* Minimal Background Gradients */}
            <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

            {/* Navbar */}
            <nav className="fixed w-full z-50 py-4 px-6 md:px-12 backdrop-blur-md bg-[#020817]/60 border-b border-white/5">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-500 shadow-lg">
                            <TbApiApp className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">ToolMate AI</span>
                    </div>
                    
                    <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                        <a href="#students" className="hover:text-white transition-colors">For Students</a>
                        <a href="#developers" className="hover:text-white transition-colors">For Developers</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/login" className="text-sm font-medium hover:text-white transition-colors">Sign in</Link>
                        <Link to="/register" className="px-4 py-2 text-sm font-semibold rounded-full bg-white text-black hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-6 md:px-12 flex flex-col items-center text-center">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl flex flex-col items-center"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 mb-8 text-sm font-medium">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                        </span>
                        Introducing ToolMate AI 1.0
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                        Power up your daily workflow with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-400">intelligent tools.</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl font-light">
                        The ultimate all-in-one AI platform tailored for students, teachers, and developers to generate media, process documents, and chat with cutting-edge AI.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/register" className="h-12 px-8 inline-flex justify-center items-center rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-semibold shadow-xl shadow-brand-500/20 hover:scale-105 transition-all">
                            Start Building Free
                            <Send className="ml-2 w-4 h-4" />
                        </Link>
                        <a href="#features" className="h-12 px-8 inline-flex justify-center items-center rounded-full bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all">
                            Explore Tools
                        </a>
                    </div>
                </motion.div>

                {/* Abstract UI Preview */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="mt-24 relative w-full max-w-5xl aspect-video rounded-xl bg-black/40 border border-white/10 shadow-2xl backdrop-blur-sm overflow-hidden flex"
                >
                    <div className="w-16 md:w-48 h-full bg-white/5 border-r border-white/10 flex flex-col p-4 gap-4">
                        <div className="h-4 w-full bg-white/10 rounded-full mb-8"></div>
                        {[1,2,3,4,5].map(i => <div key={i} className="h-8 w-full bg-white/5 rounded-lg"></div>)}
                    </div>
                    <div className="flex-1 p-6 md:p-10 flex flex-col">
                        <div className="h-8 w-48 bg-white/10 rounded-lg mb-8"></div>
                        <div className="flex gap-4 mb-6">
                            <div className="h-24 flex-1 bg-gradient-to-br from-brand-500/20 to-indigo-500/20 rounded-xl border border-white/5"></div>
                            <div className="h-24 flex-1 bg-gradient-to-br from-brand-500/20 to-indigo-500/20 rounded-xl border border-white/5"></div>
                            <div className="h-24 flex-1 bg-gradient-to-br from-brand-500/20 to-indigo-500/20 rounded-xl border border-white/5 hidden md:block"></div>
                        </div>
                        <div className="flex-1 w-full bg-white/5 rounded-xl border border-white/10 mt-4 p-4 flex flex-col">
                            <div className="w-full flex justify-between items-center mb-6">
                                <div className="h-4 w-32 bg-white/10 rounded-full"></div>
                                <div className="h-8 w-24 bg-brand-500/80 rounded-full"></div>
                            </div>
                            <div className="flex-1 bg-black/50 rounded-lg flex items-center justify-center border border-white/5">
                                <Activity className="w-12 h-12 text-white/20" />
                            </div>
                        </div>
                    </div>
                    {/* Gloss Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none mix-blend-overlay"></div>
                </motion.div>
            </section>

            {/* Feature Highlights section */}
            <section id="features" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Every tool you need, one platform.</h2>
                    <p className="text-slate-400">Say goodbye to 10 different subscriptions.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Feature Cards */}
                    {[
                        { icon: <FileImage className="w-6 h-6 text-pink-400" />, title: "AI Image & Video", desc: "Generate stunning media instantly from simple text prompts using state-of-the-art AI models." },
                        { icon: <Cpu className="w-6 h-6 text-brand-400" />, title: "Intelligent Chat", desc: "Access the best LLMs dynamically, customized for rapid problem-solving and coding." },
                        { icon: <FileText className="w-6 h-6 text-indigo-400" />, title: "Document Wizard", desc: "Merge, compress, and convert PDFs or Word docs on the fly without watermarks." },
                    ].map((feature, i) => (
                        <motion.div 
                            key={i}
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-xl flex flex-col gap-4 relative overflow-hidden group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold">{feature.title}</h3>
                            <p className="text-slate-400 flex-1">{feature.desc}</p>
                            
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity scale-150 transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
                                {feature.icon}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
