import { useEffect, useState } from "react";

export function DesktopBadge() {
	const [isDesktop, setIsDesktop] = useState<boolean>(false);
	const [ping, setPing] = useState<string>("");

	useEffect(() => {
		if (typeof window !== "undefined" && window.desktop) {
			setIsDesktop(true);
			window.desktop.ping().then((res) => setPing(res)).catch(() => setPing(""));
		}
	}, []);

	if (!isDesktop) return null;

	return (
		<span className="hidden sm:inline-flex items-center gap-2 text-xs px-2 py-1 rounded-md bg-white/5 ring-1 ring-white/10 text-white/80">
			<span>Desktop</span>
			{ping && <span className="text-white/40">{ping}</span>}
		</span>
	);
}


