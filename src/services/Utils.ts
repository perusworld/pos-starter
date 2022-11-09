export const snooze = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms))
