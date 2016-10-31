import { expect } from 'chai';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import { Random } from 'meteor/random';

import { mailMethods } from './methods';

chai.should();
chai.use(sinonChai);

describe('Mail Methods', () => {
  describe('.communityWelcome', () => {
    describe('user does not exist', () => {
      const params = { userId: Random.id(), communityId: Random.id() };

      it('throws an error', () => {
        expect(() => {
          mailMethods.communityWelcome.run(params);
        }).to.throw('User does not exist');
      });
    });
  });

  describe('.passwordReset', () => {
    describe('user does not exist', () => {
      const params = { userId: Random.id(), communityId: Random.id() };

      it('throwsx an error', () => {
        expect(() => {
          mailMethods.passwordReset.run(params);
        }).to.throw('User does not exist');
      });
    });
  });
});
