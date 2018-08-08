<template>
	<el-container>
		<el-row style='border-bottom:1px solid #e4e4e4;padding-left:20px;'>
		    				<el-col :span='4' align='left'>
		    					<span style='display:inline-block;height:14px;width:4px;background:#33cccc;margin-right:12px;'></span>总览
		    				</el-col>
		    				<el-col :span='20' align='right'>
		    					<el-radio-group v-model="tabPosition" class=''>
								    <el-radio-button label="top">昨日</el-radio-button>
								    <el-radio-button label="right">本周</el-radio-button>
								    <el-radio-button label="bottom">本月</el-radio-button>
								    <el-radio-button label="left">历史累计</el-radio-button>
								 </el-radio-group>
								  <el-time-picker
								    is-range
								    v-model="value4"
								    range-separator="至"
								    start-placeholder="开始时间"
								    end-placeholder="结束时间"
								    placeholder="选择时间范围" style='margin-right:20px;margin-left:10px;'>
								  </el-time-picker>
		    				</el-col>
		    			</el-row>
		    			<el-row>
		    				<el-col style='padding:35px;line-height:40px;' :span='6'>
		    					<span class='color-666'>
		    						扫描总次数 <span class='el-icon-question'></span>
		    					</span><br />
		    					<span class='font-weight-bold' style='font-size:38px;'>20</span>
		    				</el-col>
		    				<el-col style='padding:35px;line-height:40px;' :span='6'>
		    					<span class='color-666'>
		    						带来粉丝总数<span class='el-icon-question'></span>
		    					</span>
		    						<br />
		    					<span class='font-weight-bold' style='font-size:38px;'>20</span>
		    				</el-col>
		    				<el-col style='padding:35px;line-height:40px;' :span='6'>
		    					<span class='color-666'>
		    						流失粉丝总数<span class='el-icon-question'></span>
		    					</span>
		    						<br />
		    					<span class='font-weight-bold' style='font-size:38px;'>20</span>
		    				</el-col>
		    				<el-col style='padding:35px;line-height:40px;' :span='6'>
		    					<span class='color-666'>
		    						净增粉丝总数<span class='el-icon-question'></span>
		    					</span><br />
		    					<span class='font-weight-bold' style='font-size:38px;'>20</span>
		    				</el-col>
		    			</el-row>
		    			<el-row style='height:20px;background:#f2f2f2;'></el-row>
		    			
		    			<el-row style='border-bottom:1px solid #e4e4e4;padding-left:20px;padding-top:10px;'>
		    				<el-col :span='4' align='left'>
		    					<span style='display:inline-block;height:14px;width:4px;background:#33cccc;margin-right:12px;'></span>趋势
		    				</el-col>
		    				<el-col :span='20' align='right'>
		    					<el-radio-group v-model="tabPosition" class=''>
								    <el-radio-button label="top">周</el-radio-button>
								    <el-radio-button label="right">月</el-radio-button>
								    <el-radio-button label="bottom">季</el-radio-button>
								    
								 </el-radio-group>
								  
		    				</el-col>
		    			
		    			</el-row>
		    			<el-row style='height:40px;background:#f2f2f2;'></el-row>
		    			<el-row>
		    				
		    			</el-row>
	</el-container>
	
</template>
<script>
import echarts from 'echarts'
export default({
	data() {
		return {
			activeName: 'first',
			SearchKey: '',
			tabPosition: 'top',
			value4: '',
			show_all: true,
			addQRCode: false,
			rowClass: {background:'#e4e4e4',marginTop:'20px'},
			column: [{
	          name: '这是一个很长很长的规则名称',
	          number: '123'
	        },{
	          name: '这是一个很长很长的规则名称',
	          number: '123'
	        },{
	          name: '这是一个很长很长的规则名称',
	          number: '123'
	        },{
	          name: '这是一个很长很长的规则名称',
	          number: '123'
	        },{
	          name: '这是一个很长很长的规则名称',
	          number: '123'
	        },{
	          name: '这是一个很长很长的规则名称',
	          number: '123'
	        },{
	          name: '这是一个很长很长的规则名称',
	          number: '123'
	        }],
	        option: {
	        	title: {
			        text: '折线图堆叠'
			    },
			    tooltip: {
			        trigger: 'axis'
			    },
			    legend: {
			        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
			    },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
			        containLabel: true
			    },
			    toolbox: {
			        feature: {
			            saveAsImage: {}
			        }
			    },
			    xAxis: {
			        type: 'category',
			        boundaryGap: false,
			        data: ['周一','周二','周三','周四','周五','周六','周日']
			    },
			    yAxis: {
			        type: 'value'
			    },
			    series: [
			        {
			            name:'邮件营销',
			            type:'line',
			            stack: '总量',
			            data:[120, 132, 101, 134, 90, 230, 210]
			        },
			        {
			            name:'联盟广告',
			            type:'line',
			            stack: '总量',
			            data:[220, 182, 191, 234, 290, 330, 310]
			        },
			        {
			            name:'视频广告',
			            type:'line',
			            stack: '总量',
			            data:[150, 232, 201, 154, 190, 330, 410]
			        },
			        {
			            name:'直接访问',
			            type:'line',
			            stack: '总量',
			            data:[320, 332, 301, 334, 390, 330, 320]
			        },
			        {
			            name:'搜索引擎',
			            type:'line',
			            stack: '总量',
			            data:[820, 932, 901, 934, 1290, 1330, 1320]
			        }
			    ]
	        }
		}
	},
	mounted() {
		
	},
	methods: {
      handleClick() {
      	
      },
      handleSelectionChange() {
      	
      },
      handleSizeChange() {
      	
      },
      handleCurrentChange() {
      	
      },
      openQrCode() {
      	let name =  'QRCodeAdd'
      	this.$router.push({name})
      },
      statistics(index) {
      	console.log('sss')
      	let name = 'QRCodeStatistics'
      	this.$router.push({name})
      }
   },
   components: {
   
   }

})
</script>

<style scoped>
@import '//at.alicdn.com/t/font_561828_52cs36nfetw.css';
.cursor-pointer{cursor:pointer;}
.percent100{width:100%;}
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
*{padding:0;margin:0;}
.color-33cccc{color:#33CCCC;}
.font-size-36{font-size:50px;}
.graphic_QRCode{padding-top:10px;padding-left:32px;box-sizing:border-box;background:#f2f2f2;height:100%;width:100%;padding-right:10px;}
.text-align-left{text-align:left;}
.graphic_message_head{width:100%;height:77px;background:#fff;position:relative;padding-left:84px;box-sizing:border-box;padding-top:14px;padding-bottom:15px;}
.graphic_message_head_img{position:absolute;top:14px;left:23px;display:block;width:50px;height:50px;border-radius:6px;}
.wechart_type{display:inline-block;padding:0 7px;padding-top:2px;padding-bottom:1px;font-size:12px;border:1px solid #33CCCC; color:#33CCCC;margin-top:5px;}
</style>
<style>
.graphic_QRCode .el-tabs__item.is-active {
    color: #000000;
}
.graphic_QRCode .el-tabs__active-bar{background:#33cccc;}
.graphic_QRCode .el-tabs__item.is-active {
    color: #000;
}
.graphic_QRCode .el-tabs__item{
	font-size:16px;
}
.graphic_QRCode .el-tabs__item:hover{
	color: #000;
}
.graphic_QRCode{height:100%;}
.graphic_QRCode .el-tabs__content{
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
    overflow-y: auto;
}
.weChart_simulcast_QRCode{
    width: 80px;
    height: 30px;
    background: #33cccc;
    padding: 0;
    line-height: 30px;
    border: 1px solid #33CCCC;
    font-size: 12px;
    border-radius:0;
    position:absolute;
    bottom:-38px;
    right:10px;
}
.graphic_QRCode .search_input {
    width: 300px;
    height: 28px;
    z-index: 500;
}
.graphic_QRCode .search_input_wapper{width:300px !important;}
.graphic_QRCode .search_input_wapper .el-input__inner{padding-left:5px;height:30px;line-height:30px;}
.graphic_QRCode .el-input__prefix{width:32px;left:initial;top:0;right:5px;cursor:pointer;}
.graphic_QRCode .el-input__prefix .el-icon-search{line-height:28px;}
.graphic_QRCode .search_background{display:inline-block;width:12px;height:26px;background:#33cccc;margin-right:2px;}
.graphic_QRCode .recent_thirdy{display:inline-block;padding-left:20px;padding-right:10px;}
.graphic_QRCode .table_Qrcode_img{
	display:inline-block;
	width:63px;
	height:63px;
}
.graphic_QRCode .table_Qrcode_img_describe{display:inline-block;font-size:12px;color:#999999;padding-left:20px;}
.graphic_QRCode .table_Qrcode_img_describe .table_Qrcode_img_head{color:#000;font-weight:bold;}
.graphic_QRCode  .el-radio-button__inner{padding-top:7px;padding-bottom:7px;}
.graphic_QRCode  .el-input__inner{height:32px;line-height:32px;}
.graphic_QRCode .el-radio-button__orig-radio:checked+.el-radio-button__inner {
    color: #fff;
    background-color: #33CCCC;
    border-color: #33CCCC;
    -webkit-box-shadow: -1px 0 0 0 #33CCCC;
    box-shadow: -1px 0 0 0 #33CCCC;
}
.graphic_QRCode .el-radio-group{margin-bottom:7px;}
</style>