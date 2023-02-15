(function () {
  if (typeof gsap != 'undefined' && typeof ScrollTrigger != 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  } else {
    return;
  }

  //パララックスエフェクト
  const parallax = () => {
    gsap.utils.toArray('.js-parallax').forEach((wrap) => {
      const params = {
        scrollTrigger: {
          trigger: wrap,
          start: 'top center',
          end: 'bottom top',
          scrub: 0.3,
          invalidateOnRefresh: true,
          //markers: true
        },
      };

      const x = wrap.getAttribute('data-x');
      const y = wrap.getAttribute('data-y');
      const scale = wrap.getAttribute('data-scale');
      if (x) {
        params.x = x;
      }

      if (y) {
        params.y = y;
      }

      if (scale) {
        params.scale = scale;
      }

      gsap.to(wrap, params);
    });
  };

  const triggerClass = () => {
    const trigger = document.querySelectorAll('.js-trigger');
    if (trigger.length < 1) {
      return;
    }

    trigger.forEach((el, i) => {
      ScrollTrigger.create({
        trigger: el,
        id: i + 1,
        start: 'top bottom-=45',
        toggleClass: {
          targets: el,
          className: 'is-effect',
        },
        once: true,
      });
    });
  };

  const refreshScrollTrigger = () => {
    const target = document.body;
    const observer = new MutationObserver(function (mutations) {
      ScrollTrigger.refresh();
    });

    // 監視を開始
    observer.observe(target, {
      characterData: true,
      childList: true,
      subtree: true,
    });
  };

  window.addEventListener('DOMContentLoaded', () => {
    parallax();
    triggerClass();
    refreshScrollTrigger();
  });
})();
