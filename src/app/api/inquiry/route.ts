// Inquiry form submission endpoint. Currently a placeholder — logs the
// submission server-side and returns success. Wire to Resend (or another
// transactional email service) once the destination inbox is confirmed.

import { NextResponse } from "next/server";


export async function POST(req: Request) {
	const body = await req.json().catch(() => null);
	if (!body || typeof body !== "object") {
		return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
	}

	const { name, email, phone, dates, propertySlug, propertyName } = body as Record<string, unknown>;

	if (!name || !email) {
		return NextResponse.json(
			{ ok: false, error: "Name and email are required" },
			{ status: 400 },
		);
	}

	console.log("[inquiry]", {
		name,
		email,
		phone,
		dates,
		propertySlug,
		propertyName,
		receivedAt: new Date().toISOString(),
	});

	return NextResponse.json({ ok: true });
}
