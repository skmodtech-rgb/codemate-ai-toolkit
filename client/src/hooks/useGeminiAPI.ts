import { useState, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export function useGeminiAPI() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateContent = useCallback(async (prompt: string, modelType: string = 'gemini-1.5-flash') => {
        setIsLoading(true);
        setError(null);
        try {
            const apiKey = localStorage.getItem('gemini_api_key');
            if (!apiKey) {
                throw new Error('No Gemini API Key found. Please add one in the Dashboard to use AI tools.');
            }

            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: modelType });
            
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (err: any) {
            setError(err.message || 'An error occurred while generating content.');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { generateContent, isLoading, error };
}
