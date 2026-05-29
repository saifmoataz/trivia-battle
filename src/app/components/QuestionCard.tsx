import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { HelpCircle, Sparkles, Zap, Brain, Trophy, Eye, EyeOff } from "lucide-react";

interface QuestionCardProps {
  currentQuestion: string;
  currentAnswer?: string;
  difficulty?: "easy" | "medium" | "hard";
  topic?: string;
  onNewQuestion: () => void;
  darkMode: boolean;
  hasQuestions: boolean;
  isAnswerRevealed: boolean;
  onToggleAnswer: () => void;
}

export function QuestionCard({
  currentQuestion,
  currentAnswer,
  difficulty,
  topic,
  onNewQuestion,
  darkMode,
  hasQuestions,
  isAnswerRevealed,
  onToggleAnswer
}: QuestionCardProps) {
  const difficultyConfig = {
    easy: {
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10 dark:bg-green-500/20",
      borderColor: "border-green-500/30",
      icon: <Zap className="w-4 h-4" />,
    },
    medium: {
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-500/10 dark:bg-amber-500/20",
      borderColor: "border-amber-500/30",
      icon: <Brain className="w-4 h-4" />,
    },
    hard: {
      color: "from-red-500 to-rose-500",
      bgColor: "bg-red-500/10 dark:bg-red-500/20",
      borderColor: "border-red-500/30",
      icon: <Trophy className="w-4 h-4" />,
    },
  };

  const config = difficulty ? difficultyConfig[difficulty] : null;

  return (
    <Card className="rounded-[2rem] bg-gradient-to-br from-purple-50/80 via-indigo-50/50 to-purple-50/80 dark:from-purple-950/50 dark:via-indigo-950/30 dark:to-purple-950/50 border border-purple-200/50 dark:border-purple-800/50 shadow-2xl shadow-purple-500/20 dark:shadow-purple-400/10 p-8 lg:p-10 hover:shadow-3xl transition-shadow duration-200">
      <div className="flex flex-col items-center gap-8 h-full justify-between">
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="flex items-center gap-3">
            <div className="relative">
              <HelpCircle className="w-9 h-9 text-purple-600 dark:text-purple-400" />
              <Sparkles className="w-4 h-4 text-purple-400 dark:text-purple-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h2 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 tracking-tight">Current Question</h2>
          </div>

          {/* Difficulty and Topic Badges */}
          {config && topic && (
            <div className="flex gap-3 flex-wrap justify-center">
              <div className={`flex items-center gap-2 ${config.bgColor} ${config.borderColor} border rounded-full px-4 py-2`}>
                {config.icon}
                <span className={`bg-gradient-to-r ${config.color} bg-clip-text text-transparent font-semibold text-sm capitalize`}>
                  {difficulty}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-indigo-500/10 dark:bg-indigo-500/20 border-indigo-500/30 border rounded-full px-4 py-2">
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                  {topic}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="relative perspective-1000 w-full" style={{ minHeight: '220px' }}>
          <div
            className={`relative w-full transition-all duration-500 preserve-3d ${isAnswerRevealed ? 'rotate-y-180' : ''}`}
            style={{
              transformStyle: 'preserve-3d',
              transform: isAnswerRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
          >
            {/* Question Side */}
            <div
              className="absolute inset-0 backface-hidden bg-white/95 dark:bg-gray-900/95 rounded-3xl p-8 min-h-[220px] flex items-center justify-center w-full shadow-xl border border-purple-200/30 dark:border-purple-800/30"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-100/20 to-transparent dark:from-purple-500/5 dark:to-transparent"></div>
              <p className="relative text-2xl text-center text-gray-800 dark:text-gray-100 font-medium leading-relaxed">{currentQuestion}</p>
            </div>

            {/* Answer Side */}
            <div
              className="absolute inset-0 backface-hidden bg-gradient-to-br from-emerald-50/95 to-teal-50/95 dark:from-emerald-950/95 dark:to-teal-950/95 rounded-3xl p-8 min-h-[220px] flex flex-col items-center justify-center w-full shadow-xl border border-emerald-200/30 dark:border-emerald-800/30"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-100/20 to-transparent dark:from-emerald-500/5 dark:to-transparent"></div>
              <div className="relative flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 bg-emerald-500/20 dark:bg-emerald-500/30 border-emerald-500/40 border rounded-full px-4 py-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Answer</span>
                </div>
                <p className="text-3xl text-center text-emerald-800 dark:text-emerald-100 font-bold leading-relaxed">{currentAnswer}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 w-full justify-center">
          <Button
            onClick={onToggleAnswer}
            disabled={!hasQuestions}
            className={`rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 ${
              isAnswerRevealed
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:to-teal-500 dark:hover:from-emerald-600 dark:hover:to-teal-600 text-white shadow-emerald-500/30"
                : "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 dark:from-amber-500 dark:to-orange-500 dark:hover:from-amber-600 dark:hover:to-orange-600 text-white shadow-amber-500/30"
            }`}
          >
            {isAnswerRevealed ? (
              <>
                <EyeOff className="w-5 h-5 mr-2" />
                Hide Answer
              </>
            ) : (
              <>
                <Eye className="w-5 h-5 mr-2" />
                Reveal Answer
              </>
            )}
          </Button>

          <Button
            onClick={onNewQuestion}
            disabled={!hasQuestions}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 dark:from-purple-500 dark:to-indigo-500 dark:hover:from-purple-600 dark:hover:to-indigo-600 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Next Question
          </Button>
        </div>
      </div>
    </Card>
  );
}
