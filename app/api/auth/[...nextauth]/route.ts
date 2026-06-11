import org from "@/lib/connection";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const SaveToDataBase = async (email: string, name: string, type: string) => {
  const existing = await org.usr.findFirst({
    where: { email },
  });

  if (existing) return existing;

  const newUser = await org.usr.create({
    data: {
      email,
      name,
      authType: type,
    },
  });

  return newUser;
};

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: { params: { scope: "read:user user:email" } },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 604800, // 7 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // First time user logs in
      if (user && account) {
        // Fetch or create user in DB and get DB ID
        const dbUser = await SaveToDataBase(
          user.email as string,
          user.name as string,
          account.provider?.toUpperCase() || "UNKNOWN"
        );

        token.id = dbUser.id; // ✅ This is now the DB ID
        token.email = dbUser.email;
        token.name = dbUser.name;
        token.provider = dbUser.authType;
      }

      return token;
    },

    async session({ session, token }) {
      if (session && token) {
        session.user.id = token.id; // ✅ This is the database ID
        session.user.email = token.email;
        session.user.name = token.name;
        session.accessToken = token;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});

export { handler as GET, handler as POST };
