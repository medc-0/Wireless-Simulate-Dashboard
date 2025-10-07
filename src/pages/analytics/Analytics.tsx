import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

const base = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d, i) => ({ day: d, a: 10 + i * 7, b: 20 + (6 - i) * 5 }));
const pie = [
	{ name: "Direct", value: 400 },
	{ name: "Referral", value: 300 },
	{ name: "Social", value: 300 }
];
const colors = ["#ffffff", "#b1b1b1", "#4a4a4a"];

export default function Component() {
	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-semibold">Analytics</h1>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<div className="font-medium">Weekly Bar</div>
					</CardHeader>
					<CardContent>
						<div className="h-64">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={base}>
									<CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
									<XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" />
									<YAxis stroke="rgba(255,255,255,0.5)" />
									<Tooltip contentStyle={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }} />
									<Bar dataKey="a" fill="#ffffff" />
									<Bar dataKey="b" fill="rgba(255,255,255,0.4)" />
								</BarChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<div className="font-medium">Weekly Line</div>
					</CardHeader>
					<CardContent>
						<div className="h-64">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart data={base}>
									<CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
									<XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" />
									<YAxis stroke="rgba(255,255,255,0.5)" />
									<Tooltip contentStyle={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }} />
									<Line type="monotone" dataKey="a" stroke="#ffffff" />
									<Line type="monotone" dataKey="b" stroke="rgba(255,255,255,0.5)" />
								</LineChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<div className="font-medium">Traffic Sources</div>
				</CardHeader>
				<CardContent>
					<div className="h-64">
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie data={pie} dataKey="value" nameKey="name" outerRadius={90} innerRadius={55} stroke="#0a0a0a">
									{pie.map((_, idx) => (
										<Cell key={idx} fill={colors[idx % colors.length]} />
									))}
								</Pie>
							</PieChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}


