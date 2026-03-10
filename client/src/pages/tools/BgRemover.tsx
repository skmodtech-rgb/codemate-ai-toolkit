import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Upload, Download, Loader2, AlertCircle, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';

export default function BgRemover() {
    const [file, setFile] = useState<{ name: string; data: string } | null>(null);
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [dragOver, setDragOver] = useState(false);

    const handleFile = useCallback((f: File) => {
        if (!f.type.startsWith('image/')) {
            alert('Please upload an image file (JPG, PNG).');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;
            setFile({ name: f.name, data: result });
            setResultUrl(null);
            setError(null);
        };
        reader.readAsDataURL(f);
    }, []);

    const handleRemoveBg = async () => {
        if (!file) return;
        setLoading(true);
        setError(null);
        
        try {
            // Send as JSON with base64 image data
            const res = await axios.post('https://cmpunktg6.app.n8n.cloud/webhook/remove-bg', {
                image: file.data,
                fileName: file.name
            });
            
            const url = res.data?.imageUrl || res.data?.image || res.data?.url || res.data?.output || res.data?.result;
            if (url) {
                setResultUrl(url);
            } else if (typeof res.data === 'string' && res.data.startsWith('http')) {
                setResultUrl(res.data);
            } else {
                setError('Unexpected response format. Please try again.');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'An error occurred removing the background.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pb-12 flex flex-col">
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/20">
                        <Scissors className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    Background Remover
                </h1>
                <p className="text-foreground/60 mt-2 text-sm sm:text-base">Instantly remove the background from any image with AI.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
                {/* Upload & Original */}
                <div className="glass-card rounded-2xl p-4 sm:p-6 flex flex-col space-y-4">
                    <h2 className="text-sm font-semibold text-foreground/80 uppercase tracking-wider flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-cyan-500" />
                        Original Image
                    </h2>
                    
                    {!file ? (
                        <div 
                            className={`flex-1 border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[300px] ${
                                dragOver ? 'border-cyan-500 bg-cyan-500/10' : 'border-border hover:border-cyan-500/50 hover:bg-white/5'
                            }`}
                            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={(e) => { e.preventDefault(); setDragOver(false); if(e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
                            onClick={() => { const input = document.createElement('input'); input.type = 'file'; input.accept = 'image/*'; input.onchange = (e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (f) handleFile(f); }; input.click(); }}
                        >
                            <Upload className="w-10 h-10 mx-auto mb-3 text-cyan-500/60" />
                            <p className="text-foreground/80 font-semibold mb-1">Drop an image here or click to browse</p>
                            <p className="text-foreground/40 text-xs">Supports JPG, PNG, WEBP</p>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col gap-4">
                            <div className="flex-1 relative rounded-xl overflow-hidden border border-border bg-black/20 flex items-center justify-center min-h-[300px]">
                                <img src={file.data} alt="Original" className="max-w-full max-h-[400px] object-contain" />
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <button onClick={() => { setFile(null); setResultUrl(null); }} className="flex-1 btn-secondary h-12 text-sm">
                                    Change Image
                                </button>
                                <button 
                                    onClick={handleRemoveBg}
                                    disabled={loading || !!resultUrl}
                                    className="flex-[2] btn-primary h-12 text-sm bg-gradient-to-r from-cyan-600 to-blue-500 shadow-cyan-500/20 hover:shadow-cyan-500/40"
                                >
                                    {loading ? (
                                        <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                                    ) : (
                                        <><Scissors className="w-4 h-4" /> Remove Background</>
                                    )}
                                </button>
                            </div>
                            
                            {error && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg flex items-start gap-2 text-xs">
                                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                    <p>{error}</p>
                                </motion.div>
                            )}
                        </div>
                    )}
                </div>

                {/* Result Area */}
                <div className="glass-card rounded-2xl p-4 sm:p-6 flex flex-col space-y-4 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-[length:100px_100px] relative overflow-hidden">
                    {/* Transparent grid background for result area so transparent PNGs show properly */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #fff 25%, #fff 75%, #000 75%, #000)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px'}}></div>
                    
                    <h2 className="text-sm font-semibold text-foreground/80 uppercase tracking-wider flex items-center gap-2 relative z-10">
                        <span className={`w-2 h-2 rounded-full ${loading ? 'bg-amber-500 animate-pulse' : resultUrl ? 'bg-emerald-500' : 'bg-foreground/20'}`} />
                        Result
                    </h2>
                    
                    <div className="flex-1 flex items-center justify-center min-h-[300px] relative z-10">
                        <AnimatePresence mode="wait">
                            {loading ? (
                                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shadow-xl shadow-cyan-500/10 animate-pulse">
                                        <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
                                    </div>
                                    <p className="text-sm font-medium text-cyan-400 animate-pulse">AI is detecting subject...</p>
                                </motion.div>
                            ) : resultUrl ? (
                                <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full flex-col flex items-center gap-4">
                                    <div className="relative rounded-xl overflow-hidden shadow-2xl">
                                        {/* Show checkered background behind the image so user knows it's transparent */}
                                        <div className="absolute inset-0 z-0 bg-white" style={{backgroundImage: 'repeating-linear-gradient(45deg, #e5e7eb 25%, transparent 25%, transparent 75%, #e5e7eb 75%, #e5e7eb), repeating-linear-gradient(45deg, #e5e7eb 25%, #ffffff 25%, #ffffff 75%, #e5e7eb 75%, #e5e7eb)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px'}}></div>
                                        <img src={resultUrl} alt="Background removed" className="max-w-full max-h-[400px] relative z-10 object-contain" />
                                    </div>
                                    <a 
                                        href={resultUrl} download={`no-bg-${file?.name || 'image'}.png`} target="_blank" rel="noreferrer"
                                        className="btn-primary w-full h-12 bg-gradient-to-r from-emerald-600 to-emerald-500"
                                    >
                                        <Download className="w-4 h-4" /> Download HD Image
                                    </a>
                                </motion.div>
                            ) : (
                                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center text-foreground/40 text-center">
                                    <div className="w-16 h-16 mb-4 rounded-full bg-background border border-border border-dashed flex items-center justify-center">
                                        <Scissors className="w-6 h-6 text-foreground/30" />
                                    </div>
                                    <p className="text-sm font-medium">Remove Background</p>
                                    <p className="text-xs mt-1 max-w-[200px]">Upload an image and click remove to see the magic</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
