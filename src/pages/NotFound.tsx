import { Link } from "react-router-dom";

export function NotFound() {
	return (
		<div className="min-h-[60vh] grid place-items-center">
			<div className="text-center space-y-4">
				<div className="text-5xl font-bold">404</div>
				<p className="text-white/70">The page you are looking for does not exist.</p>
				<Link to="/" className="inline-block px-4 py-2 rounded-md bg-white text-black font-medium">Go Home</Link>
			</div>
		</div>
	);
}


