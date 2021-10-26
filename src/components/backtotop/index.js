import './backtotop.css';
import BackToTop from './module';

const backEl = document.getElementById('backtotop');

const backtotop = new BackToTop(backEl);

// 返回顶部按钮的监听
backEl.addEventListener(
    'click',
    () => {
        backtotop.move()
    },
    false
);

// 监听页面的滚动
window.addEventListener(
    'scroll',
    () => {
        backtotop.hide()
    },
    false
);