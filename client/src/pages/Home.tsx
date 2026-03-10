import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Shield, Globe, FileText, Code, Image as ImageIcon, Video, MessageSquare, Cpu, ChevronRight } from 'lucide-react';
import { TbApiApp } from "react-icons/tb";

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const features = [
    { icon: ImageIcon, title: 'AI Image Studio', desc: 'Generate stunning visuals from text prompts with state-of-the-art diffusion models.', color: '#4da8a8' },
    { icon: Video, title: 'Video Generation', desc: 'Create professional video content powered by advanced AI pipelines.', color: '#7ec4c4' },
    { icon: MessageSquare, title: 'Smart Chatbots', desc: 'Chat with the best LLMs for coding, research, and creative brainstorming.', color: '#2d8a8a' },
    { icon: FileText, title: 'Document Workshop', desc: 'Merge, split, compress PDFs. Convert formats instantly without watermarks.', color: '#4da8a8' },
    { icon: Code, title: 'Developer Toolkit', desc: 'Base64, JWT, Regex, API testing, minifiers — everything a developer needs.', color: '#7ec4c4' },
    { icon: Cpu, title: 'Data Intelligence', desc: 'CSV visualization, JSON tools, QR codes, color extraction and more.', color: '#2d8a8a' },
];

const stats = [
    { value: '50+', label: 'AI Tools' },
    { value: '10K+', label: 'Users' },
    { value: '99.9%', label: 'Uptime' },
    { value: '0', label: 'Cost' },
];

export default function Home() {
    return (
        <div className="min-h-screen overflow-hidden relative">
            {/* Background Orbs */}
            <div className="bg-orb w-[600px] h-[600px] bg-brand-300/40 top-[-200px] left-[-100px] animate-blob" />
            <div className="bg-orb w-[500px] h-[500px] bg-brand-200/30 bottom-[-100px] right-[-100px] animate-blob animation-delay-2000" />
            <div className="bg-orb w-[400px] h-[400px] bg-brand-400/20 top-[40%] left-[50%] animate-blob animation-delay-4000" />

            {/* ====== NAVBAR ====== */}
            <nav className="fixed w-full z-50 top-0">
                <div className="mx-4 sm:mx-8 mt-4">
                    <div className="glass-card rounded-2xl px-4 sm:px-6 py-3">
                        <div className="max-w-7xl mx-auto flex justify-between items-center">
                            <Link to="/" className="flex items-center gap-2.5 group">
                                <div className="p-1.5 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/40 transition-shadow">
                                    <TbApiApp className="w-5 h-5 text-white" />
                                </div>
                                <span className="font-bold text-lg tracking-tight text-foreground">ToolMate <span className="text-gradient">AI</span></span>
                            </Link>
                            
                            <div className="hidden md:flex items-center gap-8">
                                <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
                                <a href="#stats" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Stats</a>
                                <a href="#cta" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Get Started</a>
                            </div>

                            <div className="flex items-center gap-3">
                                <Link to="/login" className="text-sm font-semibold text-foreground hover:text-brand-500 transition-colors hidden sm:block">
                                    Sign in
                                </Link>
                                <Link to="/register" className="btn-primary text-sm px-5 py-2.5 rounded-xl">
                                    Get Started Free
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* ====== HERO SECTION ====== */}
            <section className="relative pt-32 sm:pt-40 pb-20 px-4 sm:px-8 flex flex-col items-center text-center">
                <motion.div 
                    initial="hidden" animate="visible" variants={stagger}
                    className="max-w-4xl flex flex-col items-center relative z-10"
                >
                    <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-8 text-sm font-medium text-brand-600 dark:text-brand-300">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
                        </span>
                        Introducing ToolMate AI — 50+ Tools in One Platform
                    </motion.div>

                    <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] text-foreground">
                        Power up your<br />
                        workflow with{' '}
                        <span className="text-gradient">intelligent tools.</span>
                    </motion.h1>
                    
                    <motion.p variants={fadeIn} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl font-light leading-relaxed">
                        The ultimate all-in-one AI platform tailored for students, teachers, and developers to generate media, process documents, and build with AI.
                    </motion.p>
                    
                    <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                        <Link to="/register" className="btn-primary h-14 px-8 text-base rounded-2xl gap-2 group">
                            Start Building Free
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a href="#features" className="btn-secondary h-14 px-8 text-base rounded-2xl gap-2">
                            <Sparkles className="w-4 h-4" />
                            Explore Tools
                        </a>
                    </motion.div>
                </motion.div>

                {/* Abstract Dashboard Preview */}
                <motion.div 
                    initial={{ opacity: 0, y: 60, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-16 sm:mt-24 relative w-full max-w-5xl"
                >
                    <div className="glass-card rounded-3xl overflow-hidden shadow-glass-lg">
                        <div className="flex">
                            {/* Mock Sidebar */}
                            <div className="w-14 sm:w-52 h-[400px] sm:h-[480px] border-r border-border/50 p-3 sm:p-4 flex flex-col gap-3 bg-white/5 dark:bg-black/10 shrink-0">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-7 h-7 rounded-lg bg-brand-500/20 shrink-0" />
                                    <div className="h-3 w-20 bg-foreground/10 rounded-full hidden sm:block" />
                                </div>
                                {[1,2,3,4,5,6].map(i => (
                                    <div key={i} className={`flex items-center gap-2 px-2 py-2 rounded-xl transition-all ${i === 1 ? 'bg-brand-500/10' : ''}`}>
                                        <div className={`w-5 h-5 rounded-lg shrink-0 ${i === 1 ? 'bg-brand-500/30' : 'bg-foreground/5'}`} />
                                        <div className={`h-2.5 rounded-full hidden sm:block ${i === 1 ? 'w-20 bg-brand-500/20' : 'w-16 bg-foreground/5'}`} />
                                    </div>
                                ))}
                            </div>
                            {/* Mock Content */}
                            <div className="flex-1 p-4 sm:p-8 flex flex-col">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="h-4 w-32 bg-foreground/10 rounded-full" />
                                    <div className="flex gap-2">
                                        <div className="w-8 h-8 rounded-full bg-foreground/5" />
                                        <div className="w-8 h-8 rounded-full bg-brand-500/20" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                                    {[1,2,3].map(i => (
                                        <div key={i} className={`h-24 sm:h-28 rounded-2xl border border-border/30 bg-brand-500/5 flex flex-col items-center justify-center gap-2 ${i === 3 ? 'hidden sm:flex' : ''}`}>
                                            <div className="w-8 h-8 rounded-xl bg-brand-500/10" />
                                            <div className="h-2 w-16 rounded-full bg-foreground/5" />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex-1 rounded-2xl border border-border/30 bg-white/5 dark:bg-black/10 p-4 sm:p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="h-3 w-24 bg-foreground/10 rounded-full" />
                                        <div className="h-8 w-20 bg-brand-500/30 rounded-full" />
                                    </div>
                                    <div className="flex-1 h-32 rounded-xl bg-gradient-to-br from-brand-500/5 to-brand-400/5 border border-border/20 flex items-center justify-center">
                                        <Sparkles className="w-10 h-10 text-brand-400/30" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Glow effect behind the preview */}
                    <div className="absolute inset-0 -z-10 bg-brand-400/10 rounded-3xl blur-3xl scale-95" />
                </motion.div>
            </section>

            {/* ====== STATS BAR ====== */}
            <section id="stats" className="py-16 px-4 sm:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div 
                        initial="hidden" whileInView="visible" viewport={{ once: true }}
                        variants={stagger}
                        className="glass-card rounded-3xl p-6 sm:p-10 grid grid-cols-2 md:grid-cols-4 gap-6"
                    >
                        {stats.map((s, i) => (
                            <motion.div key={i} variants={fadeIn} className="text-center">
                                <p className="text-3xl sm:text-4xl font-extrabold text-gradient mb-1">{s.value}</p>
                                <p className="text-sm text-muted-foreground font-medium">{s.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ====== FEATURES GRID ====== */}
            <section id="features" className="py-20 px-4 sm:px-8 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
                        <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs font-semibold text-brand-500 uppercase tracking-wider mb-4">
                            <Zap className="w-3 h-3" /> Features
                        </motion.div>
                        <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-extrabold mb-4 text-foreground">
                            Every tool you need,<br /><span className="text-gradient">one platform.</span>
                        </motion.h2>
                        <motion.p variants={fadeIn} className="text-muted-foreground max-w-lg mx-auto">
                            Say goodbye to 10 different subscriptions. Everything is built-in and ready to use.
                        </motion.p>
                    </motion.div>

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {features.map((feature, i) => (
                            <motion.div 
                                key={i}
                                variants={fadeIn}
                                whileHover={{ y: -6, scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                className="glass-card rounded-3xl p-7 flex flex-col gap-4 group cursor-pointer"
                            >
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${feature.color}18` }}>
                                    <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                                </div>
                                <h3 className="text-lg font-bold text-foreground group-hover:text-brand-500 transition-colors">{feature.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{feature.desc}</p>
                                <div className="flex items-center gap-1 text-sm font-semibold text-brand-500 opacity-0 group-hover:opacity-100 transition-all translate-x-0 group-hover:translate-x-1">
                                    Explore <ChevronRight className="w-4 h-4" />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ====== TRUST SECTION ====== */}
            <section className="py-20 px-4 sm:px-8 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <motion.div 
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
                        className="glass-card rounded-3xl p-8 sm:p-12 grid md:grid-cols-3 gap-8"
                    >
                        {[
                            { icon: Shield, title: 'Secure by Default', desc: 'All data is encrypted in transit and at rest. Your files never leave your browser.' },
                            { icon: Zap, title: 'Blazing Fast', desc: 'Client-side processing for most tools. No uploads, no waiting, instant results.' },
                            { icon: Globe, title: 'Works Everywhere', desc: 'Fully responsive. Works on desktop, tablet, and mobile browsers seamlessly.' },
                        ].map((item, i) => (
                            <motion.div key={i} variants={fadeIn} className="text-center flex flex-col items-center gap-3">
                                <div className="w-14 h-14 rounded-2xl bg-brand-500/10 flex items-center justify-center mb-2">
                                    <item.icon className="w-6 h-6 text-brand-500" />
                                </div>
                                <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ====== CTA SECTION ====== */}
            <section id="cta" className="py-20 px-4 sm:px-8 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                        <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-extrabold mb-4 text-foreground">
                            Ready to supercharge<br />your workflow?
                        </motion.h2>
                        <motion.p variants={fadeIn} className="text-muted-foreground mb-10 max-w-lg mx-auto">
                            Join thousands of students and developers already using ToolMate AI. Free forever.
                        </motion.p>
                        <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/register" className="btn-primary h-14 px-10 text-base rounded-2xl gap-2 group">
                                Create Free Account
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ====== FOOTER ====== */}
            <footer className="py-10 px-4 sm:px-8 border-t border-border/50 relative z-10">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="p-1 rounded-lg bg-gradient-to-tr from-brand-600 to-brand-400">
                            <TbApiApp className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-foreground">ToolMate AI</span>
                    </div>
                    <p className="text-xs text-muted-foreground">© 2026 ToolMate AI. Built for the future.</p>
                </div>
            </footer>
        </div>
    );
}
