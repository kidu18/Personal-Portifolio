import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "./mongodb";

// You should add NEXTAUTH_SECRET to your .env file
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "admin@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        console.log("Attempting login for:", credentials?.email);
        const client = await clientPromise;
        const db = client.db();

        const user = await db.collection("User").findOne({
          email: credentials.email,
        });

        console.log("User found in DB:", user ? "Yes" : "No");

        if (!user) {
          console.log("User not found");
          throw new Error("Invalid email or password");
        }

        if (user.password !== credentials.password) {
          console.log(
            "Password mismatch. DB:",
            user.password,
            "Provided:",
            credentials.password
          );
          throw new Error("Invalid email or password");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
