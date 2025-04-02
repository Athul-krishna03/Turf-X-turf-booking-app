export const ROLES = {
	ADMIN:"admin",
	USER:"user"
} as const;

export type TRole = "admin" | "user" | "TurfOwner";