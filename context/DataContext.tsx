import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
export interface Project {
    id: string;
    name: string;
    price: string;
    category: string;
    status: 'Active' | 'Draft';
    sales: number;
    description?: string;
    features?: string[];
    techStack?: string[];
    image?: string;
    // New fields for User Uploads
    author?: string;
    verificationStatus: 'Pending' | 'Approved' | 'Rejected';
}

export interface Order {
    id: string;
    customer: string;
    project: string;
    amount: string;
    status: 'Completed' | 'Pending' | 'Refunded';
    date: string;
}

interface Stats {
    totalRevenue: number;
    totalSales: number;
    activeProjects: number;
    totalVisits: number;
}

interface DataContextType {
    projects: Project[];
    orders: Order[];
    stats: Stats;
    savedProjects: string[];
    likedProjects: string[];
    addProject: (project: Omit<Project, 'id' | 'sales'>) => void;
    updateOrderStatus: (id: string, status: Order['status']) => void;
    updateProjectStatus: (id: string, status: Project['verificationStatus']) => void;
    toggleSave: (projectId: string) => void;
    toggleLike: (projectId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Initial Mock Data (Moved from components)
const INITIAL_PROJECTS: Project[] = [
    { id: 'PRJ-001', name: 'E-Commerce Suite', price: '$149', category: 'Web App', status: 'Active', sales: 24, description: 'A complete e-commerce solution with cart, checkout, and admin panel.', features: ['User Auth', 'Stripe Integration', 'Admin Dashboard'], techStack: ['React', 'Node', 'MongoDB'], author: 'Admin', verificationStatus: 'Approved', image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1200&auto=format&fit=crop" },
    { id: 'PRJ-002', name: 'Portfolio Pro', price: '$49', category: 'Portfolio', status: 'Active', sales: 45, description: 'Minimalist portfolio template for developers.', features: ['Responsive', 'SEO Optimized', 'Dark Mode'], techStack: ['Next.js', 'Tailwind'], author: 'Admin', verificationStatus: 'Approved', image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop" },
    { id: 'PRJ-003', name: 'SaaS Dashboard', price: '$99', category: 'Dashboard', status: 'Draft', sales: 0, description: 'Analytics dashboard template.', features: ['Charts', 'Data Grid', 'Sidebar'], techStack: ['React', 'Recharts'], author: 'Admin', verificationStatus: 'Approved', image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop" },
    { id: 'PRJ-004', name: 'Learning Platform', price: '$129', category: 'Education', status: 'Active', sales: 12, description: 'LMS system for online courses.', features: ['Video Player', 'Progress Tracking', 'Quizzes'], techStack: ['Remix', 'PostgreSQL'], author: 'Admin', verificationStatus: 'Approved', image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1200&auto=format&fit=crop" },
    { id: 'PRJ-005', name: 'Social Connect', price: '$89', category: 'Social', status: 'Active', sales: 3, description: 'Social media network starter kit.', features: ['Feed', 'Likes/Comments', 'Profiles'], techStack: ['Vue', 'Firebase'], author: 'Admin', verificationStatus: 'Approved', image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop" },
];

const INITIAL_ORDERS: Order[] = [
    { id: '#ORD-001', customer: 'Alex Johnson', project: 'E-Commerce Suite', amount: '$149', status: 'Completed', date: '2 mins ago' },
    { id: '#ORD-002', customer: 'Sarah Smith', project: 'Portfolio Pro', amount: '$49', status: 'Completed', date: '1 hour ago' },
    { id: '#ORD-003', customer: 'Mike Brown', project: 'SaaS Dashboard', amount: '$99', status: 'Pending', date: '3 hours ago' },
    { id: '#ORD-004', customer: 'Emily Davis', project: 'Learning Platform', amount: '$129', status: 'Completed', date: '5 hours ago' },
    { id: '#ORD-005', customer: 'Chris Wilson', project: 'Social Connect', amount: '$89', status: 'Refunded', date: '1 day ago' },
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Load from local storage or use initial
    const [projects, setProjects] = useState<Project[]>(() => {
        const saved = localStorage.getItem('campushub_projects');
        return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    });

    const [orders, setOrders] = useState<Order[]>(() => {
        const saved = localStorage.getItem('campushub_orders');
        return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    });

    const [savedProjects, setSavedProjects] = useState<string[]>(() => {
        const saved = localStorage.getItem('campushub_saved');
        return saved ? JSON.parse(saved) : [];
    });

    const [likedProjects, setLikedProjects] = useState<string[]>(() => {
        const saved = localStorage.getItem('campushub_liked');
        return saved ? JSON.parse(saved) : [];
    });

    // Persist to local storage
    useEffect(() => {
        localStorage.setItem('campushub_projects', JSON.stringify(projects));
    }, [projects]);

    useEffect(() => {
        localStorage.setItem('campushub_orders', JSON.stringify(orders));
    }, [orders]);

    useEffect(() => {
        localStorage.setItem('campushub_saved', JSON.stringify(savedProjects));
    }, [savedProjects]);

    useEffect(() => {
        localStorage.setItem('campushub_liked', JSON.stringify(likedProjects));
    }, [likedProjects]);

    // Derived Stats
    const stats: Stats = {
        totalRevenue: orders.filter(o => o.status === 'Completed').reduce((sum, order) => {
            const val = parseFloat(order.amount.replace('$', '').replace(',', ''));
            return sum + val;
        }, 0),
        totalSales: orders.filter(o => o.status === 'Completed').length,
        activeProjects: projects.filter(p => p.status === 'Active').length,
        totalVisits: 1234, // Static for now, hard to track client-side only
    };

    const addProject = (newProject: Omit<Project, 'id' | 'sales'>) => {
        const project: Project = {
            ...newProject,
            id: `PRJ-${String(projects.length + 1).padStart(3, '0')}`,
            sales: 0,
        };
        setProjects(prev => [project, ...prev]);
    };

    const updateOrderStatus = (id: string, status: Order['status']) => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    };

    const updateProjectStatus = (id: string, status: Project['verificationStatus']) => {
        setProjects(prev => prev.map(p => p.id === id ? { ...p, verificationStatus: status } : p));
    };

    const toggleSave = (projectId: string) => {
        setSavedProjects(prev =>
            prev.includes(projectId)
                ? prev.filter(id => id !== projectId)
                : [...prev, projectId]
        );
    };

    const toggleLike = (projectId: string) => {
        setLikedProjects(prev =>
            prev.includes(projectId)
                ? prev.filter(id => id !== projectId)
                : [...prev, projectId]
        );
    };

    return (
        <DataContext.Provider value={{ projects, orders, stats, savedProjects, likedProjects, addProject, updateOrderStatus, updateProjectStatus, toggleSave, toggleLike }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
