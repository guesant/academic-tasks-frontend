/* eslint-disable */
import "next-auth";
import "next-auth/jwt";
/* eslint-enable */

declare module "next-auth" {
  interface Session {
    error?: any;

    user?: {
      id: string;
    };

    accessToken?: any;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
  }
}
