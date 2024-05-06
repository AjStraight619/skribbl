import { getErrorMessage } from "@/lib/utils";
import { useMutation, useStorage } from "@/liveblocks.config";
import { LiveObject } from "@liveblocks/client";
import { useCallback, useState } from "react";
import { useDeleteLayers } from "./useDeleteLayers";

type UseRoundReturnType = [
  { currentRound: number; currentWord: string },
  () => Promise<void>
];

export function useRound() {
  const round = useStorage((root) => root.round);
  const deleteAllLayers = useDeleteLayers();
  const wordDifficulty = useStorage((root) => root.game.wordDifficuly);

  const newRound = useMutation(({ storage }, newWord: string) => {
    deleteAllLayers();
    const game = storage.get("game");
    const maxRound = game.get("maxRounds");
    const roundInfo = storage.get("round");
    if (roundInfo.get("currentRound") === maxRound) {
      game.set("isFinished", true);
    }
    roundInfo.set("currentRound", roundInfo.get("currentRound") + 1);
    roundInfo.set("currentWord", newWord.toUpperCase());
    roundInfo.set("timerActive", true);
    roundInfo.set(
      "revealedChars",
      new Array(roundInfo.get("currentWord")?.length).fill("")
    );
    roundInfo.set("timer", storage.get("round").get("timePerRound"));
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
