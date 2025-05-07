export function generateFeedback(score: number): string {
  if (score > 70) return "High fatigue detected. Take a break.";
  if (score > 40) return "Moderate fatigue. Short break recommended.";
  return "Fatigue low. You're doing great!";
}