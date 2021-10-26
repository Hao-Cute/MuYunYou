import './slider.css';
import './btn.css';

import Slider from './module';

import render from './slider.art';
import { getData } from 'api/getData';
import { URL } from './config';

const layoutEl = document.getElementById('slider-layout');

getData(URL).then(data => {
  // console.log(data);
  // [ {url: "http://alimc}]
  layoutEl.innerHTML = render({
    items: data
  });

  const slider = new Slider(document.querySelector('.slider'), {
    initialIndex: 0,
    animation: true,
    // 切换速度，单位 ms
    speed: 500,
    // 自动切换，单位 ms
    autoplay: 2000
  });

  const bannerEl = document.getElementById('banner');
  const sliderList = document.querySelector('.slider-content')
  const leftbtnEl = document.getElementById('leftbtn');
  const rightbtnEl = document.getElementById('rightbtn');

  // 节流锁
  let lock = true;

  leftbtnEl.addEventListener(
    'click',
    () => {
      if(!lock) return;
      lock = false;
      slider.prev();
      setTimeout(() => {
        lock = true;
      }, slider.options.speed);
    },
    false
  );
  rightbtnEl.addEventListener(
    'click',
    () => {
      if(!lock) return;
      lock = false;
      slider.next();
      setTimeout(() => {
        lock = true;
      }, slider.options.speed);
    },
    false
  );

  bannerEl.addEventListener(
    'mouseenter',
    () => {
      slider.pause();
    },
    false
  );
  bannerEl.addEventListener(
    'mouseleave',
    () => {
      slider.autoplay();
    },
    false
  );
});
