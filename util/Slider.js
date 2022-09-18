class Slider{
    constructor(id, childClsName, cycle = 3000){
        this.container = document.getElementById(id);
        this.items = Array.from(this.container.querySelectorAll(`.${childClsName}`));

        this.cycle = cycle;
        
        //差分数组
        this.diff = Array(this.items.length).fill(this.getRollWidth());


        this.container.addEventListener('mouseover', evt => {
            this.stop();

            let eleIsMouseOver = evt.target;

            let idx = this.items.indexOf(eleIsMouseOver);            
            this.itemMove(idx);

        });

        this.container.addEventListener('mouseout', evt => {
            this.start();

            this.init();
        });

        this.init();
        
    }

    //设置初始每幅画的展示
    init(){
        this.items.forEach((el, index) => {
            el.style.left = this.getInitWidth() * index + "px";
        })
    }


    //获取初始状态每幅画展示的长度
    getInitWidth(){
        return getDomWidth(this.container) / this.items.length;
    }

    //获取画收起来时的宽度
    getRollWidth() {
        const part = this.items.length - 1;
        const rst =  ( getDomWidth(this.container) - getDomWidth(this.items[0]) ) / part;
        return rst;
    }

    //实现 items 移动
    itemMove(idx){
        let initVal = this.diff[idx];
        this.diff[idx] = getDomWidth(this.items[0]);
        let sum = 0;
        this.items.forEach((item, index) => {
            item.style.left = sum + "px";
            sum += this.diff[index];
        })
        this.diff[idx] = initVal;
    }

    //实现轮播
    start(){
        this.stop();
        
        let index = 0;
        this._timer = setInterval(() => {
            this.itemMove(index);

            index = (index + 1) % this.items.length;
        }, this.cycle);
    }

    //停止轮播
    stop(){
        clearInterval(this._timer);
    }
}

function getDomWidth(ele){
    return ele.clientWidth;
}


export default Slider;