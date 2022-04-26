import UnsupportedProviderError from '../classes/UnsupportedProviderError';
import { SearchOptions } from '../helpers/buildSearchConditions';
import findMailProvider from '../helpers/findMailProvider';
import readers from '../helpers/readers';

export interface SearchOptionsForMails extends SearchOptions {
    LAST_MINUTES?: number;
}

export default async function readMail(user: string, password: string, searchOptions?: SearchOptionsForMails) {
  const provider = findMailProvider(user);
  const reader = readers[provider];
  if (!provider || !reader) throw new UnsupportedProviderError(user + ' has a provider we do not recognize');
  if (searchOptions && searchOptions.LAST_MINUTES) {
    const date = new Date();
    date.setTime(Date.now() - (searchOptions.LAST_MINUTES * 1000 * 60));
    delete searchOptions.LAST_MINUTES;
}
  return await reader(user, password, searchOptions);
}
