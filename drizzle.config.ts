import dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({ path: ".env.local" });

export default {
	schema: "./db/schema.ts",
	out: "./db/migrations",
	driver: "mysql2",
	dbCredentials: {
		connectionString: process.env.DATABASE_URL as string,
	},
} satisfies Config;
