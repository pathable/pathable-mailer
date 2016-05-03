import { expect } from 'chai';
import { Mailer } from 'meteor/lookback:emails';
import { spy, match } from 'sinon';

import '/imports/server/startup';
import * as userMailer from '/imports/server/mailers/users';

describe('Mailers', () => {
  describe('User Mailer', () => {
    describe('.passwordReset', () => {
      let mailerSendSpy;

      beforeEach(() => {
        mailerSendSpy = spy(Mailer, 'send');
      });

      afterEach(() => {
        mailerSendSpy.restore();
      });

      it('calls Mailer.send with the right parameters', () => {
        const to = 'foo@bar.com';
        const token = 'fake-token';
        const template = 'usersPasswordReset';

        userMailer.passwordReset(to, token);

        expect(
          mailerSendSpy.calledWith({
            subject: match.string,
            to,
            template,
            data: { token },
          })
        ).to.eql(true);
      });
    });
  });
});
