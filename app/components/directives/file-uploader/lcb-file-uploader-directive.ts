/// <reference path="../../../../lib/app.d.ts" />
'use strict';

import common = require('../../../utility/index');
import {Utils} from "../../../utility/index";

export var directiveName = 'lcbFileUploader';

class FileUploader {

  private _useSrc;
  private _maxsize;
  private _fileUploaded;
  private _fixOrient;

  constructor(private scope: angular.IScope, private el: angular.IAugmentedJQuery, attrs: any, public $compile, private utilService: common.utilService.Service) {

    if (_.isEmpty(el.parents('.lcb-file-upload'))) {
      el.parent().addClass('lcb-file-upload');
    }

    this._fileUploaded = function() {};
    if (attrs['lcbFileUploader']) this._fileUploaded = _.get(scope, attrs['lcbFileUploader']);

    this._maxsize = parseInt(attrs['maxsize'] || 5 * 1024);
    this._useSrc = attrs['lcbFileUseSrc'];
    this._fixOrient = attrs['lcbFixOrient'];

    el.attr('base-sixty-four-input', '');
    el.removeAttr('lcb-file-uploader');
    el.removeAttr('data-lcb-file-uploader');

    el.attr('onloadstart', 'onLoadStart');
    scope['onLoadStart'] = this.onLoadStart.bind(this);

    el.attr('onload', 'onLoaded');
    scope['onLoaded'] = this.onLoaded.bind(this);

    el.attr('onloadend', 'onLoadEnd');
    scope['onLoadEnd'] = this.onLoadEnd.bind(this);

    $compile(el)(scope);

  }

  onLoadStart(event, fileReader, file, fileList, fileObjects, fileObject) {
    if ((file.size / 1024) > this._maxsize) {
      fileReader.abort();
      return this.utilService.alert('图片太大');
    }
    this.utilService.showSpinner();
  }

  onLoaded(event, fReader,  file, rawFiles, fileObjects, fileObject) {
    var img = this.el.parent().find('img');
    if (this._fixOrient == 'true') {
      var exifData = EXIF.readFromBinaryFile(Utils.base64ToArrayBuffer(fileObject.base64));
      Utils.reOrient(parseInt(exifData.Orientation || 1, 10), img);
    }
    var dataSrc = ['data:', fileObject.filetype, ';base64,', fileObject.base64].join('');
    if (this._useSrc) {
      img.attr('src', dataSrc);
    } else {
      img.attr('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
      img.css('background-image', ['url(', dataSrc, ')'].join(''));
    }

    this._fileUploaded.bind(this.scope)(fileObject);
  }

  onLoadEnd(event, fileReader, file, fileList, fileObjects, fileObject) {
    this.utilService.hideSpinner();
  }

}

class FileUploaderDirective implements angular.IDirective {

  restrict = 'A';

  static $inject = ['$compile', common.utilService.serviceName];

  constructor(private $compile, private utilService) {}

  scope = true;
  terminal = true;
  priority = 1000;
  replace = false;

  link = (scope: angular.IScope, el: angular.IAugmentedJQuery, attrs: any) => {
    new FileUploader(scope, el, attrs, this.$compile, this.utilService);
  }

}

export var Directive = [ '$injector', ($injector: angular.auto.IInjectorService) => {
  return $injector.instantiate(FileUploaderDirective);
}];