/// <reference path="./systemjs.d.ts" />
/// <reference path="./jquery.d.ts" />
/// <reference path="./angular.d.ts" />
/// <reference path="./angular-cookies.d.ts" />
/// <reference path="./angular-ui-router.d.ts" />
/// <reference path="./ionic.d.ts" />
/// <reference path="./moment.d.ts" />
/// <reference path="./lodash.d.ts" />
/// <reference path="./async.d.ts" />

interface Window {
  StatusBar: any;
  Navigator: any;
  DeviceMotionEvent: any;
}

interface JQuery {
  rotate: any;
  eraser: any;
  watermark: any;
}

declare var pingpp: any;

declare var wx: any;

declare var JSBridge: IJSBridgeClass;

declare interface IJSBridgeClass {
  init: any;
  send: any;
  callAPI: any;
}

declare var SpeechSynthesisUtterance: any;

declare var speechSynthesis: any;

declare var EXIF: any;

interface Polyline {
  decode: any;
  encode: any;
  fromGeoJSON: any;
  toGeoJSON: any;
}

declare var polyline: Polyline;

declare var L: any;

declare var AMap: any;

declare var BMap: any;

declare var Picker: any;