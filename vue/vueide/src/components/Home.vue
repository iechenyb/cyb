<template>
  <div><!--class="hello" 样式scope id="cyb" 表达式为啥必须写到第一个div里边，否则无法渲染！-->
    <h1>{{ msg }}</h1>
    <h2>静态副标题</h2>
    跨域读取角色信息：{{roles}}<br>
    <div @click="showAjax()" >刷新(ajax返回并更新数据测试)</div>
      <table border="1">
        <tr><td colspan="3"><div @click="showData()" >刷新角色(ajax返回并更新数据测试)</div></td></tr>
        <tr><td>无权限跨域请求：</td><td>get数据：{{getString}}</td><td>postString:{{postString}}</td></tr>
        <tr><td>需权限跨域请求：</td><td>get数据：{{getString1}}</td><td>postString:{{postString1}}</td></tr>
        <tr><td colspan="3">登录之后的请求数据：{{dataAfterLogin}}</td></tr>
      </table>
    数字list(静态的数据测试)：<span v-for="item in items">
      {{ item }}
    </span><br>
    公告(内容动态展示,点击标题查看):
    <ul class="clist">
      <li v-for="(item,index) in dlist" @click="listClick3(index)" :class="{selected: item.isturn}">
        {{item.title}}
        <span v-for="di in item.data" v-show="item.isturn" @click.stop="">{{di}}</span>
      </li>
    </ul>
    <!--<span>{{staticJSONData}}</span>-->
    <table border="1">
      <tr><td colspan="3"><div @click="readFile()" >读取本地角色信息</div></td></tr>
      <tr><th>标识</th><th>角色名</th><th>角色描述</th></tr>
      <tr v-for="item in staticJSONData"><td>{{item.id}}</td><td>{{item.roleName}}</td><td>{{item.description}}</td></tr>
    </table>
  </div>
</template>
<script>
 let val=1;
export default {
  name: 'Home',
 // el :'cyb',
 data () {
   return {
     msg: 'vue基础学习！',
     dlist: [{
       title: '公告标题1',data: ['公告内容1']
     },{
       title: '公告标题2',data: ['公告内容2']
     },{
       title: '公告标题3',data: ['公告内容3']
     }
     ],
     items:[1,2,3,4,5],
     roles:[9,8,7,6,5,4] ,// 如何通过方法设置值
     staticJSONData:'',
     getString:'',
     postString:'',
     getString1:'default',
     postString1:'default',
     dataAfterLogin:'default'
   }
 },
  mounted: function () {
    this.showData() //, this.readFile()
    ,this.showAjax()
    // 需要执行的方法可以在mounted中进行触发，其获取的数据可以赋到data中后，可以放在前面进行渲染
    //https://blog.csdn.net/YmwWow/article/details/83511723
  },
  methods: {
    readFile:function(){
      const self = this;
      /*const reader = new FileReader();
      var file="data/data.json"
      //将文件以文本形式读入页面
      reader.readAsText(file);
      reader.onload=function(f){
        console.log("文件内容："+f)
      }*/
      this.$http.get('static/data/data.json').then(res => {
        console.log("json数据为:" + res.body)//此处的res对象包含了json的文件信息和数据，我们需要的json数据存在于body属性中
        self.staticJSONData = res.body.d.list;
      });
      console.log("读文件");
    },
    listClick3: function(index){
      const _title = this.dlist[index].title,
        _data = this.dlist[index].data,
        _isturn = !this.dlist[index].isturn;
      this.dlist.splice(index,1,{title:_title,data:_data,isturn:_isturn});
    },
    showAjax(){
      const url224 = 'http://192.168.16.211:8094/';//http://192.168.16.211:8094/
      this.$axios.defaults.baseURL="";
      console.log("￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥")
      const self = this;//获取当前上线文对象
      //实现跨域访问 user/logout
      this.$axios.get(this.getUrl(url224+"rsa/getPublicKey")).then(function (response) {
        console.log("返回角色数据："+response.data);
        self.getString1 = response.data.ec==0?"success":"failed";
      }).catch(function (error) {
        console.log("执行错误："+error);
      });
      //post请求
      /*this.$axios.post('http://192.168.16.211:8094/user/add', {
        "id": 0,
        "empno":"aaaa",
        "isEffect": 0
      })*/
      const pass = 'aXLbPpRsbnc9Uc56lz7KG5pHXU2VsDjOCJnMIpROWiBZAM3VbutsgpesxYQVvrsy2cL31EOmTSGus/hPbtk5hMfIgpNCRllaJwOXNybf2sfBvA3/whaA1WyQCmR2zA0EyKFRYaJWbdyOUNX3yne34If1jIGag7pS1/YkG36Emqk=';
      const  AXIOS = this.$axios;
      //模拟登录  成功！
      this.$axios.get(url224+'user/login?username=del&password='+pass, {/*
        "username": "del",
        "password":"dtQ1GFUNHwiiM0ZWU6toIRTIkAzDNpf78L+wB7KM2id8Td9MO84VQVDNldlreKpIoQf5/f0qbKHXjaNpiEOrhi1fzlKVhIiFM6s9pnD5HKqlNAwxaEUSD9JghUOKIyZaa31SB2ZKLfRRLiC906BAOs7gN1uhdx3dD98vrObB5L4=",
        "isEffect": 0
      */})
        .then(function (response) {
          self.postString1 = response.data;
          console.log("user add:"+response.data);
          AXIOS.get(url224+"user/infor")
              .then(function (response) {
              console.log("登录之后请求数据："+response.data);//提示会话过期
              self.dataAfterLogin = response.data;
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    showData: function () {
      // alert(0);
      const self = this;//获取当前上线文对象
      //实现跨域访问
      this.$axios.get(this.getUrl("/api/query?username=123")).then(function (response) {
        console.log("返回角色数据："+response.data);
        if(val == 1){
          self.getString = response.data;
          val=2;
          console.log("填充值！");
        }else{
          self.getString =[];
          val=1;
          console.log("置空");
        }

      }).catch(function (error) {
        console.log(error);
      });
      //post请求
      this.$axios.post('/api/postRequestBodyObject', {
        "roles": [
          "iechenyb"
        ],
        "userId": 1000,
        "userName": "adfsdf"
      })
        .then(function (response) {
          self.postString = response.data;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

     /* function firstResquest() {
        return axios.get('/test/123');
      }

      function secondResquest() {
        return axios.get('/test/abc');
      }

      axios.all([firstResquest(), secondResquest()])
        .then(axios.spread(function (first, second) {
          // 两个请求都执行完成
        }));*/

      /*var config = {
        method: 'post',
        url: '/test/12345',
        data: {//传递的参数
          aid: '123',
          bid: 'abc'
        }
        headers: {//指定响应头
          "Content-Type": "application/json;charset=utf-8",
          "Accept": "application/json"
        }
      }
      this.$axios(config);*/

    }//end showdata
  }
}
</script>
<!-- 可以省略 scoped-->
<style scoped>
</style>
