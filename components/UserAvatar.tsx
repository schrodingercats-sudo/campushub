import React from 'react';
import { User } from 'firebase/auth';

interface UserAvatarProps {
    user: User | null;
    className?: string;
    textSize?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ user, className = "w-10 h-10", textSize = "text-xs" }) => {
    const getInitials = () => {
        if (!user) return 'U';
        if (user.displayName) {
            return user.displayName
                .split(' ')
                .map(n => n[0])
                .join('')
                .substring(0, 2)
                .toUpperCase();
        }
        return user.email ? user.email[0].toUpperCase() : 'U';
    };

    if (user?.photoURL) {
        return (
            <img
                src={user.photoURL}
                alt={user.displayName || "User"}
                className={`${className} rounded-full object-cover border-2 border-white shadow-sm`}
            />
        );
    }

    return (
        <div className={`${className} rounded-full bg-black text-white flex items-center justify-center ${textSize} font-bold border-2 border-white shadow-sm`}>
            {getInitials()}
        </div>
    );
};
