export class Utils {
  constructor() {
    this.win   = $(window);
    this.doc   = $(document);
    this.body  = $('body');

    this.default();
  }

  //初期設定
  default() {
    this.lazyload();
    //画面内の位置で要素を出現させるエフェクト
    this.setIntersectionObserver();
    //object-fit polyfill
    this.objectFitImages();
    //responsive image polyfill
    this.picturefill();
  }

  //lazysizes
  lazyload() {
    lazySizes.cfg.throttleDelay = 66;
    lazySizes.cfg.loadMode  = 2;
    lazySizes.cfg.expFactor = 3;
  }

  //css object-fit polyfill
  objectFitImages() {
    if (typeof objectFitImages != 'undefined') {
      objectFitImages('img');
    }
  }

  //css object-fit polyfill
  picturefill() {
    if (typeof picturefill != 'undefined') {
      picturefill();
    }
  }

  //スマホ判定
  isSp() {
    const ua = navigator.userAgent;
    const isSp = (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0) && (ua.indexOf('Mobile') > 0) || ua.indexOf('Windows Phone') > 0);
    return isSp;
  }

  //タブレット判定
  isTablet() {
    const ua = navigator.userAgent;
    const isTablet = ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0;
    return isTablet;
  }

  //PC判定
  isPC() {
    return !(this.isSp() || this.isTablet());
  }

  //各デバイス判定
  device() {
    return {
      isSp     : this.isSp(),
      isTablet : this.isTablet(),
      isPC     : this.isPC()
    };
  }

  //IE・Edge判定
  isIE() {
    const ua = navigator.userAgent.toLowerCase();
    const isIE = (ua.indexOf('msie') > -1 || ua.indexOf('trident') > -1 || ua.indexOf('edge') > -1);
    return isIE;
  }

  /**
  * タッチイベント制御
  * @param {function} func - 関数
  * @param {Object} event - eventオブジェクト
  * @param {Object} $elem - jQueryオブジェクト
  * @param {Object} arg - 実行する関数の引数
  **/
  touchEvent(func, event, $elem, arg) {
    if ('touchstart' === event.type) {
      $elem.attr('data-touchstarted', '');
      return;
    }
    if ('touchmove' === event.type) {
      $elem.removeAttr('data-touchstarted');
      return;
    }
    if ('undefined' !== typeof $elem.attr('data-touchstarted')) {
      this[func](event, $elem, arg);
      $elem.removeAttr('data-touchstarted');
    }
  }

  /*
  * 関数をDeferredで実行
  * @param func {Function} 関数
  */
  promise(func) {
    const d = new $.Deferred();
    const result = func();
    d.resolve(result);
    return d.promise();
  }

  /*
  * ターゲット位置へのスクロールアニメーション
  * @param {Object} target ターゲット要素
  * @param {Number} speed ターゲット要素
  */
  scrollTo(target, speed) {
    if ($(target)[0]) {
      const $html        = $('html');
      const targetPos    = $(target).offset().top;
      const headerHeight = $('#js-header').innerHeight();
      return anime({
        targets     : 'html,body',
        scrollTop   : targetPos - headerHeight,
        duration    : speed ? speed : 800,
        easing      : 'easeInOutExpo',
        elasticity  : 300,
        begin       : () => {
          $html.addClass('u-noevent');
          document.addEventListener('touchmove', this.scrollControl, {passive: false});
        },
        complete    : () => {
          $html.removeClass('u-noevent');
          document.removeEventListener('touchmove', this.scrollControl, {passive: false});
        }
      });
    }
  }

  scrollControl(e){
    e.preventDefault();
  }

  /*
  * アンカースクロール
  * @param {Object} e イベントオブジェクト
  */
  anchorScroll(e) {
    e.stopPropagation();
    e.preventDefault();
    const selecter = $(e.currentTarget).attr('href');
    const target   = selecter === '#' ? 'html, body' : selecter;
    this.lazysizesUnveil().then(() => {
      this.scrollTo(target, 800);
    });
  }

  //lazyloadを全て適用
  lazysizesUnveil() {
    return new Promise(resolve => {
      if(typeof lazySizes != 'undefined'){
        const $imgs = Array.from(document.querySelectorAll('.lazyload'));
        const count = $imgs.length;
        if(count){
          $imgs.forEach((img, i) => {
            lazySizes.loader.unveil(img);
            if(i+1 === count){
              const timer = setTimeout(() => {
                resolve();
                clearTimeout(timer);
              }, 100);
            }
          });
        }
        else {
          resolve();
        }
      }
      else {
        resolve();
      }
    });
  }

  /*
  * ページトップスクロール
  * @param {Object} e イベントオブジェクト
  */
  pagetopScroll(e) {
    e.stopPropagation();
    e.preventDefault();
    const $html = $('html');
    return anime({
      targets     : 'html,body',
      scrollTop   : 0,
      duration    : 800,
      easing      : 'easeInOutExpo',
      elasticity  : 300,
      begin       : () => {
        $html.addClass('u-noevent');
        document.addEventListener('touchmove', this.scrollControl, {passive: false});
      },
      complete    : () => {
        $html.removeClass('u-noevent');
        document.removeEventListener('touchmove', this.scrollControl, {passive: false});
      }
    });
  }

   //画面内の位置で要素を出現させるエフェクト
   setIntersectionObserver(){
     const options = {
       threshold: 0.2
     }

     const callback = (entries, observer) => {
       entries.forEach(entry => {
         if (entry.intersectionRatio > 0.2) {
           entry.target.classList.add('is-effect');
         }
       });
     }

     const observer  = new IntersectionObserver(callback, options);

     const observers = Array.from(document.querySelectorAll('.is-ev'));
     observers.forEach(el => {
       observer.observe(el);
     });
   }
 }

 export default Utils;