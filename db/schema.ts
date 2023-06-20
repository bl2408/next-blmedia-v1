import { relations, InferModel } from "drizzle-orm";

import {
	index,
	int,
	mysqlTable,
	primaryKey,
	timestamp,
	uniqueIndex,
	varchar,
} from "drizzle-orm/mysql-core";

/* TABLES */

//Users
export const users = mysqlTable(
	"users",
	{
		id: varchar("id", { length: 16 }).primaryKey().notNull(),
		name: varchar("name", { length: 255 }),
		email: varchar("email", { length: 255 }),
		emailVerified: timestamp("timestamp"),
		image: varchar("image", { length: 255 }),
		roleId: int("role_id").notNull(),
	},
	(table) => {
		return {
			idIdx: uniqueIndex("id_idx").on(table.id),
			emailIdx: uniqueIndex("email_idx").on(table.email),
		};
	}
);

//Accounts
export const accounts = mysqlTable(
	"accounts",
	{
		userId: varchar("user_id", { length: 255 }).notNull(),
		type: varchar("type", { length: 255 }).notNull(),
		provider: varchar("provider", { length: 255 }).notNull(),
		providerAccountId: varchar("provider_account_id", {
			length: 255,
		}).notNull(),
		refreshToken: varchar("refresh_token", { length: 255 }),
		accessToken: varchar("access_token", { length: 255 }),
		expiresAt: int("expires_at"),
		tokenType: varchar("token_type", { length: 255 }),
		scope: varchar("scope", { length: 255 }),
		idToken: varchar("id_token", { length: 255 }),
		sessionState: varchar("session_state", { length: 255 }),
	},
	(table) => {
		return {
			pk: primaryKey(table.provider, table.providerAccountId),
			userIdIdx: index("user_id_idx").on(table.userId),
		};
	}
);

//Sessions
export const sessions = mysqlTable(
	"sessions",
	{
		id: int("id").primaryKey().autoincrement().notNull(),
		userId: varchar("user_id", { length: 255 }).notNull(),
		sessionToken: varchar("session_token", { length: 255 }).notNull(),
		expires: timestamp("timestamp").notNull(),
	},
	(table) => {
		return {
			idIdx: uniqueIndex("id_idx").on(table.id),
			userIdIdx: index("user_id_idx").on(table.userId),
			sessionTokenIdx: uniqueIndex("session_token_idx").on(
				table.sessionToken
			),
		};
	}
);

//Verification Token
export const verificationTokens = mysqlTable(
	"verification_token",
	{
		identifier: varchar("identifier", { length: 255 }).notNull(),
		token: varchar("token", { length: 255 }).notNull(),
		expires: timestamp("timestamp").notNull(),
	},
	(table) => {
		return {
			pk: primaryKey(table.identifier, table.token),
			token: uniqueIndex("token").on(table.token),
		};
	}
);

//Roles
export const roles = mysqlTable(
	"roles",
	{
		id: int("id").primaryKey().autoincrement().notNull(),
		label: varchar("label", { length: 255 }),
	},
	(table) => {
		return {
			idIdx: uniqueIndex("id_idx").on(table.id),
			labelIdx: uniqueIndex("label_idx").on(table.label),
		};
	}
);

/* RELATIONS */
export const rolesRelations = relations(roles, ({ many }) => ({
	users: many(users),
}));

export const usersRelations = relations(users, ({ one }) => ({
	role: one(roles, {
		fields: [users.roleId],
		references: [roles.id],
	}),
}));

/* INFER */
export type NewUser = InferModel<typeof users, "insert">;
export type NewRole = InferModel<typeof roles, "insert">;
