"use client";

import { EMOTION_OPTIONS } from "~/lib/constants/emotions";
import type { EmotionCheckIn } from "~/lib/schemas";

import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface EmotionCheckInProps {
  value: EmotionCheckIn;
  onChange: (next: EmotionCheckIn) => void;
}

export function EmotionCheckIn({ value, onChange }: EmotionCheckInProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>此刻的感受</CardTitle>
        <CardDescription>先看见自己正在经历什么，才能更平稳地看向对方。</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {EMOTION_OPTIONS.map((emotion) => (
            <Button
              key={emotion}
              variant={value.emotion === emotion ? "default" : "outline"}
              size="sm"
              className="justify-center"
              onClick={() => onChange({ ...value, emotion, readyToProceed: false })}
            >
              {emotion}
            </Button>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>强度</span>
            <span className="text-gray-800">当前：{value.intensity}/5</span>
          </div>
          <input
            type="range"
            min={1}
            max={5}
            value={value.intensity}
            onChange={(e) =>
              onChange({
                ...value,
                intensity: Number(e.target.value),
                readyToProceed: false,
              })
            }
            className="w-full accent-blue-600"
          />
          <div className="text-xs text-gray-500">1 = 轻微，5 = 很强烈</div>
        </div>
      </CardContent>
    </Card>
  );
}
