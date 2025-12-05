"use client";

import * as React from "react";
import { createPortal } from "react-dom";

import { cn } from "~/lib/utils/cn";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Dialog({ open, onClose, children }: DialogProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center px-4",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <div
        className={cn(
          "fixed inset-0 bg-black/40 transition-opacity",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl transition-all",
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
        )}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

export function DialogHeader({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-1", className)}>{children}</div>;
}

export function DialogTitle({ children, className }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-lg font-semibold text-gray-900", className)}>{children}</h3>;
}

export function DialogDescription({
  children,
  className,
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-gray-600", className)}>{children}</p>;
}

export function DialogFooter({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end", className)}>{children}</div>;
}
