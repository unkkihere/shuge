<template>
    <div id="wrap" class="latest">
        <div id="left">
            <div id="left_wrap">

                <div id="bigIcon_wrap">
                    <i class="iconfont icon-jilu bigIcon"></i>
                </div>

                <div id="text_wrap">
                    <h3>最新资源集</h3>

                    <p>
                        新版已发布 374 套精选资源，你可以浏览所有资源或热门访问的资源
                    </p>
                </div>

                <div>
                    <div class="resource">
                        <a href="#">
                            <i class="iconfont icon-wenjianjia"></i>
                            所有资源
                        </a>
                    </div>

                    <div class="resource">
                        <a href="#">
                            <i class="iconfont icon-taiyang"></i>
                            热门资源
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div id="right">
            <ul id="paintings_above">
                <li 
                    class="painting_wrap"
                    v-for="item in images.slice(0,2)" :key="item._id"
                    :style="{backgroundImage: 'url('+ item.image +')'}"
                    >
                    <div class="wrap-mask">
                        <span class="painting-title" >{{item.title}}</span>
                    </div>              
                </li>
            </ul>

            <ul id="paintings_below">
                <li 
                    class="painting_wrap child"
                    v-for="item in images.slice(2)" :key="item._id"
                    :style="{backgroundImage: 'url('+ item.image +')'}"
                    :data-title="item.title"
                >
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Slider from '../../util/Slider'

export default {
    data(){
        return {
            images:[]
        }
    },
    methods: {
        appendStyleSheets(clsName, width){
            let rule = 
                `
                    .${clsName}::after{
                        width: ${width}px;
                    }
                `;
            const sheet = new CSSStyleSheet();
            sheet.insertRule(rule);
            
            document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
        }
    },
    created(){

        // 后面可以使用 async 和 await 来进行修改 
        axios
          .get('http://localhost:8080/api/catalog/paintings/latest')
          .then(
            response => {
                //懒加载
                this.images = response.data;
            },
            error => {
                console.log('请求失败，原因是：', error.message);
            })
          .then(
            () => {

                // 这个 nextTick 钩子函数很关键!!!
                this.$nextTick(() => {
                    
                    const slider = new Slider('paintings_below', 'child', 5000);
                    this.appendStyleSheets("child", slider.getInitWidth());
                    slider.start();
                })
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
        /* 高度先固定一个值，后面再变化 */
        height: 600px;
    }
    
    #left{
        background-color: #F8F8F8;
    }

    .resource:nth-child(1){
        background-color: #18B787;
        margin-right: 12px;
    }

    .resource:nth-child(2){
        background-color: #EDAE44;
    }

    #right {

        flex-direction: column;
    }

    #paintings_above{
        /* 以下两行代码不能去掉 */
        width: 100%;
        flex-grow: 1;

        display: flex;
        flex-direction: row;
        margin-bottom: 1px;     

    }

    #paintings_below{
        /* 以下两行代码不能去掉 */
        width: 100%;
        flex-grow: 1;

        display: flex;
        flex-direction: row;

        position: relative;

        overflow: hidden;
    }

    .painting_wrap{
        flex-grow: 1;
        margin-right: 1px;

        position: relative;
    }

    .child{
        position: absolute;
        transition: left .5s ease-in-out;
        
        width: 845px;
    }

    .child::after{
        content: attr(data-title);
        display: block;

        
        background: rgba(0, 0, 0, .4);

        color: white;
        font-size: 18px;
        font-weight: bold;

        height: 320px;
        line-height: 320px;
        text-align: center;
    }
</style>