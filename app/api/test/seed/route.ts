import { seeds } from "@/lib/db/seeds";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const seed = await seeds();
	return NextResponse.json(seed);
}
