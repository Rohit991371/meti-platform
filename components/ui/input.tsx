import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-xl border border-meti-slate/25 bg-white px-3.5 py-2 text-sm text-meti-navy placeholder:text-meti-slate/60 transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-meti-mint focus-visible:border-meti-mint",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
