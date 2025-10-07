import { NavLink } from "react-router-dom";
import { appLinks } from "@/routes/links";

const links = appLinks;

export function Sidebar() {
	return (
		<nav className="h-full p-4">
			<div className="mb-6 text-white font-semibold tracking-wide">DASHBOARD</div>
			<ul className="space-y-1">
				{links.map(({ to, label, icon: Icon }) => (
					<li key={to}>
						<NavLink
							to={to}
							className={({ isActive }) =>
								[
									"flex items-center gap-3 px-3 py-2 rounded-md",
									"text-white/80 hover:text-white",
									isActive ? "bg-white/10 text-white" : "hover:bg-white/5"
								].join(" ")
							}
						>
							<Icon className="size-4" />
							<span className="text-sm">{label}</span>
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
}


