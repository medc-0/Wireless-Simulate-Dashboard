import { useMemo } from "react";
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from "@tanstack/react-table";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { useData } from "@/store/data";

type Product = { id: string; name: string; sku: string; stock: number; price: number };

const fallbackProducts: Product[] = Array.from({ length: 20 }).map((_, i) => ({
	id: String(i + 1),
	name: `Product ${i + 1}`,
	sku: `SKU-${1000 + i}`,
	stock: Math.floor(Math.random() * 200),
	price: Number((10 + Math.random() * 90).toFixed(2))
}));

export default function Component() {
    const { products } = useData();
	const columns = useMemo<ColumnDef<Product>[]>(() => [
		{ header: "Name", accessorKey: "name" },
		{ header: "SKU", accessorKey: "sku" },
		{ header: "Stock", accessorKey: "stock" },
		{ header: "Price", accessorKey: "price", cell: ({ getValue }) => `$${getValue<number>().toFixed(2)}` }
	], []);

	const table = useReactTable({ data: products ?? fallbackProducts, columns, getCoreRowModel: getCoreRowModel() });

	return (
		<div className="space-y-4">
			<h1 className="text-2xl font-semibold">Inventory</h1>
			<Card>
				<CardHeader>
					<div className="font-medium">Products</div>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead className="text-left text-white/70">
								{table.getHeaderGroups().map(hg => (
									<tr key={hg.id}>
										{hg.headers.map(h => (
											<th key={h.id} className="px-3 py-2 border-b border-white/10">
												{h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
											</th>
										))}
									</tr>
								))}
							</thead>
							<tbody>
								{table.getRowModel().rows.map(r => (
									<tr key={r.id} className="border-b border-white/5 hover:bg-white/5">
										{r.getVisibleCells().map(c => (
											<td key={c.id} className="px-3 py-2">
												{flexRender(c.column.columnDef.cell, c.getContext())}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}


