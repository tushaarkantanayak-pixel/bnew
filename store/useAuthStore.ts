import { create } from 'zustand';
import apiClient from '../utils/apiClient';

export interface UserDetails {
    name: string;
    email: string;
    phone: string;
    userId: string;
    userType: string;
    referralUsed: boolean;
    referralCount: number;
}

interface AuthState {
    userDetails: UserDetails;
    walletBalance: number;
    isAuthenticated: boolean;
    token: string | null;
    
    // Actions
    setToken: (token: string | null) => void;
    setWalletBalance: (balance: number) => void;
    setUserDetails: (details: Partial<UserDetails>) => void;
    fetchUser: () => Promise<void>;
    logout: () => void;
}

const defaultUserDetails: UserDetails = {
    name: "",
    email: "",
    phone: "",
    userId: "",
    userType: "user",
    referralUsed: false,
    referralCount: 0,
};

let fetchPromise: Promise<void> | null = null;

export const useAuthStore = create<AuthState>((set, get) => ({
    userDetails: defaultUserDetails,
    walletBalance: 0,
    isAuthenticated: false,
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,

    setToken: (token) => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
        set({ token, isAuthenticated: !!token });
    },

    setWalletBalance: (balance) => {
        localStorage.setItem('walletBalance', String(balance));
        set({ walletBalance: balance });
    },

    setUserDetails: (details) => {
        set((state) => ({
            userDetails: { ...state.userDetails, ...details }
        }));
    },

    fetchUser: async () => {
        const { token } = get();
        if (!token) {
            set({ isAuthenticated: false, userDetails: defaultUserDetails, walletBalance: 0 });
            return;
        }

        if (fetchPromise) return fetchPromise;

        fetchPromise = (async () => {
            try {
                const res = await apiClient.get("/api/auth/me");
                const data = res.data;
                
                if (data.success) {
                    set({
                        userDetails: {
                            name: data.user.name || "",
                            email: data.user.email || "",
                            phone: data.user.phone || "",
                            userId: data.user.userId || "",
                            userType: data.user.userType || "user",
                            referralUsed: data.user.referralUsed || false,
                            referralCount: data.user.referralCount || 0,
                        },
                        walletBalance: data.user.wallet || 0,
                        isAuthenticated: true,
                    });
                    localStorage.setItem("walletBalance", String(data.user.wallet || 0));
                } else {
                    // Token invalid
                    get().logout();
                }
            } catch (error) {
                console.error("Failed to fetch user:", error);
            } finally {
                fetchPromise = null;
            }
        })();

        return fetchPromise;
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("walletBalance");
        set({
            token: null,
            isAuthenticated: false,
            userDetails: defaultUserDetails,
            walletBalance: 0,
        });
        window.location.href = "/login";
    }
}));
