import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import { stub } from 'sinon';
import { Random } from 'meteor/random';

import { Users, People, Communities } from 'meteor/pathable-collections';

import { authorizedUserParamBuilder } from './param-builders';

chai.should();
chai.use(sinonChai);

describe('Mail Methods', () => {
  describe('authorizedUserParamBuilder', () => {
    const accountId = Random.id();
    const methodParams = { userId: Random.id(), communityId: Random.id() };
    const email = 'some@mail.com';
    const authToken = { token: 'some-token' };
    const firstName = 'firstName';
    const lastName = 'lastName';
    const adminHost = 'test.pathable.dev';
    const authUrl = `http://${adminHost}?authToken=${authToken.token}`;

    it('throws an error on missing community', () => {
      expect(() => {
        authorizedUserParamBuilder({});
      }).to.throw('User could not be found');
    });

    describe('building params', () => {
      beforeEach(() => {
        stub(Users, 'findOne').callsFake(() => ({
          _id: Random.id(),
          emails: [{ address: email }],
        }));

        stub(Communities, 'findOne').callsFake(() => ({
          adminHost: () => adminHost,
          account: () => ({ _id: accountId }),
        }));
      });

      afterEach(() => {
        Users.findOne.restore();
        Communities.findOne.restore();
      });

      it('throws an error on missing person', () => {
        expect(() => {
          authorizedUserParamBuilder(methodParams);
        }).to.throw(
          'No person with the provided userId or communityId could be found'
        );
      });

      describe('with valid options', () => {
        beforeEach(() => {
          stub(Users, 'createLoginToken').callsFake(() => authToken);
          stub(People, 'findOne').callsFake(() => ({ firstName, lastName }));
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
