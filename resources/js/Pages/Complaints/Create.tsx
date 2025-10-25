import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import MainLayout from '@/Layouts/MainLayout';
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { toast } from 'sonner';
import { Page } from '@inertiajs/core';

interface Props {
    campuses: Array<{
        id: number;
        name: string;
    }>;
    complaintTypes: Array<{
        id: number;
        name: string;
    }>;
}

interface PageProps {
    complaint_id: string;
    [key: string]: any;
}

export default function Create({ campuses, complaintTypes }: Props) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const { data, setData, post, processing, errors } = useForm({
        campus_id: '',
        complaint_type_id: '',
        location: '',
        description: '',
        image: null as File | null,
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success('Complaint ID copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy text: ', err);
            toast.error('Failed to copy ID');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('campus_id', data.campus_id);
        formData.append('complaint_type_id', data.complaint_type_id);
        formData.append('location', data.location);
        formData.append('description', data.description);
        if (data.image) {
            formData.append('image', data.image);
        }

        post(route('complaints.store'), {
            forceFormData: true,
            onSuccess: (response: any) => {
                const complaintId = response.props.flash?.complaint_id;
                if (!complaintId) {
                    toast.error('Failed to get complaint ID');
                    return;
                }
                setData({
                    campus_id: '',
                    complaint_type_id: '',
                    location: '',
                    description: '',
                    image: null,
                });
                setImagePreview(null);

                // Show success toast with copyable complaint ID
                toast.success(
                    <div className="flex flex-col gap-4">
                        <p className="text-lg font-medium">Complaint submitted successfully!</p>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 mb-2">Your Complaint ID:</p>
                            <div className="flex items-center gap-3">
                                <span className="font-mono bg-white px-3 py-2 rounded border text-gray-900">
                                    {complaintId}
                                </span>
                                <button
                                    onClick={() => copyToClipboard(complaintId)}
                                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                    </svg>
                                    Copy ID
                                </button>
                            </div>
                        </div>
                    </div>,
                    {
                        duration: 10000,
                    }
                );
            },
        });
    };

    return (
        <MainLayout>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-2 sm:py-4 md:py-8 px-2 sm:px-4 md:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <Card className="shadow-lg">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl sm:text-3xl">Submit a Complaint</CardTitle>
                            <CardDescription>Help us improve by reporting issues you encounter</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="campus">Campus</Label>
                                        <Select
                                            value={data.campus_id}
                                            onValueChange={(value) => setData('campus_id', value)}
                                        >
                                            <SelectTrigger id="campus">
                                                <SelectValue placeholder="Select Campus" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {campuses.map(campus => (
                                                    <SelectItem key={campus.id} value={campus.id.toString()}>
                                                        {campus.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.campus_id && (
                                            <p className="text-sm text-red-600">{errors.campus_id}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="complaint_type">Complaint Type</Label>
                                        <Select
                                            value={data.complaint_type_id}
                                            onValueChange={(value) => setData('complaint_type_id', value)}
                                        >
                                            <SelectTrigger id="complaint_type">
                                                <SelectValue placeholder="Select Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {complaintTypes.map(type => (
                                                    <SelectItem key={type.id} value={type.id.toString()}>
                                                        {type.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.complaint_type_id && (
                                            <p className="text-sm text-red-600">{errors.complaint_type_id}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        value={data.location}
                                        onChange={e => setData('location', e.target.value)}
                                        placeholder="Building, Dorm, Classroom, etc."
                                        required
                                    />
                                    {errors.location && (
                                        <p className="text-sm text-red-600">{errors.location}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        placeholder="Please provide a detailed description of your complaint"
                                        required
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-red-600">{errors.description}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label>Image (Optional)</Label>
                                    <div className="mt-1 flex justify-center px-2 sm:px-4 md:px-6 pt-3 sm:pt-4 md:pt-5 pb-3 sm:pb-4 md:pb-6 border-2 border-dashed rounded-lg hover:border-blue-500 transition duration-150 ease-in-out">
                                        <div className="space-y-2 text-center">
                                            <svg
                                                className="mx-auto h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-gray-400"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 48 48"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <div className="flex flex-col sm:flex-row items-center justify-center text-sm text-gray-600 space-y-2 sm:space-y-0 sm:space-x-2">
                                                <Label
                                                    htmlFor="image"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 px-3 py-2"
                                                >
                                                    <span>Upload a file</span>
                                                    <Input
                                                        id="image"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                        className="sr-only"
                                                    />
                                                </Label>
                                                <p className="text-gray-500">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </div>
                                    {imagePreview && (
                                        <div className="mt-3 sm:mt-4 flex justify-center">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 object-cover rounded-lg shadow-md"
                                            />
                                        </div>
                                    )}
                                    {errors.image && (
                                        <p className="text-sm text-red-600">{errors.image}</p>
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
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Submitting...
                                        </span>
                                    ) : (
                                        'Submit Complaint'
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </MainLayout>
    );
} 