"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";

// Dynamic import for the heavy overlay component
const Maintaince = dynamic(() => import("@/components/Seasonal/Maintaince"), {
    ssr: false, // Only load on client
});

export default function MaintenanceWrapper({ maintenanceMode }) {
    const pathname = usePathname();
    const { userDetails } = useAuthStore();
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        // Use Zustand state if available, fallback to localStorage
        if (userDetails.userType) {
            setUserType(userDetails.userType);
        } else {
            const cachedRole = localStorage.getItem("userType");
            if (cachedRole) setUserType(cachedRole);
        }
    }, [userDetails.userType]);

    // If maintenance is OFF, do nothing
    if (!maintenanceMode) return null;

    // Owners ALWAYS bypass maintenance
    if (userType === "owner") return null;

    // List of paths that should NEVER show the maintenance overlay
    // We must allow /login so they can log in as owner
    // We must allow /api/auth so the login requests work
    const allowedPaths = ["/login", "/api/auth"];

    if (pathname && allowedPaths.some(path => pathname.startsWith(path))) {
        return null;
    }

    // Show maintenance overlay for everyone else
    return <Maintaince />;
}
