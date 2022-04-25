import assert from 'assert';
import UnsupportedProviderError from '../classes/UnsupportedProviderError';
import readMail from '../controllers/readMail';
import findMailProvider from '../helpers/findMailProvider';
import fs from "fs";
import searchBetweenStrings from '../controllers/searchBetweenStrings';
let exitCode = 0;

afterEach(function (done) {
  if (this.currentTest?.state === 'failed') exitCode = 1;
  done();
});

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
    const mails = await readMail('rising_imap@outlook.com', '123risingimap', { TEXT: 'Merhaba' });
    fs.writeFileSync("x", JSON.stringify(mails));
    assert.equal(typeof mails.length, 'number');
  });

  it('rising_imap@somefunckingshit.com, should throw UnsupportedProviderError', async function () {
    try {
      await readMail('rising_imap@somefunckingshit.com', '123risingimap', { BEFORE: new Date().toDateString() });
      assert.fail('Should have thrown UnsupportedProviderError');
    } catch (error) {
      assert.equal(error instanceof UnsupportedProviderError, true);
    }
  });

  it('rising_imap@outlook.com with text search', async function () {
      const found = await searchBetweenStrings("rising_imap@outlook.com", "123risingimap", { START: "Yeni Outlook.com", END: "hoş geldiniz."})
      assert.equal(found, " hesabınıza ");
  });

  it('rising_imap@outlook.com with text search - 2', async function () {
    const found = await searchBetweenStrings("rising_imap@outlook.com", "123risingimap", { START: "tek bir hizmette bir ara", END: " getiren Outlook,"})
    assert.equal(found, "ya");
  });
});
