// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authentication } from "../../lib/backend/auth";
import { AuthError } from "@supabase/supabase-js";

export function Providers({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	// replace with your auth hook
	const pathname = usePathname();

	useEffect(() => {
		const getAuth = async () => {
			const authData = await authentication.getSession();
			if (authData instanceof AuthError) {
				console.error(authData.message);
				return;
			}
			if (!authData?.session?.user.id) {
				if (pathname !== "/" && pathname !== "/login") {
					router.push("/");
				}
			}
		};

		getAuth();
	}, [router, pathname]);
	return <NextUIProvider>{children}</NextUIProvider>;
}
