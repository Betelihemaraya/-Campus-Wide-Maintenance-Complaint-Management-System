import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/Components/ui/button';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from '@/Components/ui/dialog';
import {
  Avatar, AvatarFallback, AvatarImage
} from '@/Components/ui/avatar';
import { Separator } from '@/Components/ui/separator';
import {
  User, PlusCircle, Search, Lock, LogOut, Clock
} from 'lucide-react';

function getGreeting(name: string) {
  const hour = new Date().getHours();
  let greeting = 'Hello';
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 18) greeting = 'Good afternoon';
  else greeting = 'Good evening';
  return `${greeting}, ${name} 👋`;
}

export default function ComplainerDashboard({ recentComplaints = [] }: { recentComplaints?: any[] }) {
  const { auth } = usePage().props as any;
  const user = auth?.user;
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    router.post(route('logout'), {
      replace: true,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full bg-white shadow flex items-center justify-between px-6 py-3 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button className="sm:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
          <span className="font-bold text-lg text-blue-700">Complaints Portal</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowProfile(true)}>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatarUrl || undefined} alt={user.name} />
              <AvatarFallback>{user.name?.[0]}</AvatarFallback>
            </Avatar>
            <span className="hidden sm:block font-medium text-gray-700">{user.name}</span>
          </div>
          <Button onClick={handleLogout} variant="ghost" className="p-2 text-red-500 hover:bg-red-50">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Layout */}
      <div className="flex flex-1 w-full max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className={`fixed sm:static z-30 top-0 left-0 h-full sm:h-auto w-64 bg-white border-r shadow-lg sm:shadow-none sm:border-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 transition-transform duration-200 ease-in-out flex flex-col py-8 px-6 gap-2 sm:gap-4 sm:w-56`}>
          <nav className="flex flex-col gap-2">
            <Link href="/complaints/create">
              <Button variant="default" className="w-full justify-start gap-2">
                <PlusCircle className="h-5 w-5" />
                Create Complaint
              </Button>
            </Link>
            <Link href="/complaints/track">
              <Button variant="secondary" className="w-full justify-start gap-2">
                <Search className="h-5 w-5" />
                Track Complaints
              </Button>
            </Link>
            <Button
              onClick={() => setShowProfile(true)}
              variant="outline"
              className="w-full justify-start gap-2"
            >
              <User className="h-5 w-5" />
              Profile
            </Button>
            <Link href={route('password.request')}>
              <Button variant="ghost" className="w-full justify-start gap-2 text-yellow-600 hover:bg-yellow-100">
                <Lock className="h-5 w-5" />
                Reset Password
              </Button>
            </Link>
          </nav>
          <div className="mt-8 hidden sm:block">
            <Separator />
            <div className="mt-4 text-xs text-gray-400">Logged in as</div>
            <div className="font-semibold text-gray-700">{user.name}</div>
            <div className="text-xs text-gray-500">{user.email}</div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-8 p-6 sm:p-10 ml-0 sm:ml-0">
          {/* Welcome & Quick Actions */}
          <section className="mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">{getGreeting(user?.name || 'User')}</h1>
                <p className="text-gray-600 text-base sm:text-lg">Welcome to your dashboard. Manage your complaints efficiently.</p>
              </div>
              <div className="flex gap-2">
                <Link href="/complaints/create">
                  <Button variant="default" className="gap-2">
                    <PlusCircle className="h-5 w-5" /> New Complaint
                  </Button>
                </Link>
                <Link href="/complaints/track">
                  <Button variant="secondary" className="gap-2">
                    <Search className="h-5 w-5" /> Track
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Quick Tips */}
          <section className="bg-white rounded-xl shadow p-4 mb-4">
            <div className="font-semibold mb-2 text-blue-700">Quick Tips</div>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
              <li>Be clear and concise in your complaint details for faster resolution.</li>
              <li>Track your complaint status anytime from this dashboard.</li>
              <li>Need help? Use the profile menu or reset your password.</li>
            </ul>
          </section>

          {/* Recent Activities */}
          <section className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2"><Clock className="h-5 w-5 text-blue-500" /> Recent Activities</h2>
            {recentComplaints.length > 0 ? (
              <ul className="divide-y divide-gray-100">
                {recentComplaints.map((complaint) => (
                  <li key={complaint.id}>
                    <Link
                      href={route('complaints.show', complaint.complaint_id)}
                      className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:bg-blue-50 rounded transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-100">
                          <User className="h-6 w-6 text-blue-500" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{complaint.complaintType?.name || 'Complaint'}</div>
                          <div className="text-xs text-gray-500">{complaint.campus?.name || 'N/A'}</div>
                          <div className="text-xs text-gray-400">{new Date(complaint.created_at).toLocaleString()}</div>
                        </div>
                      </div>
                      <span className={`mt-2 sm:mt-0 px-3 py-1 rounded-full text-xs font-semibold
                        ${complaint.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          complaint.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                          complaint.status === 'completed' ? 'bg-green-100 text-green-800' :
                          'bg-gray-200 text-gray-600'
                        }`}>
                        {complaint.status?.replace('_', ' ').toUpperCase()}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-500 text-sm">No recent activities found.</div>
            )}
          </section>
        </main>
      </div>

      {/* Profile Dialog */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="max-w-sm w-full rounded-xl shadow-2xl p-0 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-4">
            <DialogHeader>
              <DialogTitle className="text-white">Profile</DialogTitle>
              <DialogDescription className="mb-2 text-blue-100">
                View your account information
              </DialogDescription>
            </DialogHeader>
          </div>
          {user && (
            <div className="flex flex-col items-center gap-3 text-sm px-6 pb-6 pt-2">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatarUrl || undefined} alt={user.name} />
                <AvatarFallback>{user.name?.[0]}</AvatarFallback>
              </Avatar>
              <Separator className="my-2" />
              <div className="space-y-1 w-full text-left">
                <p><span className="font-semibold">Name:</span> {user.name}</p>
                <p><span className="font-semibold">Email:</span> {user.email}</p>
                <p><span className="font-semibold">Role:</span> {user.roles.map((r: any) => r.role).join(', ')}</p>
              </div>
              <Button onClick={() => setShowProfile(false)} className="mt-4 w-full">
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Add animation for gradient background
// In your global CSS (e.g., app.css or index.css), add:
// @keyframes gradient-x {
//   0%, 100% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
// }
// .animate-gradient-x {
//   background-size: 200% 200%;
//   animation: gradient-x 8s ease-in-out infinite;
// }
