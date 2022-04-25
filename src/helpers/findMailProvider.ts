export const knownProviders: Record<string, string> = {
  '@outlook.com': 'outlook',
};

export default function (mail: string): string {
  for (const provider of Object.keys(knownProviders)) if (mail.endsWith(provider)) return knownProviders[provider];
  return '';
}
