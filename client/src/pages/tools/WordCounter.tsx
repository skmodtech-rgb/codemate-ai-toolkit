import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Type, Activity, AlignLeft, Hash } from 'lucide-react';

export default function WordCounter() {
    const [text, setText] = useState('');

    const stats = useMemo(() => {
        const words = text.trim() ? text.trim().split(/\s+/) : [];
        const characters = text.length;
        const charactersNoSpaces = text.replace(/\s/g, '').length;
        const wordCount = words.length;
        const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length;
        
        let readingTime = 0;
        if (wordCount > 0) {
            readingTime = Math.ceil(wordCount / 200); // 200 words per minute
        }

        return { wordCount, characters, charactersNoSpaces, paragraphs, readingTime };
    }, [text]);

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pb-12 h-full flex flex-col">
            <div className="mb-6">
                <h1 className="text-3xl font-extrabold flex items-center gap-3">
                    <Type className="w-8 h-8 text-brand-500" />
                    Word Counter
                </h1>
                <p className="text-foreground/60 mt-2">Real-time word, character, and paragraph statistics for your text.</p>
            </div>

            <div className="glass-card rounded-2xl p-6 w-full max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">
                <div className="flex-1 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-semibold text-foreground/80">Input Text</label>
                        <button 
                            onClick={() => setText('')}
                            className="text-sm text-foreground/60 hover:text-red-400 transition-colors"
                        >
                            Clear Text
                        </button>
                    </div>
                    <textarea 
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="input-field flex-1 min-h-[400px] resize-none focus:ring-brand-500"
                        placeholder="Type or paste your text here to get instant word count and text statistics..."
                    />
                </div>

                <div className="lg:w-[320px] pb-6 flex flex-col gap-4 sticky top-6 self-start">
                    <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-brand-500" />
                        Text Statistics
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                        <div className="p-4 rounded-xl border border-border bg-background/50 flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-foreground/60">
                                <AlignLeft className="w-4 h-4" />
                                <span className="text-sm font-semibold uppercase tracking-wider">Words</span>
                            </div>
                            <span className="text-3xl font-bold text-brand-400">{stats.wordCount}</span>
                        </div>
                        <div className="p-4 rounded-xl border border-border bg-background/50 flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-foreground/60">
                                <Type className="w-4 h-4" />
                                <span className="text-sm font-semibold uppercase tracking-wider">Characters</span>
                            </div>
                            <span className="text-3xl font-bold text-foreground">{stats.characters}</span>
                        </div>
                        <div className="p-4 rounded-xl border border-border bg-background/50 flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-foreground/60">
                                <Hash className="w-4 h-4" />
                                <span className="text-sm font-semibold uppercase tracking-wider">Chars (No Spaces)</span>
                            </div>
                            <span className="text-3xl font-bold text-foreground">{stats.charactersNoSpaces}</span>
                        </div>
                        <div className="p-4 rounded-xl border border-border bg-background/50 flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-foreground/60">
                                <AlignLeft className="w-4 h-4 transform rotate-90" />
                                <span className="text-sm font-semibold uppercase tracking-wider">Paragraphs</span>
                            </div>
                            <span className="text-3xl font-bold text-foreground">{stats.paragraphs}</span>
                        </div>
                        <div className="col-span-2 lg:col-span-1 p-4 rounded-xl border border-brand-500/30 bg-brand-500/5 flex flex-col gap-1 mt-2">
                            <div className="flex items-center justify-between text-foreground/80">
                                <span className="text-sm font-bold">Estimated Reading Time</span>
                            </div>
                            <span className="text-xl font-bold text-brand-500 mt-1">~ {stats.readingTime} min</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
