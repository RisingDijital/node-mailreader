# node-mailreader

Easy-to-use npm package for reading and filtering mails.

Only supports mails ending with outlook.com right now.

```
  npm install node-mailreader
```


```javascript

import { readMail, searchBetweenStrings } from "node-mailreader";

// You can list mails with one line of code
var mails = await readMail("username@outlook.com", "password", {FROM: "facebook"});

// You can also use a socksProxy
var mails = await readMail(
  "username@outlook.com",
  "password",
  { FROM: "george" }, 
  { socksProxy: { host: "127.0.0.1", port: 5002, type: 5 }});

// readMail(username, password, searchOptions, connectionOptions)

```