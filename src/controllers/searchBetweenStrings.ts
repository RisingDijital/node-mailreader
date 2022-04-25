import InvalidArgumentsError from '../classes/InvalidArgumentsError';
import NoStringFoundError from '../classes/NoStringFoundError';
import { SearchOptions } from '../helpers/buildSearchConditions';
import giveBetweeen from '../helpers/giveBetween';
import readMail from './readMail';

export interface SearchOptionsForStrings extends SearchOptions {
    START?: string;
    END?: string;
    LAST_MINUTES?: number;
}

export default async function searchBetweenStrings(user: string, password: string, searchOptions: SearchOptionsForStrings): Promise<string> {
  const start = searchOptions.START;
  const end = searchOptions.END;
  if (!start || !end) throw new InvalidArgumentsError("START and END should be given");
  const fixedOptions: SearchOptions = { TEXT: searchOptions.START };
  if (searchOptions.LAST_MINUTES) {
      const date = new Date();
      date.setTime(Date.now() - (searchOptions.LAST_MINUTES * 1000 * 60));
      fixedOptions.SINCE = date.toISOString();
  }
  delete searchOptions.START; delete searchOptions.END; delete searchOptions.LAST_MINUTES;
  const mails = await readMail(user, password, Object.assign(searchOptions, fixedOptions));
  for (const mail of mails) {
      const found = giveBetweeen(mail.html + mail.text, start, end);
      if (found) return found;
  }
  throw new NoStringFoundError(searchOptions.START + " - " + searchOptions.END);
}