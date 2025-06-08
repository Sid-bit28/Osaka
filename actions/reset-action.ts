'use server';

import { ResetSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';
import * as z from 'zod';
import { sendPasswordResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/data/token';

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid email.',
    };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return {
      success: false,
      error: 'Email not found.',
    };
  }

  // Todo: Generate token and send email
  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return {
    success: true,
    message: 'Reset email send.',
  };
};
