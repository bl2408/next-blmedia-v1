import { NextResponse } from "next/server";
import { db } from "@/db/index";

export async function GET(request: Request) {
	const userList = await db.query.users.findMany({
		columns: {
			roleId: false,
		},
		with: {
			role: {
				columns: {
					id: false,
				},
			},
		},
	});

	const rolesList = await db.query.roles.findMany();

	return NextResponse.json({ users: userList, roles: rolesList });
}
