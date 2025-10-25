import { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { Campus, ComplaintType, User } from '@/types';
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/Components/ui/card";
import { ArrowLeft, LogOut } from "lucide-react";

interface PageProps {
    campuses: Campus[];
    complaintTypes: ComplaintType[];
    defaultRole: string;
    complaint_type_id?: string;
    campus_id?: string;
    users?: User[];
}

export default function Create({ campuses, complaintTypes, defaultRole, complaint_type_id, campus_id, users }: PageProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: defaultRole || '',
        campus_id: campus_id || '',
        complaint_type_id: complaint_type_id || '',
    });

    const [showCampusField, setShowCampusField] = useState(false);
    const [showComplaintTypeField, setShowComplaintTypeField] = useState(false);
    const [availableCoordinators, setAvailableCoordinators] = useState<User[]>([]);

    useEffect(() => {
        setShowCampusField(['coordinator', 'worker'].includes(data.role));
        setShowComplaintTypeField(['coordinator', 'worker'].includes(data.role));

        if (!showCampusField) setData('campus_id', '');
        if (!showComplaintTypeField) setData('complaint_type_id', '');
    }, [data.role]);

    useEffect(() => {
        if (data.role === 'worker' && data.campus_id && data.complaint_type_id && users) {
            const coordinators = users.filter(user =>
                user.roles?.some((role) =>
                    role.role === 'coordinator' &&
                    (role.pivot?.campus_id === parseInt(data.campus_id) || role.campus_id === parseInt(data.campus_id)) &&
                    (role.pivot?.complaint_type_id === parseInt(data.complaint_type_id) || role.complaint_type_id === parseInt(data.complaint_type_id))
                )
            );
            setAvailableCoordinators(coordinators);
        } else {
            setAvailableCoordinators([]);
        }
    }, [data.campus_id, data.complaint_type_id, data.role]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.users.store'), {
            onSuccess: () => {
                reset('password', 'password_confirmation');
                localStorage.setItem('dashboard_active_section', 'users');
                window.location.href = route('admin.dashboard');
            }
        });
    };

    // Check if form is valid
    const isFormValid = () => {
        if (processing) return false;
        if (!data.name || !data.email || !data.password || !data.password_confirmation || !data.role) return false;
        if (['coordinator', 'worker'].includes(data.role)) {
            if (!data.campus_id || !data.complaint_type_id) return false;
            if (data.role === 'worker' && availableCoordinators.length === 0) return false;
        }
        return true;
    };

    return (
        <>
            <Head title="Create User" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 py-12">
                <div className="max-w-5xl mx-auto px-4">
                    <Card className="shadow-lg border border-gray-200 bg-white/80 backdrop-blur-md">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-indigo-700 text-2xl">✨ Create New User</CardTitle>
                                <CardDescription className="text-gray-600">Fill in the details below to add a new user.</CardDescription>
                            </div>
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="outline"
                                    onClick={() => window.location.href = route('admin.dashboard')}
                                    className="flex items-center gap-2 hover:bg-indigo-100 transition"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Dashboard
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => window.location.href = route('logout')}
                                    className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="e.g., John Doe"
                                        />
                                        {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            type="email"
                                            id="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="user@example.com"
                                        />
                                        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            type="password"
                                            id="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                                        <Input
                                            type="password"
                                            id="password_confirmation"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label>Role</Label>
                                        <Select
                                            value={data.role}
                                            onValueChange={(value) => setData('role', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="coordinator">Coordinator</SelectItem>
                                                <SelectItem value="worker">Worker</SelectItem>
                                                <SelectItem value="vp">Vice President</SelectItem>
                                                <SelectItem value="director">Director</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.role && <p className="text-sm text-red-600">{errors.role}</p>}
                                    </div>

                                    {showCampusField && (
                                        <div>
                                            <Label>Campus</Label>
                                            <Select
                                                value={data.campus_id}
                                                onValueChange={(value) => setData('campus_id', value)}
                                                disabled={!!campus_id}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a campus" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {campuses.map(campus => (
                                                        <SelectItem key={campus.id} value={campus.id.toString()}>
                                                            {campus.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.campus_id && <p className="text-sm text-red-600">{errors.campus_id}</p>}
                                        </div>
                                    )}

                                    {showComplaintTypeField && (
                                        <div>
                                            <Label>Department / Complaint Type</Label>
                                            <Select
                                                value={data.complaint_type_id}
                                                onValueChange={(value) => setData('complaint_type_id', value)}
                                                disabled={!!complaint_type_id}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {complaintTypes.map(type => (
                                                        <SelectItem key={type.id} value={type.id.toString()}>
                                                            {type.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.complaint_type_id && <p className="text-sm text-red-600">{errors.complaint_type_id}</p>}
                                        </div>
                                    )}
                                </div>

                                {data.role === 'worker' && availableCoordinators.length === 0 && data.campus_id && data.complaint_type_id && (
                                    <div className="text-sm text-orange-600 bg-orange-50 p-3 rounded-md">
                                        No coordinator is available for the selected campus and department. Please create a coordinator first.
                                    </div>
                                )}

                                <div className="flex justify-end pt-4">
                                    <Button
                                        type="submit"
                                        disabled={!isFormValid()}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 transition-all duration-300 rounded-xl shadow-md"
                                    >
                                        {processing ? 'Creating...' : 'Create User'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
