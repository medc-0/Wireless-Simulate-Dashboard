import { Search as SearchIcon, Bell } from "lucide-react";
import { Search } from "@/components/Search";
import { useRef, useState } from "react";
import { useAuth } from "@/store/auth";
import { useNotifications } from "@/store/notifications";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { ProfileMenu } from "@/components/ProfileMenu";
import { NotificationsDropdown } from "@/components/NotificationsDropdown";
import { DesktopBadge } from "@/components/DesktopBadge";

export function Topbar() {
	const [open, setOpen] = useState(false);
	const { logout } = useAuth();

	return (
		<div className="h-14 flex items-center justify-between px-4">
            <div className="flex items-center gap-3 text-white/80">
                <span>Welcome back</span>
                <DesktopBadge />
            </div>
			<div className="flex items-center gap-3">
            <Search />
    <div className="relative">
                    <button onClick={() => setOpen(v => !v)} aria-haspopup="menu" aria-expanded={open} className="size-9 grid place-items-center rounded-md bg-white/5 ring-1 ring-white/10 hover:bg-white/10">
						<Bell className="size-4 text-white" />
					</button>
					{open && (
						<div className="absolute right-0 mt-2 w-72 rounded-md ring-1 ring-white/10 bg-black p-2 text-sm">
							<NotificationsDropdown />
						</div>
					)}
				</div>
    <div className="relative">
            <ProfileMenu onLogout={logout} />
        </div>
			</div>
		</div>
	);
}


