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

  //
  const filterChannels = (channelGroup) => {
    const $channels = $('[data-channel-group]', $player);

    if (channelGroup === 'all') {
      $channels.removeClass('filtered');
    } else {
      $channels.not(`[data-channel-group=${channelGroup}]`).addClass('filtered');
      $channels.filter(`[data-channel-group=${channelGroup}]`).removeClass('filtered');
    }
  };

  // Channel group filter
  const $tabList = $('.tab-list', $player);
  if ($tabList.length) {
    const $tabListWrap = $('.tab-list-wrap', $player);

    // Custom scroll
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

    // Tabs
    const $tabs = $('.tab-list__item', $tabListWrap);

    $tabs.click(function () {
      $tabs.removeClass('active');
      $(this).addClass('active');
    });
  }

  // Channels filtering
  $('[data-channel-filter]').click(function () {
    const group = $(this).data('channel-filter');

    filterChannels(group);
  });


  // Channel block
  const $channel = $('.player-channel', $player);

  if ($channel.length) {
    const $channelContent = $('.player-channel__content', $channel);

    new SimpleBar($channelContent[0], {autoHide: false});
  }

  // Channel change handler
  $('.program-card, .search-dropdown__item', $player).click(() => {
    $player.addClass('loading');

    mockChannelFetch()
      .then((res) => {
      })
      .finally(() => {
        $player.removeClass('loading');
      });
  });

  // Mock channel fetch
  function mockChannelFetch() {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  }

  //
  const truncateDescription = (elem) => {
    const text = elem.innerText;

    if (text.length > 400) {
      const visibleText = text.slice(0, 400);
      elem.innerText = `${visibleText}...`;

      //
      const button = document.createElement('div');
      button.classList.add('read-more');
      button.innerText = 'Читать полностью';

      button.addEventListener('click', () => {
        elem.innerText = text;
        button.classList.add('hidden');
      });
      //

      elem.parentElement.appendChild(button);
    }
  };

  // Truncate description on mobile devices
  if (window.innerWidth < 768) {
    $('.program__desc p', $player).each((i, elem) => {
      truncateDescription(elem);
    });
  }

  //
  $player.removeClass('loading');
});
