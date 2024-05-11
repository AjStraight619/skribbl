import { useMutation, useSelf, useStorage } from "@/liveblocks.config";
import useInterval from "./useInterval";

export function useGameTimer() {
  const timerInfo = useStorage((root) => ({
    timer: root.round.timer,
    timerActive: root.round.timerActive,
  }));

  const leader = useStorage((root) =>
    root.players.find((p) => p.isLeader === true)
  );

  const myId = useSelf((me) => me.id);

  useInterval(() => {
    if (timerInfo.timerActive && leader?.id === myId) {
      decrementTimer();
    }
  }, 1000);

  const decrementTimer = useMutation(({ storage }) => {
    const round = storage.get("round");
    const currentTime = round.get("timer");
    const currentWord = round.get("currentWord");
    const revealedChars = round.get("revealedChars");
    const game = storage.get("game");

    if (currentTime === 0 || !game.get("isStarted")) {
      return;
    }

    round.set("timer", currentTime - 1);

    let initialDelay;
    if (currentWord.length <= 5) {
      initialDelay = round.get("timePerRound") * 0.75;
    } else {
      initialDelay = round.get("timePerRound") * 0.5;
    }

    if (currentTime > round.get("timePerRound") - initialDelay) {
      return; // Don't reveal any characters yet
    }

    const revealedCount = revealedChars.filter((char) => char !== "").length;
    let maxReveals;
    if (currentWord.length <= 5) {
      maxReveals = 1; // Max 1 reveal for short words
    } else if (currentWord.length <= 7) {
      maxReveals = 2; // Max 2 reveals for medium-short words
    } else {
      maxReveals = 3; // Max 3 reveals for longer words
    }

    if (revealedCount >= maxReveals) {
      return; // No more reveals allowed
    }

    let revealFrequency;
    if (currentWord.length <= 5) {
      revealFrequency = 10; // Less frequent for short words
    } else if (currentWord.length <= 8) {
      revealFrequency = 5; // More frequent for medium words
    } else {
      revealFrequency = 3; // Most frequent for long words
    }

    // Reveal a character if it's the right time
    if (currentTime % revealFrequency === 0) {
      const unrevealedIndices = revealedChars
        .map((char, index) => (char === "" ? index : -1))
        .filter((index) => index !== -1);
      if (unrevealedIndices.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * unrevealedIndices.length
        );
        revealCharacter(unrevealedIndices[randomIndex]);
      }
    }
  }, []);

  const revealCharacter = useMutation(({ storage }, index: number) => {
    const round = storage.get("round");
    const currentWord = round.get("currentWord");
    const revealedChars = round.get("revealedChars");

    if (revealedChars[index] === "") {
      revealedChars[index] = currentWord[index];
      round.set("revealedChars", revealedChars);
    }
  }, []);

  return {
    timer: timerInfo.timer,
    isTimerActive: timerInfo.timerActive,
    decrementTimer,
  };
}
