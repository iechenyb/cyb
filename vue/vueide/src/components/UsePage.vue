<template>
  <div class="list">
    <template v-if="count">
      <ul>
        <li v-for="item in items">...</li>
      </ul>
      <mo-paging
        :page-index="currentPage"
        :total="count"
        :page-size="pageSize"
        @change="pageChange">
      </mo-paging>
    </template>
 </div>
</template>

<script type="es6">
  //import MoPaging from './aaa'  //应用自定义的 根目录可以引入
//  import MoPaging1 from './components/common/aaa'  //应用自定义的 多级目录存在访问问题！！！
  //alert(MoPaging);
  export default {
    //显示的声明组件
    components : {
    // MoPaging
    },
    data () {
      return {
        pageSize : 20 , //每页显示20条数据
        currentPage : 1, //当前页码
        count : 0, //总记录数
        items : []
      }
    },
    methods : {
      //获取数据
      getList () {
        //模拟
        let url = `/static/data/list.json/?pageSize=${this.pageSize}&currentPage=${this.currentPage}`
        this.$http.get(url)
          .then(({body}) => {
            alert(body);
            //子组件监听到count变化会自动更新DOM
            this.count = body.count
            this.items = body.list
          })
      },

      //从page组件传递过来的当前page
      pageChange (page) {
        this.currentPage = page
        this.getList()
      }
    },
    mounted() {
      //请求第一页数据
      this.getList()
    }
  }
</script>
<style>

</style>
