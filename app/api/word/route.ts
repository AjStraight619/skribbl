import { wordData } from "@/lib/words";
import { WordDifficulty } from "@/types/type";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  let mode = (req.nextUrl.searchParams.get("mode") as WordDifficulty) || "easy";

  const validModes: WordDifficulty[] = ["easy", "medium", "hard"];
  if (!validModes.includes(mode)) {
    mode = "easy";
  }

  const words = wordData[mode];
  const randomIndex = Math.floor(Math.random() * words.length);
  const randomWord = words[randomIndex];

  return NextResponse.json({ word: randomWord });
}
