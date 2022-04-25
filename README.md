# node-mailreader

Easy-to-use npm package for reading and filtering mails.

Only supports mails ending with outlook.com right now.


```javascript

import { readMail, searchBetweenStrings } from "node-mailreader";
const mails = await readMail("username@outlook.com", "password", {FROM: "facebook"})
const code = await searchBetweenStrings("username@outlook.com", "password", {START: "your code:", END: ".", LAST_MINUTES: 15});

```
