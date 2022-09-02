import Main from './main';
class Events extends Main {
  constructor() {
    super();
    this.bind();
  }

  bind() {

    //スマホ：メニューボタンタップ
    this.doc.on('click', '#js-menu-btn', (e) => {
      this.toggleMenu();
    });

    //スマホ：メニュ-閉じる
    this.doc.on('click', '.js-menu-close', (e) => {
      if(e.cancelable){
        e.preventDefault();
      }
      this.closeMenu();
    });


    //アンカースクロール
    this.doc.on('click', 'a', (e) => {
      this.anchorScroll(e, () => {
        this.closeMenu();
      });
    });

    //電話番号リンク PCは無効化
    this.doc.on('click', 'a[href^="tel:"]', (e) => {
      if(!this.isPC){
        return;
      }
      if(e.cancelable){
        e.preventDefault();
      }
    });
  }
}

export default Events;