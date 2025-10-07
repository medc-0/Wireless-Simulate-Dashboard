export function Avatar({ email, color, size = 28 }: { email?: string | null; color?: string | null; size?: number }) {
	const initial = (email?.trim()?.charAt(0)?.toUpperCase() || "?");
	const dimension = `${size}px`;
	return (
		<div
			className="grid place-items-center rounded-full text-black font-semibold"
			style={{ width: dimension, height: dimension, background: color || "#fff" }}
		>
			<span style={{ fontSize: Math.round(size * 0.5) }}>{initial}</span>
		</div>
	);
}


