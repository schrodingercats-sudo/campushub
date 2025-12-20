import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    Settings,
    LogOut,
    TrendingUp,
    DollarSign,
    Package,
    Search,
    Bell,
    X,
    Plus,
    Menu
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { auth, db } from '../lib/firebase';
import { UserAvatar } from './UserAvatar';
import { useAuth } from '../context/AuthContext';
import { doc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';

export const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const { projects, orders, stats, addProject, updateProjectStatus } = useData();
    const { user } = useAuth();

    const [orderFilter, setOrderFilter] = useState<'All' | 'Completed' | 'Pending'>('All');
    const [projectFilter, setProjectFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');

    // Admin Managment State
    const [admins, setAdmins] = useState<string[]>([]);
    const [newAdminEmail, setNewAdminEmail] = useState('');

    useEffect(() => {
        const fetchAdmins = async () => {
            if (activeTab === 'settings') {
                const querySnapshot = await getDocs(collection(db, "admins"));
                const adminList = querySnapshot.docs.map(doc => doc.id);
                setAdmins(adminList);
            }
        };
        fetchAdmins();
    }, [activeTab]);

    const handleAddAdmin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newAdminEmail) return;
        try {
            await setDoc(doc(db, "admins", newAdminEmail), {
                email: newAdminEmail,
                addedBy: user?.email,
                addedAt: new Date().toISOString()
            });
            setAdmins(prev => [...prev, newAdminEmail]);
            setNewAdminEmail('');
            alert(`Admin access granted to ${newAdminEmail}`);
        } catch (err) {
            console.error(err);
            alert("Failed to add admin");
        }
    };

    const handleRemoveAdmin = async (email: string) => {
        if (!window.confirm(`Remove admin access for ${email}?`)) return;
        try {
            await deleteDoc(doc(db, "admins", email));
            setAdmins(prev => prev.filter(a => a !== email));
        } catch (err) {
            console.error(err);
            alert("Failed to remove admin");
        }
    };

    // Add Project Modal State
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    // Review Modal State
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<any>(null); // Ideally use Project type
    // ... (keep existing newProject state) ...

    // ... (keep existing helper functions) ...

    // Filtered Projects
    const filteredProjects = projectFilter === 'All'
        ? projects
        : projects.filter(p => p.verificationStatus === projectFilter);

    // ... (keep existing filteredOrders logic) ...
    const [newProject, setNewProject] = useState({
        name: '',
        price: '',
        category: '',
        status: 'Active' as const,
        description: '',
    });

    // Formatting currency
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val).replace('.00', '');
    };

    const handleAddProject = (e: React.FormEvent) => {
        e.preventDefault();
        addProject({
            name: newProject.name,
            price: newProject.price,
            category: newProject.category,
            status: newProject.status,
            features: ['New Project Feature', 'High Quality Code'], // Default for now
            techStack: ['React', 'Tailwind'],
            verificationStatus: 'Approved',
            author: 'Admin'
        });
        setIsAddModalOpen(false);
        setNewProject({ name: '', price: '', category: '', status: 'Active', description: '' });
    };

    // Sidebar Navigation
    const navItems = [
        { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { id: 'projects', icon: <Package size={20} />, label: 'Projects' },
        { id: 'orders', icon: <ShoppingBag size={20} />, label: 'Orders' },
        { id: 'customers', icon: <Users size={20} />, label: 'Customers' },
        { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
    ];

    // Sidebar State
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Filtered Orders
    const filteredOrders = orderFilter === 'All'
        ? orders
        : orders.filter(o => o.status === orderFilter);

    // Dynamic Stats
    const dashboardStats = [
        { label: 'Total Revenue', value: formatCurrency(stats.totalRevenue), change: '+12.5%', icon: <DollarSign className="text-pinnacle-green" size={24} /> },
        { label: 'Total Sales', value: stats.totalSales.toString(), change: '+8.2%', icon: <ShoppingBag className="text-pinnacle-purple" size={24} /> },
        { label: 'Active Projects', value: stats.activeProjects.toString(), change: '+2', icon: <Package className="text-pinnacle-orange" size={24} /> },
        { label: 'Total Visits', value: stats.totalVisits.toLocaleString(), change: '+24%', icon: <TrendingUp className="text-blue-500" size={24} /> },
    ];

    const customers = [
        { id: 'CST-001', name: 'Alex Johnson', email: 'alex@example.com', spent: '$298', joined: 'Jan 12, 2024' },
        { id: 'CST-002', name: 'Sarah Smith', email: 'sarah@example.com', spent: '$49', joined: 'Feb 03, 2024' },
        { id: 'CST-003', name: 'Mike Brown', email: 'mike@example.com', spent: '$1,200', joined: 'Dec 15, 2023' },
        { id: 'CST-004', name: 'Emily Davis', email: 'emily@example.com', spent: '$129', joined: 'Mar 20, 2024' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans relative overflow-x-hidden">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside className={`w-64 bg-pinnacle-dark text-white fixed h-full z-30 flex flex-col border-r border-gray-800 transition-transform duration-300 ease-in-out md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-8 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2 group">
                        <span className="font-display font-bold text-2xl tracking-tighter group-hover:opacity-80 transition-opacity">
                            CAMPUS<span className="text-pinnacle-green">HUB</span>
                        </span>
                    </Link>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                                setIsSidebarOpen(false);
                            }}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === item.id
                                ? 'bg-pinnacle-green text-black font-bold'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            {item.icon}
                            <span className="text-sm font-medium tracking-wide">{item.label}</span>
                            {activeTab === item.id && (
                                <motion.div layoutId="active-pill" className="ml-auto w-1.5 h-1.5 rounded-full bg-black" />
                            )}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={() => {
                            auth.signOut();
                            window.location.href = '/login';
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 transition-colors rounded-xl hover:bg-white/5"
                    >
                        <LogOut size={20} />
                        <span className="text-sm font-medium">Log Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 md:ml-64 p-4 md:p-8 w-full transition-all duration-300">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-10">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 -ml-2 text-gray-700 hover:bg-gray-100 rounded-lg md:hidden"
                        >
                            <Menu size={24} />
                        </button>
                        <h1 className="font-display font-bold text-2xl md:text-3xl uppercase">{navItems.find(i => i.id === activeTab)?.label}</h1>
                    </div>

                    <div className="flex items-center gap-4 md:gap-6 ml-auto md:ml-0">
                        <div className="relative hidden sm:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm w-48 md:w-64 focus:outline-none focus:border-pinnacle-green transition-colors"
                            />
                        </div>
                        <button className="relative p-2 text-gray-500 hover:text-black transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-pinnacle-orange rounded-full"></span>
                        </button>
                        <div className="flex-shrink-0">
                            <UserAvatar user={user} className="w-10 h-10 border-2 border-white shadow-sm" />
                        </div>
                    </div>
                </div>

                {/* Dashboard View */}
                {activeTab === 'dashboard' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {dashboardStats.map((stat, index) => (
                                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-3 bg-gray-50 rounded-xl">{stat.icon}</div>
                                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">{stat.change}</span>
                                    </div>
                                    <div className="text-3xl font-bold font-display mb-1">{stat.value}</div>
                                    <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Recent Orders */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                                <h2 className="font-display font-bold text-xl uppercase">Recent Orders</h2>
                                <button className="text-sm font-bold text-pinnacle-purple hover:underline" onClick={() => setActiveTab('orders')}>View All</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 text-left">
                                        <tr>
                                            <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                                            <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                                            <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Project</th>
                                            <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                                            <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {orders.slice(0, 5).map((order, i) => (
                                            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-8 py-5 text-sm font-medium text-gray-900">{order.id}</td>
                                                <td className="px-8 py-5 text-sm text-gray-600 font-medium">{order.customer}</td>
                                                <td className="px-8 py-5 text-sm text-gray-600">{order.project}</td>
                                                <td className="px-8 py-5 text-sm font-bold text-gray-900">{order.amount}</td>
                                                <td className="px-8 py-5">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Projects View */}
                {activeTab === 'projects' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                                <div className="flex gap-2 bg-gray-50 p-1 rounded-full">
                                    {['All', 'Pending', 'Approved', 'Rejected'].map((filter) => (
                                        <button
                                            key={filter}
                                            onClick={() => setProjectFilter(filter as any)}
                                            className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${projectFilter === filter
                                                ? 'bg-black text-white shadow-md'
                                                : 'text-gray-500 hover:text-black'
                                                }`}
                                        >
                                            {filter}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setIsAddModalOpen(true)}
                                    className="bg-black text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-pinnacle-green hover:text-black transition-colors flex items-center gap-2"
                                >
                                    <Plus size={16} /> <span>Add New Project</span>
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 text-left">
                                        <tr>
                                            <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
                                            <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Project Name</th>
                                            <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Author</th>
                                            <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Verification</th>
                                            <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {filteredProjects.length > 0 ? filteredProjects.map((project, i) => (
                                            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-8 py-5 text-sm text-gray-500">{project.id}</td>
                                                <td className="px-8 py-5 text-sm font-bold text-gray-900">{project.name}</td>
                                                <td className="px-8 py-5 text-sm text-gray-600">{project.author || 'Admin'}</td>
                                                <td className="px-8 py-5">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${project.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {project.status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${project.verificationStatus === 'Approved' ? 'bg-green-50 text-green-700' :
                                                        project.verificationStatus === 'Pending' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'
                                                        }`}>
                                                        {project.verificationStatus}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-5 text-sm flex items-center gap-3">
                                                    {project.verificationStatus === 'Pending' ? (
                                                        <button
                                                            onClick={() => {
                                                                setSelectedProject(project);
                                                                setIsReviewModalOpen(true);
                                                            }}
                                                            className="text-pinnacle-purple font-bold hover:underline flex items-center gap-1"
                                                        >
                                                            Review
                                                        </button>
                                                    ) : (
                                                        <span className="text-gray-400">Locked</span>
                                                    )}
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan={6} className="text-center py-10 text-gray-500">No projects found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Orders View */}
                {activeTab === 'orders' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-8 border-b border-gray-100 flex gap-4 items-center">
                                <button
                                    onClick={() => setOrderFilter('All')}
                                    className={`px-4 py-2 text-xs font-bold rounded-full transition-colors ${orderFilter === 'All' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'
                                        }`}
                                >
                                    All Orders
                                </button>
                                <button
                                    onClick={() => setOrderFilter('Completed')}
                                    className={`px-4 py-2 text-xs font-bold rounded-full transition-colors ${orderFilter === 'Completed' ? 'bg-green-100 text-green-800' : 'text-gray-500 hover:bg-gray-100'
                                        }`}
                                >
                                    Completed
                                </button>
                                <button
                                    onClick={() => setOrderFilter('Pending')}
                                    className={`px-4 py-2 text-xs font-bold rounded-full transition-colors ${orderFilter === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'text-gray-500 hover:bg-gray-100'
                                        }`}
                                >
                                    Pending
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 text-left">
                                        <tr>
                                            <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                                            <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                                            <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Project</th>
                                            <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                                            <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                            <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {filteredOrders.length > 0 ? filteredOrders.map((order, i) => (
                                            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-8 py-5 text-sm font-medium text-gray-900">{order.id}</td>
                                                <td className="px-8 py-5 text-sm text-gray-600 font-medium">{order.customer}</td>
                                                <td className="px-8 py-5 text-sm text-gray-600">{order.project}</td>
                                                <td className="px-8 py-5 text-sm font-bold text-gray-900">{order.amount}</td>
                                                <td className="px-8 py-5 text-sm text-gray-400">{order.date}</td>
                                                <td className="px-8 py-5">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan={6} className="text-center py-10 text-gray-500">No orders found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Customers View */}
                {activeTab === 'customers' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-8 border-b border-gray-100">
                                <h2 className="font-display font-bold text-xl uppercase">Registered Customers</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 text-left">
                                        <tr>
                                            <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
                                            <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Total Spent</th>
                                            <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Joined Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {customers.map((customer, i) => (
                                            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-8 py-5 text-sm text-gray-500">{customer.id}</td>
                                                <td className="px-8 py-5 text-sm font-bold text-gray-900">{customer.name}</td>
                                                <td className="px-8 py-5 text-sm text-gray-600">{customer.email}</td>
                                                <td className="px-8 py-5 text-sm font-medium text-green-600">{customer.spent}</td>
                                                <td className="px-8 py-5 text-sm text-gray-400">{customer.joined}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Settings View */}
                {activeTab === 'settings' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-8">
                            <h2 className="font-display font-bold text-xl uppercase mb-6">General Settings</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Site Name</label>
                                    <input type="text" defaultValue="CampusHub" className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-pinnacle-green" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Admin Email</label>
                                    <input type="email" defaultValue="admin@campushub.com" className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-pinnacle-green" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <h2 className="font-display font-bold text-xl uppercase mb-6">Manage Admin Access</h2>
                            <div className="space-y-6">
                                <form onSubmit={handleAddAdmin} className="flex gap-4">
                                    <input
                                        type="email"
                                        value={newAdminEmail}
                                        onChange={(e) => setNewAdminEmail(e.target.value)}
                                        placeholder="Enter email to grant admin access"
                                        className="flex-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-pinnacle-green"
                                    />
                                    <button type="submit" className="bg-black text-white px-6 py-3 rounded-xl font-bold uppercase tracking-wide hover:bg-pinnacle-green hover:text-black transition-colors">
                                        Add Admin
                                    </button>
                                </form>

                                <div className="space-y-3">
                                    <h3 className="text-sm font-bold text-gray-400 uppercase">Current Admins</h3>
                                    {admins.map((adminEmail) => (
                                        <div key={adminEmail} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <span className="font-medium text-gray-700">{adminEmail}</span>
                                            {adminEmail !== user?.email && (
                                                <button
                                                    onClick={() => handleRemoveAdmin(adminEmail)}
                                                    className="text-red-500 text-xs font-bold hover:underline"
                                                >
                                                    REMOVE
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </main>

            {/* Add Project Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={() => setIsAddModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl relative z-10"
                        >
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="absolute top-6 right-6 text-gray-400 hover:text-black"
                            >
                                <X size={24} />
                            </button>

                            <h2 className="font-display font-bold text-2xl uppercase mb-6">Add New Project</h2>

                            <form onSubmit={handleAddProject} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Project Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={newProject.name}
                                        onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-pinnacle-green"
                                        placeholder="e.g. E-Commerce Suite"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Price</label>
                                        <input
                                            required
                                            type="text"
                                            value={newProject.price}
                                            onChange={(e) => setNewProject({ ...newProject, price: e.target.value })}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-pinnacle-green"
                                            placeholder="$49"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                                        <input
                                            required
                                            type="text"
                                            value={newProject.category}
                                            onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-pinnacle-green"
                                            placeholder="Web App"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                    <textarea
                                        value={newProject.description}
                                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-pinnacle-green min-h-[100px]"
                                        placeholder="Brief description of the project..."
                                    />
                                </div>
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-wide hover:bg-pinnacle-green hover:text-black transition-colors"
                                    >
                                        Create Project
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            {/* Review Project Modal */}
            <AnimatePresence>
                {isReviewModalOpen && selectedProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setIsReviewModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-3xl p-0 w-full max-w-2xl shadow-2xl relative z-10 overflow-hidden"
                        >
                            <button
                                onClick={() => setIsReviewModalOpen(false)}
                                className="absolute top-4 right-4 text-white hover:text-gray-200 z-20 bg-black/20 p-2 rounded-full backdrop-blur-md"
                            >
                                <X size={20} />
                            </button>

                            {/* Modal Header with Image */}
                            <div className="relative h-48 bg-gray-200">
                                <img
                                    src={selectedProject.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3"}
                                    alt={selectedProject.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
                                    <h2 className="text-2xl font-display font-bold text-white uppercase">{selectedProject.name}</h2>
                                    <p className="text-gray-300 text-sm">by {selectedProject.author || 'Unknown'}</p>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="p-8">
                                <div className="flex gap-4 mb-6">
                                    <div className="bg-gray-50 px-4 py-2 rounded-xl text-center">
                                        <p className="text-xs font-bold text-gray-500 uppercase">Price</p>
                                        <p className="text-lg font-bold text-green-600">{selectedProject.price}</p>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-2 rounded-xl text-center">
                                        <p className="text-xs font-bold text-gray-500 uppercase">Category</p>
                                        <p className="text-lg font-bold text-gray-800">{selectedProject.category}</p>
                                    </div>
                                </div>

                                <h3 className="text-sm font-bold text-gray-400 uppercase mb-2">Description</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {selectedProject.description || "No description provided."}
                                </p>

                                {/* Action Buttons */}
                                <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-100">
                                    <button
                                        onClick={() => {
                                            updateProjectStatus(selectedProject.id, 'Rejected');
                                            setIsReviewModalOpen(false);
                                        }}
                                        className="py-4 rounded-xl text-red-500 font-bold uppercase tracking-wide border-2 border-red-100 hover:bg-red-50 transition-colors"
                                    >
                                        Reject
                                    </button>
                                    <button
                                        onClick={() => {
                                            updateProjectStatus(selectedProject.id, 'Approved');
                                            setIsReviewModalOpen(false);
                                        }}
                                        className="py-4 rounded-xl bg-pinnacle-green text-black font-bold uppercase tracking-wide hover:shadow-lg hover:shadow-green-200 transition-all"
                                    >
                                        Approve Project
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
