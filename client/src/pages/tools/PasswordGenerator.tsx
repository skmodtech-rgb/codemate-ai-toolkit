import { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Copy, RefreshCw, Check, Shield, ShieldCheck, ShieldAlert } from 'lucide-react';

export default function PasswordGenerator() {
    const [length, setLength] = useState(16);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [password, setPassword] = useState('');
    const [copied, setCopied] = useState(false);

    const generatePassword = () => {
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

        let validChars = '';
        if (includeUppercase) validChars += uppercaseChars;
        if (includeLowercase) validChars += lowercaseChars;
        if (includeNumbers) validChars += numberChars;
        if (includeSymbols) validChars += symbolChars;

        if (validChars === '') {
            setPassword('Please select at least one character type');
            return;
        }

        let generatedPassword = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * validChars.length);
            generatedPassword += validChars[randomIndex];
        }
        setPassword(generatedPassword);
        setCopied(false);
    };

    const handleCopy = () => {
        if (!password || password.startsWith('Please')) return;
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getStrength = (pass: string) => {
        if (!pass || pass.startsWith('Please')) return { label: 'None', color: 'text-gray-500', icon: Shield };
        let score = 0;
        if (pass.length > 8) score += 1;
        if (pass.length > 12) score += 1;
        if (pass.length >= 16) score += 1;
        if (/[A-Z]/.test(pass)) score += 1;
        if (/[a-z]/.test(pass)) score += 1;
        if (/[0-9]/.test(pass)) score += 1;
        if (/[^A-Za-z0-9]/.test(pass)) score += 1;

        if (score < 4) return { label: 'Weak', color: 'text-red-500', icon: ShieldAlert };
        if (score < 6) return { label: 'Medium', color: 'text-yellow-500', icon: Shield };
        return { label: 'Strong', color: 'text-emerald-500', icon: ShieldCheck };
    };

    const strength = getStrength(password);

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pb-12 h-full flex flex-col">
            <div className="mb-6">
                <h1 className="text-3xl font-extrabold flex items-center gap-3">
                    <Key className="w-8 h-8 text-brand-500" />
                    Password Generator
                </h1>
                <p className="text-foreground/60 mt-2">Generate strong, secure passwords instantly.</p>
            </div>

            <div className="glass-card rounded-2xl p-6 w-full max-w-3xl mx-auto flex flex-col gap-8">
                <div className="flex flex-col gap-2 relative">
                    <div className="bg-black/20 border border-border p-4 rounded-xl flex items-center justify-between min-h-[72px]">
                        <span className={`font-mono text-xl md:text-2xl break-all ${password.startsWith('Please') ? 'text-red-400 text-sm' : 'text-foreground tracking-wider'}`}>
                            {password || 'Click generate to create password'}
                        </span>
                        <div className="flex items-center gap-3 pl-4 border-l border-border/50 ml-4">
                            <button 
                                onClick={handleCopy}
                                disabled={!password || password.startsWith('Please')}
                                className="p-2 rounded-lg hover:bg-white/5 text-foreground/70 hover:text-brand-400 transition-colors disabled:opacity-50"
                                title="Copy password"
                            >
                                {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                            </button>
                            <button 
                                onClick={generatePassword}
                                className="p-2 rounded-lg hover:bg-white/5 text-foreground/70 hover:text-brand-400 transition-colors"
                                title="Generate new password"
                            >
                                <RefreshCw className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    {password && !password.startsWith('Please') && (
                        <div className={`text-xs font-semibold flex items-center gap-1.5 mt-2 ${strength.color} justify-end`}>
                            <strength.icon className="w-4 h-4" />
                            Password Strength: {strength.label}
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-semibold text-foreground/80">Password Length: {length}</label>
                        </div>
                        <input 
                            type="range" 
                            min="4" 
                            max="64" 
                            value={length} 
                            onChange={(e) => setLength(Number(e.target.value))}
                            className="w-full accent-brand-500 h-2 bg-background rounded-lg appearance-none cursor-pointer border border-border"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-white/5 cursor-pointer transition-colors">
                            <input 
                                type="checkbox" 
                                checked={includeUppercase} 
                                onChange={(e) => setIncludeUppercase(e.target.checked)}
                                className="w-5 h-5 rounded text-brand-500 focus:ring-brand-500 bg-background border-border"
                            />
                            <span className="text-sm font-medium">Uppercase (A-Z)</span>
                        </label>
                        <label className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-white/5 cursor-pointer transition-colors">
                            <input 
                                type="checkbox" 
                                checked={includeLowercase} 
                                onChange={(e) => setIncludeLowercase(e.target.checked)}
                                className="w-5 h-5 rounded text-brand-500 focus:ring-brand-500 bg-background border-border"
                            />
                            <span className="text-sm font-medium">Lowercase (a-z)</span>
                        </label>
                        <label className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-white/5 cursor-pointer transition-colors">
                            <input 
                                type="checkbox" 
                                checked={includeNumbers} 
                                onChange={(e) => setIncludeNumbers(e.target.checked)}
                                className="w-5 h-5 rounded text-brand-500 focus:ring-brand-500 bg-background border-border"
                            />
                            <span className="text-sm font-medium">Numbers (0-9)</span>
                        </label>
                        <label className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-white/5 cursor-pointer transition-colors">
                            <input 
                                type="checkbox" 
                                checked={includeSymbols} 
                                onChange={(e) => setIncludeSymbols(e.target.checked)}
                                className="w-5 h-5 rounded text-brand-500 focus:ring-brand-500 bg-background border-border"
                            />
                            <span className="text-sm font-medium">Symbols (!@#$...)</span>
                        </label>
                    </div>

                    <button onClick={generatePassword} className="btn-primary w-full h-12 gap-2 mt-4 text-lg">
                        <Key className="w-5 h-5" />
                        Generate Password
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
