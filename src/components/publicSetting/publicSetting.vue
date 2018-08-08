<template>
    <div>
    	<el-container>
	        <div class='graphic_message_head text-align-left'>
	          <img src="/static/image/login/wechat.png" class='graphic_message_head_img' alt="" />
	          <h3 class='text-align-left'>恒康科技</h3>
	          <span class='wechart_type'>服务号</span>
	          <div class='graphic_message_setting'>
	            <span class="el-icon-bell color-icon"></span>
	            <span class="el-icon-setting color-icon"></span>
	          </div>
	        </div>
       </el-container>
       <!---->
        <div class='graphic_message'>
       <div class='flexbox-vertical height-100 position-realtive'>
       		 <el-tabs class= 'flex-item' active-text-color="#33cccc" v-model="activeName" @tab-click="handleClick">
       		 	  <!--图文消息-->
			      <el-tab-pane label="图文消息" name="first">
			      	 <el-row class='overflow-hidden padding-vertical-top-15'>
			      	 	<div v-show='!graphic_message[0].isLocal'>
			      	 		<el-button class='float-left weChart_simulcast' type="primary">同步微信</el-button>
			      	 	</div>
			      	 	<div v-show='graphic_message[0].isLocal'>
			      	 		<el-button class='float-left weChart_simulcast' type="primary">新建图文</el-button>
			      	 		<el-button class='float-left weChart_simulcast' type="primary">上传微信</el-button>
			      	 	</div>
			      	 	<div class="search_input_wapper float-right" @keyup.enter="submitSearch">
                            <el-input
                                v-model="SearchKey"
                                placeholder="输入标题或作者来搜索图文"
                                class="search_input">
                                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                        </div>
			      	 </el-row>
			      	  <el-row class='font-size-13 graphic_message_row_head'>
			      	  	<el-col :span='12' class='text-align-left'>
			      	  		图文消息： 44/5000
			      	  		<span class='color-999 cursor-pointer graphic_message_row_changeList'>
				      	  		<i @click='changeList(graphic_message[0].index,0)' class='iconfont font-size-20 icon-caidan1'></i>
				      	  		<i @click='changeList(graphic_message[0].index,1)' class='iconfont font-size-20 icon-caidan'></i>
			      	  		</span>
			      	  	</el-col>
			      	  	<el-col :span='12' style='padding-right:16px;' class='text-align-right color-999'>
			      	  		<i class='iconfont icon-icon-refresh font-size-23 cursor-pointer'></i>
			      	  		<i class='iconfont padding-horizontal-both-10 icon-paixu font-size-23 cursor-pointer'></i>
			      	  		<i class='iconfont icon-piliangchuli font-size-28 cursor-pointer'></i>
			      	  	</el-col>

			      	  </el-row>
			      	  <!--详情页面-->
			      	  <div v-show='graphic_message[0].showList'>
				      	  <el-row class='font-size-13 graphic_message_row_editor'>
				      	  	<el-col :span='12' class='text-align-left'>
				      	  		<span>批量编辑&nbsp;1</span>
				      	  		<span class='select_all color-33cccc cursor-pointer'>全选</span>
				      	  		<span class='color-33cccc cursor-pointer'>反选</span>
				      	  	</el-col>
				      	  	<el-col :span='12' class='text-align-right'>
				      	  		<span class='color-33cccc cursor-pointer'>上传</span>
				      	  		<span class='color-33cccc cursor-pointer graphic_message_row_allot'>分配</span>
				      	  		<span class='color-33cccc cursor-pointer'>删除</span>
				      	  		<span class='iconfont icon-shanchu cursor-pointer'></span>

				      	  	</el-col>
				      	  </el-row>
				      	  <!--列表页面-->
				      	 <!---->
				      	 <el-row :gutter="10">
			      	 	<el-col class='graphic_message_col' :span="6" v-for="(o, index) in 8" :key="o" :offset="index > 0 ? 0 : 0">
						    <el-card :body-style="{ padding: '0px' }">
						      <el-row class='graphic_message_comapny_level'>
						      	<el-col :span='12' class='text-align-left'>公司等级</el-col>
						      	<el-col :span='12' class='text-align-right'>
						      		 <el-checkbox v-model='first' :fill='checkedColor' ></el-checkbox>
						      	</el-col>
						      </el-row>
						      <img src="/static/image/login/bg.jpg" class="graphic_message_image">
						      <div class='text-align-left' style="padding: 14px; padding-top:0;">
						        <span class='graphic_message_comapny_detail'>新会员等级规则公布</span>
						        <div class="bottom">
						          <el-row>
						          	<el-col :span='12' class='text-align-left font-size-13 color-999'>更新于07/23</el-col>
						          	<el-col :span='12' class='text-align-right color-999'>
						          		<i class='iconfont icon-fuzhilianjie color-999 cursor-pointer'></i>
						          		<i class="iconfont icon-xiugaiziliao color-999 cursor-pointer"></i>
										<i class="iconfont icon-copy color-999 cursor-pointer"></i>
						          		<i class='iconfont icon-delete color-999 cursor-pointer'></i>
						          	</el-col>
						          </el-row>
						        </div>
						      </div>
						    </el-card>
						  </el-col>
			      	 </el-row>
			     	 </div>
			      	  <!--列表页面-->
			      	  <div v-show='!graphic_message[0].showList'>
			      	  		<el-table :data="column" :header-cell-style="rowClass" border style="width: 100%" @selection-change="handleSelectionChange">
								<el-table-column align='center' type="selection" label="" width="50"></el-table-column>
								<el-table-column align='center' prop="name" label="封面">
									<template slot-scope="scope">
										<img :id="1" class="update-icon" style='display:inline-block;width:108px;height:60px;'  src="/static/image/login/bg.jpg" />
									</template>
								</el-table-column>
								<el-table-column align='center' prop="title" width="250" label="标题"></el-table-column>
								<el-table-column align='center' prop="status" label="状态"></el-table-column>
								<el-table-column align='center' prop="link" label="原文链接"></el-table-column>
								<el-table-column align='center' prop="operaData" label="操作日期"></el-table-column>
								<el-table-column align='center' prop="opera" width="250" label="操作">
									<template slot-scope="scope">

										<i class='iconfont icon-fuzhilianjie color-999 cursor-pointer'></i>
						          		<i class="iconfont icon-xiugaiziliao color-999 cursor-pointer"></i>
										<i class="iconfont icon-copy color-999 cursor-pointer"></i>
						          		<i class='iconfont icon-delete color-999 cursor-pointer'></i>

									</template>
								</el-table-column>
							</el-table>
			      	  </div>
			      	  <div class='graphic_message_page_show'>
			         	<el-row class='text-align-right'>
			         		 <el-pagination
						      @size-change="handleSizeChange"
						      @current-change="handleCurrentChange"
						      :current-page="1"
						      :page-sizes="[10, 20, 30, 40]"
						      :page-size="10"
						      layout="total, sizes, prev, pager, next, jumper"
						      :total="80">
						    </el-pagination>
			         	</el-row>
			         </div>
			      	  <!---->
			      </el-tab-pane>
			      <!---->
			      <!--图片-->
			      <el-tab-pane label="图片" name="second">
			      	 <el-row class='overflow-hidden padding-vertical-top-15'>
			      	 	<div v-show='!graphic_message[1].isLocal'>
			      	 		<el-button class='float-left weChart_simulcast' type="primary">同步微信</el-button>
			      	 	</div>
			      	 	<div v-show='graphic_message[1].isLocal'>
			      	 		<el-button class='float-left weChart_simulcast' type="primary">新建图文</el-button>
			      	 		<el-button class='float-left weChart_simulcast' type="primary">上传微信</el-button>
			      	 	</div>
			      	 	<div class="search_input_wapper float-right" @keyup.enter="submitSearch">
                            <el-input v-model="SearchKey" placeholder="输入标题或作者来搜索图文" class="search_input">
                                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                        </div>
			      	  </el-row>
			      	  <el-row class='font-size-13 graphic_message_row_head'>
			      	  	<el-col :span='12' class='text-align-left'>
			      	  		图文消息： 44/5000
			      	  		<span class='font-size-18 color-999 cursor-pointer graphic_message_row_changeList'>

				      	  		<i @click='changeList(graphic_message[1].index,0)' class='iconfont font-size-20 icon-caidan1'></i>
				      	  		<i @click='changeList(graphic_message[1].index,1)' class='iconfont font-size-20 icon-caidan'></i>
			      	  		</span>
			      	  	</el-col>
			      	  	<el-col :span='12' style='padding-right:16px;' class='text-align-right font-size-23 color-999'>
			      	  		<i class='iconfont icon-icon-refresh font-size-23 cursor-pointer'></i>
			      	  		<i class='iconfont padding-horizontal-both-10 icon-paixu font-size-23 cursor-pointer'></i>
			      	  		<i class='iconfont icon-piliangchuli font-size-28 cursor-pointer'></i>
			      	  	</el-col>

			      	  </el-row>
			      	  <el-row>
			      	  	<el-col :span='24' class='text-align-center cursor-pointer font-size-18 color-999'>
			      	  		<el-popover placement="bottom" width="400" v-model='show_classify' trigger="click">
							  <el-row>
							  	<el-col :span='12'>查看分类</el-col>
							  	<el-col :span='12' class='text-align-right font-size-18'>
							  		<span @click='show_classify=false' class='el-icon-circle-close'></span>
							  	</el-col>
							  </el-row>
							  <el-input
                                v-model="SearchClassify"
                                placeholder="搜索分类"
                                class="search_input">
                                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                              </el-input>
                              <el-row>
                              	<el-col :span='12'>查看分类</el-col>
							  	<el-col :span='12' class='text-align-right font-size-18'>
							  		<span @click='show_classify=false' class='el-icon-circle-close'></span>
							  	</el-col>
                              </el-row>
							  <el-button slot="reference">全部分类(540) <span class='el-icon-caret-bottom'></span></el-button>
							</el-popover>
			      	  	</el-col>
			      	  </el-row>
			      	  <!--详情页面-->
			      	  <div v-show='graphic_message[1].showList'>
				      	  <el-row class='font-size-13 graphic_message_row_editor'>
				      	  	<el-col :span='12' class='text-align-left'>
				      	  		<span>批量编辑&nbsp;1</span>
				      	  		<span class='select_all color-33cccc cursor-pointer'>全选</span>
				      	  		<span class='color-33cccc cursor-pointer'>反选</span>
				      	  	</el-col>
				      	  	<el-col :span='12' class='text-align-right'>
				      	  		<span class='color-33cccc cursor-pointer'>上传</span>
				      	  		<span class='color-33cccc cursor-pointer graphic_message_row_allot'>分配</span>
				      	  		<span class='color-33cccc cursor-pointer'>删除</span>
				      	  		<span class='iconfont icon-shanchu cursor-pointer'></span>

				      	  	</el-col>
				      	  </el-row>
				      	  <!--列表页面-->
				      	 <!---->
				      	 <el-row :gutter="10">
			      	 		<el-col class='graphic_message_col' :span="6" v-for="(o, index) in 8" :key="o" :offset="index > 0 ? 0 : 0">
							    <el-card :body-style="{ 'padding': '0',paddingTop: '10px' }">
							      <img src="/static/image/login/bg.jpg" class="graphic_message_image">
							      <div class='text-align-left' style="padding: 14px; ">
							        <div class="bottom">
							          <el-row>
							          	<el-col :span='16' class='text-align-left font-size-13 color-999'>新会员等级规则公布</el-col>
							          	<el-col :span='8' class='text-align-right color-999'>

											<i class="el-icon-more cursor-pointer font-size-20"></i>

							          	</el-col>
							          </el-row>
							        </div>
							      </div>
							    </el-card>
						  </el-col>
			      	 	</el-row>
			     	 </div>
			      	  <!--列表页面-->
			      	  <div v-show='!graphic_message[1].showList'>
			      	  		<el-table :data="column_picture" :header-cell-style="rowClass" border style="width: 100%" @selection-change="handleSelectionChange">
								<el-table-column align='center' type="selection" label="" width="50"></el-table-column>
								<el-table-column align='left' prop="name" label="名称" width='580'>
									<template slot-scope="scope">
										<img :id="1" class="update-icon" style='display:block;float:left;width:108px;height:60px;'  :src="scope.row.name.picURL" />
										<span style='display:block;height:60px;float:left;line-height:60px;margin-left:20px;'>{{scope.row.name.picName}}</span>
									</template>
								</el-table-column>
								<el-table-column align='center' prop="operaData" label="操作日期"></el-table-column>
								<el-table-column align='center' prop="opera" width="250" label="操作">
									<template slot-scope="scope">

										<span class='font-size-12 color-33cccc cursor-pointer'>重命名</span>
										<span class='font-size-12 color-33cccc cursor-pointer'>移动分组</span>
										<span class='font-size-12 color-33cccc cursor-pointer'>删除</span>

									</template>
								</el-table-column>
							</el-table>
			      	  </div>
			      	  <div class='graphic_message_page_show'>
			         	<el-row class='text-align-right'>
			         		 <el-pagination
						      @size-change="handleSizeChange"
						      @current-change="handleCurrentChange"
						      :current-page="1"
						      :page-sizes="[10, 20, 30, 40]"
						      :page-size="10"
						      layout="total, sizes, prev, pager, next, jumper"
						      :total="80">
						    </el-pagination>
			         	</el-row>
			         </div>
			      	  <!---->
			      </el-tab-pane>
			      <!---->
			      <!--语音-->
			      <el-tab-pane label="语音" name="third">
			      	  <el-row class='overflow-hidden padding-vertical-top-15'>
			      	 	<div v-show='!graphic_message[2].isLocal'>
			      	 		<el-button class='float-left weChart_simulcast' type="primary">同步微信</el-button>
			      	 	</div>
			      	 	<div v-show='graphic_message[2].isLocal'>
			      	 		<el-button class='float-left weChart_simulcast' type="primary">新建图文</el-button>
			      	 		<el-button class='float-left weChart_simulcast' type="primary">上传微信</el-button>
			      	 	</div>
			      	 	<div class="search_input_wapper float-right" @keyup.enter="submitSearch">
                            <el-input
                                v-model="SearchKey"
                                placeholder="输入标题或作者来搜索图文"
                                class="search_input">
                                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                        </div>
			      	  </el-row>
			      	  <el-table :data="column_voice" :header-cell-style="rowClass" border style="width: 100%;marginTop: 10px;" @selection-change="handleSelectionChange">
							<el-table-column align='center' type="selection" label="" width="50"></el-table-column>
							<el-table-column align='left' prop="name" label="名称"></el-table-column>
							<el-table-column align='left' prop="time" label="创建时间"></el-table-column>
							<el-table-column align='center' prop="operaData" label="操作日期"></el-table-column>
							<el-table-column align='center' prop="opera" width="250" label="操作">
								<template slot-scope="scope">

									<span class='font-size-12 color-33cccc cursor-pointer'>重命名</span>
									<span class='font-size-12 color-33cccc cursor-pointer'>移动分组</span>
									<span class='font-size-12 color-33cccc cursor-pointer'>删除</span>

								</template>
							</el-table-column>
						</el-table>
			      	  <div class='graphic_message_page_show'>
			         	<el-row class='text-align-right'>
			         		 <el-pagination
						      @size-change="handleSizeChange"
						      @current-change="handleCurrentChange"
						      :current-page="1"
						      :page-sizes="[10, 20, 30, 40]"
						      :page-size="10"
						      layout="total, sizes, prev, pager, next, jumper"
						      :total="80">
						    </el-pagination>
			         	</el-row>
			         </div>
			      </el-tab-pane>
			      <!---->
			      <!--视频-->
			      <el-tab-pane label="视频" name="fourth">4</el-tab-pane>
			      <!---->
			   </el-tabs>
		     <div class='graphic_change_tab'>
	        	<button :class='{"tab_active": isLocal}' @click='changeLocal(0)' class='graphic_change_tab_button'>本地</button>
	        	<button :class='{"tab_active": !isLocal}' @click='changeLocal(1)' class='graphic_change_tab_button'>微信</button>
	         </div>
       </div>

    </div>
       <!---->
    </div>

</template>
<script>
 export default {
    data() {
      return {
        data2: '',
        value2: [],
        isLocal: false,
        graphic_message: [{isLocal: false,index: 0,showList: false},{isLocal: false,index: 1,showList: false},{isLocal: false,index: 2,showList: false},{isLocal: false,index: 3,showList: false}],
        isCollapse: true,
        activeName: 'first',
        checkedColor: '#33cccc',
        SearchKey: '',
        showList: true,
        rowClass: {background:'#e4e4e4'},
        show_classify: false,
        SearchClassify: '',
        first: '',
        filterMethod(query, item) {
          return item.pinyin.indexOf(query) > -1;
        },
        tableData: [],
        column: [{
          input: '',
          inputStatu: false,
          name: '王小虎',
          title: '这是一个很长的标题',
          status: '已上传',
          link: 'www.baidu.com',
          operaData: '2018-10-22',
          opera: '操作'
        },
        {
          input: '',
          inputStatu: false,
          name: '王小虎',
          title: '这是一个很长的标题',
          status: '已上传',
          link: 'www.baidu.com',
          operaData: '2018-10-22',
          opera: '操作'
        },{
          input: '',
          inputStatu: false,
          name: '王小虎',
          title: '这是一个很长的标题',
          status: '已上传',
          link: 'www.baidu.com',
          operaData: '2018-10-22',
          opera: '操作'
        },{
          input: '',
          inputStatu: false,
          name: '王小虎',
          title: '这是一个很长的标题',
          status: '已上传',
          link: 'www.baidu.com',
          operaData: '2018-10-22',
          opera: '操作'
        }],
        column_picture:[{
          	operaData: '2018-10-22',
          	name: {
          		picURL: '/static/image/login/bg.jpg',
          		picName: '图片一'
          	}
        }],
        column_voice:[{
          	name: '王小虎',
          	time: '60分钟',
          	operaData: '2018-10-22',
          	opera: '操作'
        }],
        gridData: []
      };
    },
    methods: {
    	handleClick(tab,event) {
    		console.log(tab, event);
    		console.log(tab.index)
    	},
    	handleSizeChange(val) {
	        console.log(`每页 ${val} 条`);
	    },
	    handleCurrentChange(val) {
	        console.log(`当前页: ${val}`);
	    },
	    submitSearch() {

	    },
	    changeList(tabIndex,index) {
	    	if (index == 0) {
	    		this.graphic_message[tabIndex].showList = true
	    	} else {
	    		this.graphic_message[tabIndex].showList = false
	    	}
	    },
	    handleSelectionChange(val) {
	    	console.log(val)
	    },
	    changeLocal(index) {

	    	if (index == 0) {
	    		this.isLocal = true
	    		this.graphic_message.forEach((li) => {
	    			li.isLocal = true
	    		})
	    	} else {
	    		this.isLocal = false
	    		this.graphic_message.forEach((li) => {
	    			li.isLocal = false
	    		})
	    	}
	    	console.log(this.graphic_message)
	    }
    }
  };
</script>
<style scoped>
@import"//at.alicdn.com/t/font_561828_lo3g0za40b.css";
.graphic_message_head{width:100%;height:77px;background:#fff;position:relative;padding-left:84px;box-sizing:border-box;padding-top:14px;padding-bottom:15px;}
.graphic_message_head_img{position:absolute;top:14px;left:23px;display:block;width:50px;height:50px;border-radius:6px;}
.graphic_message_setting{width:118px;height:50px;position:absolute;top:14px;right:0;line-height:50px;text-align:center;vertical-align:middle;font-size:23px;}
.display-table-cell{display:table-cell;}
.graphic_change_tab{position:absolute;top:0;right:0;}
.position-realtive{position:relative;}
.color-icon{color:#aeaeae;}
.weChart_graphic_message_tab{
}
.wechart_type{display:inline-block;padding:0 7px;padding-top:2px;padding-bottom:1px;font-size:12px;border:1px solid #33CCCC; color:#33CCCC;margin-top:5px;}
.flexbox-vertical {
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-flex-flow: column;
	flex-flow: column;
	height: 100%;
	-webkit-flex-direction: column;
	flex-direction: column;
	box-sizing: border-box;
	-webkit-box-sizing:
	border-box; }
.flexbox-horizontal {
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	-webkit-box-orient: horizontal;
	-webkit-flex-flow: row;
	flex-flow: row; width: 100%;
	-webkit-flex-direction: row;
	flex-direction: row;
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	-webkit-box-flex: 1;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
 }
.flex-item {
	-webkit-box-flex: 1;
	-webkit-flex: 1;
	flex: 1;
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
 }
.graphic_message{padding-top:10px;padding-left:32px;box-sizing:border-box;background:#f2f2f2;height:100%;width:100%;padding-right:10px;}
 .graphic_message .graphic_change_tab{
 	position:absolute;
 	right:12px;
 	top:-4px;
 	overflow: hidden;
 	border-radius:30px;
 }
 .graphic_change_tab_button{
 	display:block;
 	float:left;
 	width:58px;
 	height:32px;
 	background:#ccc;
 	border:0;
 	outline:none;
 	font-size:12px;
 	color:#fff;
 	cursor:pointer;
   z-index:10;
 }
.graphic_message .color-999{color:#999 !important;}
.font-size-13{font-size:13px;}
.font-szie-18{font-size:18px;}
.color-33cccc{color:#33cccc;}
.tab_active{background:#33cccc;}
.float-left{float:left;}
.float-right{float:right;}
.overflow-hidden{overflow: hidden;}
.select_all{margin-left:24px;margin-right:24px;}
.icon-shanchu{font-size:13px;color:#999999;margin-left:45px;}
.graphic_message_row_allot{margin-left:22px;margin-right:22px;}
.cursor-pointer{cursor:pointer;}
.height-100{height:100%;}
.graphic_message_page{height:60px;width:100%;}
.graphic_message .font-size-23{font-size:23px !important;}
.graphic_message .font-size-20{font-size:20px !important;}
.graphic_message .font-size-28{font-size:28px !important;}
.color-red{color:#ff6666;}
.font-size-18{font-size:18px;}
.graphic_message_row_changeList{margin-left:14px;}
.height-100{height:100%;}
.padding-horizontal-both-10{padding-left:10px;padding-right:10px;}
</style>
<style>
*{margin:0;padding:0;}
.graphic_message .el-tabs__item.is-active {
    color: #000000;
}
.graphic_message .el-tabs__active-bar{background:#33cccc;}
.graphic_message .weChart_simulcast{width:80px;height:30px;background:#33cccc;padding:0;text-align:center;line-height:30px;border:1px solid #33CCCC;font-size:12px;}
.graphic_message .search_input{width:300px;height:28px;z-index:500;}
.graphic_message .search_input .el-input__inner{border-radius:0;width:270px;height:28px;font-size:12px;padding-left:10px;padding-right:35px;}
.graphic_message .search_input_wapper{width:auto !important;}
.graphic_message .el-input__prefix{width:32px;left:initial;top:0;right:30px;cursor:pointer;}
.graphic_message .el-input__prefix .el-icon-search{line-height:28px;}
.padding-vertical-top-15{padding-top:15px;}
.text-align-right{text-align:right;}
.text-align-left{text-align:left;}
.font-size-12{font-size:12px;}
.font-size-13{font-size:13px;}
.graphic_message .graphic_message_row_head{height:47px;line-height:47px;}
.graphic_message .graphic_message_row_editor{height:40px;line-height:40px;background:#e4e4e4;padding-left:16px;padding-right:20px;box-sizing: border-box;}
.graphic_message .graphic_message_comapny_level{padding-left:11px;padding-top:12px;padding-bottom:13px;padding-right:14px;}
.graphic_message  .graphic_message_image{display:block;width:94%;height:150px;margin:0 auto;}
.graphic_message .graphic_message_comapny_detail{font-size:12px;line-height:36px;}
.graphic_message .graphic_message_page_show{font-size:12px;line-height:53px;padding-top:23px;}
.graphic_message .graphic_message_col{margin-top:10px;}
.el-main{overflow-y:auto ;overflow-x:hidden ;}
.graphic_message .el-pagination .el-pager li{border-radius:0px !important;}
.graphic_message .graphic_message_picture_level{display:inline-block;height:100%;line-height:100%;}
.graphic_message .el-pagination .btn-prev, .el-pagination .el-pager li, .el-pagination .btn-next {
    border-radius: 0px !important;
}
.graphic_message .iconfont{color:#999;}
</style>
