import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import VPDashboard from '@/Components/Dashboard/VPDashboard';
import CampusDetailStats from '@/Components/Dashboard/CampusDetailStats';
import DashboardCharts from '@/Components/Dashboard/DashboardCharts';

interface CampusStats {
    id: number;
    name: string;
    total_complaints: number;
    pending_complaints: number;
    resolved_complaints: number;
}

interface ComplaintTypeStats {
    id: number;
    name: string;
    count: number;
    pending: number;
    in_progress: number;
    completed: number;
}

interface CampusDetail {
    id: number;
    name: string;
    complaintTypeStats: ComplaintTypeStats[];
    coordinatorCount: number;
    workerCount: number;
    avgResolutionTime: number;
}

interface Complaint {
    id: number;
    complaint_id: string;
    campus_id: number;
    complaint_type_id: number;
    location: string;
    description: string;
    image_path: string | null;
    status: string;
    assigned_coordinator_id: number | null;
    assigned_worker_id: number | null;
    created_at: string;
    updated_at: string;
    resolution_notes: string | null;
    resolution_image: string | null;
    resolved_at: string | null;
    verified_at: string | null;
    campus?: {
        name: string;
    };
    complaintType?: {
        name: string;
    };
}

interface PageProps {
    auth: any;
    campusStats: CampusStats[];
    overallStats: {
        totalComplaints: number;
        pendingComplaints: number;
        resolvedComplaints: number | Complaint[];
        averageResolutionTime: number;
    };
    recentComplaints?: any[];
    campusDetails?: Record<number, CampusDetail>;
}

export default function Dashboard({ 
    auth, 
    campusStats,
    overallStats,
    recentComplaints = [],
    campusDetails = {}
}: PageProps) {
    const [selectedCampus, setSelectedCampus] = useState<number | null>(null);
    
    const viewCampusDetails = (campusId: number) => {
        setSelectedCampus(campusId === selectedCampus ? null : campusId);
    };
    
    // Find the selected campus detail
    const selectedCampusDetail = selectedCampus ? campusDetails[selectedCampus] : null;
    
    // Process resolvedComplaints if it's an array of objects
    const processedOverallStats = {
        ...overallStats,
        resolvedComplaints: Array.isArray(overallStats.resolvedComplaints) 
            ? overallStats.resolvedComplaints.length 
            : overallStats.resolvedComplaints
    };
    
    return (
        <DashboardLayout>
            <Head title="VP Dashboard" />
            
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg rounded-xl mb-8 p-8 text-white">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                        <h1 className="text-3xl font-bold">
                            VP Dashboard
                        </h1>
                        <p className="mt-2 text-indigo-100">
                            Overview of all complaint statistics across campuses
                        </p>
                    </div>
                    
                    <div className="mt-4 md:mt-0 flex items-center space-x-3">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            Last updated: {new Date().toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>
            
            {/* Main Content */}
            <div className="mb-8 overflow-hidden bg-white shadow-xl rounded-xl border border-gray-100">
                <div className="p-8 text-gray-900">
                    {/* Stats Overview */}
                    <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 shadow-sm mb-8">
                        <VPDashboard 
                            campusStats={campusStats} 
                            overallStats={processedOverallStats} 
                        />
                    </div>
                    
                    {/* Visualizations Section */}
                    <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 shadow-sm mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Analytics Overview</h2>
                        <DashboardCharts 
                            campusStats={campusStats}
                            overallStats={processedOverallStats}
                        />
                    </div>
                    
                    {/* Campus Details Section */}
                    <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 shadow-sm mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Campus Details</h2>
                        <div className="flex flex-wrap gap-3">
                            {campusStats.map(campus => (
                                <button
                                    key={campus.id}
                                    onClick={() => viewCampusDetails(campus.id)}
                                    className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                                        selectedCampus === campus.id
                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md'
                                    }`}
                                >
                                    {campus.name}
                                </button>
                            ))}
                        </div>
                        
                        {selectedCampusDetail && (
                            <div className="mt-6 transform transition-all duration-300">
                                <CampusDetailStats
                                    campusName={selectedCampusDetail.name}
                                    complaintTypeStats={selectedCampusDetail.complaintTypeStats}
                                    coordinatorCount={selectedCampusDetail.coordinatorCount}
                                    workerCount={selectedCampusDetail.workerCount}
                                    avgResolutionTime={selectedCampusDetail.avgResolutionTime}
                                />
                            </div>
                        )}
                    </div>
                    
                    {/* Recent Complaints Section */}
                    {recentComplaints && recentComplaints.length > 0 && (
                        <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 shadow-sm mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Complaints</h2>
                            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campus</th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {recentComplaints.map((complaint) => (
                                            <tr key={complaint.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {complaint.complaint_id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {complaint.campus?.name || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {complaint.complaintType?.name || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        complaint.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        complaint.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                                        complaint.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                        {complaint.status?.replace('_', ' ').toUpperCase() || 'UNKNOWN'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {complaint.created_at ? new Date(complaint.created_at).toLocaleDateString() : 'N/A'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    
                    {/* Resolved Complaints Section */}
                    {Array.isArray(overallStats.resolvedComplaints) && overallStats.resolvedComplaints.length > 0 && (
                        <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">Resolved Complaints</h2>
                            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resolved At</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {(overallStats.resolvedComplaints as Complaint[]).map((complaint) => (
                                            <tr key={complaint.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {complaint.complaint_id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {complaint.location || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                                    {complaint.description || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        {complaint.status?.replace('_', ' ').toUpperCase() || 'COMPLETED'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {complaint.resolved_at ? new Date(complaint.resolved_at).toLocaleDateString() : 'N/A'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
} 