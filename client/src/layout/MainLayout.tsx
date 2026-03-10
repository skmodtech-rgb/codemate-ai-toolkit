import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { 
    LayoutDashboard, Image as ImageIcon, Video, Code, Menu, Search, Sun, Moon, X,
    MessageSquare, Settings, LogOut, ChevronDown, MoreHorizontal,
    AlignLeft, Key, Binary, Hash as HashIcon, QrCode, Type, RefreshCw,
    FileText, MonitorPlay, Share2, Scissors
} from 'lucide-react';
import { TbApiApp } from "react-icons/tb";

const sidebarCategories = [
    { 
        title: 'AI Creator Studio', 
        emoji: '🎨',
        sectionId: 'ai-creator-studio',
        items: [
            { name: 'Image Generator', icon: ImageIcon, path: '/app/image-generator' },
            { name: 'Video Generator', icon: Video, path: '/app/video-generator' },
            { name: 'AI Chatbots', icon: MessageSquare, path: '/app/chatbot' },
        ]
    },
    { 
        title: 'Document Workshop', 
        emoji: '📄',
        sectionId: 'document-workshop',
        items: [
            { name: 'PDF Merger', icon: FileText, path: '/app/pdf-merger' },
            { name: 'PDF Splitter', icon: FileText, path: '/app/pdf-splitter' },
            { name: 'Image to PDF', icon: FileText, path: '/app/image-to-pdf' },
        ]
    },
    { 
        title: 'Media Studio', 
        emoji: '🎬',
        sectionId: 'media-studio',
        items: [
            { name: 'Image Compressor', icon: MonitorPlay, path: '/app/image-compressor' },
            { name: 'Background Remover', icon: Scissors, path: '/app/bg-remover' },
            { name: 'Screen Recorder', icon: MonitorPlay, path: '/app/screen-recorder' },
        ]
    },
    { 
        title: 'Data Intelligence', 
        emoji: '📊',
        sectionId: 'data-intelligence',
        items: [
            { name: 'JSON Formatter', icon: Code, path: '/app/json-formatter' },
            { name: 'JSON to CSV', icon: RefreshCw, path: '/app/json-to-csv' },
            { name: 'QR Generator', icon: QrCode, path: '/app/qr-generator' },
        ]
    },
    { 
        title: 'Developer Toolkit', 
        emoji: '🔧',
        sectionId: 'developer-toolkit',
        items: [
            { name: 'Base64 Encoder', icon: Binary, path: '/app/base64' },
            { name: 'Hash Generator', icon: HashIcon, path: '/app/hash-generator' },
            { name: 'JWT Debugger', icon: Key, path: '/app/jwt-debugger' },
        ]
    },
    { 
        title: 'Utility Hub', 
        emoji: '⚙️',
        sectionId: 'utility-hub',
        items: [
            { name: 'Password Generator', icon: Key, path: '/app/password-generator' },
            { name: 'Word Counter', icon: Type, path: '/app/word-counter' },
            { name: 'Lorem Ipsum', icon: AlignLeft, path: '/app/lorem-ipsum' },
        ]
    },
    { 
        title: 'Content Creator', 
        emoji: '📱',
        sectionId: 'content-creator-suite',
        items: [
            { name: 'Tweet Generator', icon: MessageSquare, path: '/app/tweet-generator' },
            { name: 'Hashtag Generator', icon: HashIcon, path: '/app/hashtag-generator' },
            { name: 'Caption Writer', icon: Share2, path: '/app/caption-writer' },
        ]
    },
];

export default function MainLayout() {
    const { isSidebarOpen, toggleSidebar, isDarkMode, toggleTheme, user, logout } = useStore();
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});

    const toggleCategory = (title: string) => {
        setExpandedCategories(prev => ({ ...prev, [title]: !prev[title] }));
    };

    const handleSeeMore = (sectionId: string) => {
        setMobileMenuOpen(false);
        if (location.pathname !== '/app') {
            navigate('/app');
            // Wait for navigation then scroll
            setTimeout(() => {
                const el = document.getElementById(sectionId);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        } else {
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleNavClick = () => {
        setMobileMenuOpen(false);
    };

    const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
        <div className="flex flex-col h-full">
            {/* Logo Area */}
            <div className="flex h-16 items-center px-4 border-b border-border justify-between overflow-hidden">
                <AnimatePresence mode='wait'>
                    {(isSidebarOpen || mobile) && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex items-center gap-2"
                        >
                            <div className="p-1 rounded-md bg-gradient-to-tr from-brand-600 to-brand-400">
                                <TbApiApp className="w-6 h-6 text-white" />
                            </div>
                            <span className="font-bold text-xl tracking-tight">ToolMate</span>
                        </motion.div>
                    )}
                </AnimatePresence>
                {mobile ? (
                    <button 
                        onClick={() => setMobileMenuOpen(false)} 
                        className="p-1.5 rounded-lg hover:bg-white/10 text-foreground transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                ) : (
                    <button 
                        onClick={toggleSidebar} 
                        className="p-1.5 rounded-lg hover:bg-white/10 text-foreground transition-colors hidden lg:block"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Dashboard Link */}
            <div className="px-3 pt-4">
                <Link
                    to="/app"
                    onClick={handleNavClick}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative overflow-hidden ${
                        location.pathname === '/app'
                            ? 'bg-brand-500/10 text-brand-400 font-medium' 
                            : 'text-foreground/70 hover:bg-white/5 hover:text-foreground'
                    }`}
                >
                    {location.pathname === '/app' && (
                        <motion.div layoutId="sidebar-active-indicator" className="absolute left-0 w-1 h-1/2 bg-brand-500 rounded-r-full" />
                    )}
                    <LayoutDashboard className={`w-5 h-5 flex-shrink-0 ${location.pathname === '/app' ? 'text-brand-500' : 'group-hover:text-brand-500'}`} />
                    {(isSidebarOpen || mobile) && <span className="whitespace-nowrap font-medium">Dashboard</span>}
                </Link>
            </div>

            {/* Sidebar Navigation */}
            <div className="flex-1 overflow-y-auto no-scrollbar py-3 flex flex-col gap-1">
                {sidebarCategories.map((category, i) => {
                    const isExpanded = expandedCategories[category.title] ?? true;
                    return (
                        <div key={i} className="px-3">
                            {(isSidebarOpen || mobile) && (
                                <button 
                                    onClick={() => toggleCategory(category.title)}
                                    className="w-full flex items-center justify-between px-2 py-2 text-xs font-semibold text-foreground/40 uppercase tracking-wider hover:text-foreground/60 transition-colors"
                                >
                                    <span className="flex items-center gap-1.5">
                                        <span>{category.emoji}</span>
                                        <span className="truncate">{category.title}</span>
                                    </span>
                                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? '' : '-rotate-90'}`} />
                                </button>
                            )}
                            {isExpanded && (
                                <div className="space-y-0.5">
                                    {category.items.map((item, j) => {
                                        const isActive = location.pathname === item.path;
                                        return (
                                            <Link
                                                key={j}
                                                to={item.path}
                                                onClick={handleNavClick}
                                                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all group relative overflow-hidden text-sm ${
                                                    isActive 
                                                        ? 'bg-brand-500/10 text-brand-400 font-medium' 
                                                        : 'text-foreground/70 hover:bg-white/5 hover:text-foreground'
                                                }`}
                                            >
                                                {isActive && (
                                                    <motion.div layoutId="sidebar-active-indicator" className="absolute left-0 w-1 h-1/2 bg-brand-500 rounded-r-full" />
                                                )}
                                                <item.icon className={`w-4 h-4 flex-shrink-0 transition-colors ${isActive ? 'text-brand-500' : 'group-hover:text-brand-500'}`} />
                                                {(isSidebarOpen || mobile) && (
                                                    <span className="origin-left whitespace-nowrap truncate">
                                                        {item.name}
                                                    </span>
                                                )}
                                            </Link>
                                        );
                                    })}
                                    {/* See More Link */}
                                    {(isSidebarOpen || mobile) && (
                                        <button
                                            onClick={() => handleSeeMore(category.sectionId)}
                                            className="flex items-center gap-3 px-3 py-1.5 rounded-xl transition-all text-xs text-brand-400/70 hover:text-brand-400 hover:bg-white/5 w-full"
                                        >
                                            <MoreHorizontal className="w-4 h-4 flex-shrink-0" />
                                            <span>See all tools</span>
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Bottom User Area */}
            <div className="p-4 border-t border-border mt-auto">
                {(isSidebarOpen || mobile) ? (
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-tr from-brand-600 to-indigo-500 text-white font-bold shrink-0 shadow-md">
                            {user?.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate text-foreground">{user?.name}</p>
                            <p className="text-xs text-foreground/50 truncate">{user?.email}</p>
                        </div>
                        <button onClick={logout} className="p-1.5 rounded-lg text-foreground/50 hover:bg-white/10 hover:text-red-500 transition-colors">
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <button onClick={logout} className="w-full h-9 flex items-center justify-center rounded-lg text-foreground/50 hover:bg-white/10 hover:text-red-500 transition-colors tooltip" title="Logout">
                        <LogOut className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Desktop Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? '16rem' : '4.5rem' }}
                className="relative z-20 flex-shrink-0 hidden lg:flex flex-col border-r border-border bg-card shadow-sm h-full"
            >
                <SidebarContent />
            </motion.aside>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        {/* Mobile Sidebar */}
                        <motion.aside 
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed inset-y-0 left-0 w-[280px] z-50 bg-card border-r border-border shadow-2xl lg:hidden flex flex-col"
                        >
                            <SidebarContent mobile />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full bg-background relative overflow-hidden min-w-0">
                {/* Top Navbar */}
                <header className="h-14 sm:h-16 flex-shrink-0 px-4 sm:px-6 border-b border-border flex items-center justify-between bg-card/50 backdrop-blur-sm z-10 sticky top-0">
                    <div className="flex items-center gap-3">
                        {/* Mobile Menu Button */}
                        <button 
                            onClick={() => setMobileMenuOpen(true)} 
                            className="p-2 rounded-lg hover:bg-white/10 text-foreground transition-colors lg:hidden"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        {/* Mobile Logo (shown only on mobile) */}
                        <div className="flex items-center gap-2 lg:hidden">
                            <div className="p-1 rounded-md bg-gradient-to-tr from-brand-600 to-brand-400">
                                <TbApiApp className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-lg tracking-tight">ToolMate</span>
                        </div>

                        {/* Desktop Search */}
                        <div className="relative hidden md:block group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-500" />
                            <input 
                                type="text" 
                                placeholder="Search tools..." 
                                className="pl-9 pr-4 py-2 text-sm rounded-full bg-background border border-border focus:outline-none focus:ring-2 focus:ring-brand-500/50 w-48 lg:w-64 transition-all"
                            />
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2 sm:gap-3">
                        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center">
                            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-400" />}
                        </button>
                        <button className="p-2 rounded-full hover:bg-white/10 transition-colors hidden sm:flex items-center justify-center">
                            <Settings className="w-5 h-5 text-foreground/70" />
                        </button>
                        <div className="h-6 w-px bg-border mx-1 hidden sm:block"></div>
                        <div className="text-sm font-medium mr-2 hidden sm:block">
                            Hi, {user?.name.split(' ')[0]} 👋
                        </div>
                    </div>
                </header>

                {/* Main scrollable view */}
                <div className="flex-1 overflow-y-auto w-full p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-background via-background to-brand-950/20">
                    <div className="max-w-7xl mx-auto h-full">
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={location.pathname}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="min-h-full"
                            >
                                <Outlet />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>
        </div>
    );
}
