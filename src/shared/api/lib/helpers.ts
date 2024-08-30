export const buildParams = (
  url: string,
  obj: Record<string, string | number>
): string => {
  const queryParams = Object.entries(obj)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&');

  return queryParams ? `${url}?${queryParams}` : url;
};
