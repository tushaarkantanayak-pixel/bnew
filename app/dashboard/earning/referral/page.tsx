"use client";

import ReferralTab from "../../../../components/Dashboard/ReferralTab";
import { useAuthStore } from "../../../../store/useAuthStore";
import AuthGuard from "../../../../components/AuthGuard";

export default function ReferralPage() {
    const { userDetails } = useAuthStore();
    return (
        <AuthGuard>
            <ReferralTab
                userReferral={{
                    userId: userDetails.userId,
                    referralUsed: userDetails.referralUsed,
                    referralCount: userDetails.referralCount,
                }}
            />
        </AuthGuard>
    );
}
