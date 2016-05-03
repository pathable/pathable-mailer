import { spy, stub } from 'sinon';
import { expect } from 'chai';
import { Random } from 'meteor/random';

import * as mailMethods from '/imports/server/mail-methods';
import * as userMailers from '/imports/server/mailers/users';
import { Users } from 'meteor/pathable-collections';

describe('Mail Methods', () => {
  describe('.passwordReset', () => {
    describe('user doesn\'t exist', () => {
      let usersStub;

      beforeEach(() => { usersStub = stub(Users, 'findOne', () => (null)); });
      afterEach(() => (usersStub.restore()));

      it('throws an error', () => {
        expect(() => {
          mailMethods.passwordReset({ userId: Random.id() });
        }).to.throw('User does not exist');
      });
    });

    describe('user exists', () => {
      let usersStub;
      let randomStub;
      let passwordResetSpy;
      const email = 'some@mail.com';
      const token = 'secret-token';

      beforeEach(() => {
        usersStub = stub(Users, 'findOne', () => ({
          _id: Random.id(),
          emails: [{ address: email }],
        }));
        randomStub = stub(Random, 'secret', () => (token));
        passwordResetSpy = spy(userMailers, 'passwordReset');
      });
      afterEach(() => {
        usersStub.restore();
        passwordResetSpy.restore();
        randomStub.restore();
      });

      it('calls userMailer\'s passwordReset with the right params', () => {
        mailMethods.passwordReset({ userId: Random.id() });

        expect(passwordResetSpy.calledWith(email, token)).to.eql(true);
      });
    });

    it('throws if arguments are invalid', () => {
      expect(() => {
        mailMethods.passwordReset({ foo: 'bar' });
      }).to.throw();
    });
  });
});
