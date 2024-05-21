import { z } from 'zod';

const envZodModel = z.object({
  MERCADOPAGO_SECRET_KEY: z.string(),
  PORT: z.string(),
});

type EnvType = z.infer<typeof envZodModel>;
declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvType {}
  }
}
