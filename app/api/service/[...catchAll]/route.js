import { NextResponse } from "next/server";

const disabledResponse = () =>
    NextResponse.json(
        {
            success: false,
            status: "disabled",
            message: "This API service is disabled here. Please use the api.bluebuff.in endpoint."
        },
        { status: 400 }
    );

export async function GET() {
    return disabledResponse();
}

export async function POST() {
    return disabledResponse();
}

export async function PUT() {
    return disabledResponse();
}

export async function DELETE() {
    return disabledResponse();
}

export async function PATCH() {
    return disabledResponse();
}

export async function OPTIONS() {
    return disabledResponse();
}
