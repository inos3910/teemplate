import "core-js/stable";
import "regenerator-runtime/runtime";

import 'jquery.easing';

import Main from '@js/common/main';
class Events extends Main {
  constructor() {
    super();
    // this.scrollFlag  = true;
    // this.scrollTimer = null;
    //イベントを登録
    this.bind();
  }

  bind() {

    this.win.on('load', () => {
      //transitionを有効化
      this.body.removeClass('u-preload');
    });

    //スマホ：メニューボタンタップ
    this.doc.on('click', '#js-menuBtn', (e) => {
      this.toggleMenu();
    });

    //アンカースクロール
    this.doc.on('click', 'a[href^="#"]', (e) => {
      this.anchorScroll(e);
    });

  }
}
const events = new Events();