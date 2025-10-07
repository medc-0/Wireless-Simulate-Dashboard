import { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
	return <div className={["rounded-xl ring-1 ring-white/10 bg-white/[0.04]", className].join(" ")}>{children}</div>;
}

export function CardHeader({ children, className = "p-4 border-b border-white/10" }: { children: ReactNode; className?: string }) {
	return <div className={className}>{children}</div>;
}

export function CardContent({ children, className = "p-4" }: { children: ReactNode; className?: string }) {
	return <div className={className}>{children}</div>;
}


