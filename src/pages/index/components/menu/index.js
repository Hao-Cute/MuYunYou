import './menu.css';
import Menu from './module';

const menu = new Menu();

// 批量添加监听
for (let i = 0; i < menu.menu_lis.length; i++) {
    // 鼠标触碰某个菜单项
    menu.menu_lis[i].addEventListener(
        'mouseenter',
        () => menu.show(i),
        false
    );
}

// 鼠标离开整个vmenubox盒子
menu.vmenubox.addEventListener(
    'mouseleave',
    () => menu.hide(),
    false
);