/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import enums = require('../../../enums/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'talk.TalkController';

class UserController extends BaseController {

  full: boolean = false;

  private _talks: any = [

    {
      title: '里程保升级产品开开保绿色车队正式上线',
      img: 'static/images/talk01.png',
      type: '产品',
      updated_at: '2016年1月8日',
      url: 'http://mp.weixin.qq.com/s?__biz=MzA4MTkyOTE3Mg==&mid=401277140&idx=1&sn=189e340513fc92525738d5b6c7ba76e2'
    },

    {
      title: '准备好可乐瓜子小板凳，听开开保讲讲互助的小故事',
      img: 'static/images/talk02.png',
      type: '谈天说地',
      updated_at: '2016年1月8日',
      url: 'http://mp.weixin.qq.com/s?__biz=MzA4MTkyOTE3Mg==&mid=400551919&idx=1&sn=d3d3d4f2ef07b1bd84958d62514c11c3'
    },

    {
      title: '大数据有趣——让你颠覆最起码两观的统计结果',
      img: 'static/images/talk03.png',
      type: '脑洞频道',
      updated_at: '2015年11月11日',
      url: 'http://mp.weixin.qq.com/s?__biz=MzA4MTkyOTE3Mg==&mid=400390303&idx=2&sn=2ccbb0fa2d1882d2308bb215461bff3e'
    },

    {
      title: '双十一到了，十二星座也开始买车险了',
      img: 'static/images/talk04.png',
      type: '谈天说地',
      updated_at: '2015年11月11日',
      url: 'http://mp.weixin.qq.com/s?__biz=MzA4MTkyOTE3Mg==&mid=400390303&idx=3&sn=f90e978c5398685e9dfeb6a0e7d5e9ea'
    },

    {
      title: '四米空间强推——大国不能不识数',
      img: 'static/images/talk05.png',
      type: '谈天说地',
      updated_at: '2015年10月17日',
      url: 'http://mp.weixin.qq.com/s?__biz=MzA4MTkyOTE3Mg==&mid=213808265&idx=1&sn=ccd375b50e519f168860351bf1993459'
    },

    {
      title: '专车腹黑论——打击专车背后的最深层原因',
      img: 'static/images/talk06.png',
      type: '谈天说地',
      updated_at: '2015年10月10日',
      url: 'http://mp.weixin.qq.com/s?__biz=MzA4MTkyOTE3Mg==&mid=213675800&idx=2&sn=8a02f5beb1a2f7e76b9ecf4dc5e674ac'
    },

    {
      title: '专车司机大揭秘——里程保数据专家大显身手',
      img: 'static/images/talk07.png',
      type: '脑洞频道',
      updated_at: '2015年10月10日',
      url: 'http://mp.weixin.qq.com/s?__biz=MzA4MTkyOTE3Mg==&mid=213459342&idx=2&sn=57b9e1df446dae850ec0d1b50115b1bf'
    },

    {
      title: '四米空间——Black Keys',
      img: 'static/images/talk08.png',
      type: '四米空间',
      updated_at: '2015年8月13日',
      url: 'http://mp.weixin.qq.com/s?__biz=MzA4MTkyOTE3Mg==&mid=212661898&idx=2&sn=2a1c6c22aeec938a343fb51e08d672ef'
    },

    {
      title: '里程保——源于多年前的一份计划书',
      img: 'static/images/talk09.png',
      type: '产品',
      updated_at: '2015年6月10日',
      url: 'http://mp.weixin.qq.com/s?__biz=MzA4MTkyOTE3Mg==&mid=209584057&idx=1&sn=2925d9280617b3ac9543c7a8acbaf3d6'
    }

  ];

  talks;

  static $inject = ['$scope', '$stateParams', '$filter', common.utilService.serviceName];

  constructor(private $scope, private $stateParams, private $filter, private utilService: common.utilService.Service) {
    super($scope, utilService);
    this.talks = this.$filter('filter')(this._talks, { type:  this.$stateParams.topic});
    this.full = this.$stateParams.full == 'true';
  }

  open(talk) {
    location.href = talk.url;
  }

}

export class Controller extends UserController {}