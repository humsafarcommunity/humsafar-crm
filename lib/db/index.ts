import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.POSTGRES_URL!;

// For edge environments (Vercel), we'll use a single connection or pool depending on the environment
const client = postgres(connectionString);
export const db = drizzle(client, { schema });
