<template>
    <header>
        <div id="container_wrap" :class="styleObj.container_wrap">
            <div id="container">
                <ul id="navigation_bar">
                    <li v-for="(item, index) in menu" :key="index">
                        <a id="menu" href="#" :class="styleObj.menu">{{item}}</a>

                        <div id="underscore" :class="styleObj.underscore">
                            <span id="arrow" :class="styleObj.arrow"></span>
                            <span id="line" :class="styleObj.line"></span>
                        </div>
                    </li>
                </ul>

                <img src="../assets/img/logo-trans.png" alt="" ref="changeIcon">
            </div>
        </div>
        
        <slot></slot>
    </header>
</template>

<script>
function getScrollTop() {
    let scroll_top = 0;
    scroll_top = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    return scroll_top;
}

export default {
    data(){
        return {
            menu:['首页', '资源集', '专题系列', '服务', 
            '资讯', '交流区', '捐赠', '关于'],
            styleObj:{
                container_wrap: {
                    'container_wrap-state1': true,
                    'container_wrap-state2': false
                },
                menu:{
                    'menu-state1': true,
                    'menu-state2': false
                },
                underscore: {
                    'underscore-state1': true, 
                    'underscore-state2': false,  
                },
                arrow: {
                    'arrow-state1': true,
                    'arrow-state2': false
                },
                line: {
                    'line-state1': true,
                    'line-state2': false
                }
            }
        }
    },
    methods:{
        resetStyle(){
            if (getScrollTop() !== 0){
                for (let attr in this.styleObj){
                    const keyArr = Object.keys( this.styleObj[attr] );
                    this.styleObj[attr][keyArr[0]] = false; 
                    this.styleObj[attr][keyArr[1]] = true; 
                    
                }
                
            }else {
                for (let attr in this.styleObj){
                    const keyArr = Object.keys( this.styleObj[attr] );
                    this.styleObj[attr][keyArr[0]] = true; 
                    this.styleObj[attr][keyArr[1]] = false;   
                    
                }
                
            }
        },
        

    },
    mounted(){
         
        window.addEventListener('scroll', this.resetStyle, true)
    }

}
</script>

<style scoped>
    @import '../assets/style/barState2.css';

    header{
        width: 100%;
    }
    
    a{
        color: #f66;
    }

    #container_wrap{
        width: 100%;
        position: fixed;
        z-index: 100;

    }

    #container{
        width: 96%;
        height: 88px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
    }

    #navigation_bar{
        display: flex;
        justify-content: space-around;
    }

    #menu{
        font-size: 20px;
        font-weight: bold;
        
        height: 100%;
        padding: 0 13px;

        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    #underscore{
        width: 100%;
        height: 20px;

        display: flex;
        flex-direction: column;

        position: relative;

        opacity: 0;
    }

    #menu:hover + #underscore{
        opacity: 1;
    }

    .container_wrap-state1{
        background: none;
    }

    .underscore-state1{
        /* -30px 使得下划线靠近文字下方 */
        top: -30px;
        transition: top 0.05s linear;
    }

    .menu-state1{
        color: #f66;
    }

    .menu-state2{
        color: #6B6B6B;
    }

    .menu-state1:hover{
        opacity: 0.75;
    }
    
    .menu-state2:hover{
        color: #222;
    }

    .arrow-state1{
        width: 0;
        height: 0;
        margin: 0 auto;
        border: 5px solid transparent;
        border-bottom: 5px solid #f66;
    }

    .line-state1{
        width: 75%;
        margin: 0 auto;
        border-bottom: 2px solid #f66;

        transition: width 0.05s linear;
    }
</style>