/// <reference path="../../lib/app.d.ts" />

'use strict';

export abstract class Events {

  static user_loggedin = 'lcb:result:userLoggedIn';
  static user_loggedout = 'lcb:result:userLoggedOut';
  static user_updated = 'lcb:result:userUpdated';
  static result_succeed = 'lcb:result:succeed';
  static result_failed = 'lcb:result:failed';
  static token_expired = 'lcb:result:tokenExpired';
  static network_error = 'lcb:result:networkError';

  static countdown_reset = 'lcb:countdown:reset';
  static countdown_pause = 'lcb:countdown:pause';
  static countdown_resume = 'lcb:countdown:resume';

}