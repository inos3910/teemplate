(function () {
  function addCart() {
    const $buyButton = $('#js-custom-purchase');
    if (!$buyButton[0]) {
      return;
    }

    const $cartCount = $('#quick_cart .float_count');

    $buyButton.on('click', async (e) => {
      if (e.cancelable) {
        e.preventDefault();
      }

      const self = e.currentTarget;
      const href = self.href;
      const parent = self.parentNode;

      parent.classList.add('is-loading');

      await $.ajax({
        type: 'POST',
        url: '/cart/clear.js',
        dataType: 'json',
      });

      try {
        await $.ajax({
          type: 'POST',
          url: '/cart/add.js',
          data: $('form[action="/cart/add"]').serialize(),
          dataType: 'json',
          timeout: 10000,
        }).then(
          (res) => {
            $cartCount.html(res.quantity);
            window.location.href = href;
          },
          () => {
            parent.classList.remove('is-loading');
          }
        );
      } catch (error) {
        console.log(error);
        parent.classList.remove('is-loading');
      }
    });
  }

  addCart();
})();
