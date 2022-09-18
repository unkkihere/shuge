<template>
  <div id="app">
    <MyHeader>
      <img :src="bgImg.url" alt="" class="BgImg">
      <div class="BgImg-intro">^上背景图：{{bgImg.paintTitle}}局部</div>
    </MyHeader>

    <MyIntro/>

    <LatestLiterature/>

    <RandomLiterature/>

    <WorldMap/>

    <LatestNews/>

    <MyFooter/>

  </div>
</template>

<script>
import axios from 'axios'
import MyHeader from './components/MyHeader.vue'
import MyIntro from './components/MyIntro.vue'
import LatestLiterature from './components/LatestLiterature.vue'
import RandomLiterature from './components/RandomLiterature.vue'
import WorldMap from './components/WorldMap.vue'
import LatestNews from './components/LatestNews.vue'
import MyFooter from './components/MyFooter.vue'

export default {
  name: 'App',
  components: {
    MyHeader,
    MyIntro,
    LatestLiterature,
    RandomLiterature,
    WorldMap,
    LatestNews,
    MyFooter
  },
  data(){
    return {
      bgImg:{
        id:"",
        url:"",
        paintTitle:""
      }
    }
  },
  created(){
    axios
      .get('http://localhost:8080/api/catalog/bgpainting')
      .then(
        response => {
          this.bgImg.id = response.data[0]._id;
          this.bgImg.url = response.data[0].image;
          this.bgImg.paintTitle = response.data[0].title;
          
        },
        error => {
          console.log('请求失败，原因是：', error.message);
        }
      )
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  height: 3895px;

}

.BgImg{
  width: 100%;
  margin-top: -85px;

}

.BgImg-intro{
  height: 50px;
  line-height: 50px;
  padding: 0 50px;
  text-align: left;

  color: #999999;
}

</style>
