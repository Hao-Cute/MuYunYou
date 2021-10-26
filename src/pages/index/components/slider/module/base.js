import { ELEMENT_NODE_TYPE, SLIDER_ANIMATION_CLASS_NAME, CURRENT_CLASS } from './constants';

import DEFAULTS from './defaults';

class BaseSlider {
  constructor(el, options) {
    if (el.nodeType !== ELEMENT_NODE_TYPE) {
      throw new Error('实例化的时候，请传入 DOM 元素！');
    }

    // 实际参数
    this.options = {
      ...DEFAULTS,
      ...options
    };

    const sliderEl = el;
    const sliderContentEl = sliderEl.querySelector('.slider-content');
    const sliderItemEls = sliderContentEl.querySelectorAll('.slider-item');
    const circle_ol = sliderEl.querySelector('#circle_ol');
    const circle_lis = circle_ol.getElementsByTagName('li');

    // 添加到 this 上，为了在方法中使用
    this.sliderEl = sliderEl;
    this.sliderContentEl = sliderContentEl;
    this.sliderItemEls = sliderItemEls;
    this.circle_ol = circle_ol;
    this.circle_lis = circle_lis;

    this.minIndex = 0;
    this.maxIndex = sliderItemEls.length - 2;
    this.currIndex = this.getCorrectedIndex(this.options.initialIndex);

    // 每个 slider-item 的宽度（每次移动的距离）
    this.itemWidth = sliderItemEls[0].offsetWidth;

    // 节流锁
    this.lock = true;

    this.init();
  }

  // 初始化
  init() {
    // 为每个 slider-item 设置宽度
    this.setItemsWidth();

    // 为 slider-content 设置宽度
    this.setContentWidth();

    // 切换到初始索引 initialIndex
    this.move(this.getDistance());

    // 开启动画
    if (this.options.animation) {
      this.openAnimation();
    }

    // 自动切换
    if (this.options.autoplay) {
      this.autoplay();
    }
  }

  // 切换到 index 索引对应的幻灯片
  to(index) {
    index = this.getCorrectedIndex(index);

    if (this.currIndex === index) return;

    this.currIndex = index;
    const distance = this.getDistance();

    if (this.options.animation) {
      this.moveWithAnimation(distance);
    } else {
      this.move(distance);
    }
  }

  // 切换上一张
  prev() {
    const self = this;
    let index = self.currIndex - 1;
    if (index < self.minIndex) {
      self.move(self.getDistance(self.maxIndex + 1));
      self.currIndex = self.maxIndex;
      setTimeout(function () {
        self.moveWithAnimation(self.getDistance(self.maxIndex));
      }, 0);
    } else {
      self.to(index);
    }
  }

  // 切换下一张
  next() {
    const self = this
    let index = self.currIndex + 1;
    if (index > self.maxIndex) {
      self.currIndex = self.minIndex;
      self.moveWithAnimation(self.getDistance(index));
      setTimeout(function () {
        self.closeAnimation();
        self.move(self.getDistance(self.minIndex));
      }, self.options.speed);
    } else {
      self.to(index);
    }
  }

  // 设置小圆点的current在谁身上，序号为idx的小圆点才有current类名，其他的li都没有类名
  setCircles() {
    // 遍历，遍历0、1、2、3、4。每遍历一个数字，都要和idx比一下，如果相等，就把这项设置类名为current，否则去掉类名。
    for (let i = 0; i <= this.maxIndex; i++) {
      // 这里的%5非常巧妙，0、1、2、3、4除以5的余数都是它本身，但是5除以5等于0了。
      // 这里%5的目的就是为了右按钮它有一瞬间，idx会成为5，500毫秒之后才变为0。
      if (i == this.currIndex) {
        this.circle_lis[i].className = CURRENT_CLASS;
      } else {
        this.circle_lis[i].className = '';
      }
    }
  }

  // 自动切换
  autoplay() {
    const { autoplay } = this.options;
    if (autoplay <= 0) return;

    this.pause();
    this.autoplayTimer = setInterval(() => {
      this.next();
    }, autoplay);
  }

  // 暂停自动切换
  pause() {
    clearInterval(this.autoplayTimer);
  }

  // 开启动画
  openAnimation() {
    this.sliderContentEl.classList.add(SLIDER_ANIMATION_CLASS_NAME);
  }

  // 关闭动画
  closeAnimation() {
    this.setAnimationSpeed(0);
  }

  // 设置切换动画速度
  setAnimationSpeed(speed = this.options.speed) {
    this.sliderContentEl.style.transitionDuration = `${speed}ms`;
  }

  // 获取要移动的距离
  getDistance(index = this.currIndex) {
    return -this.itemWidth * index;
  }

  // 不带动画的移动
  move(distance) {
    this.sliderContentEl.style.transform = `translate3d(${distance}px, 0px, 0px)`;
    this.setCircles();
  }

  // 带动画的移动
  moveWithAnimation(distance) {
    this.setAnimationSpeed();
    this.move(distance);
    this.sliderContentEl.addEventListener(
      'transitionend',
      () => {
        this.closeAnimation();
        this.setCircles();
      },
      false
    );
  }

  // 为每个 slider-item 设置宽度
  setItemsWidth() {
    for (const item of this.sliderItemEls) {
      item.style.width = `${this.itemWidth}px`;
    }
  }

  // 为 slider-content 设置宽度
  setContentWidth() {
    this.sliderContentEl.style.width = `${this.itemWidth * this.sliderItemEls.length
      }px`;
  }

  // 获取修正后的索引值
  getCorrectedIndex(index) {
    if (index < this.minIndex) return this.maxIndex;
    if (index > this.maxIndex) return this.minIndex;
    return index;
  }
}

export default BaseSlider;
