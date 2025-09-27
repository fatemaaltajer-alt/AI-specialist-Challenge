
import React from 'react';

interface BadgeProps {
    userName: string;
}

const Badge: React.FC<BadgeProps> = ({ userName }) => {
    return (
        <div className="flex flex-col items-center animate-fade-in">
            <svg width="250" height="280" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
                <defs>
                    <linearGradient id="badgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#6366F1', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#4F46E5', stopOpacity: 1 }} />
                    </linearGradient>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                
                {/* Ribbon */}
                <path d="M 40 160 L 40 210 L 60 190 L 80 210 L 80 160 Z" fill="url(#ribbonGradient)" />
                <path d="M 160 160 L 160 210 L 140 190 L 120 210 L 120 160 Z" fill="url(#ribbonGradient)" />
                
                {/* Badge Body */}
                <path d="M 100,10 C 150,10 190,50 190,100 C 190,150 150,190 100,190 C 50,190 10,150 10,100 C 10,50 50,10 100,10 Z" fill="url(#badgeGradient)" filter="url(#glow)" />
                <circle cx="100" cy="100" r="75" fill="#1F2937" stroke="#9CA3AF" strokeWidth="2"/>
                
                {/* Stars */}
                <path d="M 100 40 L 105 50 L 115 50 L 107.5 55 L 110 65 L 100 60 L 90 65 L 92.5 55 L 85 50 L 95 50 Z" fill="#FBBF24" />
                
                {/* Text */}
                <text x="100" y="95" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">
                    AI Specialist
                </text>
                <text x="100" y="125" fontFamily="Arial, sans-serif" fontSize="14" fill="#D1D5DB" textAnchor="middle" fontWeight="bold">
                    {userName}
                </text>
                 <text x="100" y="150" fontFamily="Arial, sans-serif" fontSize="10" fill="#6B7280" textAnchor="middle">
                    AWARDED
                </text>
            </svg>
        </div>
    );
};

export default Badge;
