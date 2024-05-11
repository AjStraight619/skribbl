import { getErrorMessage } from "@/lib/utils";
import { useMutation, useStorage } from "@/liveblocks.config";
import { LiveObject, shallow } from "@liveblocks/client";
import { useCallback, useEffect, useState } from "react";
import { useDeleteLayers } from "./useDeleteLayers";

type UseRoundOptions = {
  onRoundComplete?: ({ storage }: { storage: LiveObject<Storage> }) => void;
};

export function useRound(options?: UseRoundOptions) {
  const deleteAllLayers = useDeleteLayers();
  const wordDifficulty = useStorage((root) => root.game.wordDifficuly);
  const timer = useStorage((root) => root.round.timer);

  const hasAllHadTurn = useStorage((root) =>
    root.players.every((p) => p.hasHadTurn)
  );

  // const { onRoundComplete } = options;

  const newRound = useMutation(({ storage }, newWord: string) => {
    deleteAllLayers();
    const game = storage.get("game");
    const maxRound = game.get("maxRounds");
    storage
      .get("players")
      .toImmutable()
      .map((player) => player.hasHadTurn === false);
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
    startNewTurn();
  }, []);

  const endTurnAndStartNew = useMutation(({ storage }, newWord: string) => {
    const players = storage.get("players");

    console.log("new word: ", newWord);

    const currentTurnIndex = players.findIndex((p) => p.get("isDrawing"));
    players.get(currentTurnIndex)?.set("isDrawing", false);
    players.get(currentTurnIndex)?.set("hasHadTurn", true);

    const nextTurnIndex = (currentTurnIndex + 1) % players.length;
    players.get(nextTurnIndex)?.set("isDrawing", true);
    storage.get("game").set("isStarted", true);
    storage.get("round").set("timer", storage.get("round").get("timePerRound"));
    storage.get("round").set("timerActive", true);
    storage.get("round").set("currentWord", newWord.toUpperCase());
    storage
      .get("round")
      .set(
        "revealedChars",
        new Array(storage.get("round").get("revealedChars")?.length).fill("")
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

  const startNewTurn = useCallback(async () => {
    const { newWord, error } = await fetchWord(wordDifficulty);

    console.log("new word: ", newWord);
    if (error) {
      console.error("Error fetching word:", error);
      return;
    }
    endTurnAndStartNew(newWord);
  }, [wordDifficulty, endTurnAndStartNew]);

  useEffect(() => {
    if (timer === 0) {
      if (hasAllHadTurn) {
        startNewRound();
      } else {
        startNewTurn();
      }
    }
  }, [timer, startNewRound, startNewTurn, hasAllHadTurn]);

  return {
    startNewRound,
    startNewTurn,
  };
}

const fetchWord = async (wordDifficulty?: string) => {
  let count = 0;
  count++;
  console.log("This function was called: ", count);
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
