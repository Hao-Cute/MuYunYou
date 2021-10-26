class Menu {
    constructor() {
        // 得到所有菜单触碰项li标签
        this.menu_lis = document.querySelectorAll('#v-menu li[data-n]');
        // 得到vmenubox盒子
        this.vmenubox = document.querySelector('#v-menu-box');
        // 得到所有menu菜单
        this.menus = document.querySelectorAll('#menus .menu');
    }

    // 显示菜单
    show(i) {
        // 所有菜单项去掉active类
        for (let j = 0; j < this.menus.length; j++) {
            this.menu_lis[j].className = '';
        }
        // 自己加active类
        this.menu_lis[i].className = 'active';
        // 让所有菜单隐藏，去掉active类
        for (let j = 0; j < this.menus.length; j++) {
            this.menus[j].className = 'menu';
        }
        // 让序号相同的菜单项添加menu类
        this.menus[i].className = 'menu active';
    }

    // 隐藏菜单
    hide() {
        // 让所有菜单隐藏
        for (let j = 0; j < this.menus.length; j++) {
            this.menus[j].className = 'menu';
        }
        // 所有菜单项去掉active类
        for (let j = 0; j < this.menus.length; j++) {
            this.menu_lis[j].className = '';
        }
    }
}

export default Menu;