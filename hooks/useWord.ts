import { getErrorMessage } from "@/lib/utils";
import { useMutation } from "@/liveblocks.config";
import { LiveObject } from "@liveblocks/client";
import { useEffect, useState } from "react";

export function useWord() {
  const [word, setWord] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (word) return;
    const getWord = async () => {
      try {
        const response = await fetch("/api/word?mode=easy");
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const { word } = await response.json();
        setWord(word);
        setError("");
      } catch (err) {
        setError(getErrorMessage(err));
        setWord("");
      }
    };
    getWord();
  }, [word]);

  const getWord = useMutation(({ storage }) => {
    const currentWord = storage.get("round");
  }, []);
}

const fetchWord = async () => {
  let newWord;
  let error;
  try {
    const response = await fetch("/api/word?mode=easy");
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
