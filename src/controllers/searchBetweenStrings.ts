import InvalidArgumentsError from '../classes/InvalidArgumentsError';
import NoStringFoundError from '../classes/NoStringFoundError';
import { SearchOptions } from '../helpers/buildSearchConditions';
import giveBetweeen from '../helpers/giveBetween';
import readMail, { SearchOptionsForMails } from './readMail';

export interface SearchOptionsForStrings extends SearchOptionsForMails {
    START?: string;
    END?: string;
}

export default async function searchBetweenStrings(user: string, password: string, searchOptions: SearchOptionsForStrings): Promise<string> {
  const start = searchOptions.START;
  const end = searchOptions.END;
  if (!start || !end) throw new InvalidArgumentsError("START and END should be given");
  const fixedOptions: SearchOptions = { TEXT: searchOptions.START };
  delete searchOptions.START; delete searchOptions.END;
  const mails = await readMail(user, password, Object.assign(searchOptions, fixedOptions));
  for (const mail of mails) {
      const found = giveBetweeen(mail.html + mail.text, start, end);
      if (found) return found;
  }
  throw new NoStringFoundError(searchOptions.START + " - " + searchOptions.END);
}