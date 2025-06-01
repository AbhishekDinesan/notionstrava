export async function GET(request: Request) {
   return new Response(JSON.stringify({ message: "This is the callback route" }), {
    headers: { "Content-Type": "application/json" },
  });
}

