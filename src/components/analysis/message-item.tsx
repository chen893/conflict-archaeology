"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { useIsMobile } from "~/hooks/use-is-mobile";
import type { MessageInsight } from "~/lib/schemas";
import { cn } from "~/lib/utils/cn";

interface MessageItemProps {
  insight: MessageInsight;
}

export function MessageItem({ insight }: MessageItemProps) {
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(false);

  const isMe = insight.speaker === "我";

  const DetailPanel = () => (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-2 space-y-2 rounded-lg bg-white/70 p-3 text-xs text-gray-700"
    >
      <div>
        <div className="font-medium text-gray-800">我的视角</div>
        <p>情绪：{insight.myPerspective.emotion}</p>
        <p>可能在担心：{insight.myPerspective.fear}</p>
        <p>未满足的需求：{insight.myPerspective.need}</p>
      </div>
      <div>
        <div className="font-medium text-gray-800">TA 的视角</div>
        <p>情绪：{insight.theirPerspective.emotion}</p>
        <p>可能在担心：{insight.theirPerspective.fear}</p>
        <p>未满足的需求：{insight.theirPerspective.need}</p>
      </div>
    </motion.div>
  );

  if (isMobile) {
    return (
      <div
        className={cn(
          "cursor-pointer rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors",
          isMe ? "ml-6 bg-blue-50" : "mr-6",
          insight.isKeyMoment && "border-amber-300 ring-1 ring-amber-200",
        )}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>{insight.speaker}</span>
          {insight.isKeyMoment && <span className="text-amber-600">关键时刻</span>}
        </div>
        <p className="mt-1 text-sm text-gray-900">{insight.originalText}</p>
        <AnimatePresence>{expanded && <DetailPanel />}</AnimatePresence>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group rounded-lg border border-gray-200 bg-gray-50 p-4 transition",
        isMe ? "ml-12 bg-blue-50" : "mr-12",
        insight.isKeyMoment && "border-amber-300 ring-1 ring-amber-200",
      )}
    >
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span>{insight.speaker}</span>
        {insight.isKeyMoment && <span className="text-amber-600">关键时刻</span>}
      </div>
      <p className="mt-1 text-sm text-gray-900">{insight.originalText}</p>
      <div className="hidden group-hover:block">
        <DetailPanel />
      </div>
    </div>
  );
}
