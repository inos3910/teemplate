import "core-js/stable";
import "regenerator-runtime/runtime";

import 'jquery.easing';
require('intersection-observer');

import Main from '@js/common/main';
class Events extends Main {
  constructor() {
    super();
    this.scrollFlag  = true;
    this.scrollTimer = null;
    //イベントを登録
    this.bind();
  }

  bind() {

    this.win.on('load', () => {
      //transitionを有効化
      this.body.removeClass('u-preload');
    });

    //スマホ：メニューボタンタップ
    this.doc.on('touchstart touchmove touchend', '#js-menuBtn', (e) => {
      this.promise(() => {
        return this.isPC();
      })
      .then((isPC) => {
        if (!isPC) {
          this.touchEvent('toggleMenu', e, $(e.currentTarget));
        }
      });
    });

    //アンカースクロール
    this.doc.on('click', 'a[href^="#"]', (e) => {
      this.anchorScroll(e);
    });

    //ページトップ
    this.doc.on('click', '.js-pagetop', (e) => {
      this.pagetopScroll(e);
    });

  }
}
const events = new Events();