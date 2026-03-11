import { Request, Response } from 'express';
import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';

// --- AI Image Generator ---
export const generateImage = async (req: Request, res: Response) => {
    try {
        const { prompt, model } = req.body;
        
        let endpoint = process.env.N8N_IMAGE_FAST_ENDPOINT;
        if (model === 'ToolMate Image-Pro') {
            endpoint = process.env.N8N_IMAGE_PRO_ENDPOINT;
        }

        // Simulating the delay for the demo if endpoints are not defined
        if (!endpoint) {
            await new Promise(r => setTimeout(r, 2000));
            // Return placeholder image
            return res.json({
                success: true,
                imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80',
                message: 'Generated placeholder image since N8N endpoints are not set.'
            });
        }

        const response = await axios.post(endpoint as string, { prompt, model });
        res.json({ success: true, imageUrl: response.data.imageUrl || response.data });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message || 'Image generation failed' });
    }
};

// --- AI Video Generator ---
export const generateVideo = async (req: Request, res: Response) => {
    try {
        const { prompt, model } = req.body;
        
        let endpoint = process.env.N8N_VIDEO_FAST_ENDPOINT;
        if (model === 'ToolMate Video-Pro') {
            endpoint = process.env.N8N_VIDEO_PRO_ENDPOINT;
        }

        if (!endpoint) {
            await new Promise(r => setTimeout(r, 3000));
            return res.json({
                success: true,
                videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                message: 'Generated placeholder video since N8N endpoints are not set.'
            });
        }

        const response = await axios.post(endpoint as string, { prompt, model });
        res.json({ success: true, videoUrl: response.data.videoUrl || response.data });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message || 'Video generation failed' });
    }
};

// --- Chatbot Endpoint ---
export const chatRequest = async (req: Request, res: Response) => {
    try {
        const { messages, provider, model } = req.body;
        const endpoint = process.env.N8N_CHATBOT_ENDPOINT;

        if (!endpoint) {
            await new Promise(r => setTimeout(r, 1000));
            return res.json({
                success: true,
                reply: `Hello! I am a simulated response from ${provider} using model ${model}. Configure N8N_CHATBOT_ENDPOINT to get real responses.`,
            });
        }

        const response = await axios.post(endpoint as string, { messages, provider, model });
        res.json({ success: true, reply: response.data.reply || response.data });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message || 'Chat generation failed' });
    }
};

// --- Mock Utilities ---
export const utilityGeneric = async (req: Request, res: Response) => {
    // A generic handler for placeholder tools (PDF converter, etc)
    const { action } = req.params;
    await new Promise(r => setTimeout(r, 1500));
    res.json({
        success: true,
        message: `Action ${action} completed successfully (Placeholder)`,
        data: {}
    });
};

// --- Background Remover (Proxy to avoid CORS) ---
export const removeBackground = async (req: Request, res: Response) => {
    // Explicit CORS for the specific endpoint to ensure error responses are visible
    res.header('Access-Control-Allow-Origin', '*');
    
    try {
        const endpoint = process.env.N8N_BG_REMOVER_ENDPOINT || 'https://cmpunktg7.app.n8n.cloud/webhook/remove-bg';
        
        console.log(`Triggering BG Remover: ${endpoint}`);

        const response = await axios.post(endpoint as string, req.body, {
            responseType: 'arraybuffer',
            timeout: 120000,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json, image/*'
            }
        });

        const contentType = response.headers['content-type'] || 'image/png';
        res.set('Content-Type', contentType);
        
        // Use Buffer.from to ensure consistent binary delivery
        const buffer = Buffer.from(response.data);
        res.status(200).send(buffer);
    } catch (error: any) {
        console.error('BG Remover Error:', error.message);
        let message = 'Background removal failed. Please check the image or try again.';
        let statusCode = 500;

        if (error.response?.data) {
            try {
                // Try decoding potential error JSON from buffer
                const text = new TextDecoder().decode(error.response.data);
                const json = JSON.parse(text);
                message = json.message || message;
                statusCode = error.response.status || 500;
            } catch (e) { /* use default message if not json */ }
        } else {
            message = error.message || message;
        }

        res.status(statusCode).json({ success: false, message, debug: error.response?.headers });
    }
};

// --- Generic n8n Proxy to avoid CORS ---
export const n8nProxy = async (req: Request, res: Response) => {
    const { action } = req.params;
    try {
        let endpoint = '';
        
        // Map common tool actions to their specific environment variables
        if (action === 'generate-video') endpoint = process.env.N8N_VIDEO_PRO_ENDPOINT!;
        else if (action === 'scrape-instagram') endpoint = process.env.N8N_SCRAPE_INSTAGRAM_ENDPOINT!;
        else if (action === 'transcribe-video') endpoint = process.env.N8N_YOUTUBE_TRANSCRIPTION_ENDPOINT!;
        else if (action === 'transcribe-audio') endpoint = process.env.N8N_AUDIO_TRANSCRIPTION_ENDPOINT!;
        else if (action === 'ai-chat') endpoint = process.env.N8N_CHATBOT_ENDPOINT!;
        else if (action === 'generate-image') endpoint = process.env.N8N_IMAGE_FAST_ENDPOINT!;
        else if (action === 'generate-image-pro') endpoint = process.env.N8N_IMAGE_PRO_ENDPOINT!;
        else if (action === 'text-to-speech') endpoint = process.env.N8N_TTS_ENDPOINT!;
        
        if (!endpoint) {
            const baseUrl = 'https://cmpunktg7.app.n8n.cloud';
            endpoint = `${baseUrl}/webhook/${action}`;
        }
        
        const response = await axios.post(endpoint, req.body, {
            timeout: 120000,
            headers: { 'Content-Type': 'application/json' },
            responseType: 'arraybuffer' // Request buffer so we can handle binary/json properly
        });

        const contentType = response.headers['content-type'] || 'application/json';
        
        // If it's a binary format, send it directly
        if (contentType.includes('audio') || contentType.includes('image') || contentType.includes('video') || contentType.includes('octet-stream')) {
            res.set('Content-Type', contentType);
            return res.send(Buffer.from(response.data));
        }

        // Otherwise try to treat it as JSON
        try {
            const text = new TextDecoder().decode(response.data);
            const json = JSON.parse(text);
            res.json(json);
        } catch (e) {
            // Fallback: if not JSON, just send the raw data with whatever type we got
            res.set('Content-Type', contentType);
            res.send(Buffer.from(response.data));
        }
    } catch (error: any) {
        console.error(`Proxy error for ${action}:`, error.message);
        let message = 'Action failed';
        
        if (error.response?.data) {
             try {
                const text = new TextDecoder().decode(error.response.data);
                const json = JSON.parse(text);
                message = json.message || message;
            } catch (e) {
                message = error.message || message;
            }
        } else {
            message = error.message || message;
        }

        res.status(500).json({ success: false, message });
    }
};

// --- Gemini Brain for Problem Solving Tools ---
export const geminiBrain = async (req: Request, res: Response) => {
    const { prompt } = req.body;
    const modelName = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
    const keys = (process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || '').split(',').filter(k => k.trim());

    if (keys.length === 0) {
        return res.status(500).json({ success: false, message: 'Gemini API keys are not configured on the server.' });
    }

    let lastError: any = null;

    // Try each key until one works
    for (let i = 0; i < keys.length; i++) {
        const apiKey = keys[i].trim();
        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: modelName });

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            console.log(`Gemini Success using key ${i + 1}/${keys.length}`);
            return res.json({ success: true, response: text });
            
        } catch (error: any) {
            lastError = error;
            const errorMsg = error.message || '';
            
            // Check if it's an error that warrants rotation (429 quota, 403 forbidden/leaked, or generic quota)
            if (errorMsg.includes('429') || errorMsg.includes('403') || errorMsg.includes('quota') || errorMsg.includes('Too Many Requests') || errorMsg.includes('Forbidden')) {
                console.warn(`Gemini Key ${i + 1} failed (${errorMsg.substring(0, 50)}...). Rotating to next key...`);
                continue; // Try the next key
            } else {
                // If it's a different kind of error (e.g. invalid prompt), don't bother rotating
                console.error(`Gemini Error on key ${i + 1}:`, errorMsg);
                break; 
            }
        }
    }

    // If we get here, all keys failed or error was not rotatable
    const finalMessage = lastError?.message || 'AI Generation failed after trying all keys';
    res.status(500).json({ 
        success: false, 
        message: finalMessage.includes('429') ? 'AI service is temporarily overloaded. Please try again in 1 minute.' : finalMessage 
    });
};
