'use client';
import { resetPassword } from '@/lib/auth-client';
import { Check } from '@gravity-ui/icons';
import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
    toast,
} from '@heroui/react';
import { useSearchParams } from 'next/navigation';
import { type FormEvent } from 'react';

// const token = new URLSearchParams(window.location.search).get('token');

const ResetPasswordPage = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    if (!token) {
        throw new Error('we need token!');
    }
    const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries()) as Record<string, string>;
        const data  = await resetPassword({
            newPassword: userData.password,
            token,
        });
        console.log('after reset the password', data);
        toast.success('password reset success')
    };

    return (
        <Form
            className="flex w-96 flex-col gap-4"
            onSubmit={handleResetPassword}
        >
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
                    Must be at least 8 characters with 1 uppercase and 1 number
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
    );
};

export default ResetPasswordPage;
