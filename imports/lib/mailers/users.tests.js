import { expect } from 'chai';
import chai from 'chai';
import sinonChai from 'sinon-chai';

import * as userMailer from './users';

chai.should();
chai.use(sinonChai);

describe('Mailers', () => {
  describe('User Mailer', () => {
    describe('communityWelcome', () => {
      it('generates mail HTML', () => {
        const firstName = 'firstName';
        const lastName = 'lastName';
        const authUrl = 'fake-token';

        const results = userMailer.communityWelcome({ firstName, lastName, authUrl });

        expect(results).to.have.string(`<a href="${authUrl}"`).
          and.have.string(`${firstName} ${lastName}`);
      });
    });
  });
});
