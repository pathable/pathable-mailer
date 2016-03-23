import { send } from './methods.js';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';
import { Mailer } from 'meteor/lookback:emails';

import '/imports/server/startup';

describe('methods', () => {
  describe('send', () => {
    describe('sending valid email', () => {
      const mailProps = {
        subject: 'Email subject',
        to: 'email@example.com',
        template: 'welcome.html',
      };

      beforeEach(() => {
        sinon.spy(Mailer, 'send');
      });

      afterEach(() => {
        Mailer.send.restore();
      });

      it('`userId` is not required if `to` is present', () => {
        expect(() => {
          send.call({
            subject: 'a subject',
            template: 'welcome.html',
            to: 'email@example.com',
          });
        }).to.not.throw('an error');
      });

      it('`to` is not required if `userId` is present', () => {
        expect(() => {
          send.call({
            subject: 'a subject',
            template: 'welcome.html',
            userId: '22fye72jnyGSfycX2',
          });
        }).to.not.throw();
      });

      it('does not throw an error', () => {
        expect(() => {
          send.call(mailProps);
        }).to.not.throw('an error');
      });

      it('calls Mailer.send', () => {
        send.call(mailProps);
        assert(Mailer.send.calledOnce);
      });

      it('calls Mailer with `to` even if `userId` is included', () => {
        send.call(Object.assign({}, mailProps, { userId: '22fye72jnyGSfycX2' }));
        assert(Mailer.send.calledWith(mailProps));
      });
    });

    describe('sending invalid email', () => {
      it('`userId` required if `to` is not present', () => {
        expect(() => {
          send.call({ template: 'welcome.html' });
        }).to.throw('User id is required');
      });

      it('template required', () => {
        expect(() => {
          send.call({});
        }).to.throw('Template is required');
      });

      it('malformed email', () => {
        expect(() => {
          send.call({ to: 'bad email' });
        }).to.throw('To must be a valid e-mail address');
      });
    });
  });
});
