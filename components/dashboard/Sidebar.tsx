"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Globe, Search, PenTool, Bot, ChartBar as BarChart3, Settings, Menu, X, User, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase/config';
import { signOut } from '@/lib/firebase/auth';
import { toast } from 'sonner';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Resume', href: '/dashboard/resume', icon: FileText },
  { name: 'Portfolio', href: '/dashboard/portfolio', icon: Globe },
  { name: 'Opportunities', href: '/dashboard/opportunities', icon: Search },
  { name: 'Proposals', href: '/dashboard/proposals', icon: PenTool },
  { name: 'Digital Twin', href: '/dashboard/digital-twin', icon: Bot },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const [user] = useAuthState(auth);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Sign-out error:', error);
      toast.error('Failed to sign out');
    }
  };

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-gray-200">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          {(!collapsed || isMobile) && (
            <span className="font-bold text-xl text-black whitespace-nowrap">
              Avatrr
            </span>
          )}
        </Link>
      </div>

      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Avatar className="flex-shrink-0">
            <AvatarImage src={user?.photoURL || undefined} />
            <AvatarFallback>
              <User className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
          {(!collapsed || isMobile) && (
            <div className="overflow-hidden">
              <p className="font-medium text-black text-sm truncate">
                {user?.displayName || 'User'}
              </p>
              <p className="text-gray-500 text-xs truncate">{user?.email}</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => {
                if (isMobile) setMobileOpen(false);
                toast.success(`Navigating to ${item.name}`);
              }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  isActive
                    ? 'bg-black text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {(!collapsed || isMobile) && (
                  <span className="font-medium whitespace-nowrap">
                    {item.name}
                  </span>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 space-y-1">
        <Link
          href="/dashboard/settings"
          onClick={() => {
            if (isMobile) setMobileOpen(false);
            toast.success('Opening Settings');
          }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-black transition-all ${
              pathname === '/dashboard/settings' ? 'bg-black text-white' : ''
            }`}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            {(!collapsed || isMobile) && (
              <span className="font-medium whitespace-nowrap">Settings</span>
            )}
          </motion.div>
        </Link>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-all"
          onClick={handleSignOut}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {(!collapsed || isMobile) && (
            <span className="font-medium whitespace-nowrap">Sign Out</span>
          )}
        </motion.button>
      </div>
    </div>
  );

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50 bg-white shadow-md"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-40 bg-black/50"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-72 h-full bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <SidebarContent isMobile={true} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ width: collapsed ? 80 : 288 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="hidden md:flex fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-30 overflow-hidden"
      >
        <div className="w-full">
          <SidebarContent />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-8 bg-white border border-gray-200 shadow-md hover:shadow-lg rounded-full"
          onClick={() => {
            setCollapsed(!collapsed);
            toast.success(collapsed ? 'Sidebar expanded' : 'Sidebar collapsed');
          }}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </motion.div>
    </>
  );
}
