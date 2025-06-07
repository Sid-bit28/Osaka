'use client';

import { Card, CardContent } from '@/components/ui/card';
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { OctagonAlert, UserCheck } from 'lucide-react';
import Link from 'next/link';
import { DEFAULT_LOGIN_REDIRECT, ROUTES } from '@/constants/routes';
import { SignInSchema } from '@/schemas';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { loginAction } from '@/actions/login-action';
import { useTransition } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

type Props = {};

const SignInView = (props: Props) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use.'
      : '';
  console.log(urlError);

  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof SignInSchema>) => {
    setError('');
    setSuccess('');

    console.log('Form Data:', data);
    // Handle sign-in logic here
    startTransition(() => {
      loginAction(data).then(data => {
        setError(data.error);
        setSuccess(data.message);
      });
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold text-primary-300">
                    Welcome Back
                  </h1>
                  <p className="text-balance text-primary-300">
                    Login to your account.
                  </p>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="osaka@gmail.com"
                            {...field}
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="********"
                            {...field}
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {(error || urlError) && (
                  <div className="mx-auto">
                    <Alert variant="destructive" className="border-none">
                      {(error || urlError) && (
                        <OctagonAlert className="h-4 w-4 !text-destructive" />
                      )}
                      <AlertTitle>{error || urlError}</AlertTitle>
                    </Alert>
                  </div>
                )}

                {success && (
                  <div className="mx-auto">
                    <Alert variant="default" className="border-none">
                      {success && <UserCheck className="h-4 w-4" />}
                      <AlertTitle>{success}</AlertTitle>
                    </Alert>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-primary-100 text-primary-foreground hover:bg-primary-200"
                  disabled={isPending}
                >
                  {isPending ? 'Loading..' : 'Sign In'}
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full"
                    disabled={isPending}
                    onClick={() => onClick('google')}
                  >
                    <FcGoogle className="h-8 w-8" />
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full"
                    disabled={isPending}
                    onClick={() => onClick('github')}
                  >
                    <FaGithub className="h-8 w-8" />
                    Github
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{' '}
                  <Link
                    href={ROUTES.SIGN_UP}
                    className="underline underline-offset-4"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div className="relative hidden md:flex flex-col gap-y-4 items-center">
            <img src="/logo.svg" alt="logo" className="h-[100px] w-[100px]" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10em"
              height="10em"
              data-name="Layer 1"
              viewBox="0 0 647.636 632.174"
              className="h-80 w-80 fill-current text-muted-foreground"
            >
              <path
                fill="#f2f2f2"
                d="M687.328 276.087h-174.51a15.018 15.018 0 00-15 15v387.85l-2 .61-42.81 13.11a8.007 8.007 0 01-9.99-5.31l-127.34-415.95a8.003 8.003 0 015.31-9.99l65.97-20.2 191.25-58.54 65.97-20.2a7.99 7.99 0 019.99 5.3l32.55 106.32z"
                transform="translate(-276.182 -133.913)"
              ></path>
              <path
                fill="#3f3d56"
                d="M725.408 274.087l-39.23-128.14a16.994 16.994 0 00-21.23-11.28l-92.75 28.39-191.24 58.55-92.75 28.4a17.015 17.015 0 00-11.28 21.23l134.08 437.93a17.027 17.027 0 0016.26 12.03 16.79 16.79 0 004.97-.75l63.58-19.46 2-.62v-2.09l-2 .61-64.17 19.65a15.015 15.015 0 01-18.73-9.95l-134.07-437.94a14.98 14.98 0 019.95-18.73l92.75-28.4 191.24-58.54 92.75-28.4a15.156 15.156 0 014.41-.66 15.015 15.015 0 0114.32 10.61l39.05 127.56.62 2h2.08z"
                transform="translate(-276.182 -133.913)"
              ></path>
              <path
                fill="#6e37bb"
                d="M398.863 261.734a9.016 9.016 0 01-8.612-6.367l-12.88-42.072a8.999 8.999 0 015.971-11.24l175.94-53.864a9.009 9.009 0 0111.24 5.971l12.88 42.072a9.01 9.01 0 01-5.97 11.241l-175.94 53.864a8.976 8.976 0 01-2.63.395z"
                transform="translate(-276.182 -133.913)"
              ></path>
              <circle cx="190.154" cy="24.955" r="20" fill="#6e37bb"></circle>
              <circle cx="190.154" cy="24.955" r="12.665" fill="#fff"></circle>
              <path
                fill="#e6e6e6"
                d="M878.818 716.087h-338a8.51 8.51 0 01-8.5-8.5v-405a8.51 8.51 0 018.5-8.5h338a8.51 8.51 0 018.5 8.5v405a8.51 8.51 0 01-8.5 8.5z"
                transform="translate(-276.182 -133.913)"
              ></path>
              <path
                fill="#3f3d56"
                d="M723.318 274.087h-210.5a17.024 17.024 0 00-17 17v407.8l2-.61v-407.19a15.018 15.018 0 0115-15h211.12zm183.5 0h-394a17.024 17.024 0 00-17 17v458a17.024 17.024 0 0017 17h394a17.024 17.024 0 0017-17v-458a17.024 17.024 0 00-17-17zm15 475a15.018 15.018 0 01-15 15h-394a15.018 15.018 0 01-15-15v-458a15.018 15.018 0 0115-15h394a15.018 15.018 0 0115 15z"
                transform="translate(-276.182 -133.913)"
              ></path>
              <path
                fill="#6e37bb"
                d="M801.818 318.087h-184a9.01 9.01 0 01-9-9v-44a9.01 9.01 0 019-9h184a9.01 9.01 0 019 9v44a9.01 9.01 0 01-9 9z"
                transform="translate(-276.182 -133.913)"
              ></path>
              <circle cx="433.636" cy="105.174" r="20" fill="#6e37bb"></circle>
              <circle cx="433.636" cy="105.174" r="12.182" fill="#fff"></circle>
            </svg>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { SignInView };
