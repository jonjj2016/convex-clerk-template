'use client';

import Link from 'next/link';

import { PasswordInput } from '@/components/password-input';
import { Button } from '@/components/ui/button';
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// import GoogleAuthBtn from "../components/google-auth-btn";
import { useSignIn } from './hooks/use-sign-in';
// import { useSignIn } from "@/hooks/authentication/use-sign-in";

export default function LoginFrom({ onCancel }: { onCancel?: () => void }) {
    const { isPending, onAuthenticateUser, form, signInWithGoogle } =
        useSignIn();

    return (
        <>
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email and password to login to your account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        noValidate
                        onSubmit={onAuthenticateUser}
                        className="space-y-8"
                    >
                        <div className="grid gap-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel htmlFor="email">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="email"
                                                placeholder="johndoe@mail.com"
                                                type="email"
                                                autoComplete="email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <div className="flex justify-between items-center">
                                            <FormLabel htmlFor="password">
                                                Password
                                            </FormLabel>
                                            <Link
                                                href="/forgot-password"
                                                className="ml-auto text-muted-foreground inline-block text-xs hover:underline hover:text-primary"
                                            >
                                                Forgot your password?
                                            </Link>
                                        </div>
                                        <FormControl>
                                            <PasswordInput
                                                id="password"
                                                placeholder="******"
                                                autoComplete="current-password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                disabled={isPending}
                                type="submit"
                                className="w-full"
                            >
                                Login
                            </Button>
                            <Button
                                className="cursor-pointer"
                                 type="button"
                                onClick={signInWithGoogle}
                            >
                                Sign In With Google{' '}
                            </Button>
                            {/* <GoogleAuthBtn /> */}
                        </div>
                    </form>
                </Form>
                <div className="mt-8 text-center text-xs">
                    <Link
                        href="sign-up"
                        className=" hover:text-primary tracking-wider text-muted-foreground hover:underline"
                    >
                        Don&apos;t have an account? Sign up
                    </Link>
                </div>
            </CardContent>
        </>
    );
}
