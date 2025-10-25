import { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { User, Campus, ComplaintType } from '@/types';
import {Input} from '@/Components/ui/input'
import {Button} from '@/Components/ui/button'

interface PageProps {
    user: User;
    campuses: Campus[];
    complaintTypes: ComplaintType[];
}

export default function Edit({ user, campuses, complaintTypes }: PageProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        role: user.roles?.[0]?.role || '',
        campus_id: user.roles?.[0]?.campus_id?.toString() || '',
        complaint_type_id: user.roles?.[0]?.complaint_type_id?.toString() || '',
    });

    const [showCampusField, setShowCampusField] = useState(false);
    const [showComplaintTypeField, setShowComplaintTypeField] = useState(false);

    useEffect(() => {
        // Determine which fields to show based on the selected role
        setShowCampusField(['coordinator', 'worker'].includes(data.role));
        setShowComplaintTypeField(data.role === 'coordinator');
        
        // Reset related fields when role changes
        if (!showCampusField) {
            setData('campus_id', '');
        }
        if (!showComplaintTypeField) {
            setData('complaint_type_id', '');
        }
    }, [data.role]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Pre-process campus_id and complaint_type_id to ensure they are sent correctly
        if (data.campus_id) {
            console.log(`Campus ID before submission: ${data.campus_id} (${typeof data.campus_id})`);
        }
        
        // For VP and director roles, ensure we don't send campus_id
        if (data.role === 'vp' || data.role === 'director') {
            setData('campus_id', '');
            setData('complaint_type_id', '');
        }
        
        console.log("Submitting update with data:", {
            name: data.name,
            email: data.email,
            role: data.role,
            campus_id: data.campus_id ? parseInt(data.campus_id) : null,
            complaint_type_id: data.complaint_type_id ? parseInt(data.complaint_type_id) : null
        });
        
        // Force a refresh after update to ensure everything is displayed correctly
        put(route('admin.users.update', user.id), {
            onSuccess: () => {
                // Remember to go back to the user management section
                localStorage.setItem('dashboard_active_section', 'users');
                // Force reload to see the updated user
                window.location.href = route('admin.dashboard');
            }
        });
    };

    return (
        <>
            <Head title="Edit User" />
            
            <div className="py-12 bg-gradient-to-br from-blue-50 via-white to-indigo-100 min-h-screen">
    <div className="max-w-4xl mx-auto mt-24 px-6">
        <div className="backdrop-blur-lg bg-white/80 border border-gray-200 shadow-2xl rounded-2xl p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                    ✏️ Edit User: <span className="text-indigo-600">{user.name}</span>
                </h1>
                <a
                    href={route('admin.dashboard')}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200 rounded-lg"
                >
                    ← Dashboard
                </a>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}

                    <div className="group relative">
                    <label htmlFor="name" className="floating-label">Name</label>
                        <Input
                            type="text"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            className="peer"
                        />
                       
                        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="group relative">
                    <label htmlFor="email" className="floating-label">Email</label>
                        <Input
                            type="email"
                            id="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            className="peer"
                        />
                        
                        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                    </div>

                    {/* Role */}
                    <div className="group relative">
                    <label htmlFor="role" className="floating-label">Role</label>
                        <select
                            id="role"
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value)}
                            required
                            className="w-full peer rounded-md border border-gray-300 bg-transparent py-2.5 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select a role</option>
                            <option value="coordinator">Coordinator</option>
                            <option value="worker">Worker</option>
                            <option value="vp">VP</option>
                            <option value="director">Director</option>
                        </select>
                       
                        {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role}</p>}
                    </div>

                    {/* Campus (if applicable) */}
                    {showCampusField && (
                        <div className="group relative">
                            <select
                                id="campus_id"
                                value={data.campus_id}
                                onChange={(e) => setData('campus_id', e.target.value)}
                                required
                                className="w-full peer rounded-md border border-gray-300 bg-transparent py-2.5 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Select a campus</option>
                                {campuses.map((campus) => (
                                    <option key={campus.id} value={campus.id.toString()}>
                                        {campus.name}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="campus_id" className="floating-label">Campus</label>
                            {errors.campus_id && <p className="text-red-600 text-sm mt-1">{errors.campus_id}</p>}
                        </div>
                    )}

                    {/* Complaint Type (if applicable) */}
                    {showComplaintTypeField && (
                        <div className="group relative">
                            <select
                                id="complaint_type_id"
                                value={data.complaint_type_id}
                                onChange={(e) => setData('complaint_type_id', e.target.value)}
                                required
                                className="w-full peer rounded-md border border-gray-300 bg-transparent py-2.5 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Select a complaint type</option>
                                {complaintTypes.map((type) => (
                                    <option key={type.id} value={type.id.toString()}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="complaint_type_id" className="floating-label">Complaint Type</label>
                            {errors.complaint_type_id && <p className="text-red-600 text-sm mt-1">{errors.complaint_type_id}</p>}
                        </div>
                    )}
                </div>

                <div className="flex justify-end pt-4">
                    <Button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-md transition-all duration-200"
                        disabled={processing}
                    >
                        {processing ? 'Updating...' : '✨ Update User'}
                    </Button>
                </div>
            </form>
        </div>
    </div>
</div>
      </>
    );
} 