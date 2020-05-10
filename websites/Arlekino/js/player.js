$(document).ready(() => {
  const $player = $('.player');
  if (!$player.length) return;

  // Player program cards
  const $programs = $('.player__programs', $player);

  if ($programs.length) {
    new SimpleBar($programs[0], {autoHide: false});

    const $cards = $('.program-card', $player);

    $cards.click(function () {
      $cards.removeClass('active');
      $(this).addClass('active');
    });
  }

  // Tabs list
  const $tabList = $('.tab-list', $player);
  if ($tabList.length) {
    const $tabListWrap = $('.tab-list-wrap', $player);

    // Bar
    const simpleBar = new SimpleBar($tabList[0], {autoHide: false});
    const bar = simpleBar.getScrollElement();

    // Drag to scroll
    let isDown = false;
    let startX;
    let scrollLeft;

    bar.addEventListener('mousedown', (e) => {
      isDown = true;
      bar.classList.add('active');
      startX = e.pageX - bar.offsetLeft;
      scrollLeft = bar.scrollLeft;
    });
    bar.addEventListener('mouseleave', () => {
      isDown = false;
      bar.classList.remove('active');
    });
    bar.addEventListener('mouseup', () => {
      isDown = false;
      bar.classList.remove('active');
    });
    bar.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - bar.offsetLeft;
      const walk = (x - startX) * 2; //scroll-fast
      bar.scrollLeft = scrollLeft - walk;
    });

    // Arrows
    const $arrows = $('.tab-list__arrow');
    const $prevArrow = $('.tab-list__arrow_prev', $tabListWrap);
    const $nextArrow = $('.tab-list__arrow_next', $tabListWrap);

    $arrows.click((event) => {
      event.stopPropagation();

      let scroll = bar.scrollLeft;

      if ($(event.target).hasClass('tab-list__arrow_next')) scroll += 350;
      else if ($(event.target).hasClass('tab-list__arrow_prev')) scroll -= 350;

      $(bar).stop().animate({scrollLeft: scroll}, 300, 'swing');
    });

    bar.addEventListener('scroll', () => {
      const scroll = bar.scrollLeft;

      if (scroll === 0) $prevArrow.hide();
      else if (scroll > 0) $prevArrow.show();

      if ((scroll + bar.clientWidth) === bar.scrollWidth) $nextArrow.hide();
      else if ((scroll + bar.clientWidth) < bar.scrollWidth) $nextArrow.show();
    });
  }

  // Channel block
  const $channel = $('.player-channel', $player);

  if ($channel.length) {
    const $channelContent = $('.player-channel__content', $channel);

    new SimpleBar($channelContent[0], {autoHide: false});
  }
});
