import { create } from 'zustand';

interface User {
    _id: string;
    name: string;
    email: string;
    token: string;
}

interface AppState {
    user: User | null;
    isDarkMode: boolean;
    isSidebarOpen: boolean;
    login: (user: User) => void;
    logout: () => void;
    toggleTheme: () => void;
    toggleSidebar: () => void;
}

export const useStore = create<AppState>((set) => {
    // Check saved user in localStorage
    const savedUser = localStorage.getItem('toolmate_user');
    const user = savedUser ? JSON.parse(savedUser) : null;

    // Check system preference or saved theme
    const savedTheme = localStorage.getItem('toolmate_theme');
    const isDarkMode = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Apply theme class immediately on load
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(isDarkMode ? 'dark' : 'light');

    return {
        user,
        isDarkMode,
        isSidebarOpen: true,

        login: (user) => {
            localStorage.setItem('toolmate_user', JSON.stringify(user));
            set({ user });
        },
        
        logout: () => {
            localStorage.removeItem('toolmate_user');
            set({ user: null });
        },

        toggleTheme: () => set((state) => {
            const newTheme = !state.isDarkMode;
            localStorage.setItem('toolmate_theme', newTheme ? 'dark' : 'light');
            if (newTheme) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            return { isDarkMode: newTheme };
        }),

        toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen }))
    };
});
