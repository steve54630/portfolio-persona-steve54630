import React from "react";
import "../styles/animations.css";

interface AnimatedPhraseProps {
  phrase: string;
}

const AnimatedPhrase: React.FC<AnimatedPhraseProps> = ({ phrase }) => {
  return (
    <h1
      className="
        absolute bottom-60 -left-10 leading-[2.75rem] 
        -translate-x-1/2 w-[25px] text-center whitespace-normal 
        text-blue-300 text-shadow-2xs text-shadow-black 
        text-[45px] font-drunkenhour -rotate-2"
    >
      {phrase.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className="inline whitespace-nowrap">
          {word.split("").map((letter, letterIndex) => (
            <span
              key={letterIndex}
              className="inline-block py-2 animate-wave"
              style={{ animationDelay: `${letterIndex * 0.05}s` }}
            >
              {letter}
            </span>
          ))}
          &nbsp;
        </span>
      ))}
    </h1>
  );
};

export default AnimatedPhrase;
