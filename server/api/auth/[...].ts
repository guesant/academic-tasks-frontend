// file: ~/server/api/auth/[...].ts
import { NuxtAuthHandler } from "#auth";

import type ICredentialsProvider from "next-auth/providers/credentials";
import CredentialsProviderModule from "next-auth/providers/credentials";
import type IKeycloakProvider from "next-auth/providers/keycloak";
import KeycloakProviderModule from "next-auth/providers/keycloak";
import { getKeycloakCredentials } from "~/server/config/getKeycloadCredentials";
import { getOpenIDClient } from "~/server/oidc/getOpenIDClient";
import { refreshAccessToken } from "~/server/oidc/refreshAccessToken";

/// @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
const KeyCloakProvider: typeof IKeycloakProvider = KeycloakProviderModule.default;

/// @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
const CredentialsProvider: typeof ICredentialsProvider = CredentialsProviderModule.default;

const keycloakConfig = getKeycloakCredentials();

const secret = process.env.AUTH_SECRET;

export default NuxtAuthHandler({
  secret,

  session: {
    strategy: "jwt",
  },

  pages: {
    // Change the default behavior to use `/login` as the path for the sign-in page
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      id: "credentials",

      name: "Credentials",

      credentials: {
        username: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" },
      },

      async authorize(credentials, req) {
        if (credentials) {
          const { username, password } = credentials;

          const openidClient = await getOpenIDClient();

          try {
            const token = await openidClient.grant({
              username,
              password,
              grant_type: "password",
              scope: "openid profile",
            });

            const userinfo = await openidClient.userinfo(token);

            return {
              id: userinfo.sub,

              user: {
                id: userinfo.sub,
              },

              accessToken: token.access_token,
              refreshToken: token.refresh_token,
              accessTokenExpires: Date.now() + +token.expires_in! * 1000,
            };
          } catch (error) {
            throw createError({
              statusCode: 403,
              statusMessage: "Credentials not working",
            });
          }
        }

        return null;
      },
    }),
    KeyCloakProvider({
      id: "sso-jipalab",
      issuer: keycloakConfig.issuer,
      clientId: keycloakConfig.clientId,
      clientSecret: keycloakConfig.clientSecret,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        // Credentials login
        if (account?.provider === "credentials") {
          const { ...incomingUser } = user as any;

          return {
            ...incomingUser,
          };
        }

        // OAuth login
        return {
          user: {
            id: user.id,
          },

          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: Date.now() + <number>account.expires_in * 1000,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < <number>token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user = token.user;
      session.error = token.error;
      session.accessToken = token.accessToken;

      return session;
    },
  },
});
