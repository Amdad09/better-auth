'use client';

import { googleSignIn, signUp } from '@/lib/auth-client';
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

export default function SignUpForm() {
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries()) as Record<
            string,
            string
        >;
        const { data, error } = await signUp.email({
            name: user.name,
            email: user.email,
            password: user.password,
        });
        console.log('After sign up', data, error);
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
                    name="name"
                    type="text"
                    validate={(value) => {
                        if (value.length < 3) {
                            return 'At least 3 characters ';
                        }

                        return null;
                    }}
                >
                    <Label>Name</Label>
                    <Input placeholder="Your name" />
                    <FieldError />
                </TextField>

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
            <p>OR</p>
            <Button onClick={() => googleSignIn()}>Google Sign In</Button>
        </>
    );
}
