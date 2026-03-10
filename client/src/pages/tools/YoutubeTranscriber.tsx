import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube, FileText, Loader2, AlertCircle, Play } from 'lucide-react';
import axios from 'axios';

export default function YoutubeTranscriber() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [resultText, setResultText] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleTranscribe = async () => {
        if (!url.trim()) return;
        setLoading(true);
        setError(null);
        setResultText(null);

        try {
            const res = await axios.post('https://cmpunktg6.app.n8n.cloud/webhook/transcribe-video', { url });
            
            const text = res.data?.transcript || res.data?.text || res.data?.output || res.data;
            if (typeof text === 'string') {
                setResultText(text);
            } else if (typeof text === 'object') {
                setResultText(JSON.stringify(text, null, 2));
            } else {
                setError('Unexpected response format. Please try again.');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'An error occurred fetching the transcription.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pb-12 flex flex-col max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-500/20">
                        <Youtube className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    YouTube Transcriber
                </h1>
                <p className="text-foreground/60 mt-2 text-sm sm:text-base">Get instant, accurate transcripts from any YouTube video.</p>
            </div>

            <div className="glass-card rounded-2xl p-6 mb-6">
                <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Play className="w-4 h-4 text-red-500" />
                    YouTube Video URL
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                        type="url"
                        className="input-field flex-1 h-14 text-base"
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                    />
                    <button 
                        onClick={handleTranscribe}
                        disabled={loading || !url.trim()}
                        className="h-14 px-8 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-base shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileText className="w-5 h-5" />}
                        {loading ? 'Processing...' : 'Transcribe'}
                    </button>
                </div>
            </div>

            {error && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl flex items-start gap-3 text-sm mb-6">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p>{error}</p>
                </motion.div>
            )}

            <AnimatePresence>
                {resultText && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 border-red-500/20">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                Transcription Result
                            </h3>
                            <button 
                                onClick={() => navigator.clipboard.writeText(resultText)}
                                className="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors font-semibold"
                            >
                                Copy Text
                            </button>
                        </div>
                        <div className="w-full bg-background/50 rounded-xl p-4 border border-border shadow-inner max-h-[500px] overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                            {resultText}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
