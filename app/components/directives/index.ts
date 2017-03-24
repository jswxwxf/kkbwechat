/// <reference path="../../../lib/app.d.ts" />

'use strict';

import weekPaginatorDirective = require('./week-paginator/week-paginator-directive');
import dayPaginatorDirective = require('./day-paginator/day-paginator-directive');
import companySelectorDirective = require('./company-selector/company-selector-directive');
import packageSelectorDirective = require('./package-selector/package-selector-directive');
import packageSelectorFanhuaDirective = require('./package-selector-fanhua/package-selector-directive');
import packageViewerDirective = require('./package-viewer/package-viewer-directive');
import packageViewerFanhuaDirective = require('./package-viewer-fanhua/package-viewer-directive');
import carSelectorDirective = require('./car-selector/car-selector-directive');
import carSelectorFanhuaDirective = require('./car-selector-fanhua/car-selector-directive');
import countDownDirective = require('./count-down/count-down-directive');
import countDown2Directive = require('./count-down-2/count-down-directive');
import lcbRadioDirective = require('./radio/lcb-radio-directive');
import stepIndicatorDirective = require('./step-indicator/step-indicator-directive');
import gradeIndicatorDirective = require('./grade-indicator/grade-indicator-directive');
import lcbValidatorDirective = require('./validator/lcb-validator-directive')
import lcbValidator2Directive = require('./validator/lcb-validator2-directive')
import carSwitcherDirective = require('./car-switcher/car-switcher-directive')
import couponSelectorDirective = require('./coupon-selector/coupon-selector-directive');
import lcbFileUploaderDirective = require('./file-uploader/lcb-file-uploader-directive')
import lcbDisableByDirective = require('./disable-by/lcb-disable-by-directive')
import orderCardDirective = require('./order-card/order-card-directive');
import inquiryCardDirective = require('./inquiry-card/inquiry-card-directive');
import inquiryCardFanhuaDirective = require('./inquiry-card-fanhua/inquiry-card-directive');
import ticketCardDirective = require('./ticket-card/ticket-card-directive');
import shopCardDirective = require('./shop-card/shop-card-directive');
import scoreBarDirective = require('./score-bar/score-bar-directive');
import progressBarDirective = require('./progress-bar/progress-bar-directive');
import chartsDirective = require('./charts/charts-directive');
import registerDirective = require('./register/register-directive');
import pillSwitcherDirective = require('./pill-switcher/pill-switcher-directive');
import slideSwitcherDirective = require('./slide-switcher/slide-switcher-directive');
import cityPickerDirective = require('./city-picker/city-picker-directive');
import cityPickerFanhuaDirective = require('./city-picker-fanhua/city-picker-directive');

export var load = (app: angular.IModule) => {
  app.directive(weekPaginatorDirective.directiveName, weekPaginatorDirective.Directive)
    .directive(dayPaginatorDirective.directiveName, dayPaginatorDirective.Directive)
    .directive(companySelectorDirective.directiveName, companySelectorDirective.Directive)
    .directive(packageSelectorDirective.directiveName, packageSelectorDirective.Directive)
    .directive(packageSelectorFanhuaDirective.directiveName, packageSelectorFanhuaDirective.Directive)
    .directive(packageViewerDirective.directiveName, packageViewerDirective.Directive)
    .directive(packageViewerFanhuaDirective.directiveName, packageViewerFanhuaDirective.Directive)
    .directive(carSelectorDirective.directiveName, carSelectorDirective.Directive)
    .directive(carSelectorFanhuaDirective.directiveName, carSelectorFanhuaDirective.Directive)
    .directive(couponSelectorDirective.directiveName, couponSelectorDirective.Directive)
    .directive(countDownDirective.directiveName, countDownDirective.Directive)
    .directive(countDown2Directive.directiveName, countDown2Directive.Directive)
    .directive(lcbRadioDirective.directiveName, lcbRadioDirective.Directive)
    .directive(stepIndicatorDirective.directiveName, stepIndicatorDirective.Directive)
    .directive(gradeIndicatorDirective.directiveName, gradeIndicatorDirective.Directive)
    .directive(lcbValidatorDirective.directiveName, lcbValidatorDirective.Directive)
    .directive(lcbValidator2Directive.directiveName, lcbValidator2Directive.Directive)
    .directive(carSwitcherDirective.directiveName, carSwitcherDirective.Directive)
    .directive(lcbFileUploaderDirective.directiveName, lcbFileUploaderDirective.Directive)
    .directive(lcbDisableByDirective.directiveName, lcbDisableByDirective.Directive)
    .directive(orderCardDirective.directiveName, orderCardDirective.Directive)
    .directive(inquiryCardDirective.directiveName, inquiryCardDirective.Directive)
    .directive(inquiryCardFanhuaDirective.directiveName, inquiryCardFanhuaDirective.Directive)
    .directive(ticketCardDirective.directiveName, ticketCardDirective.Directive)
    .directive(shopCardDirective.directiveName, shopCardDirective.Directive)
    .directive(scoreBarDirective.directiveName, scoreBarDirective.Directive)
    .directive(progressBarDirective.directiveName, progressBarDirective.Directive)
    .directive(chartsDirective.directiveName, chartsDirective.Directive)
    .directive(registerDirective.directiveName, registerDirective.Directive)
    .directive(pillSwitcherDirective.directiveName, pillSwitcherDirective.Directive)
    .directive(slideSwitcherDirective.directiveName, slideSwitcherDirective.Directive)
    .directive(cityPickerDirective.directiveName, cityPickerDirective.Directive)
    .directive(cityPickerFanhuaDirective.directiveName, cityPickerFanhuaDirective.Directive);
};