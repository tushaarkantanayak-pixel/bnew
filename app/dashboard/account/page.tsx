"use client";

import AccountTab from "../../../components/Dashboard/AccountTab";
import { useAuthStore } from "../../../store/useAuthStore";
import AuthGuard from "../../../components/AuthGuard";

export default function AccountPage() {
    const { userDetails } = useAuthStore();
    return (
        <AuthGuard>
            <AccountTab userDetails={userDetails} />
        </AuthGuard>
    );
}
