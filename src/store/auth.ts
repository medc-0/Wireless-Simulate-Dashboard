import { create } from "zustand";

type Role = "admin" | "manager" | "viewer";

type AuthState = {
    isAuthenticated: boolean;
    role: Role | null;
    email: string | null;
    avatarColor: string | null;
    login: (opts: { role?: Role; email?: string }) => void;
    logout: () => void;
};

const STORAGE_KEY = "app_auth_state";

function loadInitial(): Pick<AuthState, "isAuthenticated" | "role" | "email" | "avatarColor"> {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return { isAuthenticated: false, role: null, email: null, avatarColor: null };
		return JSON.parse(raw);
	} catch {
        return { isAuthenticated: false, role: null, email: null, avatarColor: null };
	}
}

export const useAuth = create<AuthState>((set) => ({
	...loadInitial(),
    login: ({ role = "admin", email = null } = {}) =>
        set(() => {
            const color = email ? colorFromString(email) : null;
            const next = { isAuthenticated: true, role, email, avatarColor: color } as const;
			localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
			return next;
		}),
	logout: () =>
		set(() => {
            const next = { isAuthenticated: false, role: null, email: null, avatarColor: null } as const;
			localStorage.removeItem(STORAGE_KEY);
			return next;
		})
}));

function colorFromString(input: string): string {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        hash = input.charCodeAt(i) + ((hash << 5) - hash);
        hash |= 0;
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue} 70% 45%)`;
}


