import '@js/lib/jquery.validationEngine';
import '@js/lib/jquery.validationEngine-ja';
import Utils from '@js/common/utils';

export class Validate extends Utils {
  constructor() {
    super();
    this.contactInit();
  }

  contactInit() {
    const $form = $('#js-contact form');
    if (!$form[0]) {
      return;
    }
    const contact = $.extend(true, {}, {
      form       : $form,
      name       : $('#user_name'),
      email      : $('#user_email'),
      message    : $('#message'),
      privacy    : $('#privacy'),
      submit     : $('.js-contact-submit')
    });
    //バリデーションの属性をセット
    this.setValidationAttrs(contact);
    //プライバシーポリシーのチェックで送信ボタンの表示・非表示
    contact.privacy.on('change', (e) => {
      this.disabledSendButton(e, contact);
    }).change();
    //validationEngine
    this.setValidationEngine(contact);
  }

  /*
  * バリデーションの属性をセット
  * @param {Object} c バリデーションに使う要素
  */
  setValidationAttrs(c) {
    c.form.attr('novalidate', 'novalidate');
    //担当者名
    c.name.addClass('validate[required,maxSize[60]]')
    .attr('autocomplete', 'name');
    //メール
    c.email.addClass('validate[required,custom[email],maxSize[90]]')
    .attr('autocomplete', 'email');
    //内容
    c.message.addClass('validate[required,maxSize[1000]]');
  }

  /*
  * 送信ボタンの表示非表示
  * @param {Object} e イベントオブジェクト
  * @param {Object} c バリデーションに使う要素
  */
  disabledSendButton(e, c) {
    const $self = $(e.currentTarget);
    c.submit.prop('disabled', !$self.prop('checked'));
  }

  /*
  * validationEngine
  * @param {Object} c バリデーションに使う要素
  */
  setValidationEngine(c) {
    c.form.validationEngine('attach', {
      promptPosition: "inline",
      scrollOffset: 150,
      onValidationComplete: (form, status) => {
        if (status === true) {
          //form 二重送信禁止
          c.submit.prop('disabled', true)
          .val('送信中…')
          .parent()
          .addClass('is-sending');
          //送信中にリンクなどの誤タッチ防止処理
          $('body').addClass('u-noevent')
          .addClass('u-overflowHidden');
          return true;
        }
      }
    });
  }

}

export default Validate;