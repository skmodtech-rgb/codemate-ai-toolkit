import { useState, useCallback } from 'react';
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
        setResultUrl(null);
        
        try {
            // Check if VITE_API_URL is missing or set to localhost while on a production domain
            const isProd = window.location.hostname !== 'localhost';
            const apiBase = import.meta.env.VITE_API_URL || '';
            const isApiLocal = !apiBase || apiBase.includes('localhost');
            
            if (isProd && isApiLocal) {
                console.warn('VITE_API_URL is not set for production. This tool might fail.');
            }

            const base64Data = file.data.includes(',') ? file.data.split(',')[1] : file.data;
            
            const res = await axios.post(`${apiBase || 'http://localhost:5000'}/api/tools/remove-bg`, {
                source_image_base64: base64Data,
                fileName: file.name
            }, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('toolmate_user') || '{}')?.token}`
                },
                responseType: 'arraybuffer',
                timeout: 120000, // 2 minute timeout for processing
            });

            const contentType = res.headers['content-type'] || 'image/png';
            
            // Try to see if it's JSON first (error messages or base64 wrapped in JSON)
            const text = new TextDecoder().decode(res.data);
            let parsedJson: any = null;
            try {
                parsedJson = JSON.parse(text);
            } catch (e) { /* Not JSON */ }

            if (parsedJson) {
                // If the response is JSON, find the image data anywhere inside it
                const findImage = (obj: any): string | null => {
                    if (!obj) return null;
                    if (typeof obj === 'string') {
                        // Fix for n8n mislabeling image as application/json
                        if (obj.startsWith('data:application/json;base64,')) {
                            return obj.replace('data:application/json;base64,', 'data:image/png;base64,');
                        }
                        if (obj.startsWith('http') || obj.startsWith('data:')) return obj;
                        
                        // Check if it's a raw base64 string
                        const trimmed = obj.trim().replace(/\s/g, '');
                        if (trimmed.length > 500 && /^[A-Za-z0-9+/=]+$/.test(trimmed.substring(0, 100))) {
                            let type = 'png';
                            if (trimmed.startsWith('UklGR')) type = 'webp';
                            else if (trimmed.startsWith('/9j/')) type = 'jpeg';
                            else if (trimmed.startsWith('iVBORw')) type = 'png';
                            return `data:image/${type};base64,${trimmed}`;
                        }
                        return null;
                    }
                    if (Array.isArray(obj)) {
                        for (const item of obj) {
                            const found = findImage(item);
                            if (found) return found;
                        }
                    } else if (typeof obj === 'object') {
                        // Prioritize common field names including 'result_b64' from n8n
                        const imageFields = ['result_b64', 'image_base64', 'image_file_b64', 'source_image_base64', 'imageUrl', 'image', 'url', 'output', 'result', 'data', 'response', 'generated_image'];
                        for (const field of imageFields) {
                            if (obj[field]) {
                                const found = findImage(obj[field]);
                                if (found) return found;
                            }
                        }
                        for (const key in (obj as any)) {
                            const found = findImage((obj as any)[key]);
                            if (found) return found;
                        }
                    }
                    return null;
                };

                const imageUrl = findImage(parsedJson);
                if (imageUrl) {
                    setResultUrl(imageUrl);
                } else {
                    setError('Detected JSON response but could not extract image data.');
                }
            } else if (contentType.includes('image')) {
                // It's raw binary image data
                const blob = new Blob([res.data], { type: contentType });
                const objectUrl = URL.createObjectURL(blob);
                setResultUrl(objectUrl);
            } else if (text.startsWith('http') || text.startsWith('data:image')) {
                setResultUrl(text.trim());
            } else if (text.length > 500 && /^[A-Za-z0-9+/=]+$/.test(text.trim().substring(0, 100))) {
                // It's a raw base64 string
                const raw = text.trim().replace(/\s/g, '');
                let type = 'png';
                if (raw.startsWith('UklGR')) type = 'webp';
                else if (raw.startsWith('/9j/')) type = 'jpeg';
                else if (raw.startsWith('iVBORw')) type = 'png';
                setResultUrl(`data:image/${type};base64,${raw}`);
            } else {
                // Fallback: try blob anyway
                const blob = new Blob([res.data], { type: 'image/png' });
                const objectUrl = URL.createObjectURL(blob);
                setResultUrl(objectUrl);
            }
        } catch (err: any) {
            console.error('Removal Error:', err);
            const message = err.response?.data ? new TextDecoder().decode(err.response.data) : (err.message || 'Error occurred');
            setError(message.length < 200 ? message : 'Background removal service timeout or failure.');
        } finally {
            setLoading(false);
        }
    };

    // Cleanup object URL on unmount or new result
    const handleDownload = () => {
        if (!resultUrl) return;
        const a = document.createElement('a');
        a.href = resultUrl;
        a.download = `no-bg-${file?.name || 'image'}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="pb-12 flex flex-col">
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
                                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg flex items-start gap-2 text-xs">
                                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                    <p>{error}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Result Area */}
                <div className="glass-card rounded-2xl p-4 sm:p-6 flex flex-col space-y-4 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #fff 25%, #fff 75%, #000 75%, #000)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px'}}></div>
                    
                    <h2 className="text-sm font-semibold text-foreground/80 uppercase tracking-wider flex items-center gap-2 relative z-10">
                        <span className={`w-2 h-2 rounded-full ${loading ? 'bg-amber-500 animate-pulse' : resultUrl ? 'bg-emerald-500' : 'bg-foreground/20'}`} />
                        Result
                    </h2>
                    
                    <div className="flex-1 flex items-center justify-center min-h-[300px] relative z-10">
                        {loading ? (
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shadow-xl shadow-cyan-500/10 animate-pulse">
                                    <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
                                </div>
                                <p className="text-sm font-medium text-cyan-400 animate-pulse">AI is detecting subject...</p>
                            </div>
                        ) : resultUrl ? (
                            <div className="w-full h-full flex flex-col items-center justify-between gap-4 py-2">
                                <div className="w-full flex-1 relative rounded-xl overflow-hidden shadow-2xl flex items-center justify-center bg-accent/20 min-h-[350px]">
                                    <div className="absolute inset-0 z-0 bg-white" style={{backgroundImage: 'repeating-linear-gradient(45deg, #e5e7eb 25%, transparent 25%, transparent 75%, #e5e7eb 75%, #e5e7eb), repeating-linear-gradient(45deg, #e5e7eb 25%, #ffffff 25%, #ffffff 75%, #e5e7eb 75%, #e5e7eb)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '15px 15px'}}></div>
                                    <img 
                                        src={resultUrl} 
                                        alt="Background removed" 
                                        className="max-w-full max-h-[500px] w-auto h-auto relative z-20 object-contain drop-shadow-2xl"
                                        onError={(e) => {
                                            console.error("Image load error", e);
                                        }}
                                    />
                                </div>
                                <div className="w-full flex gap-3 mt-4 relative z-30">
                                    <button 
                                        onClick={() => setResultUrl(null)}
                                        className="btn-secondary flex-1 h-12"
                                    >
                                        Clear
                                    </button>
                                    <button 
                                        onClick={handleDownload}
                                        className="btn-primary flex-[2] h-12 bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-emerald-500/20"
                                    >
                                        <Download className="w-4 h-4" /> Download Result
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-foreground/40 text-center">
                                <div className="w-16 h-16 mb-4 rounded-full bg-background border border-border border-dashed flex items-center justify-center">
                                    <Scissors className="w-6 h-6 text-foreground/30" />
                                </div>
                                <p className="text-sm font-medium">Remove Background</p>
                                <p className="text-xs mt-1 max-w-[200px]">Upload an image and click remove to see the magic</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
