import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart2, Users, DollarSign, Package } from "lucide-react";
import { useData } from "@/store/data";

const fallbackData = Array.from({ length: 12 }, (_, i) => ({
	month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
	value: Math.round(50 + Math.random() * 100)
}));

export function StatCard({ title, value, icon: Icon }: { title: string; value: string; icon: any }) {
	return (
		<div className="rounded-xl ring-1 ring-white/10 bg-white/[0.04] p-4">
			<div className="flex items-center justify-between">
				<div>
					<div className="text-white/60 text-sm">{title}</div>
					<div className="text-2xl font-semibold">{value}</div>
				</div>
				<Icon className="size-5 text-white/70" />
			</div>
		</div>
	);
}

export function Dashboard() {
	const { sales } = useData();
	const chartData = sales ?? fallbackData;
	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
				<StatCard title="Revenue" value="$124,920" icon={DollarSign} />
				<StatCard title="Active Users" value="8,421" icon={Users} />
				<StatCard title="New Orders" value="1,204" icon={Package} />
				<StatCard title="Sessions" value="32,901" icon={BarChart2} />
			</div>

			<div className="rounded-xl ring-1 ring-white/10 bg-white/[0.04] p-4">
				<div className="mb-3 text-white/80 font-medium">Monthly Performance</div>
				<div className="h-64">
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart data={chartData} margin={{ left: 8, right: 8 }}>
							<CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
							<XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
							<YAxis stroke="rgba(255,255,255,0.5)" />
							<Tooltip contentStyle={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }} />
							<Area type="monotone" dataKey="value" stroke="#fff" fill="rgba(255,255,255,0.15)" />
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
}


