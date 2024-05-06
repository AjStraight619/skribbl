import { getErrorMessage } from "@/lib/utils";
import { useMutation, useStorage } from "@/liveblocks.config";
import { LiveObject } from "@liveblocks/client";
import { useCallback, useState } from "react";
import { useDeleteLayers } from "./useDeleteLayers";

type UseRoundReturnType = [
  { currentRound: number; currentWord: string },
  () => Promise<void>
];

export function useRound(wordDifficulty?: string, time?: number) {
  const round = useStorage((root) => root.round);
  const deleteAllLayers = useDeleteLayers();

  const newRound = useMutation(({ storage }, newWord: string) => {
    const currentRound = storage.get("round");
    deleteAllLayers();
    console.log("newRound called");
    currentRound.set("currentRound", currentRound.get("currentRound") + 1);
    currentRound.set("currentWord", newWord.toUpperCase());
    currentRound.set("timer", time ?? 45);
    currentRound.set("timePerRound", time ?? 45);
    currentRound.set("timerActive", true);
    currentRound.set(
      "revealedChars",
      new Array(currentRound.get("currentWord")?.length).fill("")
    );
  }, []);

  const startNewRound = useCallback(async () => {
    const { newWord, error } = await fetchWord(wordDifficulty);
    if (error) {
      console.error("Error fetching word:", error);
      return;
    }
    newRound(newWord);
  }, [newRound, wordDifficulty]);

  return {
    round,
    startNewRound,
  };
}

const fetchWord = async (wordDifficulty?: string) => {
  let newWord;
  let error;
  try {
    const response = await fetch(`/api/word?mode=${wordDifficulty}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const { word } = await response.json();
    newWord = word;
  } catch (err) {
    error = getErrorMessage(err);
  }
  return {
    newWord,
    error,
  };
};
