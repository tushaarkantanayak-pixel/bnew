export async function POST() {
  return Response.json(
    { success: false, message: "Registration endpoint is deprecated. Please use Google Login or Email OTP." },
    { status: 410 } // 410 Gone
  );
}
