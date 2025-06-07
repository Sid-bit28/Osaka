'use server';

import * as z from 'zod';
import { SignInSchema } from '@/schemas';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/constants/routes';
import { AuthError } from 'next-auth';

export const loginAction = async (values: z.infer<typeof SignInSchema>) => {
  const validatedFields = SignInSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid Fields',
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            success: false,
            error: 'Invalid credentials',
          };
        default:
          return {
            success: false,
            error: 'Somthing went wrong.',
          };
      }
    }
    // without throwing the error, the page doesn't redirect.
    throw error;
  }

  return {
    success: true,
    message: 'Login Successful.',
  };
};
