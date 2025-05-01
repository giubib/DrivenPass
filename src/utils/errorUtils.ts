export function throwError(type: string, message: string): void {
  throw { type, message };
}
