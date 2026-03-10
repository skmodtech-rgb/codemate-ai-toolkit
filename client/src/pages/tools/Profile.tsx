import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Camera, Save, Loader2, Check } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function Profile() {
    const { user } = useStore();
    const [name, setName] = useState(user?.name || '');
    const [email] = useState(user?.email || '');
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        // Simulate save
        await new Promise(r => setTimeout(r, 1000));
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto pb-12"
        >
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">My Profile</h1>
                <p className="text-muted-foreground mt-1 text-sm">Manage your personal information</p>
            </div>

            <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-8">
                {/* Avatar Section */}
                <div className="flex flex-col items-center gap-4">
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-brand-500 to-brand-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-brand-500/25">
                            {user?.name.charAt(0).toUpperCase()}
                        </div>
                        <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-brand-500 text-white flex items-center justify-center shadow-md hover:bg-brand-600 transition-colors opacity-0 group-hover:opacity-100">
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="text-center">
                        <h2 className="text-lg font-bold text-foreground">{user?.name}</h2>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-border/50" />

                {/* Form */}
                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-muted-foreground" />
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="glass-input w-full py-3.5 pl-11 pr-4 rounded-2xl text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-muted-foreground" />
                            <input
                                type="email"
                                value={email}
                                disabled
                                className="glass-input w-full py-3.5 pl-11 pr-4 rounded-2xl text-sm opacity-60 cursor-not-allowed"
                            />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1.5">Email cannot be changed</p>
                    </div>
                </div>

                {/* Save Button */}
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="btn-primary w-full h-12 rounded-2xl text-sm font-semibold gap-2 disabled:opacity-50"
                >
                    {saving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : saved ? (
                        <><Check className="w-4 h-4" /> Saved!</>
                    ) : (
                        <><Save className="w-4 h-4" /> Save Changes</>
                    )}
                </button>
            </div>
        </motion.div>
    );
}
