import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({

  server: {
    CLOUDFLARE_ACCOUNT_ID: z.string().optional(),
    CLOUDFLARE_API_TOKEN: z.string().optional(),
    DB_REMOTE_DATABASE_ID: z.string().optional(),
    DB_LOCAL_PATH: z.string().optional(),
    NODE_ENV: z.enum(['development', 'production']).default('development'),
  },

  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },


  runtimeEnv: {
    CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
    CLOUDFLARE_API_TOKEN: process.env.CLOUDFLARE_API_TOKEN,
    DB_REMOTE_DATABASE_ID: process.env.DB_REMOTE_DATABASE_ID,
    DB_LOCAL_PATH: process.env.DB_LOCAL_PATH,
    NODE_ENV: process.env.NODE_ENV,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },

  
  skipValidation: Boolean(process.env.SKIP_ENV_VALIDATION),

  
  emptyStringAsUndefined: true,
});