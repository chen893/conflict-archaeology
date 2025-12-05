"use client";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

interface ReadinessConfirmProps {
  disabled?: boolean;
  onConfirm: () => void;
}

export function ReadinessConfirm({ disabled, onConfirm }: ReadinessConfirmProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>准备好了吗？</CardTitle>
        <CardDescription>当你觉得可以带着好奇心回顾这段对话时，再进入下一步。</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-3">
        <div className="text-sm text-gray-600">
          你可以随时暂停，等情绪更稳定后再继续。
        </div>
        <Button size="md" onClick={onConfirm} disabled={disabled}>
          我准备好了
        </Button>
      </CardContent>
    </Card>
  );
}
