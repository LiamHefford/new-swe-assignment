export function runDecisionMakingTest(): { score: number; completed: boolean; timeTaken: string } {
  const score = Math.floor(Math.random() * 100);
  return {
    score,
    completed: true,
    timeTaken: "90 seconds",
  };
}