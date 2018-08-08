<template>
<el-container class='flexbox-vertical'>
 	 <div class='graphic_message_head text-align-left'>
          <img src="/static/image/login/wechat.png" class='graphic_message_head_img' alt="" />
          <h3 class='text-align-left'>恒康科技</h3>
          <span class='wechart_type'>服务号</span>
 	 </div>
	 <el-container class='flex-item'>
	 	<el-tabs class='graphic_autoResponse flexbox-vertical' active-text v-model="activeName" @tab-click="handleClick">
		    <el-tab-pane label="关键词回复" name="first">
		    	<el-row>
		    		<el-col :span='16' class='padding-vertical-bottom-20'>
		    			<div class="search_input_wapper float-right" @keyup.enter="submitSearch">
                            <el-input
                                v-model="SearchKey"
                                placeholder="搜索关键字/规则名称"
                                class="search_input">
                                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                       </div>
		    		</el-col>
		    		<el-col :span='8' align='right'>
		    			<span class='search_background'></span>
		    		</el-col>
		    	</el-row>
		    	<!--表格-->
		    	<el-row style='height:450px;'>
                <el-table :data="main_listContent" :header-cell-style="rowClass" border @selection-change="handleSelectionChange">
						<el-table-column align='center' type="selection" label="" width="50"></el-table-column>
						<el-table-column align='center' prop="ruleName" label="规则名称">
							
						</el-table-column>
						<el-table-column align='center' prop="keyword" label="关键字"></el-table-column>
						<el-table-column align='center' prop="msgTypid" label="操作类型"></el-table-column>
						<el-table-column align='center' prop="link" label="操作">
							<template slot-scope="scope">
								
									<span class='table_detail'>详情</span>
									<span class='table_editor'>编辑</span>
								
							</template>
						</el-table-column>
					</el-table>
				</el-row>
					<!---->
				
				<div class='graphic_message_page_show'>
			         	<el-row>
			         		<el-col align='right'>
			         			<el-pagination
							      @size-change="handleSizeChange"
							      @current-change="handleCurrentChange"
							      :current-page="1"
							      :page-sizes="[8, 16, 24, 32]"
							      :page-size="8"
							      layout="total, sizes, prev, pager, next, jumper"
							      :total="main_total">
							    </el-pagination>
			         		</el-col>
			         	</el-row>
			       </div>
		    </el-tab-pane>
		    <el-tab-pane label="被关注回复" name="second">
		    				<el-row class='weChart_editor_head'>
		    					<el-col :class='{"color-33cccc": tab[0].isShow}' align='left' class='weChart_editor_head_list' @click.native='changeTab(0)' :span='2'>
		    						<i class='iconfont icon-wenzi color-999'></i>
		    						文字
		    					</el-col>
		    					<el-col :class='{"color-33cccc": tab[1].isShow}' class='weChart_editor_head_list' @click.native='changeTab(1)' :span='2'>
		    						<i class='iconfont icon-tuwen font-weight-bold font-size-14 color-999'></i>
		    						图文消息
		    					</el-col>
		    					<el-col :class='{"color-33cccc": tab[2].isShow}' class='weChart_editor_head_list' @click.native='changeTab(2)' :span='2'>
		    						<i class='iconfont icon-tupian color-999'></i>
		    						图片
		    					</el-col>
		    					<el-col :class='{"color-33cccc": tab[3].isShow}' class='weChart_editor_head_list' @click.native='changeTab(3)' :span='2'>
		    						<i class='iconfont icon-yuyin color-999'></i>
		    						语音
		    					</el-col>
		    					<el-col :class='{"color-33cccc": tab[4].isShow}' class='weChart_editor_head_list' @click.native='changeTab(4)' :span='2'>
		    						<i class='iconfont icon-shipin color-999'></i>
		    						视频
		    					</el-col>
		    					<el-col :class='{"color-33cccc": tab[5].isShow}' class='weChart_editor_head_list' @click.native='changeTab(5)' :span='2'>
		    						<i class='iconfont font-weight-bold icon-qiabao color-999'></i>
		    						卡卷
		    					</el-col>
		    				</el-row>
		    				<el-row>
		    					<quill-editor v-show='tab[0].isShow' ref="myTextEditor"
								    :content="content"
								    :options = "editorOption"
								    @change="onEditorChange($event)">
								</quill-editor>
								<el-row v-show='tab[1].isShow' class='up_load_pic_video'>
									<el-col :span='8'>
										<div class='' style='padding:20px 10px 0 10px;'>
										  		<img style='display:block;width:100px;height:100px;margin:10px auto;border:0;' :src="picture_graph.url" alt="" />
										  		<el-row class='text-ellipsis'>{{picture_graph.title}}</el-row>
										 </div>
									</el-col>
									<el-col :span='16'>
										<el-upload
										  class="upload-demo"
										  drag
										  disabled
										  action="https://jsonplaceholder.typicode.com/posts/"
										  @click.native = openFrame()
										  multiple>
										  <i class="el-icon-plus up_load_plus"></i>
										  <div class="el-upload__text">从素材库中选择</div>
										</el-upload>
									</el-col>
									<!--弹出层盒子-图文消息-->
									 <dailog-graphic :showDailog.sync= 'showGraphic' @graphic_close='graphic_close'></dailog-graphic>
									<!---->
									
									
								</el-row>
								<el-row v-show='tab[2].isShow' class='up_load_pic_video'>
									<el-col :span='8'>
										<div class='' style='padding:20px 10px 0 10px;'>
										  		<img style='display:block;width:100px;height:100px;margin:10px auto;border:0;' :src="picture_picture.url" alt="" />
										  		<el-row class='text-ellipsis'>{{picture_picture.title}}</el-row>
										 </div>
									</el-col>
									<el-col :span='16'>
										<el-upload
										  class="upload-demo"
										  drag
										  disabled
										  action="https://jsonplaceholder.typicode.com/posts/"
										  @click.native = openFrame()
										  multiple>
										  <i class="el-icon-plus up_load_plus"></i>
										  <div class="el-upload__text">从图片库中选择</div>
										</el-upload>
										<!--弹出层盒子-图片-->
									 		<dailog-picture :showDailog.sync= 'showPicture' @picture_close='picture_close'></dailog-picture>
										<!---->
									</el-col>
								</el-row>
								<el-row v-show='tab[3].isShow' class='up_load_pic_video'>
									<el-col :span='8'>
										<div class='' style='padding:20px 10px 0 10px;'>
										  		<img style='display:block;width:100px;height:100px;margin:10px auto;border:0;' :src="picture_audio.url" alt="" />
										  		<el-row class='text-ellipsis'>{{picture_audio.title}}</el-row>
										 </div>
									</el-col>
									<el-col :span='16'>
										<el-upload
										  class="upload-demo"
										  drag
										  disabled
										  action="https://jsonplaceholder.typicode.com/posts/"
										  @click.native = openFrame()
										  multiple>
										  <i class="el-icon-plus up_load_plus"></i>
										  <div class="el-upload__text">从语音库中选择</div>
										</el-upload>
										<!--弹出层盒子-音频-->
									 	<dailog-audio :showDailog.sync= 'showAudio' @audio_close='audio_close'></dailog-audio>
										<!---->
									</el-col>
								</el-row>
								<el-row v-show='tab[4].isShow' class='up_load_pic_video'>
									<el-col :span='8'>
										<div class='' style='padding:20px 10px 0 10px;'>
										  		<img style='display:block;width:100px;height:100px;margin:10px auto;border:0;' src="/static/image/login/bg.jpg" alt="" />
										  		<el-row class='text-ellipsis'>图片一</el-row>
										 </div>
									</el-col>
									<el-col :span='16'>
										<el-upload
										  class="upload-demo"
										  drag
										  disabled
										  action="https://jsonplaceholder.typicode.com/posts/"
										  @click.native = openFrame()
										  multiple>
										  <i class="el-icon-plus up_load_plus"></i>
										  <div class="el-upload__text">从视频库中选择</div>
										</el-upload>
										<!--弹出层盒子-视频-->
									 	
										<!---->
									</el-col>
								</el-row>
								<el-row v-show='tab[5].isShow' class='up_load_pic_video'>
									<el-col :span='8'>
										<div class='' style='padding:20px 10px 0 10px;'>
										  		<img style='display:block;width:100px;height:100px;margin:10px auto;border:0;' src="/static/image/login/bg.jpg" alt="" />
										  		<el-row class='text-ellipsis'>图片一</el-row>
										 </div>
									</el-col>
									<el-col :span='16'>
										<el-upload
										  class="upload-demo"
										  drag
										  disabled
										  action="https://jsonplaceholder.typicode.com/posts/"
										  @click.native = openFrame()
										  multiple>
										  <i class="el-icon-plus up_load_plus"></i>
										  <div class="el-upload__text">从卡包库中选择</div>
										</el-upload>
										<!--弹出层盒子-卡包-->
									 	
										<!---->
									</el-col>
								</el-row>
								
		    				</el-row>
		    					<el-row class='padding-vertical-top-20'>
		    						<el-col :span='6'>
		    							<el-button class='float-left weChart_simulcast' @click.native='save' type="primary">保存</el-button>
										<el-button class='weChart_cancel' @click.native='cancel'>取消</el-button>
		    						</el-col>
		    					</el-row>
		    					
		    				
							
		    </el-tab-pane>
		 </el-tabs>
	 </el-container>
</el-container>
</template>

<script>
import DailogGraphic from '../common/dailog_graphic'
import DailogPicture from '../common/dailog_picture'
import DailogAudio from '../common/dailog_audio'	
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default({
	data() {
		return {
			activeName: 'first',
			SearchKey: '',
			content:"",
			editorOption:{},
			showGraphic: false,
			showPicture: false,
			showAudio: false,
			innerVisible: false,
			isOutBody: false,
			rowClass: {background:'#e4e4e4',marginTop:'20px'},
			resource_from: '从素材库中选择',
			resource_num: 1,
			main_total: 0,
			main_listContent: [],
			picture_graph: {url:'',title: '',wxMediaId: ''},
			picture_picture: {url:'',title: '',wxMediaId: ''},
			picture_audio: {url:'',title: '',wxMediaId: ''},
			picture_video: {url:'',title: '',wxMediaId: ''},
			picture_cardBag: {url:'',title: '',wxMediaId: ''},
			tab:[{isShow:true},{isShow:false},{isShow:false},{isShow:false},{isShow:false},{isShow:false}],
			
		}
	},
	methods: {
      handleClick(tab, event) {
        //console.log(tab, event);
      },
      submitSearch() {
      	
      },
      handleSelectionChange(val) {
	      
	  },
	  handleSizeChange(val) {
	      let skip_number = (val -1)*8
          this.Init(skip_number)
	  },
	  handleCurrentChange(val) {
	      let skip_number = (val -1)*8
          this.Init(skip_number)
	  },
	  onEditorChange({ editor, html, text }) {//富文本编辑器  文本改变时 设置字段值
	       this.content = html
	  },
	  changeTab(index) {
	  	Array.from(this.tab,list => list.isShow = false)
	  	this.tab[index].isShow =true
	  	this.resource_num = index 
	  },
	  openFrame() {
	  	if (this.resource_num == 1) {
	  		this.showGraphic = true
	  	}
	  	if (this.resource_num == 2) {
	  		this.showPicture = true
	  	}
	  	if (this.resource_num == 3) {
	  		this.showAudio = true
	  	}
	  },
	  graphic_close(arg) {
	  	if (arg) {
	  		console.log(arg)
	  		this.picture_graph = arg
	  	}
	  	this.showGraphic = false
	  },
	  picture_close(arg) {
	  	if (arg) {
	  		this.picture_picture = arg
	  	}
	  	this.showPicture = false
	  },
	  audio_close(arg) {
	  	this.showAudio = false
	  },
	  Init (skip_num) {
	  	let [ouId,sorting,skipCount,maxResultCount] = [38,'',skip_num,8]
        let [url,bodyParam] = [this.baseURL + '/api/services/app/AutoReply/GetAll',{ouId,sorting,skipCount,maxResultCount}]
        this.$loading({text: ''})
        this.$axios.gets(url,bodyParam).then((res)=> {
          if (res.success) {
            if (res.result.items.length > 0) {
              this.main_total = res.result.totalCount
              this.main_listContent = res.result.items
            }
          }
          this.$loading().close()
        },(err) => {
           console.log('err' + error)
           this.$loading().close()
        })
	  },
	  save () {
	  	console.log('ss')
	  },
	  cancel () {
	  	console.log('sss')
	    let name = 'autoReponse'
	  	this.$router.push({name})
	  }
   },
   components: {
   	quillEditor,
   	DailogGraphic,
   	DailogPicture,
   	DailogAudio
   }

})
</script>

<style scoped>
.text-ellipsis{ overflow: hidden;text-overflow: ellipsis;white-space: nowrap; }
.font-size-14{font-size:14px;}
.color-999{color:#999;}
.font-size-20{font-size:20px;}
.font-weight-bold{font-weight:bold;}
.font-size-12{font-size:12px;}
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
*{padding:0;margin:0;}
.color-33cccc{color:#33CCCC;}
.font-size-36{font-size:50px;}
.graphic_autoResponse{padding-top:10px;padding-left:32px;box-sizing:border-box;background:#f2f2f2;height:100%;width:100%;padding-right:10px;}
.text-align-left{text-align:left;}
.graphic_message_head{width:100%;height:77px;background:#fff;position:relative;padding-left:84px;box-sizing:border-box;padding-top:14px;padding-bottom:15px;}
.graphic_message_head_img{position:absolute;top:14px;left:23px;display:block;width:50px;height:50px;border-radius:6px;}
.wechart_type{display:inline-block;padding:0 7px;padding-top:2px;padding-bottom:1px;font-size:12px;border:1px solid #33CCCC; color:#33CCCC;margin-top:5px;}
</style>
<style>
@import"//at.alicdn.com/t/font_561828_3cdtfv0dl9a.css";
.graphic_autoResponse .el-tabs__item.is-active {
    color: #000000;
}
.graphic_autoResponse .el-tabs__active-bar{background:#33cccc;}
.graphic_autoResponse .el-tabs__item.is-active {
    color: #000;
}
.graphic_autoResponse .el-tabs__item{
	font-size:16px;
}
.graphic_autoResponse .el-tabs__item:hover{
	color: #000;
}
.graphic_autoResponse{height:100%;}
.graphic_autoResponse .el-tabs__content{
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
    background:#fff;
    padding-top:18px;
    padding-left:20px;
    overflow-y: auto;
}
.graphic_autoResponse .search_input_wapper{width:300px !important;}
.graphic_autoResponse .search_input_wapper .el-input__inner{padding-left:5px;height:30px;line-height:30px;}
.graphic_autoResponse .el-input__prefix{width:32px;left:initial;top:0;right:5px;cursor:pointer;}
.graphic_autoResponse .el-input__prefix .el-icon-search{line-height:28px;}
.graphic_autoResponse .search_background{display:inline-block;width:12px;height:26px;background:#33cccc;margin-right:2px;}
.graphic_autoResponse .padding-vertical-bottom-20{padding-bottom:20px;}
.graphic_autoResponse .table_detail{
	color:#33CCCC;
	cursor:pointer;
}
.graphic_autoResponse .table_editor{
	color:#33CCCC;
	cursor:pointer;
	margin-left:20px;
}
.graphic_autoResponse .el-pagination{
	margin-top:50px;
}
.graphic_autoResponse .el-pager{
	background:#f2f2f2 !important;
}
.graphic_autoResponse .ql-editor{
	height:300px;
}
.graphic_autoResponse .quill-editor{
	
}
.graphic_autoResponse .weChart_simulcast {
    width: 80px;
    height: 30px;
    background: #33cccc;
    padding: 0;
    line-height: 30px;
    border: 1px solid #33CCCC;
    font-size: 12px;
    border-radius:0;
}
.graphic_autoResponse .padding-vertical-top-20{
	padding-top:20px;
}
.graphic_autoResponse .weChart_cancel{
	width: 80px;
    height: 30px;
    background: #FFFFFF;
    padding: 0;
    line-height: 30px;
    border: 1px solid #e4e4e4;
    font-size: 12px;
    color:#333;
    border-radius:0;
}
.graphic_autoResponse .weChart_editor_head{
	height:40px;
	background:#f2f2f2;
	padding-left:12px;
}
.graphic_autoResponse .ql-container.ql-snow {
    border-top: 0px solid #ccc;
    text-align:left;
}
.graphic_autoResponse .ql-toolbar.ql-snow, .graphic_autoResponse .ql-container.ql-snow{
	border-color:#f2f2f2;
}
.graphic_autoResponse .weChart_editor_head .el-col{height:40px;line-height:40px;}
.graphic_autoResponse .weChart_editor_head .weChart_editor_head_list{
	width:auto;
	padding-right:23px;
	cursor:pointer;
	font-size:12px;
}
.graphic_autoResponse .ql-toolbar,.graphic_autoResponse .ql-snow{
	text-align:left;
}
.graphic_autoResponse  .upload-demo{
	width:80%;
}
.graphic_autoResponse .el-upload-dragger .up_load_plus{
	font-size: 67px;
    color: #c0c4cc;
    margin: 50px 0 16px;
    line-height: 50px;
}
.graphic_autoResponse .up_load_pic_video{
	padding:18px 20px;
	border:1px solid #F2F2F2;
}
.graphic_autoResponse .up_load_pic_video .el-upload--text{
	width:100%;
}
.graphic_autoResponse .up_load_pic_video .el-upload--text .el-upload-dragger{
	width:100%;
}
.graphic_autoResponse .el-dialog{
	margin-right:18vh;
}
</style>