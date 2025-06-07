import NextAuth, { type DefaultSession } from 'next-auth';
import authConfig from '@/auth.config';
import { db } from './lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { getUserById } from './data/user';

// auth documentations of adapter types
declare module 'next-auth' {
  interface Session {
    user: {
      role: 'ADMIN' | 'GUEST';
    } & DefaultSession['user'];
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as 'ADMIN' | 'GUEST';
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const existingUser = await getUserById(token.sub);
      if (!existingUser) {
        return token;
      }

      token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
