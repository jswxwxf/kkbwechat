/// <reference path="../../../../../lib/app.d.ts" />

'use strict';
import {Utils} from "../../../../utility/index";

export class FanhuaUploadHelper {

  uploadResult;
  uploadImages;
  uploadImagesDone;

  initHelper() {
    this['setModalSrc']('fanhua-upload', 'features/order/result/fanhua/fanhua-upload.html');
    this['$scope'].$on('modal.hidden', () => {
      this['$state'].reload();
    });
  }

  showUploadImage(result) {
    this.uploadResult = result;
    this.uploadImages = null;
    this['showModal']('fanhua-upload');
  }

  uploadImage() {
    if (Utils.isEmpty(this.uploadImages)) return this['hideModal']('fanhua-upload');
    var utilService = this['utilService'];
    var fanhuaService = this['fanhuaService'];
    utilService.showSpinner();
    fanhuaService.uploadImages(this.uploadResult.taskId, this.uploadResult.prvId, this.uploadImages)
      .then(resp => {
        return fanhuaService.submitInsure(this.uploadResult.taskId, {
          taskId: this.uploadResult.taskId,
          prvId: this.uploadResult.prvId
        });
      })
      .then(resp => {
        this.uploadImagesDone = true;
        this['hideModal']('fanhua-upload');
      })
      .finally(() => utilService.hideSpinner());
  }

}