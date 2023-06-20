import { db } from "@/db/index";
import { roles, users } from "@/db/schema";
import { genId } from "./gen-id";
import { eq } from "drizzle-orm";

export async function seeds() {
	try {
		await db
			.insert(roles)
			.ignore()
			.values([{ label: "ADMIN" }, { label: "USER" }]);

		// const roleAdmin = await db
		// 	.select({ id: roles.id })
		// 	.from(roles)
		// 	.where(eq(roles.label, "ADMIN"));
		// const roleUser = await db
		// 	.select({ id: roles.id })
		// 	.from(roles)
		// 	.where(eq(roles.label, "USER"));

		// if (roleAdmin.length === 0 || roleUser.length === 0) {
		// 	throw new Error("Roles not found!");
		// }

		// await db.insert(users).ignore().values({
		// 	id: genId(),
		// 	name: "brian",
		// 	email: "brian@email.com",
		// 	roleId: roleAdmin[0].id,
		// });

		// await db.insert(users).ignore().values({
		// 	id: genId(),
		// 	name: "test",
		// 	email: "test@email.com",
		// 	roleId: roleUser[0].id,
		// });
	} catch (error) {
		console.log(error);
		return { success: false };
	}

	return { success: true };
}
