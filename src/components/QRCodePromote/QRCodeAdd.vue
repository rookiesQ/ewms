<template>
<el-container class='flexbox-vertical QRCodeAdd'>
 	 <div class='graphic_message_head text-align-left position-realtive'>
          <img src="/static/image/login/wechat.png" class='graphic_message_head_img' alt="" />
          <h3 class='text-align-left'>恒康科技</h3>
          <span class='wechart_type'>服务号</span>
 	 </div>
	 <el-container class='flex-item theme-background-f2f2f2' style='padding:20px;padding-right:0;'>
	 	<el-main style='background:#fff;'>
	 		<el-row style='padding-left:20px;padding-top:10px;padding-bottom:40px;'>
				<el-col :span='4' align='left'>
					<span style='display:inline-block;height:14px;width:4px;background:#33cccc;margin-right:12px;'></span>创建参数二维码
				</el-col>
			</el-row>
			<el-container>
				<el-aside width='120px'>
					<el-row>
						<el-col align='right' style='height:50px;line-height:50px;'>名称</el-col>
						<el-col align='right' style='height:50px;line-height:50px;'>二维码场景值</el-col>
						<el-col align='right' style='height:50px;line-height:50px;'>扫描二维码</el-col>
					</el-row>
				</el-aside>
				<el-main style='padding-left:10px;overflow-y: hidden;'>
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm_QRCode" class="demo-ruleForm">
						<el-row style='margin-top:5px;'>
							<el-col align='left'>
								<el-form-item label="" prop="input_name">
									<el-input v-model="ruleForm.input_name" placeholder="仅自己查看,便于区分二维码的用途,不超过18个字符" maxlength='18' style='width:320px;height:30px;font-size:12px;'></el-input>
								</el-form-item>
							</el-col>
							
						</el-row>
						<el-row style='margin-top:15px;'>
							<el-col align='left'>
							<el-form-item label="" prop="input_sceneStr">
								<el-input v-model="ruleForm.input_sceneStr" placeholder="场景值" maxlength='18' style='width:320px;height:30px;font-size:12px;'></el-input>
							</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col align='left' style='padding:10px 0;padding-top:18px;'>
								<el-checkbox v-model="checked_focus">未关注用户进入微信关注页,已关注用户直接进入公众号</el-checkbox>
							</el-col>
							<el-col align='left' style='padding:10px 0;'>
								<el-checkbox v-model="checked_send">推送设置(可选)</el-checkbox>
							</el-col>
						</el-row>
						<!--文本输入框-->
						<el-row v-show='checked_send' >
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
			    				<el-row v-show='tab[0].isShow'>
			    					<el-col align='left'>
			    						<quill-editor ref="myTextEditor"
										    v-model="content"
										    :options = "editorOption"
										    @change="onEditorChange($event)">
										</quill-editor>
			    					</el-col>
			    					
								</el-row>
								<el-row v-show='tab[1].isShow' class='up_load_pic_video'>
									<el-col :span='6'>
										<div class='' style='padding-top:50px;padding-left:10px;'>
										  		<img style='display:block;width:100px;height:100px;margin:10px auto;' :src="picture_graph.url" alt="" />
										  		<el-row class='text-ellipsis'>{{picture_graph.title}}</el-row>
										  </div>
									</el-col>
									<el-col laign='left' :span='18'>
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
								<el-row v-show='tab[2].isShow ' class='up_load_pic_video'>
									<el-col :span='6'>
										<div class='' style='padding-top:50px;padding-left:10px;'>
										  		<img style='display:block;width:100px;height:100px;margin:10px auto;' :src="picture_picture.url" alt="" />
										  		<el-row class='text-ellipsis'>{{picture_picture.title}}</el-row>
										  </div>
									</el-col>
									<el-col laign='left' :span='18'>
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
										
									</el-col>
									<!--弹出层盒子-图片-->
									 <dailog-picture :showDailog.sync= 'showPicture' @picture_close='picture_close'></dailog-picture>
									<!---->
								</el-row>
	
						</el-row>
						<!---->
						<el-row>
							<el-col align='left' style='padding-top:20px;padding-bottom:48px;'>
								<el-checkbox v-model="checked_tag">给客户打标签号(可选)</el-checkbox>
								<el-input v-model="input_tag" maxlength='8' :disabled='!checked_tag' placeholder="最多不超过8个字" style='width:320px;height:30px;font-size:12px;'></el-input>
							</el-col>
						</el-row>
						<el-row>
							<el-col align='left'>
								<el-button class='float-left weChart_simulcast' type="primary" @click='saveCondition'>保存</el-button>
								<el-button class='weChart_cancel'  @click='cancelCondition'>取消</el-button>
							</el-col>
						</el-row>
					</el-form>
				</el-main>
			</el-container>
	 	</el-main>
	 	
	 </el-container>
</el-container>
</template>

<script>
import DailogGraphic from '../common/dailog_graphic'
import DailogPicture from '../common/dailog_picture'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default({
	data() {
		return {
			input: '',
			checked_focus: false,
			showGraphic: false,
			showPicture: false,
			checked1: false,
			editorOption: {},
			content: '',
			checked_tag: false,
			checked_send: false,
			input_tag: '',
			resource_from: '从素材库中选择',
			picture_graph: {url:'',title: '',wxMediaId: ''},
			picture_picture: {url:'',title: '',wxMediaId: ''},
			resource_num: 0,
			tab:[{isShow:true,},{isShow:false},{isShow:false},{isShow:false},{isShow:false},{isShow:false}],
			ruleForm: {
				input_name: '',
				input_sceneStr: '',
			},
			rules: {
				input_name:[{ required: true, message: '请输入活动名称', trigger: 'blur' },
            	{ min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }],
            	input_sceneStr:[{ required: true, message: '请输入场景值名称', trigger: 'blur' },
            	{ min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }]
			},
			baseURL: this.$axios.getWeChartBaseURL()
		}
	},
	methods: {
      openQrCode() {
      	let name =  'QRCodeAdd'
      	this.$router.push({name})
      },
      openFrame() {
      	if (this.resource_num == 1) {
      		this.showGraphic = true
      	}
      	if (this.resource_num == 2){
      		this.showPicture = true
      	}
      },
      onEditorChange() {
      	
      },
      changeTab(index) {
      	Array.from(this.tab,list => list.isShow = false)
	  	this.tab[index].isShow =true
	  	this.resource_num = index 
	  	this.resource_from = this.tab[index].title
      },
      graphic_close(arg) {
	  	if (arg) {
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
	  saveCondition() {
	  	 // 判断文字图文消息和图片的判断
	  	 if (this.checked_send) {
	  			if (this.content == '' && this.picture_graph.wxMediaId == '' && this.picture_picture.wxMediaId == '') {
	  				this.$message({
                		showClose: true,
                		message: '请检查回复信息！！',
                		type: 'error'
                	});
                	return
               }
	  		 
	  	 } else {
	  	 	this.content = ''
	  	 	this.picture_graph={url:'',title: '',wxMediaId: ''}
	  	 	this.picture_picture={url:'',title: '',wxMediaId: ''}
	  	 }
	  	 this.$refs['ruleForm_QRCode'].validate((valid) => {
	          if (valid) {
	            this.submit()
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	      });
	  	
	  },
	  // 提交表单数据和部分验证
	  submit () {
	  	let url = this.baseURL + '/api/services/app/QrcodeManagement/Create'
	  	let [qrcodeName,isFollowConfig,isPushConfig,tag,wxActionName,wxSceneStr] = [this.ruleForm.input_name,this.checked_focus,this.checked_send,this.input_tag,'QR_LIMIT_STR_SCENE',this.ruleForm.input_sceneStr]
	  	let bodyParam = {}
	  	let replies =[]
	  	if (this.content !='') {
	  		replies.push({msgTypeid: 1,msgContent: this.content})
	  	}
	  	if (this.picture_graph.wxMediaId != '') {
	  		replies.push({msgTypeid: 2,wxMediaId: this.picture_graph.wxMediaId})
	  	}
	  	if (this.picture_graph.wxMediaId !='') {
	  		replies.push({msgTypeid: 3,wxMediaId: this.picture_picture.wxMediaId})
	  	}
	  	if (this.checked_send){
	  		bodyParam = {qrcodeName,isFollowConfig,isPushConfig,tag,wxActionName,wxSceneStr,replies}
	  	} else {
	  		bodyParam = {qrcodeName,isFollowConfig,isPushConfig,tag,wxActionName,wxSceneStr}
	  	}
	  	this.$loading({text: ''})
	  	this.$axios.posts(url,bodyParam).then((res) => {
	  		if (res.success) {
	  			this.$router.push({name: 'QRCodePromote'})
	  		}
	  		this.$loading().close()
	  	},(err) => {
	  		console.log('error' + err)
	  		this.$loading().close()
	  	})
	  },
	  cancelCondition() {
	  	let name = 'QRCodePromote'
	  	this.$router.push({name})
	  }
   },
    components: {
   		quillEditor,
   		DailogGraphic,
   		DailogPicture
   }

})
</script>

<style scoped>
@import '//at.alicdn.com/t/font_561828_52cs36nfetw.css';
.cursor-pointer{cursor:pointer;}
.percent100{width:100%;}
.theme-background-f2f2f2{background:#f2f2f2;}
.font-size-14{font-size:14px;}
.font-size-16{font-size:16px;}
.color-999{color:#999;}
.color-33cccc{color:#33cccc;}
.cursor-pointer{cursor:pointer;}
.font-size-20{font-size:20px;}
.font-weight-bold{font-weight:bold;}
.font-size-12{font-size:12px;}
.position-realtive{position:relative;}
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
.text-ellipsis{ overflow: hidden;text-overflow: ellipsis;white-space: nowrap; }
*{padding:0;margin:0;}
.color-33cccc{color:#33CCCC;}
.font-size-36{font-size:50px;}
.text-align-left{text-align:left;}
.graphic_message_head{width:100%;height:77px;background:#fff;position:relative;padding-left:84px;box-sizing:border-box;padding-top:14px;padding-bottom:15px;}
.graphic_message_head_img{position:absolute;top:14px;left:23px;display:block;width:50px;height:50px;border-radius:6px;}
.wechart_type{display:inline-block;padding:0 7px;padding-top:2px;padding-bottom:1px;font-size:12px;border:1px solid #33CCCC; color:#33CCCC;margin-top:5px;}
</style>
<style>
.QRCodeAdd .el-input__inner{height:30px;}
.QRCodeAdd .weChart_editor_head {
    height: 40px;
    background: #f2f2f2;
    width:800px;
    padding-left: 12px;
}
.QRCodeAdd .weChart_editor_head .weChart_editor_head_list {
    width: auto;
    padding-right: 23px;
    cursor: pointer;
    font-size: 12px;
}
.QRCodeAdd .weChart_editor_head .el-col {
    height: 40px;
    line-height: 40px;
}
.QRCodeAdd .quill-editor{
	width:800px;
	order: 1px solid #F2F2F2;
}
.QRCodeAdd .ql-editor{height:200px;}
.QRCodeAdd .weChart_simulcast {
    width: 80px;
    height: 30px;
    background: #33cccc;
    padding: 0;
    line-height: 30px;
    border: 1px solid #33CCCC;
    font-size: 12px;
    border-radius: 0;
}
.QRCodeAdd .weChart_cancel {
    width: 80px;
    height: 30px;
    background: #FFFFFF;
    padding: 0;
    line-height: 30px;
    border: 1px solid #e4e4e4;
    font-size: 12px;
    color: #333;
    border-radius: 0;
}

.QRCodeAdd .up_load_pic_video .el-upload--text{
    border:1px solid #F2F2F2;
    box-sizing:border-box;
    width:500px;
}

.QRCodeAdd .el-upload-dragger {
    background-color: #fff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 80%;
    height: 180px;
    margin:20px auto;
    text-align: center;
    position: relative;
    overflow: hidden;
}
.QRCodeAdd .el-upload-dragger .up_load_plus{
	font-size:67px;
	color: #c0c4cc;
    margin: 50px 0 16px;
    line-height: 50px;
}
.QRCodeAdd .ql-toolbar.ql-snow{
	 border: 1px solid #f2f2f2;
}
.QRCodeAdd .ql-container.ql-snow {
    border: 1px solid #f2f2f2;
}

.QRCodeAdd .choose_pincture_detail{
	position:absolute;
	top:0;
	left:0;
}
.QRCodeAdd  .up_load_pic_video{
	width:800px;
	border: 1px solid #f2f2f2;
}
.QRCodeAdd .upload-demo{
	padding:10px 30px;
	padding-left: 10px;
	box-sizing: border-box;
}
</style>