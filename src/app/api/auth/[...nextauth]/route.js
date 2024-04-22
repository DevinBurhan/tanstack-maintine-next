import { LoginCall, SocailLogin } from "@/state/Login/Login.api";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },

  providers: [
    // Credentials login

    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        //
        const credentialDetails = {
          email: credentials.email,
          password: credentials.password,
        };

        const resp = await LoginCall(credentialDetails);
        console.log("🚀 ~ authorize ~ resp:", resp.data);
        // console.log(resp);
        if (resp) {
          const user = {
            id: resp._id,
            name: resp.firstName + " " + resp.lastName,
            role: resp.role,
            email: resp.email,
            accessToken: resp.token,
            image: resp.image,
          };
          return user;
        }
      },
    }),

    // OAuth authentication providers...

    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_ID,
      clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    FacebookProvider({
      clientId: process.env.NEXTAUTH_FACEBOOK_ID,
      clientSecret: process.env.NEXTAUTH_FACEBOOK_SECRET,
    }),
    LinkedInProvider({
      clientId: process.env.NEXTAUTH_LINKEDIN_ID,
      clientSecret: process.env.NEXTAUTH_LINKEDIN_SECRET,
      authorization: { params: { scope: "openid profile email" } },
      issuer: "https://www.linkedin.com",
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      async profile(profile) {
        console.log(profile, "profile=>>>>>>>>>>");
        return {
          id: profile.sub,
          name: profile.name,
          firstname: profile.given_name,
          lastname: profile.family_name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    // Passwordless / email sign in
  ],
  // callbacks: {
  //   session: async ({ session, token }) => {
  //     console.log("in Session callback", session, token);
  //     session.id = token.id;
  //     session.jwt = token.token;
  //     return Promise.resolve(session);
  //   },
  //   jwt: async ({ token, user }) => {
  //     console.log("In JWT callback", token, user);
  //     const isSignIn = user ? true : false;
  //     if (isSignIn) {
  //       token.id = user._id;
  //       token.jwt = user.token;
  //     }
  //     return Promise.resolve(token);
  //   },
  // },
  // logger: {
  //   error(code, metadata) {
  //     console.error(code, metadata);
  //   },
  //   warn(code) {
  //     console.warn(code);
  //   },
  //   debug(code, metadata) {
  //     console.debug(code, metadata);
  //   },
  // },
  logger: {
    error(code, metadata) {
      console.error(code, "code=>>>>>>>>>>", metadata, "metadata=>>>>>>>>>>");
    },
    warn(code) {
      console.warn(code, "warn =>>>>>>>>>>>>");
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    },
  },
  callbacks: {
    // async signIn({ user, account }) {
    //   // console.log('////////////////////// account //////////');
    //   // console.log(account);
    //   // console.log('////////////////////// user ///////////////');
    //   // console.log(user);
    //   if (account?.provider === 'google') {
    //   }
    //   return true;
    // },
    async jwt({ token, user, account, trigger, session, profile }) {
      // console.log(token, user, 'in jwt');
      // console.log(token);
      // console.log('//////////////////////////Token////////');
      // console.log(user);
      // console.log('//////////////////////////user////////');
      // console.log(account);
      // console.log('//////////////////////////account////////');
      // console.log(profile);
      // console.log('//////////////////////////profile////////');
      // console.log('//////////////////////////jwt////////');
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
        token.id = user.id;
      }
      if (profile) {
        const { sub, name, picture, email, given_name, family_name } = profile;
        const loginCred = {
          sub: sub,
          role: "student",
          email: email,
          firstName: given_name,
          lastName: family_name,
          loginType: account.provider,
          image: picture,
        };
        // console.log(loginCred, 'loginCred==========>');
        const googleLogin = await SocailLogin(loginCred);
        // console.log(googleLogin, 'googleLogin==========>');
        token.accessToken = googleLogin.data.token;
        token.role = googleLogin.data.role;
        token.image = googleLogin.data.image;
        token.id = googleLogin.data._id;
      }

      if (trigger === "update" && session?.image) {
        token.image = session.image;
      }

      return token;
    },

    async session({ session, token }) {
      // console.log(session, token, 'in session');
      // Send properties to the client, like an access_token and user id from a provider.
      // console.log(session);
      // console.log('//////////////////////////session////////');
      // console.log(token);
      // console.log('//////////////////////////token////////');
      // console.log('//////////////////////////session////////');

      if (token && session.user) {
        session.user.accessToken = token.accessToken;
        session.user.role = token.role;
        session.user.id = token.id;
        if (token.image) {
          session.user.image = token.image;
        }
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
