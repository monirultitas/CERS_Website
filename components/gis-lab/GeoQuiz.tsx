"use client";

import { useState } from "react";
import { quizQuestions } from "@/lib/gis-lab-content";

export default function GeoQuiz() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = quizQuestions[index];
  const isLast = index === quizQuestions.length - 1;

  function selectAnswer(optionIndex: number) {
    if (selected !== null) return;
    setSelected(optionIndex);
    if (optionIndex === question.correctIndex) setScore((s) => s + 1);
  }

  function next() {
    if (isLast) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="rounded-2xl border border-ink-100 bg-white p-8 text-center">
        <p className="font-display text-4xl font-bold text-brand-700">
          {score} / {quizQuestions.length}
        </p>
        <p className="mt-2 text-ink-600">
          {score === quizQuestions.length
            ? "Perfect score — you think in pixels and polygons."
            : score >= quizQuestions.length / 2
            ? "Solid grasp of the fundamentals."
            : "A good start — the concepts sink in fast with practice."}
        </p>
        <button
          onClick={restart}
          className="mt-6 rounded-full bg-brand-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
        >
          Play again
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-8">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-ink-400">
        <span>
          Question {index + 1} / {quizQuestions.length}
        </span>
        <span>Score: {score}</span>
      </div>

      <h3 className="font-display mt-4 text-lg font-semibold text-ink-900">
        {question.question}
      </h3>

      <div className="mt-5 space-y-2.5">
        {question.options.map((option, i) => {
          const isCorrect = i === question.correctIndex;
          const isChosen = i === selected;
          const revealed = selected !== null;

          let stateClasses = "border-ink-200 hover:border-brand-300";
          if (revealed && isCorrect) stateClasses = "border-moss-500 bg-moss-50";
          else if (revealed && isChosen && !isCorrect) stateClasses = "border-red-400 bg-red-50";

          return (
            <button
              key={option}
              onClick={() => selectAnswer(i)}
              disabled={revealed}
              className={`block w-full rounded-lg border px-4 py-3 text-left text-sm text-ink-800 transition-colors disabled:cursor-default ${stateClasses}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="mt-5 rounded-lg bg-ink-50/80 p-4 text-sm leading-relaxed text-ink-600">
          {question.explanation}
        </div>
      )}

      <button
        onClick={next}
        disabled={selected === null}
        className="mt-6 rounded-full bg-brand-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isLast ? "See results" : "Next question"}
      </button>
    </div>
  );
}
