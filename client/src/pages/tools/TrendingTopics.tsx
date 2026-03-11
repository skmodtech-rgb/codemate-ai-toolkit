import { useState } from 'react';
import { Instagram, Send, Loader2, MessageSquare, Heart, ExternalLink, Calendar, Hash, Flame } from 'lucide-react';
import axios from 'axios';
import { cn } from '../../utils/cn';

interface Post {
    displayUrl: string;
    caption: string;
    likesCount: number;
    commentsCount: number;
    timestamp: string;
    url: string;
    ownerFullName?: string;
    ownerUsername?: string;
}

export default function TrendingTopics() {
    const [hashtag, setHashtag] = useState('');
    const [limit, setLimit] = useState(5);
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleScrape = async () => {
        if (!hashtag) return;
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/tools/proxy/scrape-instagram`, {
                hashtag: hashtag.startsWith('#') ? hashtag.slice(1) : hashtag,
                limit: limit
            }, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('toolmate_user') || '{}')?.token}`
                }
            });

            if (res.data.success && res.data.posts) {
                setPosts(res.data.posts);
            } else if (res.data.error) {
                setError(res.data.error);
            } else {
                setError('Failed to fetch trending posts.');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'An error occurred while scraping.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto pb-20 px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="flex items-center gap-4">
                    <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-600 to-yellow-500 text-white shadow-xl shadow-pink-500/20">
                        <Instagram className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-foreground tracking-tight">Instagram Trending Scrapper</h1>
                        <p className="text-muted-foreground mt-1">Harness AI to find viral content and trending hashtags.</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative group min-w-[200px]">
                         <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-pink-500 transition-colors" />
                         <input
                            type="text"
                            placeholder="Enter hashtag..."
                            value={hashtag}
                            onChange={(e) => setHashtag(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleScrape()}
                            className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all font-medium"
                        />
                    </div>
                    <div className="flex items-center gap-2 bg-background border border-border p-1.5 rounded-xl">
                        <span className="text-xs font-bold px-2 text-muted-foreground">LIMIT</span>
                        {[5, 10, 20].map((val) => (
                            <button
                                key={val}
                                onClick={() => setLimit(val)}
                                className={cn(
                                    "w-8 h-8 rounded-lg text-xs font-bold transition-all",
                                    limit === val 
                                        ? "bg-pink-500 text-white shadow-lg shadow-pink-500/25" 
                                        : "hover:bg-accent text-foreground/60"
                                )}
                            >
                                {val}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={handleScrape}
                        disabled={loading || !hashtag}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-pink-500/30 disabled:opacity-50 disabled:shadow-none flex items-center gap-2 transition-all active:scale-95"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        {loading ? 'Analyzing...' : 'Scrape'}
                    </button>
                </div>
            </div>

            {error && (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-3 mb-8 animate-in fade-in slide-in-from-top-4">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <p className="text-sm font-medium">{error}</p>
                </div>
            )}

            {!loading && posts.length === 0 && !error && (
                <div className="flex flex-col items-center justify-center py-20 text-center glass-card border-dashed border-2 rounded-3xl opacity-60">
                    <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mb-4">
                        <Flame className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Ready to explore?</h3>
                    <p className="text-muted-foreground max-w-sm mt-2">Enter any hashtag like <strong className="text-pink-500">#technology</strong> to see trending posts and engagement stats.</p>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {posts.map((post, i) => (
                    <div 
                        key={i} 
                        className="group flex flex-col bg-background border border-border/50 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-pink-500/5 transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="relative aspect-square overflow-hidden bg-accent">
                            <img 
                                src={post.displayUrl} 
                                alt="Post thumbnail" 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6">
                                <div className="flex flex-col items-center text-white scale-0 group-hover:scale-100 transition-transform delay-75 duration-300">
                                    <Heart className="w-8 h-8 fill-red-500 text-red-500 mb-1" />
                                    <span className="font-black text-lg">{post.likesCount?.toLocaleString()}</span>
                                </div>
                                <div className="flex flex-col items-center text-white scale-0 group-hover:scale-100 transition-transform delay-100 duration-300">
                                    <MessageSquare className="w-8 h-8 fill-white mb-1" />
                                    <span className="font-black text-lg">{post.commentsCount?.toLocaleString()}</span>
                                </div>
                            </div>
                            <a 
                                href={post.url} 
                                target="_blank" 
                                rel="noreferrer"
                                className="absolute right-3 top-3 p-2 rounded-lg bg-black/20 backdrop-blur-md text-white/80 hover:text-white transition-colors"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                        
                        <div className="p-4 flex flex-col flex-1">
                            {post.ownerUsername && (
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[1.5px]">
                                        <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-[10px] font-bold">
                                            {post.ownerUsername[0].toUpperCase()}
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-foreground">@{post.ownerUsername}</span>
                                </div>
                            )}
                            
                            <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed mb-4 flex-1">
                                {post.caption || 'No caption provided.'}
                            </p>
                            
                            <div className="flex items-center justify-between pt-4 border-t border-border/50 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {new Date(post.timestamp).toLocaleDateString()}
                                </div>
                                <div className="text-pink-500 flex items-center gap-1">
                                    <Flame className="w-3.5 h-3.5" />
                                    POPULAR
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
