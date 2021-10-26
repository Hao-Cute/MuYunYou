import DEFAULTS from "./defaults";

class BackToTop {
    constructor(el, options){
        // 实际参数
        this.options = {
            ...DEFAULTS,
            ...options
        };
        this.el = el;
        this.timer;
    }

    // 返回顶部移动
    move(){
        // 设表先关
        clearInterval(this.timer);
        // 设置定时器
        this.timer = setInterval(() => {
            document.documentElement.scrollTop -= this.options.stepLength;

            if (document.documentElement.scrollTop <= this.options.top) {
                clearInterval(this.timer);
            }
        }, this.options.stepTime);
    }

    // 隐藏显示
    hide() {
        // 卷动值
        let scrollTop = document.documentElement.scrollTop || window.scrollY;

        // 页面没有卷动，那么返回顶部按钮就隐藏掉
        if (scrollTop == this.options.top) {
            this.el.style.display = 'none';
        } else {
            this.el.style.display = 'block';
        }
    }
}


export default BackToTop;