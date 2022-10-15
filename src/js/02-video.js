import Player from '@vimeo/player';
import trottle from 'lodash.throttle';

const key = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on(
  'timeupdate',
  trottle(function (e) {
    localStorage.setItem(key, e.seconds);
  }, 1000)
);

player.setCurrentTime(localStorage.getItem(key) || 0);
