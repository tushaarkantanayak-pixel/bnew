export async function POST() {
  return Response.json(
    { success: false, message: "Hybrid auth endpoint is deprecated." },
    { status: 410 }
  );
}
