import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";

const dbUrl = process.env.BETTER_AUTH_DB_URL
if (!dbUrl) {
    throw new Error('Failed');
}

const client = new MongoClient(dbUrl);
const db = client.db('users');
export const auth = betterAuth({
    emailAndPassword: {
        enabled: true
    },
    database: mongodbAdapter(db, {
        client
    })
})