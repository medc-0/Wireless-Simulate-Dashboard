import { useNotifications } from "@/store/notifications";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";

export default function Component() {
	const { items, markAllRead, clear } = useNotifications();
	return (
		<div className="space-y-4">
			<h1 className="text-2xl font-semibold">Notifications</h1>
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div className="font-medium">Recent</div>
						<div className="space-x-2 text-sm">
							<button onClick={markAllRead} className="px-2 py-1 rounded bg-white/5">Mark read</button>
							<button onClick={clear} className="px-2 py-1 rounded bg-white/5">Clear</button>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<ul className="divide-y divide-white/10">
						{items.length === 0 && <li className="py-6 text-white/60">No notifications</li>}
						{items.map(n => (
							<li key={n.id} className="py-3 flex items-center justify-between">
								<span className={n.read ? "text-white/40" : ""}>{n.message}</span>
								<time className="text-xs text-white/40">{new Date(n.createdAt).toLocaleString()}</time>
							</li>
						))}
					</ul>
				</CardContent>
			</Card>
		</div>
	);
}


