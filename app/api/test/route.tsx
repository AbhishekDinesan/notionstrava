export async function GET(request: Request) {
   return new Response(JSON.stringify({ message: "Handcrafted by Abhi Dinesan" }), {
    headers: { "Content-Type": "application/json" },
  });
}

