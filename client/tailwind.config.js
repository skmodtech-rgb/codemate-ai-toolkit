/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                ai: {
                    primary: '#6366F1',
                    secondary: '#8B5CF6',
                    accent: '#EC4899',
                    background: '#0F172A',
                    card: '#1E293B',
                    border: '#334155',
                    'text-main': '#F8FAFC',
                    'text-sub': '#94A3B8',
                },
                background: '#0F172A',
                foreground: '#F8FAFC',
                card: '#1E293B',
                'card-foreground': '#F8FAFC',
                border: '#334155',
                accent: '#EC4899',
                'accent-foreground': '#F8FAFC',
            },
            backgroundImage: {
                'ai-gradient': 'linear-gradient(135deg, #6366F1, #8B5CF6, #EC4899)',
            },
            animation: {
                'blob': 'blob 7s infinite',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-up': 'slideUp 0.5s ease-out forwards',
            },
            keyframes: {
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [],
};
