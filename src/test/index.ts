console.log = () => { };
console.info = () => { };
console.error = () => { };

import assert from 'assert';
import UnsupportedProviderError from '../classes/UnsupportedProviderError';
import readMail from '../controllers/readMail';
import findMailProvider from '../helpers/findMailProvider';
import { socks5 } from "@sansamour/node-socks";
import { Server } from 'net';
let exitCode = 0;

afterEach(function (done) {
  if (this.currentTest?.state === 'failed') exitCode = 1;
  done();
});

after(function (done) {
  done();
  process.exit(exitCode);
})

process.on('beforeExit', function () {
  process.exit(exitCode);
});

describe('Find provider of given mail for supported provider, if not return empty string', function () {
  it('rising_imap@outlook.com, should return outlook', async function () {
    const provider = findMailProvider('rising_imap@outlook.com');
    assert.equal(provider, 'outlook', 'Outlook is supported, so it should return outlook');
  });

  it('rising_imap@somefunckingshit.com, should return empty string', async function () {
    const provider = findMailProvider('rising_imap@somefunckingshit.com');
    assert.equal(provider, '', 'Unsupported provider was given, so empty string should be returned');
  });
});

describe('Read mail test for outlook', function () {
  this.timeout(10000);

  it('rising_imap@outlook.com with text filter', async function () {
    const mails = await readMail('rising_imap@outlook.com', '123456risingimap', { TEXT: 'Merhaba' });
    assert.equal(typeof mails.length, 'number');
  });

  it('rising_imap@outlook.com with proxy', async function () {
    const socksServer: Server = socks5.createServer();
    const address: any = socksServer.address();
    const mails = await readMail('rising_imap@outlook.com', '123456risingimap', { TEXT: 'Merhaba' }, { socksProxy: { host: address.address, port: address.port } });
    assert.equal(typeof mails.length, 'number');
    socksServer.close();
  });

  it('rising_imap@somefunckingshit.com, should throw UnsupportedProviderError', async function () {
    try {
      await readMail('rising_imap@somefunckingshit.com', '123456risingimap', { BEFORE: new Date().toDateString() });
      assert.fail('Should have thrown UnsupportedProviderError');
    } catch (error) {
      assert.equal(error instanceof UnsupportedProviderError, true);
    }
  });

});