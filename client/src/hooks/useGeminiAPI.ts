import { useState, useCallback } from 'react';
import axios from 'axios';

export type FallbackType = 'study' | 'resume' | 'interview' | 'literature' | 'document' | 'blog' | 'website' | 'idea';

export function useGeminiAPI() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateContent = useCallback(async (
        prompt: string, 
        fallbackType: FallbackType
    ) => {
        setIsLoading(true);
        setError(null);
        try {
            const token = JSON.parse(localStorage.getItem('toolmate_user') || '{}')?.token;
            const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/tools/gemini-brain`, 
                { prompt, fallbackType },
                { 
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (res.data.success) {
                return res.data.response;
            } else {
                throw new Error(res.data.message || 'AI generation failed');
            }
        } catch (err: any) {
            const msg = err.response?.data?.message || err.message || 'Failed to connect to AI server';
            setError(msg);
            throw new Error(msg);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { generateContent, isLoading, error };
}

