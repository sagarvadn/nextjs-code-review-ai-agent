import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
}

export function Card({ children, className }: CardProps) {
    return (
        <div className={cn("bg-gray-800 p-4 rounded-lg shadow-md", className)}>
            {children}
        </div>
    );
}

export function CardContent({ children, className }: CardProps) {
    return <div className={cn("p-4", className)}>{children}</div>;
}
