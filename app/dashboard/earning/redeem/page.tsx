"use client";

import RedeemTab from "../../../../components/Dashboard/RedeemTab";
import { useAuthStore } from "../../../../store/useAuthStore";
import AuthGuard from "../../../../components/AuthGuard";

export default function RedeemPage() {
    const { setWalletBalance } = useAuthStore();
    return (
        <AuthGuard>
            <RedeemTab setWalletBalance={setWalletBalance} />
        </AuthGuard>
    );
}
