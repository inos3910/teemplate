//import Validate from '@js/common/validate';
import Utils from '@js/common/utils';
export class Main extends Utils {
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
    this.body.addClass('is-menu-active');
  }

  /*
  * メニュー閉じる
  */
  closeMenu() {
    this.isOpenMenu = false;
    this.body.removeClass('is-menu-active');
  }

}

export default Main;