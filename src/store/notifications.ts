import { create } from "zustand";

export type NotificationItem = {
	id: string;
	message: string;
	read: boolean;
	createdAt: number;
};

type NotificationsState = {
	items: NotificationItem[];
	add: (message: string) => void;
	markAllRead: () => void;
	clear: () => void;
};

export const useNotifications = create<NotificationsState>((set) => ({
	items: Array.from({ length: 3 }).map((_, i) => ({
		id: String(i + 1),
		message: `Welcome notification ${i + 1}`,
		read: false,
		createdAt: Date.now() - i * 1000 * 60
	})),
	add: (message) => set((state) => ({
		items: [
			{ id: crypto.randomUUID?.() ?? String(Math.random()), message, read: false, createdAt: Date.now() },
			...state.items
		]
	})),
	markAllRead: () => set((state) => ({ items: state.items.map(n => ({ ...n, read: true })) })),
	clear: () => set({ items: [] })
}));


