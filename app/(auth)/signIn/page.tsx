'use client';
import { Icon } from '@iconify/react';
import { githubSignIn, googleSignIn, signIn } from '@/lib/auth-client';
import { Check } from '@gravity-ui/icons';
import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from '@heroui/react';
import Link from 'next/link';

export default function SignInForm() {
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
      const user = Object.fromEntries(formData.entries()) as Record<string, string>;
      const { data, error } = await signIn.email({
        email: user.email,
        password: user.password
      })
      console.log('after sign in ', data, error);
    };

    return (
        <>
            <Form
                className="flex w-96 flex-col gap-4"
                render={(props) => <form {...props} data-custom="foo" />}
                onSubmit={onSubmit}
            >
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                value,
                            )
                        ) {
                            return 'Please enter a valid email address';
                        }

                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" />
                    <FieldError />
                </TextField>

                <TextField
                    isRequired
                    minLength={8}
                    name="password"
                    type="password"
                    validate={(value) => {
                        if (value.length < 8) {
                            return 'Password must be at least 8 characters';
                        }
                        if (!/[A-Z]/.test(value)) {
                            return 'Password must contain at least one uppercase letter';
                        }
                        if (!/[0-9]/.test(value)) {
                            return 'Password must contain at least one number';
                        }

                        return null;
                    }}
                >
                    <Label>Password</Label>
                    <Input placeholder="Enter your password" />
                    <Description>
                        Must be at least 8 characters with 1 uppercase and 1
                        number
                    </Description>
                    <FieldError />
                </TextField>

                <div className="flex gap-2">
                    <Button type="submit">
                        <Check />
                        Submit
                    </Button>
                    <Button type="reset" variant="secondary">
                        Reset
                    </Button>
                </div>
            </Form>
            <p className="py-2">
                <small>
                    Forgot password? <Link href={'/forgotPassword'}>Click</Link>
                </small>
            </p>
            <div className="flex w-full max-w-xs flex-col gap-3">
                <Button
                    onClick={() => googleSignIn()}
                    className="w-full"
                    variant="tertiary"
                >
                    <Icon icon="devicon:google" />
                    Sign in with Google
                </Button>
                <Button
                    onClick={() => githubSignIn()}
                    className="w-full"
                    variant="tertiary"
                >
                    <Icon icon="mdi:github" />
                    Sign in with GitHub
                </Button>
                <Button className="w-full" variant="tertiary">
                    <Icon icon="ion:logo-apple" />
                    Sign in with Apple
                </Button>
            </div>
        </>
    );
}
