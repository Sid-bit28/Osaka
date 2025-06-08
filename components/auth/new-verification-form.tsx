'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import Loader from '@/components/auth/Loader';
import { useSearchParams } from 'next/navigation';
import { newVerification } from '@/actions/new-verification-action';
import { OctagonAlert, UserCheck } from 'lucide-react';
import { Alert, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

type Props = {};

const NewVerificationForm = (props: Props) => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit = useCallback(() => {
    if (!token) {
      setError('Missing Token.');
      return;
    }
    newVerification(token)
      .then(data => {
        setSuccess(data.message);
        setError(data.error);
      })
      .catch(() => {
        setError('Something went wrong.');
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <Card className="overflow-hidden p-0 min-h-[400px]">
      <CardContent className="grid p-0 md:grid-cols-1">
        <div className="relative flex flex-col gap-y-1 items-center">
          <div className="flex min-h-6">
            <img
              src="/logo.svg"
              alt="logo"
              className="h-[100px] w-[100px] text-center"
            />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-700 mb-30">
            Confirming your Verification...
          </h2>
          {!success && !error && <Loader />}
          {error && (
            <div className="mx-auto">
              <Alert variant="destructive" className="border-none">
                {error && (
                  <OctagonAlert className="h-4 w-4 !text-destructive" />
                )}
                <AlertTitle>{error}</AlertTitle>
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
          <Button className="">
            <Link href={ROUTES.SIGN_IN}>Back To Home</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewVerificationForm;
