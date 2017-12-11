import { expect } from 'meteor/pathable-vendor/chai';
import chai from 'meteor/pathable-vendor/chai';
import { stub } from 'meteor/pathable-vendor/sinon';
import sinonChai from 'meteor/pathable-vendor/sinon-chai';
import { Random } from 'meteor/random';
import { Users, People, Communities } from 'meteor/pathable-collections';

import { authorizedUserParamBuilder } from './param-builders';

chai.should();
chai.use(sinonChai);

describe('Mail Methods', () => {
  describe('authorizedUserParamBuilder', () => {
    const methodParams = { userId: Random.id(), communityId: Random.id() };
    const email = 'some@mail.com';
    const authToken = { token: 'some-token' };
    const firstName = 'firstName';
    const lastName = 'lastName';
    const adminHost = 'test.pathable.local';
    const authUrl = `http://${adminHost}?authToken=${authToken.token}`;

    it('throws an error on missing community', () => {
      expect(() => {
        authorizedUserParamBuilder({});
      }).to.throw('User could not be found');
    });

    describe('building params', () => {
      beforeEach(() => {
        stub(Users, 'findOne', () => ({
          _id: Random.id(),
          emails: [{ address: email }],
        }));

        stub(Communities, 'findOne', () => ({ adminHost: () => adminHost }));
      });

      afterEach(() => {
        Users.findOne.restore();
        Communities.findOne.restore();
      });

      it('throws an error on missing person', () => {
        expect(() => {
          authorizedUserParamBuilder(methodParams);
        }).to.throw('No person with the provided userId or communityId could be found');
      });

      describe('with valid options', () => {
        beforeEach(() => {
          stub(Users, 'createLoginToken', () => authToken);
          stub(People, 'findOne', () => ({ firstName, lastName }));
        });

        afterEach(() => {
          Users.createLoginToken.restore();
          People.findOne.restore();
        });

        it('gets user first name, last name and auth url', () => {
          const results = authorizedUserParamBuilder(methodParams);

          results.should.have.property('authUrl', authUrl);
          results.should.have.property('firstName', firstName);
          results.should.have.property('lastName', lastName);
        });
      });
    });
  });
});
