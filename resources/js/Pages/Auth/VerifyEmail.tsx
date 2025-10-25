import { Head, useForm } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Props {
    status?: string;
}

export default function VerifyEmail({ status }: Props) {
    const { post, processing } = useForm({});

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/email/verification-notification');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="max-w-md w-full">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Verify Email</CardTitle>
                    <CardDescription className="text-center">
                        Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {status === 'verification-link-sent' && (
                        <div className="mb-4 text-sm font-medium text-green-600 text-center">
                            A new verification link has been sent to the email address you provided during registration.
                        </div>
                    )}
                    <form onSubmit={submit} className="space-y-6">
                        <Button 
                            className="w-full justify-center py-3" 
                            disabled={processing}
                            type="submit"
                        >
                            {processing ? 'Sending...' : 'Resend Verification Email'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
} 