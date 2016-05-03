import { Mailer } from 'meteor/lookback:emails';
import templates from './templates';
import layout from './templates/layouts/main';
import helpers from './helpers';

Mailer.init({ templates, helpers, layout });
