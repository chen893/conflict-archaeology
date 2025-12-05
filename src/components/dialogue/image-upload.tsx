"use client";

import { useRef } from "react";

import { Button } from "~/components/ui/button";
import type { DialogueImage } from "~/lib/schemas";

interface ImageUploadProps {
  images: DialogueImage[];
  onChange: (images: DialogueImage[]) => void;
}

function fileToBase64(file: File): Promise<DialogueImage> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1] ?? "";
      resolve({
        base64,
        mimeType: file.type as DialogueImage["mimeType"],
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function ImageUpload({ images, onChange }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    const tasks = Array.from(files).map((file) => fileToBase64(file));
    const results = await Promise.all(tasks);
    onChange([...images, ...results]);
  };

  const handleRemove = (index: number) => {
    const next = images.filter((_, i) => i !== index);
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-800">上传截图（可选）</div>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <Button variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
          选择图片
        </Button>
      </div>
      {images.length === 0 ? (
        <p className="text-xs text-gray-500">支持 png / jpg / webp，最多几张关键截图。</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {images.map((img, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-700"
            >
              <span>截图 {index + 1}</span>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleRemove(index)}
                type="button"
              >
                删除
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
