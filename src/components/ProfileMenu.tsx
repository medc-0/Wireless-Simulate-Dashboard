import { useState, useRef } from "react";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useAuth } from "@/store/auth";
import { Avatar } from "@/components/Avatar";

export function ProfileMenu({ onLogout }: { onLogout: () => void }) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	useOnClickOutside(ref, () => setOpen(false));
    const { email, avatarColor } = useAuth();

	return (
		<div className="relative" ref={ref}>
            <button onClick={() => setOpen(v => !v)} className="grid place-items-center rounded-full ring-1 ring-white/10">
                <Avatar email={email ?? undefined} color={avatarColor ?? undefined} size={36} />
            </button>
			{open && (
				<div className="absolute right-0 mt-2 w-48 rounded-md ring-1 ring-white/10 bg-black p-1 text-sm">
					<div className="px-3 py-2 text-white/70">Signed in</div>
					<button onClick={onLogout} className="w-full text-left px-3 py-2 rounded hover:bg-white/5">Logout</button>
				</div>
			)}
		</div>
	);
}


