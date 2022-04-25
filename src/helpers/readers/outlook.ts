import { connect } from 'imap-simple';
import _ from 'lodash';
import { simpleParser } from 'mailparser';
import buildSearchConditions, { SearchOptions } from '../buildSearchConditions';


export default async function (user: string, password: string, searchOptions: SearchOptions) {
    let connection;
    try {
        connection = await connect({
            imap: {
              host: 'outlook.office365.com',
              port: 993,
              user,
              password,
              tls: true,
              authTimeout: 6000,
            },
          });
          await connection.openBox('Inbox');
          const mails = await connection.search(buildSearchConditions(searchOptions), { bodies: ['TEXT', 'HEADER', ''] });
          const formattedMails = [];
          for (const mail of mails) {
                if (searchOptions.SINCE && new Date(searchOptions.SINCE) > mail.attributes.date) continue;
                const all = _.find(mail.parts, {which: ""});
                const id = mail.attributes.uid;
                const idHeader = `Imap-Id: ${id}\r\n`;
                formattedMails.push(await simpleParser(idHeader + all?.body));
          }
          return formattedMails;
    } catch (error) {
        throw error;
    } finally {
        try {
            connection && connection.closeBox(true);
        } catch (_) { };
        try {
            connection && connection.end();
        } catch (_) { };
    }
}
