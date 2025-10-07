import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function Layout() {
	return (
		<div className="min-h-screen grid grid-cols-[260px_1fr] grid-rows-[56px_1fr]">
			<aside className="row-span-2 bg-black border-r border-white/10">
				<Sidebar />
			</aside>
			<header className="bg-black/90 backdrop-blur border-b border-white/10">
				<Topbar />
			</header>
			<main className="bg-black">
				<div className="p-6">
					<Outlet />
				</div>
			</main>
		</div>
	);
}


