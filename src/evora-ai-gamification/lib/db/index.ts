import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

const globalForDb = globalThis as unknown as { evoraPool?: Pool }

export const pool = globalForDb.evoraPool ?? new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 20_000,
  connectionTimeoutMillis: 5_000,
})

if (process.env.NODE_ENV !== 'production') globalForDb.evoraPool = pool

export const db = drizzle(pool, { schema })
