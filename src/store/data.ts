import { create } from "zustand";

export type SalesPoint = { month: string; value: number };
export type Product = { id: string; name: string; sku: string; stock: number; price: number };

type DataState = {
	sales: SalesPoint[] | null;
	products: Product[] | null;
	loadJson: (obj: Partial<{ sales: SalesPoint[]; products: Product[] }>) => void;
	loadCsv: (csv: string, kind: "sales" | "products") => void;
};

const STORAGE_KEY = "app_data_store";

function persist(next: { sales: SalesPoint[] | null; products: Product[] | null }) {
	try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
}

function loadInitial(): { sales: SalesPoint[] | null; products: Product[] | null } {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : { sales: null, products: null };
	} catch { return { sales: null, products: null }; }
}

export const useData = create<DataState>((set) => ({
	...loadInitial(),
	loadJson: (obj) => set((state) => {
		const next = {
			sales: obj.sales ?? state.sales,
			products: obj.products ?? state.products
		};
		persist(next);
		return next;
	}),
	loadCsv: (csv, kind) => set((state) => {
		const rows = csv.trim().split(/\r?\n/);
		const [header, ...data] = rows;
		const cols = header.split(',').map(s => s.trim());
		if (kind === "sales") {
			const monthIdx = cols.indexOf("month");
			const valueIdx = cols.indexOf("value");
			const parsed: SalesPoint[] = data.map(line => {
				const parts = line.split(',');
				return { month: parts[monthIdx], value: Number(parts[valueIdx]) };
			});
			const next = { ...state, sales: parsed };
			persist(next);
			return next;
		}
		if (kind === "products") {
			const idIdx = cols.indexOf("id");
			const nameIdx = cols.indexOf("name");
			const skuIdx = cols.indexOf("sku");
			const stockIdx = cols.indexOf("stock");
			const priceIdx = cols.indexOf("price");
			const parsed: Product[] = data.map(line => {
				const parts = line.split(',');
				return {
					id: parts[idIdx],
					name: parts[nameIdx],
					sku: parts[skuIdx],
					stock: Number(parts[stockIdx]),
					price: Number(parts[priceIdx])
				};
			});
			const next = { ...state, products: parsed };
			persist(next);
			return next;
		}
		return state;
	})
}));

export function exportAsJson() {
	const payload = JSON.stringify({ sales: useData.getState().sales, products: useData.getState().products }, null, 2);
	downloadBlob(new Blob([payload], { type: "application/json" }), "dashboard-data.json");
}

export function exportAsCsv(kind: "sales" | "products") {
	const state = useData.getState();
	if (kind === "sales" && state.sales) {
		const lines = ["month,value", ...state.sales.map(s => `${s.month},${s.value}`)];
		downloadBlob(new Blob([lines.join("\n")], { type: "text/csv" }), "sales.csv");
	}
	if (kind === "products" && state.products) {
		const lines = ["id,name,sku,stock,price", ...state.products.map(p => `${p.id},${p.name},${p.sku},${p.stock},${p.price}`)];
		downloadBlob(new Blob([lines.join("\n")], { type: "text/csv" }), "products.csv");
	}
}

function downloadBlob(blob: Blob, filename: string) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
}


