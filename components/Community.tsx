import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Check, Zap, Globe, Smartphone, Shield, Heart, Bookmark, Share2, Download, Search } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

export const Community = () => {
    const { projects, likedProjects, savedProjects, toggleLike, toggleSave } = useData();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isLocked, setIsLocked] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Duplicate projects to ensure enough content for scrolling
    // We want at least 12-16 items as per requirements
    const allProjects = [...projects, ...projects, ...projects].slice(0, 15);

    const filteredProjects = allProjects.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const handleScroll = () => {
            if (isLocked) return; // Already locked
            if (user) return; // Don't lock if user is logged in

            const scrollProtocol = window.scrollY;
            // Lock after scrolling 300px
            if (scrollProtocol > 300) {
                setIsLocked(true);
                // Disable body scroll when locked
                document.body.style.overflow = 'hidden';
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Immediate unlock if user logs in while locked
        if (user && isLocked) {
            setIsLocked(false);
            document.body.style.overflow = 'unset';
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            // Cleanup body scroll lock
            document.body.style.overflow = 'unset';
            // Also reset overflow if component unmounts
        };
    }, [isLocked, user]);

    const getProjectImage = (index: number) => {
        const images = [
            "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop", // Dark abstract
            "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=800&auto=format&fit=crop", // Dark ui
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop", // Cyberpunk
            "https://images.unsplash.com/photo-1620641788421-7a1c36f13758?q=80&w=800&auto=format&fit=crop", // Glassmorphism
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop", // Tech
            "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop"  // Circuit
        ];
        return images[index % images.length];
    };

    const handleDownload = (e: React.MouseEvent, index: number) => {
        e.preventDefault();
        e.stopPropagation();
        const link = document.createElement('a');
        link.href = getProjectImage(index);
        link.download = `project-${index}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleShare = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 pt-20 relative font-sans">

            {/* Header / Title */}
            <div className="container mx-auto px-4 py-12 text-center pb-12">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter mb-4"
                >
                    Premium <span className="text-pinnacle-green">Resources</span>
                </motion.h1>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10">
                    A curated collection of production-ready websites and templates.
                </p>

                {/* Search Bar */}
                <div className="max-w-xl mx-auto relative mb-12">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black/30 focus:ring-1 focus:ring-black/5 transition-all shadow-sm"
                    />
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="container mx-auto px-4 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={`${project.id}-${index}`}
                            layoutId={`project-${project.id}-${index}`}
                            onClick={() => navigate(`/project/${project.id}`)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -5 }}
                            className="bg-white border border-gray-100 rounded-2xl overflow-hidden group hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col h-full cursor-pointer"
                        >
                            <div className="aspect-[4/3] overflow-hidden relative">
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
                                <img
                                    src={getProjectImage(index)}
                                    alt={project.name}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                                {/* Overlay Actions */}
                                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleSave(project.id);
                                        }}
                                        className={`p-2 backdrop-blur-md rounded-full transition-colors shadow-sm ${savedProjects.includes(project.id)
                                            ? 'bg-pinnacle-green text-black'
                                            : 'bg-white/90 text-gray-700 hover:bg-black hover:text-white'
                                            }`}
                                        title={savedProjects.includes(project.id) ? "Unsave" : "Save"}
                                    >
                                        <Bookmark size={16} className={savedProjects.includes(project.id) ? "fill-current" : ""} />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleLike(project.id);
                                        }}
                                        className={`p-2 backdrop-blur-md rounded-full transition-colors shadow-sm ${likedProjects.includes(project.id)
                                            ? 'bg-red-500 text-white'
                                            : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
                                            }`}
                                        title={likedProjects.includes(project.id) ? "Unlike" : "Like"}
                                    >
                                        <Heart size={16} className={likedProjects.includes(project.id) ? "fill-current" : ""} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-black transition-colors">{project.name}</h3>
                                    <span className="text-xs font-mono px-2 py-1 rounded bg-gray-100 text-gray-600 font-bold">{project.price}</span>
                                </div>
                                <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1 font-light leading-relaxed">{project.description}</p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div className="flex gap-2">
                                        <button onClick={handleShare} className="text-gray-400 hover:text-black transition-colors" title="Share">
                                            <Share2 size={18} />
                                        </button>
                                        <button onClick={(e) => handleDownload(e, index)} className="text-gray-400 hover:text-black transition-colors" title="Download Image">
                                            <Download size={18} />
                                        </button>
                                    </div>
                                    <button className="text-sm font-bold text-black border-b-2 border-transparent hover:border-pinnacle-green transition-all uppercase tracking-wider text-[10px]">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Locked Overlay */}
            <AnimatePresence>
                {isLocked && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-50 flex items-center justify-center"
                    >
                        {/* Backdrop Blur */}
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-xl" />

                        {/* Modal Card */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 20 }}
                            className="relative z-10 bg-white border border-gray-100 p-10 md:p-14 rounded-[2rem] max-w-md w-full text-center shadow-2xl"
                        >
                            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
                                <Lock size={28} />
                            </div>

                            <h2 className="font-display font-bold text-3xl md:text-4xl uppercase tracking-tighter mb-4 text-gray-900">
                                Unlock Everything
                            </h2>
                            <p className="text-gray-500 mb-8 leading-relaxed">
                                Get unlimited access to all premium features and source codes. <span className="text-black font-bold">It's completely free.</span> Just create an account to continue.
                            </p>

                            {/* Features List */}
                            <div className="space-y-4 mb-10 text-left pl-4">
                                <div className="flex items-center gap-4 text-gray-600">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                        <Globe size={14} className="text-black" />
                                    </div>
                                    <span className="text-sm font-medium">Access full project directory</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-600">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                        <Smartphone size={14} className="text-black" />
                                    </div>
                                    <span className="text-sm font-medium">Responsive Mobile Previews</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-600">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                        <Zap size={14} className="text-black" />
                                    </div>
                                    <span className="text-sm font-medium">Exclusive Member Deals</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-600">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                        <Shield size={14} className="text-black" />
                                    </div>
                                    <span className="text-sm font-medium">Verified Source Codes</span>
                                </div>
                            </div>

                            <Link to="/login" className="block w-full text-center bg-black hover:bg-gray-800 text-white font-bold py-4 rounded-xl text-lg uppercase tracking-wide transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 mb-4">
                                Create Your Account
                            </Link>

                            <Link to="/login" className="text-sm text-gray-400 hover:text-black transition-colors uppercase font-bold tracking-widest text-[10px]">
                                Already have an account? Sign In
                            </Link>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
