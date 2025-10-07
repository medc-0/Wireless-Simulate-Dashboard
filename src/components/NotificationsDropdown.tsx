import { useNotifications } from "@/store/notifications";

export function NotificationsDropdown() {
	const { items, markAllRead, clear } = useNotifications();
	return (
		<div>
			<div className="flex items-center justify-between px-2 py-1 text-white/70">
				<div>Notifications</div>
				<div className="space-x-2">
					<button onClick={markAllRead} className="text-xs px-2 py-1 rounded bg-white/5">Mark read</button>
					<button onClick={clear} className="text-xs px-2 py-1 rounded bg-white/5">Clear</button>
				</div>
			</div>
			<ul className="max-h-60 overflow-auto divide-y divide-white/10">
				{items.length === 0 && <li className="px-2 py-2 text-white/60">No notifications</li>}
				{items.map(n => (
					<li key={n.id} className="px-2 py-2 hover:bg-white/5 flex items-center justify-between">
						<span className={n.read ? "text-white/40" : ""}>{n.message}</span>
						<time className="text-xs text-white/40">{new Date(n.createdAt).toLocaleTimeString()}</time>
					</li>
				))}
			</ul>
		</div>
	);
}


