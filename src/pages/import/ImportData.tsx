import { useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { useData, exportAsJson, exportAsCsv } from "@/store/data";

export default function Component() {
	const jsonInput = useRef<HTMLInputElement | null>(null);
	const csvInput = useRef<HTMLInputElement | null>(null);
	const { loadJson, loadCsv } = useData();
	const [message, setMessage] = useState<string>("");

	async function onJsonChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;
		try {
			const text = await file.text();
			const obj = JSON.parse(text);
			loadJson(obj);
			setMessage("JSON imported successfully");
		} catch (err) {
			setMessage("Failed to import JSON");
		}
	}

	async function onCsvChange(e: React.ChangeEvent<HTMLInputElement>, kind: "sales" | "products") {
		const file = e.target.files?.[0];
		if (!file) return;
		const text = await file.text();
		loadCsv(text, kind);
		setMessage(`${kind} CSV imported`);
	}

	return (
		<div className="space-y-4">
			<h1 className="text-2xl font-semibold">Import Data</h1>
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div className="font-medium">Upload</div>
						<div className="flex items-center gap-2 text-sm">
							<a href="data:text/csv,month,value%0AJan,100" download="sales-template.csv" className="px-2 py-1 rounded bg-white/5">Sales template</a>
							<a href="data:text/csv,id,name,sku,stock,price%0A1,Sample,SKU-1,10,19.99" download="products-template.csv" className="px-2 py-1 rounded bg-white/5">Products template</a>
							<button onClick={() => exportAsJson()} className="px-2 py-1 rounded bg-white/5">Export JSON</button>
							<button onClick={() => exportAsCsv("sales") } className="px-2 py-1 rounded bg-white/5">Export Sales CSV</button>
							<button onClick={() => exportAsCsv("products") } className="px-2 py-1 rounded bg-white/5">Export Products CSV</button>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<div className="text-white/80">Import JSON</div>
						<input ref={jsonInput} type="file" accept="application/json" onChange={onJsonChange} className="block text-sm" />
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<div className="text-white/80 mb-1">Import Sales CSV</div>
							<input ref={csvInput} type="file" accept=".csv" onChange={(e) => onCsvChange(e, "sales")} className="block text-sm" />
						</div>
						<div>
							<div className="text-white/80 mb-1">Import Products CSV</div>
							<input type="file" accept=".csv" onChange={(e) => onCsvChange(e, "products")} className="block text-sm" />
						</div>
					</div>
					{message && <div className="text-sm text-white/70">{message}</div>}
				</CardContent>
			</Card>
		</div>
	);
}


