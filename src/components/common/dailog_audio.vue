<template>
<div class='dailog_audio'>
	<el-dialog width='68%' class='el-dialog_picture' :modal-append-to-body='isOutBody' title="选择音频" :show-close='false'  :visible="showDailog">
		<i @click="cancel" class='el-icon-close close_header'></i>
	    <el-row style='padding:25px 20px;border-bottom:1px solid #e4e4e4;'>
	    	<el-col align='left' :span='18'>由于版本兼容原因，你暂时只可以选中60秒内的语音发送</el-col>
	    	<el-col align='right' :span='6'>
	    		<el-button class='float-left weChart_simulcast' type="primary">上传文件</el-button>
	    	</el-col>
	    </el-row>
	</el-dialog>
</div>
</template>

<script>
export default ({
	props: ['showDailog'],
	data() {
		return {
			baseURL: this.$axios.getWeChartBaseURL(),
			total: 0,
			listContent: '',
			isOutBody: false
		}
	},
	methods: {
	  cancel() {
	  	this.$emit('audio_close',false)
	  },
	  save() {
	  	this.$emit('audio_close',true)
	  }
	}
})
</script>

<style scoped>
.dailog_audio .close_header{
	position:absolute;
	top:10px;
	right:10px;
	font-size:20px;
	cursor:pointer;
}
</style>
<style>
.dailog_audio .el-dialog__body{
	min-height:600px;
	padding:0;
}
.dailog_audio .el-dialog__header{
	text-align:left;
	padding-top:10px;
	border-bottom: 1px solid #e4e4e4;
}
.dailog_audio .weChart_simulcast {
    width: 80px;
    height: 30px;
    background: #33cccc;
    padding: 0;
    line-height: 30px;
    border: 1px solid #33CCCC;
    font-size: 12px;
    border-radius: 0;
}
</style>