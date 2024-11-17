import { getAllPosts } from "@/utils/sanity.utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Disable Next.js cache for this route
    const headers = new Headers({
      "Cache-Control": "no-store, must-revalidate",
      Pragma: "no-cache",
    });

    const posts = await getAllPosts();
    return NextResponse.json(posts, { headers });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
