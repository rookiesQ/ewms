<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple"><img class="logo-img" src="../assets/logo.png" alt="" srcset=""></div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple">恒康微信test</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </el-header>
    <el-container>
    	<el-aside width="200px" class='color-c3cee0 theme-background-354052' >
    		 <el-menu
		      default-active="1"
		      class="el-menu-vertical-demo theme-background-354052"
		      text-color="#c3cee0"
		      active-text-color="#33cccc">
		      <el-menu-item index="1" @click='changeTab(0)'>
		        <span slot="title">公众号配置</span>
		      </el-menu-item>
		      <el-menu-item index="2" @click='changeTab(1)'>
		        <span slot="title">自定义菜单</span>
		      </el-menu-item>
		      <el-menu-item index="3" @click='changeTab(2)'>
		        <span slot="title">图文消息</span>
		      </el-menu-item>
		      <el-menu-item index="4" @click='changeTab(3)'>
		        <span slot="title">自动回复</span>
		      </el-menu-item>
		      <el-menu-item index="5" @click='changeTab(4)'>
		        <span slot="title">群发管理</span>
		      </el-menu-item>
		      <el-menu-item index="6" @click='changeTab(5)'>
		        <span slot="title">二维码推广</span>
		      </el-menu-item>
		    </el-menu>
    	</el-aside>
    	<el-main>
    		<router-view></router-view>
    	</el-main>
  	</el-container>
  </el-container>
</template>

<script>
  export default {
    name: "HelloWorld",
    data() {
      return {
        msg: "Welcome to Your Vue.js App",
        data_u:true,
        routerURL: ['publicSetting','','','autoReponse','QRCodePromote','QRCodePromote']
      };
    },
    mounted () {
    	console.log(this.data_u)
    },
    methods: {
      changeTab(index) {
      	let name = this.routerURL[index]
      	this.$router.push({name})
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  $Height:80px; // header height 
  $MiniHeight:60px; // header height 
  $HeaderBg:#409EFF; // header height 
  $Width:250px; // aside width 
  .el-header,.el-footer {
    background-color: $HeaderBg;
    color: #333;
    text-align: center;
  }
  .el-header{
    height: $Height!important;
    line-height: $Height;
    .logo-img {
      margin-top:8px; 
      float: left;
    }
  }
  .el-footer {
    height: $MiniHeight;
    line-height: $MiniHeight;
    position: absolute;
    bottom: 0;
    right: 0;
    left: $Width;
  }
  .el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    position: absolute;
    bottom: 0;
    width: $Width!important;
    top: $Height;
    .el-menu-vertical-demo{
      text-align: left
    }
  }
  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    position: absolute;
    top: $Height;
    left: $Width;
    bottom: 0;
    right: 0;
    padding:0;
    box-sizing:border-box;
  }
  body>.el-container {
    margin-bottom: 40px;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
 .color-c3cee0{color:#c3cee0;}
 .theme-background-354052{background:#354052;}
 .el-menu-item.is-active {
   background-color: #415c84 !important;
}
 .el-menu-item:hover {
   background-color: #415c84 !important;
}
</style>
