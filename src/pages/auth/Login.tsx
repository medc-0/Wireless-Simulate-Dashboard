import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import { useAuth } from "@/store/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(6)
});

type FormValues = z.infer<typeof schema>;

export function Login() {
	const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
		resolver: zodResolver(schema)
	});
    const { login, isAuthenticated } = useAuth();
	const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/', { replace: true });
    }, [isAuthenticated, navigate]);


    function onSubmit(values: FormValues) {
        login({ role: "admin", email: values.email });
		navigate("/", { replace: true });
	}

	return (
		<div className="min-h-[60vh] grid place-items-center">
			<form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4 bg-white/[0.04] p-6 rounded-xl ring-1 ring-white/10">
				<div className="text-lg font-semibold">Sign in</div>
				<div>
					<label className="block text-sm text-white/70 mb-1">Email</label>
					<input {...register("email")} className="w-full bg-white/5 rounded-md px-3 py-2 outline-none ring-1 ring-white/10" />
					{errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
				</div>
				<div>
					<label className="block text-sm text-white/70 mb-1">Password</label>
					<input type="password" {...register("password")} className="w-full bg-white/5 rounded-md px-3 py-2 outline-none ring-1 ring-white/10" />
					{errors.password && <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>}
				</div>
				<button disabled={isSubmitting} className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-white text-black font-medium">
					<LogIn className="size-4" /> Sign in
				</button>
			</form>
		</div>
	);
}


