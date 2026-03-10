import { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { 
    LayoutDashboard, Image as ImageIcon, Video, Code, Menu, Search, Sun, Moon, X,
    MessageSquare, LogOut, ChevronDown,
    Key, Binary, Hash as HashIcon, QrCode, Type, RefreshCw,
    FileText, MonitorPlay, Scissors, User, Settings, Lock
} from 'lucide-react';
import { TbApiApp } from "react-icons/tb";

const sidebarCategories = [
    { 
        title: 'AI Studio', 
        icon: '🎨',
        items: [
            { name: 'Image Generator', icon: ImageIcon, path: '/app/image-generator' },
            { name: 'Video Generator', icon: Video, path: '/app/video-generator' },
            { name: 'AI Chatbots', icon: MessageSquare, path: '/app/chatbot' },
        ]
    },
    { 
        title: 'Documents', 
        icon: '📄',
        items: [
            { name: 'PDF Merger', icon: FileText, path: '/app/pdf-merger' },
            { name: 'PDF Splitter', icon: FileText, path: '/app/pdf-splitter' },
            { name: 'Image to PDF', icon: FileText, path: '/app/image-to-pdf' },
        ]
    },
    { 
        title: 'Media', 
        icon: '🎬',
        items: [
            { name: 'Compressor', icon: MonitorPlay, path: '/app/image-compressor' },
            { name: 'BG Remover', icon: Scissors, path: '/app/bg-remover' },
            { name: 'Screen Rec', icon: MonitorPlay, path: '/app/screen-recorder' },
        ]
    },
    { 
        title: 'Data', 
        icon: '📊',
        items: [
            { name: 'JSON Tools', icon: Code, path: '/app/json-formatter' },
            { name: 'CSV Convert', icon: RefreshCw, path: '/app/json-to-csv' },
            { name: 'QR Generator', icon: QrCode, path: '/app/qr-generator' },
        ]
    },
    { 
        title: 'Dev Tools', 
        icon: '🔧',
        items: [
            { name: 'Base64', icon: Binary, path: '/app/base64' },
            { name: 'Hash Gen', icon: HashIcon, path: '/app/hash-generator' },
            { name: 'JWT Debug', icon: Key, path: '/app/jwt-debugger' },
        ]
    },
    { 
        title: 'Utilities', 
        icon: '⚙️',
        items: [
            { name: 'Passwords', icon: Key, path: '/app/password-generator' },
            { name: 'Word Count', icon: Type, path: '/app/word-counter' },
            { name: 'Lorem Ipsum', icon: Type, path: '/app/lorem-ipsum' },
        ]
    },
];

export default function MainLayout() {
    const { isSidebarOpen, toggleSidebar, isDarkMode, toggleTheme, user, logout } = useStore();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Auto-expand category that contains the active route
    useEffect(() => {
        const active = sidebarCategories.find(cat => 
            cat.items.some(item => location.pathname === item.path)
        );
        if (active) setExpandedCategory(active.title);
    }, [location.pathname]);

    const handleNavClick = () => setMobileMenuOpen(false);

    const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex h-16 items-center px-4 justify-between shrink-0">
                <AnimatePresence mode='wait'>
                    {(isSidebarOpen || mobile) && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex items-center gap-2.5"
                        >
                            <div className="p-1.5 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 shadow-md shadow-brand-500/20">
                                <TbApiApp className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-lg tracking-tight text-foreground">ToolMate</span>
                        </motion.div>
                    )}
                </AnimatePresence>
                {mobile ? (
                    <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl hover:bg-[var(--hover-bg)] transition-all">
                        <X className="w-5 h-5 text-foreground" />
                    </button>
                ) : (
                    <button onClick={toggleSidebar} className="p-2 rounded-xl hover:bg-[var(--hover-bg)] transition-all hidden lg:block">
                        <Menu className="w-4 h-4 text-muted-foreground" />
                    </button>
                )}
            </div>

            {/* Dashboard Link */}
            <div className="px-3 pt-2 pb-1">
                <Link
                    to="/app"
                    onClick={handleNavClick}
                    className={`sidebar-item ${location.pathname === '/app' ? 'active' : ''}`}
                >
                    {location.pathname === '/app' && (
                        <motion.div layoutId="sidebar-pill" className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-brand-500 rounded-r-full" />
                    )}
                    <LayoutDashboard className={`w-[18px] h-[18px] shrink-0 ${location.pathname === '/app' ? 'text-brand-500' : 'text-muted-foreground'}`} />
                    {(isSidebarOpen || mobile) && <span className="text-sm font-medium">Dashboard</span>}
                </Link>
            </div>

            {/* Divider */}
            <div className="mx-4 my-2 h-px bg-border/50" />

            {/* Navigation Categories */}
            <div className="flex-1 overflow-y-auto custom-scrollbar py-1 px-3 space-y-0.5">
                {sidebarCategories.map((category) => {
                    const isExpanded = expandedCategory === category.title;
                    const hasActive = category.items.some(item => location.pathname === item.path);
                    
                    return (
                        <div key={category.title}>
                            {(isSidebarOpen || mobile) ? (
                                <button 
                                    onClick={() => setExpandedCategory(isExpanded ? null : category.title)}
                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                                        hasActive ? 'text-brand-500' : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <span className="text-sm">{category.icon}</span>
                                        <span>{category.title}</span>
                                    </span>
                                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? 'rotate-0' : '-rotate-90'}`} />
                                </button>
                            ) : (
                                <div className="flex justify-center py-2 text-sm" title={category.title}>
                                    {category.icon}
                                </div>
                            )}
                            
                            <AnimatePresence>
                                {isExpanded && (isSidebarOpen || mobile) && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="space-y-0.5 pb-1">
                                            {category.items.map((item) => {
                                                const isActive = location.pathname === item.path;
                                                return (
                                                    <Link
                                                        key={item.path}
                                                        to={item.path}
                                                        onClick={handleNavClick}
                                                        className={`sidebar-item text-sm ml-2 ${isActive ? 'active' : 'text-muted-foreground hover:text-foreground'}`}
                                                    >
                                                        {isActive && (
                                                            <motion.div layoutId="sidebar-pill" className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-brand-500 rounded-r-full" />
                                                        )}
                                                        <item.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-brand-500' : ''}`} />
                                                        <span className="truncate">{item.name}</span>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>

            {/* Bottom User Area */}
            <div className="p-3 border-t border-border/50 mt-auto shrink-0">
                {(isSidebarOpen || mobile) ? (
                    <div className="flex items-center gap-3 px-2 py-1.5">
                        <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-tr from-brand-500 to-brand-400 text-white font-bold text-sm shrink-0 shadow-md shadow-brand-500/20">
                            {user?.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate text-foreground">{user?.name}</p>
                            <p className="text-[11px] text-muted-foreground truncate">{user?.email}</p>
                        </div>
                        <button onClick={logout} className="p-2 rounded-xl hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-all" title="Sign Out">
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <button onClick={logout} className="w-full flex items-center justify-center p-2 rounded-xl hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-all" title="Sign Out">
                        <LogOut className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <div className="flex h-screen overflow-hidden relative">
            {/* Background Orbs (subtle) */}
            <div className="bg-orb w-[400px] h-[400px] bg-brand-300/20 top-[-100px] right-[-100px] animate-blob" />
            <div className="bg-orb w-[300px] h-[300px] bg-brand-400/15 bottom-[-50px] left-[30%] animate-blob animation-delay-4000" />

            {/* Desktop Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? '15rem' : '4.5rem' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="relative z-20 shrink-0 hidden lg:flex flex-col glass-sidebar h-full"
            >
                <SidebarContent />
            </motion.aside>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        <motion.aside 
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed inset-y-0 left-0 w-[280px] z-50 glass-sidebar shadow-glass-lg lg:hidden flex flex-col"
                        >
                            <SidebarContent mobile />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full relative overflow-hidden min-w-0">
                {/* Top Navbar */}
                <header className="h-16 shrink-0 px-4 sm:px-6 glass-navbar flex items-center justify-between z-10 sticky top-0">
                    <div className="flex items-center gap-3">
                        {/* Mobile menu trigger */}
                        <button 
                            onClick={() => setMobileMenuOpen(true)} 
                            className="p-2 rounded-xl hover:bg-[var(--hover-bg)] transition-all lg:hidden"
                        >
                            <Menu className="w-5 h-5 text-foreground" />
                        </button>

                        {/* Mobile Logo */}
                        <div className="flex items-center gap-2 lg:hidden">
                            <div className="p-1 rounded-lg bg-gradient-to-tr from-brand-600 to-brand-400">
                                <TbApiApp className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-bold text-base tracking-tight text-foreground">ToolMate</span>
                        </div>

                        {/* Desktop Search */}
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input 
                                type="text" 
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="Search tools..." 
                                className="glass-input pl-9 pr-4 py-2.5 text-sm rounded-xl w-56 lg:w-72"
                            />
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        {/* Theme Toggle */}
                        <button 
                            onClick={toggleTheme} 
                            className="p-2.5 rounded-xl hover:bg-[var(--hover-bg)] transition-all relative overflow-hidden group"
                            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            <AnimatePresence mode="wait">
                                {isDarkMode ? (
                                    <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <Sun className="w-[18px] h-[18px] text-amber-400" />
                                    </motion.div>
                                ) : (
                                    <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <Moon className="w-[18px] h-[18px] text-brand-500" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>

                        {/* Divider */}
                        <div className="h-6 w-px bg-border hidden sm:block" />

                        {/* Profile Dropdown */}
                        <div className="relative" ref={profileRef}>
                            <button 
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl hover:bg-[var(--hover-bg)] transition-all"
                            >
                                <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-gradient-to-tr from-brand-500 to-brand-400 text-white font-bold text-xs shadow-sm">
                                    {user?.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-sm font-medium text-foreground hidden sm:block">{user?.name.split(' ')[0]}</span>
                                <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground hidden sm:block transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {profileOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute right-0 mt-2 w-64 glass-card rounded-2xl shadow-glass-lg overflow-hidden z-50"
                                    >
                                        {/* User info */}
                                        <div className="p-4 border-b border-border/50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-tr from-brand-500 to-brand-400 text-white font-bold text-sm shadow-md">
                                                    {user?.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-semibold text-foreground truncate">{user?.name}</p>
                                                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Menu items */}
                                        <div className="p-2">
                                            <Link 
                                                to="/app/profile"
                                                onClick={() => setProfileOpen(false)}
                                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-foreground hover:bg-[var(--hover-bg)] transition-all"
                                            >
                                                <User className="w-4 h-4 text-muted-foreground" />
                                                <span>My Profile</span>
                                            </Link>
                                            <Link 
                                                to="/app/settings"
                                                onClick={() => setProfileOpen(false)}
                                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-foreground hover:bg-[var(--hover-bg)] transition-all"
                                            >
                                                <Settings className="w-4 h-4 text-muted-foreground" />
                                                <span>Settings</span>
                                            </Link>
                                            <Link
                                                to="/app/change-password"
                                                onClick={() => setProfileOpen(false)}
                                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-foreground hover:bg-[var(--hover-bg)] transition-all"
                                            >
                                                <Lock className="w-4 h-4 text-muted-foreground" />
                                                <span>Change Password</span>
                                            </Link>
                                        </div>
                                        {/* Sign out */}
                                        <div className="p-2 border-t border-border/50">
                                            <button 
                                                onClick={() => { logout(); setProfileOpen(false); }}
                                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-500/10 transition-all w-full"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                <span>Sign Out</span>
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                {/* Main scrollable view */}
                <div className="flex-1 overflow-y-auto custom-scrollbar w-full p-4 sm:p-6 lg:p-8 relative">
                    <div className="max-w-7xl mx-auto h-full relative z-10">
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={location.pathname}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.25, ease: 'easeOut' }}
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
