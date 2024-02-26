// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authentication } from "../../lib/backend/auth";
import { AuthError } from "@supabase/supabase-js";
import { currentUser } from "./store";

export function Providers({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const pathname = usePathname();
	const current = currentUser()
	useEffect(() => {
		const getAuth = async () => {
			const authData = await authentication.getSession();
			if (authData instanceof AuthError) {
				console.error(authData.message);
				return;
			}
			if (!authData?.session?.user.id) {
				if (pathname !== "/" && pathname !== "/login" && pathname !== "/patient_form" && pathname !== "/doctor_form") {
					router.push("/");
				}
			} else {
				if (pathname === "/" || pathname === "/login" || pathname === "/patient_form" || pathname === "/doctor_form") {
					if (current.user.type === "patient") {
						router.push("/patient/dashboard");
					} else if (current.user.type === "doctor") {
						router.push("/dashboard");
					}
				}
			}
		};

		getAuth();
	}, [router, pathname]);
	return <NextUIProvider>{children}</NextUIProvider>;
}
