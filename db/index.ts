import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import * as schema from "@/db/schema";
import { Logger } from "drizzle-orm";

// create the connection
const connection = connect({
	host: process.env["DATABASE_HOST"],
	username: process.env["DATABASE_USERNAME"],
	password: process.env["DATABASE_PASSWORD"],
});

//Logger
class MyLogger implements Logger {
	logQuery(query: string, params: unknown[]): void {
		console.log("QUERY:");
		console.log(query);
		console.log("PARAMS:");
		console.log(params);
	}
}

export const db = drizzle(connection, { schema, logger: new MyLogger() });
