export function startGameSession(employeeId: string) {
  return {
    sessionId: `sess-${Date.now()}`,
    employeeId,
    startTime: new Date(),
    status: "started",
  };
}