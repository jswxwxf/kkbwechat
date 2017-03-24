/// <reference path="../../../../lib/app.d.ts" />

'use strict';

export import carAssessLoader = require('./car-assess/loader');
export import driveScoreLoader = require('./drive-score/loader');
export import mileageScoreLoader = require('./mileage-score/loader');
export import durationScoreLoader = require('./duration-score/loader');
export import behaviourScoreLoader = require('./behaviour-score/loader');
export import earningLoader = require('./earning/loader');

export interface Loader {
  load()
}