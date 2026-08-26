import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith("/api/service")) {
        return NextResponse.json(
            {
                success: false,
                status: "disabled",
                message: "This API service is disabled here. Please use the api.bluebuff.in endpoint."
            },
            {
                status: 400,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                    "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, x-api-key, idempotency-key"
                }
            }
        );
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/api/service/:path*"]
};
