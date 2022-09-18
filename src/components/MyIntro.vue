<template>
    <article id="intro-article" ref="article">

        <div class="intro-part">
            <i class="iconfont icon-kaifang icon-style" style="color: #0693e3"></i>
            <div>
                <h3 class="intro-title">完全开放</h3>
                <p class="part">
                    <strong style="color: #cf2e2e">书格</strong>是一个自由开放的在线古籍图书馆。致力于开放式分享、介绍、推荐有价值的古籍善本，并鼓励将文化艺术作品数字化归档。
                </p>
            </div>
        </div>

        <div class="intro-part">
            <i class="iconfont icon-yanhua icon-style" style="color: #00d084"></i>
            <div>
                <h3 class="intro-title">精心挑选</h3>
                <p class="part">
                    我们尽量挑选欣赏和在阅读价值较高的善本，所以我们更倾向于：艺术类、影像类、珍稀类以及部分刊印水平较高的书籍。
                </p>
            </div>
        </div>

        <div class="intro-part">
            <i class="iconfont icon-youxuanxiangmushijingzhanshi icon-style" style="color: #fe2d2d"></i>
            <div>
                <h3 class="intro-title">全力呈现</h3>
                <p class="part">
                    我们尽可能呈现书籍品貌、内容。借此计划让大家自由、免费地欣赏到那些难以现世的书籍。希望大家能从中感受到人类文明进程。
                </p>
            </div>
        </div>

        
    </article>
</template>

<script>
export default {
}
</script>

<style scoped>
    @import '../assets/style/iconfont.css';

    #intro-article{
        width: 98%;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        
    }
    
    .intro-part{
        
        line-height: 30px;
        text-align: justify;
        /* margin: 0 50px; */
        padding: 40px 50px;

        display: flex;

    }

    .intro-title{
        color: #222;
        font-size: 25px;
        font-weight: bold;
        margin-bottom: 8px;
    }

    i.icon-style{
        font-size: 50px;
        margin-right: 22px;
    }

    .part{
        line-height: 25px;
        font-size: 16px;
    }

</style>