(function () {
  const disabledSendButton = function (target, submit) {
    submit.disabled = !target.checked;
  };

  document.addEventListener(
    'DOMContentLoaded',
    (e) => {
      const $privacy = document.getElementById('privacy');
      if (!$privacy) {
        return;
      }

      const $submit = document.querySelector('input[type="submit"]');
      if (!$submit) {
        return;
      }

      disabledSendButton($privacy, $submit);

      //プライバシーポリシーのチェックで送信ボタンの表示・非表示
      $privacy.addEventListener(
        'change',
        (e) => {
          disabledSendButton(e.currentTarget, $submit);
        },
        false
      );
    },
    false
  );
})();
