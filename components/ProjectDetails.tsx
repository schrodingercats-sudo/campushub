import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Code, Rocket, Book, Star, Heart, Share2, Download, Bookmark } from 'lucide-react';
import { useData } from '../context/DataContext';

const InteractionButton = ({ onClick, active, icon: Icon, label }: any) => (
    <button
        onClick={onClick}
        className={`p-3 rounded-full transition-all duration-300 group relative ${active
                ? 'bg-pinnacle-green text-black scale-110 shadow-lg'
                : 'bg-white text-gray-400 hover:text-black hover:bg-gray-50 border border-gray-100 hover:border-gray-300'
            }`}
        title={label}
    >
        <Icon className={`w-5 h-5 ${active ? 'fill-current' : ''}`} />
    </button>
);

const InteractionBar = ({ projectId, imageUrl, projectName }: { projectId: string, imageUrl: string, projectName: string }) => {
    const { toggleLike, toggleSave, likedProjects, savedProjects } = useData();
    const isLiked = likedProjects.includes(projectId);
    const isSaved = savedProjects.includes(projectId);

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `${projectName.replace(/\s+/g, '_')}_poster`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex gap-2">
            <InteractionButton
                onClick={() => toggleLike(projectId)}
                active={isLiked}
                icon={Heart}
                label={isLiked ? "Unlike" : "Like"}
            />
            <InteractionButton
                onClick={() => toggleSave(projectId)}
                active={isSaved}
                icon={Bookmark}
                label={isSaved ? "Unsave" : "Save"}
            />
            <InteractionButton
                onClick={handleShare}
                active={false}
                icon={Share2}
                label="Share Link"
            />
            <InteractionButton
                onClick={handleDownload}
                active={false}
                icon={Download}
                label="Download Image"
            />
        </div>
    );
};

export const ProjectDetails = () => {
    const { id } = useParams();
    const { projects } = useData();

    const project = projects.find(p => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center pt-20">
                <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                <Link to="/community" className="text-pinnacle-green hover:underline">Back to Community</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20 overflow-x-hidden">
            {/* Background Noise Texture */}
            <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none fixed"></div>

            <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                {/* Back Button */}
                <Link to="/community" className="inline-flex items-center text-gray-500 hover:text-black mb-8 transition-colors font-medium">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Marketplace
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column: Image & Tech Stack */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="rounded-3xl overflow-hidden shadow-xl mb-8 border border-gray-100 aspect-video bg-gray-200"
                        >
                            <img
                                src={project.image || "https://images.unsplash.com/photo-1565514020176-db8b556b6C52?q=80&w=1200&auto=format&fit=crop"}
                                alt={project.name}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-display font-bold text-xl uppercase mb-4">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack?.map((tech: string, i: number) => (
                                    <span key={i} className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                                        {tech}
                                    </span>
                                )) || <span className="text-gray-400">Not specified</span>}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Details & Pricing */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <div className="flex items-center gap-4">
                                    <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                        {project.category}
                                    </span>
                                    <div className="flex items-center text-yellow-400">
                                        <Star className="w-4 h-4 fill-current" />
                                        <Star className="w-4 h-4 fill-current" />
                                        <Star className="w-4 h-4 fill-current" />
                                        <Star className="w-4 h-4 fill-current" />
                                        <Star className="w-4 h-4 fill-current" />
                                        <span className="text-gray-400 text-sm font-medium ml-2 text-black">(5.0)</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <InteractionBar
                                        projectId={project.id}
                                        imageUrl={project.image || "https://images.unsplash.com/photo-1565514020176-db8b556b6C52?q=80&w=1200&auto=format&fit=crop"}
                                        projectName={project.name}
                                    />
                                </div>
                            </div>

                            <h1 className="font-display font-bold text-5xl md:text-6xl uppercase leading-none mb-6">
                                {project.name}
                            </h1>

                            <div className="text-pinnacle-green font-bold text-4xl mb-8">
                                {project.price}
                            </div>

                            <p className="text-xl text-gray-600 font-light leading-relaxed mb-10 border-l-4 border-pinnacle-purple pl-6">
                                {project.description}
                            </p>

                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-10">
                                <h3 className="font-display font-bold text-xl uppercase mb-6">Key Features</h3>
                                <ul className="space-y-4">
                                    {project.features?.map((feature: string, index: number) => (
                                        <li key={index} className="flex items-start">
                                            <div className="bg-green-100 p-1 rounded-full mr-4 mt-1">
                                                <Check className="w-4 h-4 text-pinnacle-green" />
                                            </div>
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    )) || <li className="text-gray-400">Features included in source code</li>}
                                </ul>
                            </div>

                            <div className="flex flex-col gap-4">
                                <button className="w-full bg-black text-white font-bold py-5 rounded-xl hover:bg-pinnacle-green hover:text-black transition-all uppercase tracking-wide text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                    Buy Source Code
                                </button>
                                <button className="w-full bg-white text-black border-2 border-gray-200 font-bold py-4 rounded-xl hover:border-black transition-all uppercase tracking-wide">
                                    View Live Demo
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};
