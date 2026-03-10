import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
    Image as ImageIcon, Video, Mic, Type, Youtube, MessageSquare, Music, User, Podcast,
    FileText, File, Files, SplitSquareHorizontal, Minimize2, ImagePlus, FileImage, FileSearch, Globe, 
    MonitorPlay, Maximize, Crop, RefreshCw, Scissors, ArrowUpCircle, Film, Camera, Monitor, 
    Database, Code, ListTree, QrCode, Scan, Palette, GitCompare, LayoutGrid, 
    Binary, Key, CheckSquare, AlignLeft, Paintbrush,
    Hourglass, Activity, Clock, Scale, PenTool,
    Hash, CalendarDays, BarChart, TrendingUp, Zap, ArrowRight, Share2, TerminalSquare, Settings, LayoutDashboard,
    ShieldCheck
} from 'lucide-react';

const categories = [
    {
        title: "AI CREATOR STUDIO",
        description: "Content Creation Superpowers",
        color: "from-pink-500 to-rose-500",
        icon: Paintbrush,
        sectionId: "ai-creator-studio",
        tools: [
            { name: 'AI Text-to-Image', path: '/app/image-generator', icon: ImageIcon, active: true },
            { name: 'AI Video Generator', path: '/app/video-generator', icon: Video, active: true },
            { name: 'AI Text-to-Speech', path: '/app/text-to-speech', icon: Mic, active: true },
            { name: 'AI Speech-to-Text', path: '/app/speech-to-text', icon: Type, active: true },
            { name: 'YouTube Transcriber', path: '/app/youtube-transcriber', icon: Youtube, active: true },
            { name: 'AI Chatbots', path: '/app/chatbot', icon: MessageSquare, active: true },
            { name: 'AI Music Generator', path: '/app/music-generator', icon: Music, active: false },
            { name: 'AI Voice Cloning', path: '/app/voice-cloning', icon: Podcast, active: false },
            { name: 'AI Avatar Video', path: '/app/avatar-video', icon: User, active: false },
        ]
    },
    {
        title: "DOCUMENT WORKSHOP",
        description: "PDF & Document Magic",
        color: "from-emerald-500 to-green-500",
        icon: FileText,
        sectionId: "document-workshop",
        tools: [
            { name: 'PDF to Word', path: '/app/pdf-to-word', icon: FileText, active: true },
            { name: 'Word to PDF', path: '/app/word-to-pdf', icon: File, active: true },
            { name: 'PDF Merger', path: '/app/pdf-merger', icon: Files, active: true },
            { name: 'PDF Splitter', path: '/app/pdf-splitter', icon: SplitSquareHorizontal, active: true },
            { name: 'PDF Compressor', path: '/app/pdf-compressor', icon: Minimize2, active: true },
            { name: 'Image to PDF', path: '/app/image-to-pdf', icon: ImagePlus, active: true },
            { name: 'PDF to Images', path: '/app/pdf-to-images', icon: FileImage, active: true },
            { name: 'Resume Parser', path: '/app/resume-parser', icon: FileSearch, active: false },
            { name: 'Document Translator', path: '/app/document-translator', icon: Globe, active: false },
        ]
    },
    {
        title: "MEDIA STUDIO",
        description: "Image & Video Wizardry",
        color: "from-cyan-500 to-blue-500",
        icon: MonitorPlay,
        sectionId: "media-studio",
        tools: [
            { name: 'Image Compressor', path: '/app/image-compressor', icon: Minimize2, active: false },
            { name: 'Image Resizer', path: '/app/image-resizer', icon: Maximize, active: false },
            { name: 'Image Cropper', path: '/app/image-cropper', icon: Crop, active: false },
            { name: 'Format Converter', path: '/app/format-converter', icon: RefreshCw, active: false },
            { name: 'Background Remover', path: '/app/bg-remover', icon: Scissors, active: true },
            { name: 'Image Upscaler', path: '/app/image-upscaler', icon: ArrowUpCircle, active: false },
            { name: 'Video to GIF', path: '/app/video-to-gif', icon: Film, active: false },
            { name: 'GIF to Video', path: '/app/gif-to-video', icon: Camera, active: false },
            { name: 'Screen Recorder', path: '/app/screen-recorder', icon: Monitor, active: false },
            { name: 'Webcam Recorder', path: '/app/webcam-recorder', icon: Camera, active: false },
        ]
    },
    {
        title: "DATA INTELLIGENCE",
        description: "Transform Data into Insights",
        color: "from-amber-500 to-orange-500",
        icon: Database,
        sectionId: "data-intelligence",
        tools: [
            { name: 'CSV Visualizer', path: '/app/csv-visualizer', icon: LayoutGrid, active: false },
            { name: 'JSON Formatter', path: '/app/json-formatter', icon: Code, active: true },
            { name: 'JSON to CSV', path: '/app/json-to-csv', icon: RefreshCw, active: true },
            { name: 'CSV to JSON', path: '/app/csv-to-json', icon: RefreshCw, active: true },
            { name: 'QR Code Generator', path: '/app/qr-generator', icon: QrCode, active: true },
            { name: 'QR Code Scanner', path: '/app/qr-scanner', icon: Scan, active: false },
            { name: 'Color Palette Extractor', path: '/app/color-extractor', icon: Palette, active: false },
            { name: 'Data Comparator', path: '/app/data-comparator', icon: GitCompare, active: false },
            { name: 'Web Scraper', path: '/app/web-scraper', icon: Globe, active: false },
        ]
    },
    {
        title: "DEVELOPER TOOLKIT",
        description: "For Coders & Engineers",
        color: "from-indigo-500 to-violet-500",
        icon: TerminalSquare,
        sectionId: "developer-toolkit",
        tools: [
            { name: 'Base64 Encoder / Decoder', path: '/app/base64', icon: Binary, active: true },
            { name: 'JWT Debugger', path: '/app/jwt-debugger', icon: Key, active: true },
            { name: 'Hash Generator', path: '/app/hash-generator', icon: Hash, active: true },
            { name: 'Regex Tester', path: '/app/regex-tester', icon: CheckSquare, active: false },
            { name: 'HTML Formatter', path: '/app/html-formatter', icon: Code, active: false },
            { name: 'CSS Minifier', path: '/app/css-minifier', icon: Paintbrush, active: false },
            { name: 'JS Minifier', path: '/app/js-minifier', icon: Code, active: false },
            { name: 'API Tester', path: '/app/api-tester', icon: Zap, active: false },
            { name: 'SQL Formatter', path: '/app/sql-formatter', icon: Database, active: false },
        ]
    },
    {
        title: "UTILITY HUB",
        description: "Everyday Essential Tools",
        color: "from-slate-500 to-gray-500",
        icon: Settings,
        sectionId: "utility-hub",
        tools: [
            { name: 'Currency Converter', path: '/app/currency-converter', icon: Activity, active: true },
            { name: 'Password Generator', path: '/app/password-generator', icon: Key, active: true },
            { name: 'Password Strength', path: '/app/password-strength', icon: ShieldCheck, active: false },
            { name: 'Unit Converter', path: '/app/unit-converter', icon: Scale, active: false },
            { name: 'Age Calculator', path: '/app/age-calculator', icon: Hourglass, active: false },
            { name: 'Word Counter', path: '/app/word-counter', icon: Type, active: true },
            { name: 'Lorem Ipsum Generator', path: '/app/lorem-ipsum', icon: AlignLeft, active: true },
            { name: 'World Clock', path: '/app/world-clock', icon: Clock, active: false },
            { name: 'BMI Calculator', path: '/app/bmi-calculator', icon: Scale, active: false },
        ]
    },
    {
        title: "CONTENT CREATOR SUITE",
        description: "Social Media & Marketing",
        color: "from-fuchsia-500 to-purple-500",
        icon: Share2,
        sectionId: "content-creator-suite",
        tools: [
            { name: 'Tweet Generator', path: '/app/tweet-generator', icon: MessageSquare, active: false },
            { name: 'Thread Creator', path: '/app/thread-creator', icon: ListTree, active: false },
            { name: 'Hashtag Generator', path: '/app/hashtag-generator', icon: Hash, active: false },
            { name: 'Caption Writer', path: '/app/caption-writer', icon: PenTool, active: false },
            { name: 'Post Scheduler', path: '/app/post-scheduler', icon: CalendarDays, active: false },
            { name: 'Analytics Dashboard', path: '/app/analytics', icon: BarChart, active: false },
            { name: 'Trending Topics', path: '/app/trending', icon: TrendingUp, active: false },
            { name: 'Auto Poster', path: '/app/auto-poster', icon: Share2, active: false },
            { name: 'Content Calendar', path: '/app/content-calendar', icon: CalendarDays, active: false },
        ]
    }
];

const getEmoji = (title: string) => {
    if (title.includes('AI')) return '🎨';
    if (title.includes('DOCUMENT')) return '📄';
    if (title.includes('MEDIA')) return '🎬';
    if (title.includes('DATA')) return '📊';
    if (title.includes('DEVELOPER')) return '🔧';
    if (title.includes('UTILITY')) return '⚙️';
    return '📱';
};

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    show: { opacity: 1, scale: 1, y: 0 }
};

export default function Dashboard() {
    return (
        <div className="pb-12">
            {/* Header */}
            <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mb-2 flex items-center gap-3">
                        <LayoutDashboard className="w-7 h-7 sm:w-8 sm:h-8 text-brand-500" />
                        Explore Toolkit
                    </h1>
                    <p className="text-foreground/60 max-w-2xl text-sm sm:text-base">
                        Access all premium AI tools, media converters, and developer utilities organized into tailored categories.
                    </p>
                </div>
                <div className="flex gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-500/10 text-brand-400 text-xs font-semibold uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
                        System Online
                    </span>
                </div>
            </div>

            {/* Categories */}
            <div className="space-y-10 sm:space-y-12">
                {categories.map((category, idx) => (
                    <motion.div 
                        key={idx}
                        id={category.sectionId}
                        className="scroll-mt-24"
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {/* Category Header */}
                        <div className="flex items-center gap-3 border-b border-border pb-3 sm:pb-4 mb-4 sm:mb-6">
                            <div className={`p-2 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                                <category.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div className="min-w-0">
                                <h2 className="text-lg sm:text-2xl font-bold text-foreground flex items-center gap-2 truncate">
                                    <span className="truncate">{category.title}</span>
                                    <span>{getEmoji(category.title)}</span>
                                </h2>
                                <p className="text-xs sm:text-sm font-medium text-foreground/50 truncate">{category.description}</p>
                            </div>
                        </div>

                        {/* Tool Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                            {category.tools.map((tool, i) => (
                                tool.active ? (
                                    <motion.div key={i} variants={itemVariants}>
                                        <Link 
                                            to={tool.path}
                                            className="group flex items-center p-3 sm:p-4 rounded-xl glass-card hover:border-brand-500/50 hover:shadow-brand-500/10 transition-all duration-300 overflow-hidden relative"
                                        >
                                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${category.color} transition-opacity duration-500`}></div>
                                            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mr-3 sm:mr-4 group-hover:scale-110 transition-transform flex-shrink-0`}>
                                                <tool.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-xs sm:text-sm font-bold text-foreground truncate group-hover:text-brand-400 transition-colors">
                                                    {tool.name}
                                                </h3>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-foreground/20 group-hover:text-brand-500 transition-all opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 flex-shrink-0" />
                                        </Link>
                                    </motion.div>
                                ) : (
                                    <motion.div key={i} variants={itemVariants}>
                                        <div className="group flex items-center p-3 sm:p-4 rounded-xl border border-border/50 bg-background/30 opacity-60 cursor-not-allowed">
                                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gray-500/20 flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                                                <tool.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-xs sm:text-sm font-semibold text-gray-500 truncate">
                                                    {tool.name}
                                                </h3>
                                                <span className="text-[10px] uppercase font-bold text-gray-600 tracking-wider">Coming Soon</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
