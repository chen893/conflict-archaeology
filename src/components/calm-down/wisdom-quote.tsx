"use client";

import { useMemo } from "react";

import { BOOK_QUOTES } from "~/lib/constants/book-quotes";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

function pickQuote() {
  return BOOK_QUOTES[Math.floor(Math.random() * BOOK_QUOTES.length)];
}

export function WisdomQuote({ onRefresh }: { onRefresh?: () => void }) {
  const quote = useMemo(() => pickQuote(), []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>书中的提醒</CardTitle>
        {onRefresh && (
          <Button variant="ghost" size="sm" onClick={onRefresh}>
            换一句
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-gray-700">“{quote}”</p>
      </CardContent>
    </Card>
  );
}
