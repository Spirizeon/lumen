import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Connect to the database
        await dbConnect();

        // Find the user in the database
        const user = await User.findOne({ username: credentials?.username });

        // Check if user exists and passwords match
        if (user && (await bcrypt.compare(credentials?.password || '', user.password))) {
          // If successful, return the user object
          return { id: user._id, name: user.username };
        } else {
          // If authentication fails, return null
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin'  // Customize the sign-in page if needed
  },
  session: {
    strategy: "jwt", // You can also use "database" depending on your use case
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user data to the JWT token if user is authenticated
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user data to the session
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name as string,
        };
      }
      return session;
    }
  }
};
