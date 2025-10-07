import { RefObject, useEffect } from "react";

export function useOnClickOutside<T extends HTMLElement>(ref: RefObject<T | null>, handler: (e: MouseEvent | TouchEvent) => void) {
	useEffect(() => {
		function listener(e: MouseEvent | TouchEvent) {
			const el = ref.current;
			if (!el || el.contains(e.target as Node)) return;
			handler(e);
		}
		document.addEventListener("mousedown", listener);
		document.addEventListener("touchstart", listener);
		return () => {
			document.removeEventListener("mousedown", listener);
			document.removeEventListener("touchstart", listener);
		};
	}, [ref, handler]);
}


