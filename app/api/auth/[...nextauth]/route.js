import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github" 
import User from "@/app/models/User";
import connectDB from "@/app/db/connectDB";
// import google from 

const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if(account.provider == "github") {
        await connectDB();
        // You can add additional checks here if needed
        
        const currUser = await User.findOne({email: user.email});

        if(!currUser) {
          await User.create({
            email: user.email,
            username: user.email.split("@")[0],
          });
        }
      }
      return true;
    },
    async session({ session, token, user }) {
      await connectDB();
      const dbUser = await User.findOne({email: session.user.email});
      session.user.username = dbUser.username;
      return session;
    }

  }
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST };
export {authOptions};