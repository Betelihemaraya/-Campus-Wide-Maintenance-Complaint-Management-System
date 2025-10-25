import React from 'react';
import { useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import MainLayout from '@/Layouts/MainLayout';
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";

interface Props {}

const Track: React.FC<Props> = () => {
    const { data, setData, post, processing, errors } = useForm({
        complaint_id: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('complaints.track.post'));
    };

    return (
        <MainLayout>
            <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-4">
                            <svg className="h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 014-4h6m-6 0a4 4 0 014 4v2m0 0h-6m6 0a4 4 0 01-4 4H9a4 4 0 01-4-4v-2a4 4 0 014-4h.01" />
                            </svg>
                        </div>
                        <CardTitle>Track Your Complaint</CardTitle>
                        <CardDescription>Enter your complaint ID to check the status.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="complaint_id">Complaint ID</Label>
                                <Input
                                    id="complaint_id"
                                    type="text"
                                    value={data.complaint_id}
                                    onChange={e => setData('complaint_id', e.target.value)}
                                    placeholder="e.g., CMP-20231234"
                                    required
                                />
                                {errors.complaint_id && (
                                    <p className="text-sm text-red-600">{errors.complaint_id}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full"
                            >
                                {processing ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"></path>
                                        </svg>
                                        Searching...
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1 0V9m0 7v1m6-8h.01M4 6h16M4 10h16M4 14h16M4 18h16" />
                                        </svg>
                                        Track Complaint
                                    </span>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
};

export default Track;
