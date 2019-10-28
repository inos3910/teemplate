import Validate from '@js/common/validate';
export class Main extends Validate {
  constructor() {
    super();
    //メニュー開閉フラグ
    this.isOpenMenu = false;
  }

  /*
  * メニュー開閉
  */
  toggleMenu() {
    if (this.isOpenMenu) {
      this.closeMenu();
    }
    else {
      this.openMenu();
    }
  }

  /*
  * メニュー開く
  */
  openMenu() {
    this.isOpenMenu = true;
    const $menu = $('#js-nav');
    const $menuBtn = $('#js-menuBtn');
    $menuBtn.addClass('is-active');
    $menu.addClass('is-active');
  }

  /*
  * メニュー閉じる
  */
  closeMenu() {
    this.isOpenMenu = false;
    const $menu     = $('#js-nav');
    const $menuBtn = $('#js-menuBtn');
    $menuBtn.removeClass('is-active');
    $menu.removeClass('is-active');
  }

}

export default Main;