import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

export function Button({ className, children, ...props }: ButtonProps) {
    return (
        <button
            className={cn(
                "px-4 py-2 rounded-md font-medium transition-all disabled:opacity-50",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
