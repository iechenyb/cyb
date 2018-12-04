
<template>
  <div >

    <div id="header">
      <h1>头部</h1>
    </div>

    <div id="nav">

      <button @click="myFileList">我的文件列表</button>
      <button @click="myCollectList">收藏列表</button>
      <button @click="downList">文件下载列表</button>

    </div>

    <div id="section">

      <component :is="view" ></component>

    </div>

    <div id="footer">
      Copyright
    </div>

  </div>
</template>
<script>
  //这里就是自己定义的组件，把需要加载的组件全部写在这里
  import fileList from './fileList.vue'
  import collect from './CollectList.vue'
  import downFile from './downList.vue'
  export default {
    data(){
      return {
        view: 'v-filelist'
      }
    },
    methods: {
      myFileList(){
        this.view = 'v-filelist'; //切换组件
      },
      myCollectList(){
        this.view = 'v-collect';
      },
      downList(){
        this.view = 'v-downFile';
      }
    },
    components: {
      'v-filelist': fileList,//注册组件
      'v-collect':collect,
      'v-downFile':downFile
    }
  }
</script>
