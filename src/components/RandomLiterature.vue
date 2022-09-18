<template>
    <div id="wrap" class="random">
        <div id="left">
            <div id="left_wrap">

                <div id="bigIcon_wrap">
                    <i class="iconfont icon-gufengwujianzhongguofengwenfangsibaoyantaimoyan_huaban_huaban bigIcon"></i>
                </div>

                <div id="text_wrap">
                    <h3>随机资源集</h3>

                    <p>
                        旧版约
                        <countTo 
                            :startVal='firstCnt.stVal' 
                            :endVal='firstCnt.edVal' 
                            :duration='firstCnt.dur' 
                            class="countTo"
                        ></countTo>套，
                        已整理未发布约
                        <countTo 
                            :startVal='secondCnt.stVal' 
                            :endVal='secondCnt.edVal' 
                            :duration='secondCnt.dur'
                            class="countTo"
                        ></countTo>套
                    </p>
                </div>

                <div>
                    <div class="resource">
                        <a href="#">
                            <i class="iconfont icon-wenjian"></i>
                            旧版资源
                        </a>
                    </div>

                    <div class="resource">
                        <a href="#">
                            <i class="iconfont icon-wenjianshangchuan"></i>
                            已整理未发布的资源
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div id="right">
            <ul id="paintings">
                <li 
                    class="painting_wrap" 
                    v-for="item in images" :key="item._id"
                    :style="{backgroundImage: 'url('+ item.image +')'}"
                >
                    <div class="wrap-mask">
                        <span class="painting-title" >{{item.title}}</span>
                    </div>
                    
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import countTo from 'vue-count-to'

export default {
    components: {
        countTo
    },
    data(){
        return {
            images:[],
            firstCnt: {
                stVal: 0,
                edVal: 1500,
                dur: 3000
            },
            secondCnt: {
                stVal: 0,
                edVal: 780,
                dur: 3000
            }
        }
    },
    created(){
        axios
          .get('http://localhost:8080/api/catalog/paintings/random')
          .then(
            response => {
                this.images = response.data;                 
            },
            error => {
                console.log('请求失败，原因是：', error.message);
            }
          )
    },
    mounted(){
    }
}
</script>

<style scoped>
@import '../assets/style/iconfont.css';
@import '../assets/style/resource.css';

#wrap{

    /* 高度先固定 */
    height: 400px;
}

#left{
    background-color: #F2F2F2;
}

.bigIcon{
    color: #00B07B;
}

.resource:nth-child(1){
    background-color: #FE7474;
    margin-right: 12px;
}

.resource:nth-child(2){
    background-color: #7BB0E7;
}

#paintings{
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    width: 100%;
}

.painting_wrap:nth-child(4n){
    margin-right: 0;
}

.painting_wrap{
    margin: 1px 1px 0 0;
    --each-width: calc((100% - 3px) / 4);
    width: var(--each-width);
    min-width: var(--each-width);
    max-width: var(--each-width);
    flex: 1;
    height: 50%;

}

.wrap-mask:hover{
    background-color: rgba(161, 158, 153, .9);
    transition: background-color .5s ease-in;
}

.wrap-mask{
    transition: background-color .5s ease-in;
}

.countTo{
    font-weight: bold;
    font-size: 16px;
}
</style>