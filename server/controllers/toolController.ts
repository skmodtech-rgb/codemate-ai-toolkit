import { Request, Response } from 'express';
import axios from 'axios';

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
        
        // Use Buffer.from to ensure consistent binary delivery in Node.js
        res.send(Buffer.from(response.data));
    } catch (error: any) {
        console.error('BG Remover Error:', error.message);
        let message = error.message || 'Background removal failed';
        if (error.response?.data) {
            try {
                const text = new TextDecoder().decode(error.response.data);
                const json = JSON.parse(text);
                message = json.message || message;
            } catch (e) { /* ignore */ }
        }
        res.status(500).json({ success: false, message });
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
        
        if (!endpoint) {
            const baseUrl = 'https://cmpunktg7.app.n8n.cloud';
            endpoint = `${baseUrl}/webhook/${action}`;
        }
        
        const response = await axios.post(endpoint, req.body, {
            timeout: 120000,
            headers: { 'Content-Type': 'application/json' }
        });

        res.json(response.data);
    } catch (error: any) {
        console.error(`Proxy error for ${action}:`, error.message);
        let message = error.response?.data?.message || error.response?.data || error.message || 'Action failed';
        res.status(500).json({ success: false, message: typeof message === 'string' ? message : 'Action failed' });
    }
};
