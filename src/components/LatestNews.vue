<template>
  <div id="container">
    <div id="division">
      <div id="line"></div>
    </div>

    <div id="news">

      <h3 id="title">最新资讯</h3>
      <ul id="slide-container">
          <li class="slide-wrap" v-for="item in newsList" :key="item.title">
            <div class="slide-pic">
              <button 
                class="control" id="previous"
                v-if="newsList.indexOf(item) === 0" 
                @click="changeFlag">上一页</button>
              <button 
                class="control" id="next"
                v-if="newsList.indexOf(item) === 2" 
                @click="changeFlag">下一页</button>
              <img :src="item.pic" alt="">
            </div>
            <a class="slide-text" href="#">{{item.title}}</a>
          </li>
      </ul>
      
    </div>

    <div id="animation">
      <canvas id="canvas" width="1900" height="200"></canvas>
    </div>

  </div>
</template>

<script>

export default {
  data(){
    return {
      news:[
        {
          title: "九周年，韭曰丰本",
          pic: "https://new.shuge.org/wp-content/uploads/2022/05/9nian-710x375.jpg"
        },
        {
          title: "停止支持阿里云盘下载节点",
          pic: "https://new.shuge.org/wp-content/uploads/2022/04/xalyp-710x375.jpg"
        },
        {
          title: "八周年，拔茅连茹",
          pic: "https://new.shuge.org/wp-content/uploads/2021/05/banian-710x375.png"
        },
        {
          title: "七周年，期乎千里",
          pic: "https://new.shuge.org/wp-content/uploads/2020/05/qizhounian-710x375.jpg"
        },
        {
          title: "停止支持百度网盘下载节点",
          pic: "https://new.shuge.org/wp-content/uploads/2020/04/beifeng-710x375.jpg"
        },
        {
          title: "中华传统文化典籍保护传承大展",
          pic: "https://new.shuge.org/wp-content/uploads/2019/09/guobaojiguang001-710x375.jpg"
        }
      ],
      // 代表当前的新闻列表是第几页
      flag:true,
    }
  },
  computed:{
    newsList(){
      if (this.flag){
        return this.news.slice(0, 3);
      }else {
        return this.news.slice(3);
      }
    }
  },
  methods:{
    changeFlag(){
      this.flag = !this.flag;
    }
  },
  mounted(){
    
    const pic = new Image();
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');
    pic.src = require('../assets/img/tongbi.png');
    pic.onload = function () {
        
        init(60);
        draw(5, 20, 60, 1900, 200, 100);


    };

    function init(r){
        ctx.translate(r, r);

        ctx.drawImage(pic, -r, -r, r*2, r*2);
    }

    /**
         *  a: 每次旋转的角度
         *  s: 球水平方向平移的距离
         *  r: 球的半径
         *  w: 画布宽度
         *  h: 画布高度
         *  wait: 间隔时间
         *  
         */ 
    function draw(a, s, r, w, h, wait){
      let angle = 0;  //旋转的角度
      let shift = 0;  //水平位移
      let acuAngle = 0;    //x 轴与水平方向的夹角            
      
      setInterval(() => {
        ctx.clearRect(-r, -r, r*2, r*2);
          
          angle += a;
          acuAngle += angle;
          shift += s;
          if (shift >= w) {
            //重置画布
            canvas.width = w;
            canvas.height = h;

            
            angle = 0;
            acuAngle = 0;
            shift = 0;
            ctx.translate(r, r);
            ctx.drawImage(pic, -r, -r, r*2, r*2);
          }
          else {

            ctx.rotate(angle * Math.PI / 180);
            ctx.translate(s * Math.cos(acuAngle * Math.PI / 180), -s * Math.sin(acuAngle * Math.PI / 180));
            ctx.drawImage(pic, -r, -r, r*2, r*2);
          }
          
          
      }, wait)
    }


  }
}
</script>

<style scoped>
#container{
  margin-top: 100px;
}

#division{
  height: 10px;
  margin-bottom: 50px;
}

#line{
  width: 100%;
  box-shadow: 0 0 4px 1px #7e7b7b;
  transform: rotate(-3deg);
}

#news{
  width: 90%;
  margin: 0 auto;

  position: relative;
}

#title{
  margin-bottom: 40px;
  text-align: center;
}


#slide-container{
  display: flex;
  flex-direction: row;
  justify-content: center;

}


.slide-wrap{
  width: 300px;
  position: relative;
  margin-right: 70px;
}

.slide-wrap:last-child{
  margin-right: 0;
}

.slide-pic{
  display: block;
  margin: 10px 0;

  position: relative;

}

.slide-pic img{
  width: 100%;
  border-radius: 5px;
  
}

.slide-text{
  
  color: #222222;
  font-weight: bold;
  font-size: 18px;
  float: left;

}


.control{
  /* 去掉 button 的默认样式 */
  margin: 0;
  padding: 0;
  border: 1px solid transparent;
  outline: none;

  position: absolute;
  color: #222222;
  font-size: 16px;
  font-weight: 400;
  top: 45%;
}

#next{
  right: 0;
}

#animation{
  margin-top: 20px;
  overflow: hidden;
}

#canvas{
  float: left;
}

</style>