'use client';

import { requestPasswordReset } from '@/lib/auth-client';
import { Check } from '@gravity-ui/icons';
import {
    Button,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
    toast,
} from '@heroui/react';

export default function ForgorPasswordPage() {

    const handleForgotPassword = async (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries()) as Record<
            string,
            string
        >;
        const resData = await requestPasswordReset({
            email: data.email,
            redirectTo: '/resetPassword'
        })
        toast.success('Email sent your email address, please check!')
        console.log('after reset email', resData);
    };

    return (
        <Form
            className="flex w-96 flex-col gap-4"
            onSubmit={handleForgotPassword}
        >
            <TextField
                isRequired
                name="email"
                type="email"
                validate={(value) => {
                    if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
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
    );
}
