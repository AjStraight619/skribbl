"use client";
import { useRound } from "@/hooks/useRound";
import { getErrorMessage } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { useMutation, useStorage } from "@/liveblocks.config";
import useInterval from "@/hooks/useInterval";

export default function WordDisplay() {
  const { round, startNewRound } = useRound();

  const { timer, timerActive } = round;
  const renderRef = useRef(0);
  const revealedChars = useStorage((root) => root.round.revealedChars);

  useEffect(() => {
    console.log("This component re rendered: ", renderRef.current++);
  }, []);

  const clearGameStorage = useMutation(({ storage }) => {
    const game = storage.get("game");
    game.set("isFinished", false);
    game.set("isStarted", false);
    game.set("maxRounds", 8);
    const round = storage.get("round");
    round.set("currentRound", 0);
  }, []);

  useInterval(() => {
    if (timerActive) {
      decrementTimer();
    }
  }, 1000);

  const decrementTimer = useMutation(({ storage }) => {
    const round = storage.get("round");
    const currentTime = round.get("timer");
    const currentWord = round.get("currentWord");
    const wordLength = currentWord.length;

    if (currentTime === 0) return;

    let revealFrequency;
    if (wordLength <= 5) {
      revealFrequency = 10; // Less frequent for short words
    } else if (wordLength <= 8) {
      revealFrequency = 5; // More frequent for medium words
    } else {
      revealFrequency = 3; // Most frequent for long words
    }

    // Reveal a character based on calculated frequency and ensure it's not at the start
    if (
      currentTime % revealFrequency === 0 &&
      currentTime !== round.get("timePerRound")
    ) {
      const unrevealedIndices = round
        .get("revealedChars")
        .map((char, index) => (char === "" ? index : -1))
        .filter((index) => index !== -1);
      if (unrevealedIndices.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * unrevealedIndices.length
        );
        revealCharacter(unrevealedIndices[randomIndex]);
      }
    }

    round.set("timer", currentTime - 1);
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
          <span className="ml-2">{timer}</span>
        </div>
      </div>
    </div>
  );
}
