import { BarChart2, ShoppingCart, Users, Boxes, FolderKanban, PiggyBank, LayoutDashboard, Bell, Upload } from "lucide-react";

export const appLinks = [
	{ to: "/", label: "Dashboard", icon: LayoutDashboard },
	{ to: "/analytics", label: "Analytics", icon: BarChart2 },
	{ to: "/sales", label: "Sales", icon: ShoppingCart },
	{ to: "/crm", label: "CRM", icon: Users },
	{ to: "/inventory", label: "Inventory", icon: Boxes },
	{ to: "/projects", label: "Projects", icon: FolderKanban },
	{ to: "/finance", label: "Finance", icon: PiggyBank },
	{ to: "/notifications", label: "Notifications", icon: Bell },
	{ to: "/import", label: "Import", icon: Upload }
];


