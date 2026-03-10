import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Bot, User as UserIcon, Loader2, Sparkles, PlusCircle } from 'lucide-react';
import axios from 'axios';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

export default function Chatbot() {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', role: 'assistant', content: 'Hello! I am your AI assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [provider, setProvider] = useState('ChatGPT');
    const [model, setModel] = useState('GPT-5');
    
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const newUserMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
        setMessages(prev => [...prev, newUserMessage]);
        setInput('');
        setLoading(true);

        try {
            const apiMessages = [...messages, newUserMessage].map(m => ({ role: m.role, content: m.content }));
            const res = await axios.post('https://cmpunktg6.app.n8n.cloud/webhook/ai-chat', 
                { messages: apiMessages, provider, model }
            );

            if (res.data.success) {
                setMessages(prev => [...prev, {
                    id: Date.now().toString() + 'bot',
                    role: 'assistant',
                    content: res.data.reply
                }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, {
                id: Date.now().toString() + 'err',
                role: 'assistant',
                content: 'I encountered an error connecting to the API. Please check your network or configuration.'
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const clearChat = () => {
        setMessages([{ id: Date.now().toString(), role: 'assistant', content: 'Chat history cleared. Start a new topic!' }]);
    };

    return (
        <div className="h-full flex flex-col pt-2 pb-6 max-w-5xl mx-auto">
            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 shadow-lg relative">
                            <MessageSquare className="w-5 h-5 text-white" />
                            <Sparkles className="w-3 h-3 text-white absolute top-[-4px] right-[-4px]" />
                        </div>
                        Multi-Model Chat
                    </h1>
                </div>

                <div className="flex bg-accent border border-border rounded-xl p-1 gap-1 flex-wrap">
                    <select 
                        value={provider}
                        onChange={(e) => {
                            setProvider(e.target.value);
                            // Auto map models for demo demo
                            if(e.target.value === 'ChatGPT') setModel('GPT-5');
                            if(e.target.value === 'Gemini') setModel('Gemini-3');
                            if(e.target.value === 'Claude') setModel('Claude-3');
                            if(e.target.value === 'DeepSeek') setModel('DeepSeek-R1');
                            if(e.target.value === 'Grok') setModel('Grok-2');
                        }}
                        className="bg-background text-sm font-medium rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-sm border border-transparent hover:border-border transition-colors cursor-pointer"
                    >
                        <option value="ChatGPT">ChatGPT</option>
                        <option value="Claude">Claude</option>
                        <option value="Gemini">Gemini</option>
                        <option value="DeepSeek">DeepSeek</option>
                        <option value="Grok">Grok</option>
                    </select>

                    <select 
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="bg-background text-sm text-foreground/70 rounded-lg px-3 py-1.5 focus:outline-none border border-transparent shadow-sm hover:border-border transition-colors cursor-pointer"
                    >
                        <option value={model}>{model}</option>
                    </select>
                </div>
            </div>

            {/* Chat Container */}
            <div className="flex-1 glass-card rounded-2xl border border-border shadow-xl h-0 flex flex-col overflow-hidden relative group/canvas">
                <div className="h-12 border-b border-border bg-accent/30 flex items-center px-4 justify-between sticky top-0 z-10">
                    <span className="text-xs font-semibold text-foreground/50 tracking-wider uppercase">Conversation</span>
                    <button onClick={clearChat} className="flex items-center gap-1 text-xs text-foreground/50 hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-background">
                        <PlusCircle className="w-3 h-3" /> New Chat
                    </button>
                </div>

                {/* Messages List */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scroll-smooth bg-background">
                    <AnimatePresence>
                        {messages.map((msg) => (
                            <motion.div 
                                key={msg.id}
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                            >
                                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center shadow-lg ${
                                    msg.role === 'user' 
                                        ? 'bg-gradient-to-br from-brand-500 to-indigo-500 text-white' 
                                        : 'bg-accent border border-border text-foreground/80'
                                }`}>
                                    {msg.role === 'user' ? <UserIcon className="w-4 h-4" /> : <Bot className="w-5 h-5" />}
                                </div>
                                <div className={`group flex flex-col max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                    <span className="text-xs font-medium text-foreground/40 mb-1 px-1">
                                        {msg.role === 'user' ? 'You' : provider}
                                    </span>
                                    <div className={`px-5 py-3.5 rounded-2xl text-sm leading-relaxed ${
                                        msg.role === 'user' 
                                            ? 'bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-500/10 rounded-tr-sm' 
                                            : 'bg-accent/80 border border-border text-foreground shadow-sm rounded-tl-sm prose dark:prose-invert max-w-none'
                                    }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {loading && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-accent border border-border flex items-center justify-center animate-pulse">
                                <Bot className="w-5 h-5 text-foreground/50" />
                            </div>
                            <div className="flex flex-col items-start gap-1">
                                <span className="text-xs font-medium text-foreground/40 px-1">{provider} is thinking...</span>
                                <div className="px-5 py-3.5 bg-accent/80 border border-border rounded-2xl rounded-tl-sm flex gap-1 items-center">
                                    <div className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input form */}
                <div className="p-4 bg-background border-t border-border">
                    <div className="max-w-4xl mx-auto relative flex items-end shadow-sm bg-accent/50 border border-border rounded-2xl focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
                        <textarea
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type a message... (Shift + Enter for new line)"
                            className="flex-1 max-h-48 min-h-[4rem] bg-transparent resize-none border-0 px-4 py-3.5 focus:ring-0 text-sm text-foreground focus:outline-none placeholder:text-foreground/40"
                            rows={1}
                        />
                        <div className="p-2">
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || loading}
                                className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-semibold disabled:opacity-50 transition-all hover:bg-indigo-500 active:scale-95"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 translate-x-[-1px] translate-y-[1px]" />}
                            </button>
                        </div>
                    </div>
                    <div className="text-center mt-2 text-[10px] text-foreground/40">
                        {provider} can make mistakes. Consider verifying important information.
                    </div>
                </div>
            </div>
        </div>
    );
}
