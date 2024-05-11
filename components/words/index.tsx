"use client";
import { useRound } from "@/hooks/useRound";
import { Button } from "../ui/button";
import { useMutation, useSelf, useStorage } from "@/liveblocks.config";
import useInterval from "@/hooks/useInterval";
import { useEffect, useRef } from "react";
import { useGameTimer } from "@/hooks/useGameTimer";

export default function WordDisplay() {
  const { startNewTurn, startNewRound } = useRound();

  // const timerInfo = useStorage((root) => ({
  //   timer: root.round.timer,
  //   timerActive: root.round.timerActive,
  // }));

  // const renderCount = useRef(0);

  // useEffect(() => {
  //   renderCount.current = renderCount.current + 1;
  //   console.log("Render count: ", renderCount.current);
  // });

  const { timer, isTimerActive, decrementTimer } = useGameTimer();

  const revealedChars = useStorage((root) => root.round.revealedChars);
  const isStarted = useStorage((root) => root.game.isStarted);
  const leader = useStorage((storage) =>
    storage.players.find((player) => player.isLeader === true)
  );
  const myId = useSelf((me) => me.id);

  const clearGameStorage = useMutation(({ storage }) => {
    const game = storage.get("game");
    storage.get("players").forEach((p) => p.set("isDrawing", false));
    game.set("isFinished", false);
    game.set("isStarted", false);
    game.set("maxRounds", 8);
    const round = storage.get("round");
    round.set("currentRound", 0);
  }, []);

  // useInterval(() => {
  //   if (timerInfo.timerActive && myId === leader?.id) {
  //     decrementTimer();
  //   }
  // }, 1000);

  // const decrementTimer = useMutation(({ storage }) => {
  //   const round = storage.get("round");
  //   const currentTime = round.get("timer");
  //   const currentWord = round.get("currentWord");
  //   const revealedChars = round.get("revealedChars");
  //   const game = storage.get("game");

  //   if (currentTime === 0 || !game.get("isStarted")) {
  //     return;
  //   }

  //   round.set("timer", currentTime - 1);

  //   let initialDelay;
  //   if (currentWord.length <= 5) {
  //     initialDelay = round.get("timePerRound") * 0.75;
  //   } else {
  //     initialDelay = round.get("timePerRound") * 0.5;
  //   }

  //   if (currentTime > round.get("timePerRound") - initialDelay) {
  //     return; // Don't reveal any characters yet
  //   }

  //   const revealedCount = revealedChars.filter((char) => char !== "").length;
  //   let maxReveals;
  //   if (currentWord.length <= 5) {
  //     maxReveals = 1; // Max 1 reveal for short words
  //   } else if (currentWord.length <= 7) {
  //     maxReveals = 2; // Max 2 reveals for medium-short words
  //   } else {
  //     maxReveals = 3; // Max 3 reveals for longer words
  //   }

  //   if (revealedCount >= maxReveals) {
  //     return; // No more reveals allowed
  //   }

  //   let revealFrequency;
  //   if (currentWord.length <= 5) {
  //     revealFrequency = 10; // Less frequent for short words
  //   } else if (currentWord.length <= 8) {
  //     revealFrequency = 5; // More frequent for medium words
  //   } else {
  //     revealFrequency = 3; // Most frequent for long words
  //   }

  //   // Reveal a character if it's the right time
  //   if (currentTime % revealFrequency === 0) {
  //     const unrevealedIndices = revealedChars
  //       .map((char, index) => (char === "" ? index : -1))
  //       .filter((index) => index !== -1);
  //     if (unrevealedIndices.length > 0) {
  //       const randomIndex = Math.floor(
  //         Math.random() * unrevealedIndices.length
  //       );
  //       revealCharacter(unrevealedIndices[randomIndex]);
  //     }
  //   }
  // }, []);

  // const revealCharacter = useMutation(({ storage }, index: number) => {
  //   const round = storage.get("round");
  //   const currentWord = round.get("currentWord");
  //   const revealedChars = round.get("revealedChars");

  //   if (revealedChars[index] === "") {
  //     revealedChars[index] = currentWord[index];
  //     round.set("revealedChars", revealedChars);
  //   }
  // }, []);

  const updateScore = useMutation(({ storage, self }) => {
    const player = storage.get("players").find((p) => p.get("id") === self.id);
    player?.set("score", player.get("score") + 20);
  }, []);

  if (!isStarted) return;

  return (
    <div className="absolute top-4 -translate-x-1/2 left-1/2 p-4 bg-white shadow-lg rounded-lg h-16 select-none">
      <div className="flex items-center justify-center h-full">
        {revealedChars?.map((char, idx) => (
          <div
            className="flex flex-col items-center justify-end gap-y-1 leading-[0.5rem] h-full"
            key={idx}
          >
            <span className="ml-2 font-poppins">{char}</span>
            <span className="ml-2">___</span>
          </div>
        ))}
        <div className="ml-4 flex items-center">
          <Button onClick={() => startNewRound()}>New Round</Button>
          <Button onClick={() => clearGameStorage()}>Reset game</Button>
          <Button onClick={() => updateScore()}>Update Score</Button>

          <span className="ml-2">{timer}</span>
        </div>
      </div>
    </div>
  );
}
