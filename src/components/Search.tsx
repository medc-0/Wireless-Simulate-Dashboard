import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appLinks } from "@/routes/links";
import { Search as SearchIcon } from "lucide-react";

export function Search() {
	const [q, setQ] = useState("");
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	const results = useMemo(() => {
		const term = q.toLowerCase().trim();
		if (!term) return [] as typeof appLinks;
		return appLinks.filter(l => l.label.toLowerCase().includes(term));
	}, [q]);

	useEffect(() => { setOpen(results.length > 0 && q.length > 0); }, [results, q]);

	function go(to: string) {
		navigate(to);
		setOpen(false);
		setQ("");
	}

	return (
		<div className="relative">
			<SearchIcon className="size-4 absolute left-2 top-2.5 text-white/40" />
			<input
				value={q}
				onChange={(e) => setQ(e.target.value)}
				placeholder="Search pages"
				className="w-64 bg-white/5 text-white placeholder:text-white/40 rounded-md pl-8 pr-3 py-2 outline-none ring-1 ring-white/10 focus:ring-white/20"
			/>
			{open && (
				<div className="absolute mt-2 w-64 rounded-md ring-1 ring-white/10 bg-black p-1 text-sm z-10">
					{results.map(r => (
						<button key={r.to} onClick={() => go(r.to)} className="w-full text-left px-3 py-2 rounded hover:bg-white/5 flex items-center gap-2">
							<r.icon className="size-4" />
							<span>{r.label}</span>
						</button>
					))}
					{results.length === 0 && <div className="px-3 py-2 text-white/60">No results</div>}
				</div>
			)}
		</div>
	);
}


