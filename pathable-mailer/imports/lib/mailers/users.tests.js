import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';

import * as userMailer from './users';

chai.should();
chai.use(sinonChai);

if (Meteor.isServer) {
  describe('Mailers', () => {
    describe('User Mailer', () => {
      describe('communityWelcome', () => {
        it('generates mail HTML', () => {
          const authUrl = 'fake-token';
          const results = userMailer.communityWelcome({ authUrl });
          expect(results).to.have.string(`<a href="${authUrl}"`);
        });
      });
      describe('passwordReset', () => {
        it('generates mail HTML', () => {
          const authUrl = 'fake-token';
          const results = userMailer.passwordReset({ authUrl });
          expect(results).to.have.string(`<a href="${authUrl}"`);
        });
      });
    });
  });
}
