import 'next-auth';
import 'next-auth/jwt';
import { DefaultSession } from 'next-auth';

/**
 * Module augmentation for 'next-auth'.
 * Allows us to add custom properties to the session and user objects.
 */
declare module 'next-auth' {
  /**
   * The `User` object is what is returned from the `authorize` callback.
   * We are adding our custom fields to it.
   */
  interface User {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessage?: boolean;
    username?: string;
  }

  /**
   * The `Session` object is what is returned from `useSession` or `getSession`.
   * We are adding our custom fields to the `user` property.
   */
  interface Session {
    user: {
      id: string;
      _id?: string;
      isVerified?: boolean;
      isAcceptingMessage?: boolean;
      username?: string;
    } & DefaultSession['user'];
  }
}

/**
 * Module augmentation for 'next-auth/jwt'.
 * Allows us to add custom properties to the JWT token.
 */
declare module 'next-auth/jwt' {
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessage?: boolean;
    username?: string;
  }
}