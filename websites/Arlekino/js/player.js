$(document).ready(() => {
  const $player = $('.player');
  if (!$player.length) return;

  // Player programs
  const $programs = $('.player__programs', $player);

  if ($programs.length) {
    new SimpleBar($programs[0], {autoHide: false});

    const $cards = $('.program-card', $player);

    $cards.click(function () {
      $cards.removeClass('active');
      $(this).addClass('active');
    });
  }
});
