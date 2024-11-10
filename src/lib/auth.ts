import { getMe, loginUser } from "@/action/user";
import { TypeOfLoginForm } from "@/app/(user)/(auth)/dang-nhap/_lib/validation";
import { getServerSession, NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials as TypeOfLoginForm;
          const { data } = await loginUser({ email, password });
          return data as User;
        } catch (error) {
          console.error("Lỗi đăng nhập", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async (params) => {
      switch (params.trigger) {
        case "signIn":
          if (params.user) {
            try {
              if (!params.user?.token) {
                throw new Error("Not token");
              }
              const { data } = await getMe({
                headers: {
                  Authorization: `Bearer ${params.user.token}`,
                },
              });
              return {
                token: params.user.token,
                userId: data.userId,
                username: data.username,
                avatarUrl: data.avatarUrl,
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phoneNumber,
                cardUrl: data.cardUrl,
                roleName: data.roleName,
              } as any;
            } catch (error) {
              console.error("💥 error", error);
              return params.user;
            }
          }
          break;

        case "update":
          try {
            if (!params.token?.token) {
              throw new Error("Not token");
            }
            const { data } = await getMe({
              headers: {
                Authorization: `Bearer ${params.token?.token}`,
              },
            });

            return {
              token: params.token?.token,
              userId: data.userId,
              username: data.username,
              avatarUrl: data.avatarUrl,
              email: data.email,
              password: data.password,
              firstName: data.firstName,
              lastName: data.lastName,
              phoneNumber: data.phoneNumber,
              cardUrl: data.cardUrl,
              roleName: data.roleName,
            } as any;
          } catch (error) {
            console.error("💥 error", error);
            return params.token;
          }

        default:
          return Promise.resolve(params.token);
      }
    },
    session: async (params) => {
      if (params.token) {
        return { ...params.session, user: params.token } as any;
      }

      return params.session;
    },
    redirect: ({ baseUrl }) => {
      return baseUrl;
    },
    signIn: () => {
      return true;
    },
  },
} satisfies NextAuthOptions;

export const getServerAuthSession = () => getServerSession(authOptions);