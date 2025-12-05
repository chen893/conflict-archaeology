"use client";

import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils/cn";

interface HeaderProps {
  className?: string;
  showBack?: boolean;
  onPause?: () => void;
  rightSlot?: React.ReactNode;
}

export function Header({ className, showBack = false, onPause, rightSlot }: HeaderProps) {
  const router = useRouter();

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex items-center justify-between border-b border-gray-100 bg-white/80 px-4 py-3 backdrop-blur",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {showBack && (
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            返回
          </Button>
        )}
        <span className="text-base font-semibold text-gray-900">Conflict Archaeology</span>
      </div>
      <div className="flex items-center gap-2">
        {rightSlot}
        {onPause && (
          <Button variant="outline" size="sm" onClick={onPause}>
            暂停
          </Button>
        )}
      </div>
    </header>
  );
}
