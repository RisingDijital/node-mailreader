import readMail_ from './controllers/readMail';
import searchBetweenStrings_ from './controllers/searchBetweenStrings';

export const readMail = readMail_;
export const searchBetweenStrings = searchBetweenStrings_;
export const nodeMailReader = { readMail, searchBetweenStrings };