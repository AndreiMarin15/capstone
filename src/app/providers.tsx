// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authentication } from "@/backend/auth";
import { AuthError } from "@supabase/supabase-js";
import { currentUser } from "./store";
import { LoadingProvider } from "./context/loadingContext";
import LoadingScreen from "./components/LoadingScreen";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const current = currentUser();
  useEffect(() => {
    const getAuth = async () => {
      const authData = await authentication.getSession();
      if (authData instanceof AuthError) {
        console.error(authData.message);
        return;
      }
      if (!authData?.session?.user.id) {
        if (
          pathname !== "/" &&
          pathname !== "/login" &&
          pathname !== "/test" &&
          pathname !== "/patient_form" &&
          pathname !== "/doctor_form" &&
          pathname !== "/require_auth" &&
pathname !== "/logout" &&
          !pathname.includes("/legal") &&
          !pathname.includes("/middleware")
        ) {
          router.push("/require_auth");
        }
      } else {
        if (
          pathname === "/" ||
          pathname === "/login" ||
          pathname === "/test" ||
          pathname === "/patient_form" ||
          pathname === "/doctor_form"
        ) {
          if (current.user.type === "patient") {
            router.push("/patient/home");
          } else if (current.user.type === "doctor") {
            if (current.user.specialization_id === 1) {
              router.push("/home");
            } else {
              router.push("/other_doctor/referrals");
            }
          }
        }
      }
    };

    getAuth();
  }, [router, pathname, current.user]);
  return <LoadingProvider>
            <LoadingScreen/>
            <NextUIProvider>{children}</NextUIProvider>
        </LoadingProvider>
}
