import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Login } from "./pages/auth/Login";
import { NotFound } from "./pages/NotFound";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import Analytics from "./pages/analytics/Analytics";
import Sales from "./pages/sales/Sales";
import CRM from "./pages/crm/CRM";
import Inventory from "./pages/inventory/Inventory";
import Projects from "./pages/projects/Projects";
import Finance from "./pages/finance/Finance";
import Notifications from "./pages/notifications/Notifications";
import ImportData from "./pages/import/ImportData";

export default function App() {
	return (
		<Routes>
			<Route element={<Layout />}> 
				<Route index element={<Dashboard />} />
				<Route path="/dashboard" element={<Navigate to="/" replace />} />
				<Route element={<ProtectedRoute />}>
					<Route path="/analytics" element={<Analytics />} />
					<Route path="/sales" element={<Sales />} />
					<Route path="/crm" element={<CRM />} />
					<Route path="/inventory" element={<Inventory />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/finance" element={<Finance />} />
					<Route path="/notifications" element={<Notifications />} />
                    <Route path="/import" element={<ImportData />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Route>

			<Route path="/login" element={<Login />} />
		</Routes>
	);
}


