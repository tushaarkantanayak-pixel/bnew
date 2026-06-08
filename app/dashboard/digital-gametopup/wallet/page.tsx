"use client";

import WalletTab from "../../../../components/Dashboard/WalletTab";
import { useAuthStore } from "../../../../store/useAuthStore";
import AuthGuard from "../../../../components/AuthGuard";

export default function WalletPage() {
    const { walletBalance, setWalletBalance, userDetails } = useAuthStore();
    return (
        <AuthGuard>
            <WalletTab
                walletBalance={walletBalance}
                setWalletBalance={setWalletBalance}
                userReferral={{
                    userId: userDetails.userId,
                    userType: userDetails.userType,
                    referralUsed: userDetails.referralUsed,
                    referralCount: userDetails.referralCount,
                }}
            />
        </AuthGuard>
    );
}
