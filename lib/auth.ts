import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { Resend } from "resend";

const dbUrl = process.env.BETTER_AUTH_DB_URL
if (!dbUrl) {
    throw new Error('Failed');
}

const client = new MongoClient(dbUrl);
const db = client.db('users');
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        sendResetPassword: async({ user, url }) =>{
            void resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: user.email,
                subject: 'Reset your password',
                text: `Click the link to reset your password: ${url}
                <p>Ignore this email if you haven't request reset password.</p>`,
            });
        },

    },
    emailVerification: {
        sendVerificationEmail: async ({ user, url }) => {
            void resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: user.email,
                subject: 'Verify your email address',
                html: `
                <h1>Verify your email....</h1>
                Click <a href="${url}">here</a> to verify your email.`,
            });
        },  
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        expiresIn: 7 * 24 * 3600,
    },



    socialProviders: {
        google: {
            clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET as string,
        },
        github: {
            clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID as string,
            clientSecret: process.env.BETTER_AUTH_GITHUB_SECRET as string,
        },
    },
    database: mongodbAdapter(db, {
        client,
    }),
});