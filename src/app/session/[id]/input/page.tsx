"use client";

import { use, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { ContextInput } from "~/components/dialogue/context-input";
import { MessageInput } from "~/components/dialogue/message-input";
import { MessageList } from "~/components/dialogue/message-list";
import { ImageUpload } from "~/components/dialogue/image-upload";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import type { DialogueInput, DialogueMessage } from "~/lib/schemas";
import { useSession } from "~/contexts/session-context";

const emptyInput: DialogueInput = { messages: [], context: "" };

export default function DialogueInputPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { session, updateSession } = useSession();
  const [dialogue, setDialogue] = useState<DialogueInput>(emptyInput);

  useEffect(() => {
    if (session?.dialogueInput) {
      setDialogue({
        messages: session.dialogueInput.messages ?? [],
        context: session.dialogueInput.context ?? "",
        images: session.dialogueInput.images,
      });
    }
  }, [session?.dialogueInput]);

  const handleAddMessage = (message: DialogueMessage) => {
    setDialogue((prev) => ({ ...prev, messages: [...prev.messages, message] }));
  };

  const handleEditMessage = (index: number, message: DialogueMessage) => {
    setDialogue((prev) => {
      const next = [...prev.messages];
      next[index] = message;
      return { ...prev, messages: next };
    });
  };

  const handleDeleteMessage = (index: number) => {
    setDialogue((prev) => {
      const next = prev.messages.filter((_, i) => i !== index);
      return { ...prev, messages: next };
    });
  };

  const handleProceed = async () => {
    await updateSession({
      dialogueInput: dialogue,
      stage: "analyzing",
    });
    router.push(`/session/${id}/review`);
  };

  const disableProceed = useMemo(() => dialogue.messages.length === 0, [dialogue.messages.length]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">输入对话</h1>
        <p className="text-sm text-gray-600">
          尽量选择能代表情绪转折的几句对话，越具体越有帮助。
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>消息列表</CardTitle>
          <CardDescription>添加你和 TA 说过的关键句子，保持原话。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <MessageInput onAdd={handleAddMessage} />
          <MessageList
            messages={dialogue.messages}
            onEdit={handleEditMessage}
            onDelete={handleDeleteMessage}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>补充背景</CardTitle>
          <CardDescription>可选：描述情境、时间、双方状态等，有助于更好解读。</CardDescription>
        </CardHeader>
        <CardContent>
          <ContextInput
            value={dialogue.context ?? ""}
            onChange={(value) => setDialogue((prev) => ({ ...prev, context: value }))}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>截图上传</CardTitle>
          <CardDescription>可选：上传聊天截图，AI 会多模态识别内容。</CardDescription>
        </CardHeader>
        <CardContent>
          <ImageUpload
            images={dialogue.images ?? []}
            onChange={(imgs) => setDialogue((prev) => ({ ...prev, images: imgs }))}
          />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button size="lg" onClick={handleProceed} disabled={disableProceed}>
          保存并开始分析
        </Button>
      </div>
    </div>
  );
}
