import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Plus, Minus } from "lucide-react";

interface TeamCardProps {
  teamName: string;
  score: number;
  color: string;
  onAddPoint: () => void;
  onSubtractPoint: () => void;
  darkMode: boolean;
}

export function TeamCard({
  teamName,
  score,
  color,
  onAddPoint,
  onSubtractPoint,
  darkMode,
}: TeamCardProps) {
  // Map color names to tailwind classes
  const colorMap: Record<string, { bg: string; text: string; border: string; glow: string; button: string }> = {
    blue: {
      bg: "from-blue-50/80 via-blue-100/50 to-blue-50/80 dark:from-blue-950/50 dark:via-blue-900/30 dark:to-blue-950/50",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-200/50 dark:border-blue-800/50",
      glow: "shadow-blue-500/20 dark:shadow-blue-400/10",
      button: "bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30",
    },
    red: {
      bg: "from-red-50/80 via-red-100/50 to-red-50/80 dark:from-red-950/50 dark:via-red-900/30 dark:to-red-950/50",
      text: "text-red-600 dark:text-red-400",
      border: "border-red-200/50 dark:border-red-800/50",
      glow: "shadow-red-500/20 dark:shadow-red-400/10",
      button: "bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/30",
    },
    purple: {
      bg: "from-purple-50/80 via-purple-100/50 to-purple-50/80 dark:from-purple-950/50 dark:via-purple-900/30 dark:to-purple-950/50",
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200/50 dark:border-purple-800/50",
      glow: "shadow-purple-500/20 dark:shadow-purple-400/10",
      button: "bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg shadow-purple-500/30",
    },
    green: {
      bg: "from-green-50/80 via-green-100/50 to-green-50/80 dark:from-green-950/50 dark:via-green-900/30 dark:to-green-950/50",
      text: "text-green-600 dark:text-green-400",
      border: "border-green-200/50 dark:border-green-800/50",
      glow: "shadow-green-500/20 dark:shadow-green-400/10",
      button: "bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/30",
    },
    yellow: {
      bg: "from-yellow-50/80 via-yellow-100/50 to-yellow-50/80 dark:from-yellow-950/50 dark:via-yellow-900/30 dark:to-yellow-950/50",
      text: "text-yellow-600 dark:text-yellow-400",
      border: "border-yellow-200/50 dark:border-yellow-800/50",
      glow: "shadow-yellow-500/20 dark:shadow-yellow-400/10",
      button: "bg-gradient-to-br from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 shadow-lg shadow-yellow-500/30",
    },
    pink: {
      bg: "from-pink-50/80 via-pink-100/50 to-pink-50/80 dark:from-pink-950/50 dark:via-pink-900/30 dark:to-pink-950/50",
      text: "text-pink-600 dark:text-pink-400",
      border: "border-pink-200/50 dark:border-pink-800/50",
      glow: "shadow-pink-500/20 dark:shadow-pink-400/10",
      button: "bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 shadow-lg shadow-pink-500/30",
    },
    orange: {
      bg: "from-orange-50/80 via-orange-100/50 to-orange-50/80 dark:from-orange-950/50 dark:via-orange-900/30 dark:to-orange-950/50",
      text: "text-orange-600 dark:text-orange-400",
      border: "border-orange-200/50 dark:border-orange-800/50",
      glow: "shadow-orange-500/20 dark:shadow-orange-400/10",
      button: "bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/30",
    },
    cyan: {
      bg: "from-cyan-50/80 via-cyan-100/50 to-cyan-50/80 dark:from-cyan-950/50 dark:via-cyan-900/30 dark:to-cyan-950/50",
      text: "text-cyan-600 dark:text-cyan-400",
      border: "border-cyan-200/50 dark:border-cyan-800/50",
      glow: "shadow-cyan-500/20 dark:shadow-cyan-400/10",
      button: "bg-gradient-to-br from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 shadow-lg shadow-cyan-500/30",
    },
  };

  const colorClass = colorMap[color] || colorMap.blue;

  return (
    <Card className={`rounded-[2rem] bg-gradient-to-br ${colorClass.bg} border ${colorClass.border} shadow-2xl ${colorClass.glow} p-8 lg:p-10 hover:shadow-3xl transition-shadow duration-200 h-full flex flex-col justify-between`}>
      <div className="flex flex-col items-center gap-8 flex-grow justify-between">
        <h2 className={`${colorClass.text} font-semibold text-3xl tracking-tight`}>{teamName}</h2>

        <div className={`relative flex items-center justify-center w-44 h-44 rounded-full bg-white/95 dark:bg-gray-900/95 shadow-2xl ${colorClass.glow} border-4 ${colorClass.border}`}>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent"></div>
          <span className={`relative text-8xl font-bold ${colorClass.text} tabular-nums`}>{score}</span>
        </div>

        <div className="flex gap-5">
          <Button
            onClick={onSubtractPoint}
            className={`${colorClass.button} text-white rounded-full w-16 h-16 p-0 hover:scale-105 active:scale-95 transition-transform duration-150 disabled:opacity-30 disabled:scale-100 disabled:cursor-not-allowed`}
            disabled={score === 0}
          >
            <Minus className="w-6 h-6" />
          </Button>
          <Button
            onClick={onAddPoint}
            className={`${colorClass.button} text-white rounded-full w-16 h-16 p-0 hover:scale-105 active:scale-95 transition-transform duration-150`}
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
