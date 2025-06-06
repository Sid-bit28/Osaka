import * as z from 'zod';

const SignInSchema = z.object({
  email: z.string().email({ message: 'Email ID is required.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

const SignUpSchema = z.object({
  email: z.string().email({
    message: 'Email is required.',
  }),
  password: z.string().min(6, {
    message: 'Minimum 6 characters is required.',
  }),
  name: z.string().min(1, {
    message: 'Name is required.',
  }),
});

export { SignInSchema, SignUpSchema };
