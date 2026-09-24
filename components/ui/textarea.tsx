import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        "flex min-h-[100px] w-full rounded-xl border border-meti-slate/25 bg-white px-3.5 py-3 text-sm text-meti-navy placeholder:text-meti-slate/60 transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-meti-mint focus-visible:border-meti-mint",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export { Textarea };
