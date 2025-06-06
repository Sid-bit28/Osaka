'use server';

import * as z from 'zod';
import { SignInSchema } from '@/schemas';

export const loginAction = async (values: z.infer<typeof SignInSchema>) => {
  const validatedFields = SignInSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid Fields',
    };
  }

  return {
    success: true,
    message: 'Login Successful.',
  };
};
