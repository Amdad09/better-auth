import { createAuthClient } from 'better-auth/react';

export const {
    signIn,
    signUp,
    signOut,
    updateUser,
    requestPasswordReset,
    resetPassword,
    useSession,
} = createAuthClient({ baseURL: process.env.BETTER_AUTH_URL });

export const googleSignIn = async () => {
    return await signIn.social({
        provider: 'google',
    });
};

export const githubSignIn = async () => {
    return await signIn.social({
        provider: 'github',
    });
};
