import UnsupportedProviderError from '../classes/UnsupportedProviderError';
import { SearchOptions } from '../helpers/buildSearchConditions';
import findMailProvider from '../helpers/findMailProvider';
import readers from '../helpers/readers';

export default async function readMail(user: string, password: string, searchOptions?: SearchOptions) {
  const provider = findMailProvider(user);
  const reader = readers[provider];
  if (!provider || !reader) throw new UnsupportedProviderError(user + ' has a provider we do not recognize');
  return await reader(user, password, searchOptions);
}
