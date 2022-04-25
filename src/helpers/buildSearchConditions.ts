export interface SearchOptions {
  FROM?: string;
  TO?: string;
  TEXT?: string;
  BEFORE?: string;
  SINCE?: string;
  SUBJECT?: string;
}

export default function (searchOptions: SearchOptions): string[][] {
  const built: string[][] = [];
  if (!searchOptions) return built;
  for (const [key, value] of Object.entries(searchOptions)) built.push([key, value]);
  return built;
}
