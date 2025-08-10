import React from 'react';

interface SidebarItemProps {
    text: string;
    icon: React.ReactNode;
    onClick: () => void;
    isActive: boolean;
}

export function SidebarItem({ text, icon, onClick, isActive }: SidebarItemProps) {
    const activeClass = isActive ? "bg-purple-100 text-purple-600 font-semibold" : "text-gray-600 hover:bg-gray-100";

    return (
        <div 
            onClick={onClick} 
            className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors duration-150 ${activeClass}`}
        >
            <div className="pr-2">{icon}</div>
            {text}
        </div>
    );
}