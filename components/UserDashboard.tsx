import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
    Package,
    Upload,
    LogOut,
    Settings,
    ShoppingBag,
    Plus,
    X,
    Clock,
    CheckCircle,
    AlertCircle,
    Globe,
    Heart
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { auth } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { UserAvatar } from './UserAvatar';

export const UserDashboard = () => {
    const navigate = useNavigate();
    const { projects, orders, addProject, savedProjects } = useData();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('orders');

    // Mock current user
    const currentUser = "user@example.com";

    // Filters
    const myOrders = orders.filter(o => o.customer === "Alex Johnson"); // Mocking logged in user as Alex
    const myListings = projects.filter(p => p.author === currentUser); // Active listings for this user
    const mySavedItems = projects.filter(p => savedProjects.includes(p.id));

    const navItems = [
        { id: 'orders', icon: <ShoppingBag size={20} />, label: 'Purchase History' },
        { id: 'saved', icon: <Heart size={20} />, label: 'Saved Items' },
        { id: 'listings', icon: <Package size={20} />, label: 'My Listings' },
        { id: 'community', icon: <Globe size={20} />, label: 'Community' },
        { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white border-r border-gray-100 flex-shrink-0">
                <div className="p-8">
                    <Link to="/" className="flex items-center gap-2 group">
                        <span className="font-display font-bold text-2xl tracking-tighter group-hover:opacity-80 transition-opacity">
                            CAMPUS<span className="text-pinnacle-green">HUB</span>
                        </span>
                    </Link>
                    <div className="text-xs text-gray-400 mt-2 uppercase tracking-widest font-bold">User Dashboard</div>
                </div>

                <nav className="px-4 space-y-2">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                if (item.id === 'community') {
                                    navigate('/community');
                                } else {
                                    setActiveTab(item.id);
                                }
                            }}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === item.id
                                ? 'bg-black text-white font-medium'
                                : 'text-gray-500 hover:bg-gray-50'
                                }`}
                        >
                            {item.icon}
                            <span className="text-sm">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-4 mt-auto border-t border-gray-100">
                    <button
                        onClick={() => {
                            auth.signOut();
                            window.location.href = '/login';
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="text-sm font-medium">Log Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <h1 className="font-display font-bold text-3xl uppercase">{navItems.find(i => i.id === activeTab)?.label}</h1>
                    <div className="flex items-center gap-4">
                        {activeTab === 'listings' && (
                            <button
                                onClick={() => navigate('/contact')}
                                className="bg-pinnacle-green text-black px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wide hover:bg-black hover:text-white transition-colors flex items-center gap-2"
                            >
                                <Upload size={18} /> List Your Project
                            </button>
                        )}
                        <UserAvatar user={user} className="w-10 h-10 border-2 border-white shadow-sm" />
                    </div>
                </div>

                {/* Content Views */}
                {activeTab === 'orders' && (
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        {myOrders.length > 0 ? (
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="pb-4 text-xs font-bold text-gray-400 uppercase">Project</th>
                                        <th className="pb-4 text-xs font-bold text-gray-400 uppercase">Date</th>
                                        <th className="pb-4 text-xs font-bold text-gray-400 uppercase">Amount</th>
                                        <th className="pb-4 text-xs font-bold text-gray-400 uppercase">Status</th>
                                        <th className="pb-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {myOrders.map((order, i) => (
                                        <tr key={i}>
                                            <td className="py-4 font-bold text-gray-900">{order.project}</td>
                                            <td className="py-4 text-sm text-gray-500">{order.date}</td>
                                            <td className="py-4 text-sm font-medium">{order.amount}</td>
                                            <td className="py-4">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700">
                                                    <CheckCircle size={12} /> Completed
                                                </span>
                                            </td>
                                            <td className="py-4 text-right">
                                                <button className="text-sm font-bold text-pinnacle-purple hover:underline">Download</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center py-20 text-gray-400">
                                <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
                                <p>No orders yet. Explore the marketplace!</p>
                                <Link to="/community" className="inline-block mt-4 text-black font-bold border-b-2 border-black hover:text-pinnacle-green hover:border-pinnacle-green transition-colors">Browse Projects</Link>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'saved' && (
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        {/* Mock Saved Items - filtering projects randomly for demo */}
                        {projects.slice(0, 3).length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {projects.slice(0, 3).map((project, index) => (
                                    <div
                                        key={project.id}
                                        onClick={() => navigate(`/project/${project.id}`)}
                                        className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                                    >
                                        <div className="aspect-video relative overflow-hidden bg-gray-100">
                                            <img
                                                src={project.image || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop"}
                                                alt={project.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute top-3 right-3">
                                                <button onClick={(e) => { e.stopPropagation(); /* unsave */ }} className="p-2 bg-white/90 backdrop-blur-md rounded-full text-red-500 hover:bg-black hover:text-white transition-colors shadow-sm">
                                                    <Heart size={16} fill="currentColor" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-gray-900 line-clamp-1">{project.name}</h3>
                                                <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded text-gray-600">{project.price}</span>
                                            </div>
                                            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{project.description}</p>
                                            <button className="w-full py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-pinnacle-green hover:text-black transition-colors">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 text-gray-400">
                                <Heart size={48} className="mx-auto mb-4 opacity-20" />
                                <p>No saved items yet.</p>
                                <Link to="/community" className="inline-block mt-4 text-black font-bold border-b-2 border-black hover:text-pinnacle-green hover:border-pinnacle-green transition-colors">Browse Marketplace</Link>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'listings' && (
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        {myListings.length > 0 ? (
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="pb-4 text-xs font-bold text-gray-400 uppercase">Project Name</th>
                                        <th className="pb-4 text-xs font-bold text-gray-400 uppercase">Price</th>
                                        <th className="pb-4 text-xs font-bold text-gray-400 uppercase">Category</th>
                                        <th className="pb-4 text-xs font-bold text-gray-400 uppercase">Verification</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {myListings.map((project, i) => (
                                        <tr key={i}>
                                            <td className="py-4 font-bold text-gray-900">{project.name}</td>
                                            <td className="py-4 text-sm text-gray-600">{project.price}</td>
                                            <td className="py-4 text-sm text-gray-500">{project.category}</td>
                                            <td className="py-4">
                                                {project.verificationStatus === 'Approved' && (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700">
                                                        <CheckCircle size={12} /> Live
                                                    </span>
                                                )}
                                                {project.verificationStatus === 'Pending' && (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-50 text-yellow-700">
                                                        <Clock size={12} /> Pending Review
                                                    </span>
                                                )}
                                                {project.verificationStatus === 'Rejected' && (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700">
                                                        <AlertCircle size={12} /> Rejected
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center py-20 text-gray-400">
                                <Package size={48} className="mx-auto mb-4 opacity-20" />
                                <p>You haven't uploaded any projects yet.</p>
                                <button onClick={() => navigate('/contact')} className="inline-block mt-4 text-black font-bold border-b-2 border-black hover:text-pinnacle-green hover:border-pinnacle-green transition-colors">Start Selling</button>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};
