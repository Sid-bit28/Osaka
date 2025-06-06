import { auth } from '@/auth';

export default auth(req => {
  console.log('Hello');
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/auth/sign-in'],
};
