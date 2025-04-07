import { drizzle } from 'drizzle-orm/d1';
import * as schema from '@/server/db/schema';

// Use a variable to store the DB connection
let dbInstance = null;

export async function getDb() {
  if (dbInstance) return dbInstance;
  
  try {
    if (process.env.NODE_ENV === 'development') {
      // Check if we're in edge runtime
      if (typeof process === 'undefined' || process.env.NEXT_RUNTIME === 'edge') {
        // Dynamically import Cloudflare modules only when in edge runtime
        const cloudflare = await import('@cloudflare/next-on-pages');
        const { env } = cloudflare.getRequestContext();
        dbInstance = drizzle(env.DB, { schema });
      } else {
        // Node.js runtime in development
        // Use whatever DB connection is appropriate for Node.js
        dbInstance = drizzle(process.env.DB, { schema });
      }
    } else {
      // Production environment
      dbInstance = drizzle(process.env.DB, { schema });
    }
  } catch (error) {
    console.error("Database connection error:", error);
    // Fallback to a basic connection
    dbInstance = drizzle(process.env.DB, { schema });
  }
  
  return dbInstance;
}

// For backwards compatibility, initialize immediately
export const db = drizzle(process.env.DB, { schema });