export function getTokenFromLocalStorage(): string {
  const data = localStorage.getItem('authToken');
  return data !== undefined && data !== null ? JSON.parse(data) : '';
}

export function setTokenLocalStorage(key: string, token: string): void {
  localStorage.setItem(key, JSON.stringify(token));
}
export function removeTokenFromLocalStorage(key: string): void {
  localStorage.removeItem(key);
}
