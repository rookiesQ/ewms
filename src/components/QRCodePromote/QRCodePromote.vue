<template>
<el-container class='flexbox-vertical'>
 	 <div class='graphic_message_head text-align-left position-realtive'>
          <img src="/static/image/login/wechat.png" class='graphic_message_head_img' alt="" />
          <h3 class='text-align-left'>恒康科技</h3>
          <span class='wechart_type'>服务号</span>
          <el-button class='float-left weChart_simulcast_QRCode cursor-pointer' style='z-index:1000;' @click.native='openQrCode' type="primary">创建二维码</el-button>
 	 </div>
	 <el-container class='flex-item'>
	 	<el-tabs class='flexbox-vertical graphic_QRCode' active-text v-model="activeName" @tab-click="handleClick">
		    <!--码管理-->
		    <el-tab-pane style='padding-left:20px;' label="码管理" name="first">
		    	<el-row>
		    		<el-col :span='12'>
		    			<div class="search_input_wapper float-right" @keyup.enter="submitSearch">
                            <el-input
                                v-model="SearchKey"
                                placeholder="搜索关键字/规则名称"
                                class="search_input">
                                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                       </div>
		    		</el-col>
			   		<el-col :span='12' align='right' class='font-size-12'>
			   			<span class='cursor-pointer' @click='batch_downloads'>
			   				<i class='el-icon-download font-size-16 color-999'></i>批量下载二维码
			   			</span>
			   			<span class='cursor-pointer recent_thirdy'>
			   				<i class='el-icon-download font-size-16 color-999'></i>下载最近30天数据
			   			</span>
			   			
			   		</el-col>
			   	</el-row>
			   	<el-row style='margin-top:9px; height:650px;'>
			   		 <el-table :data="listContent" :header-cell-style="rowClass" border @selection-change="handleSelectionChange">
						
						<el-table-column align='left' prop="name" width='80px' label="名称">
							<template slot-scope="scope">
										<img class='table_Qrcode_img' src="/static/image/login/wechat.png" />	
							</template>
						</el-table-column>
						<el-table-column align='left'>
							<template slot-scope='scope'>
								<div class='table_Qrcode_img_describe'>
									<span class='table_Qrcode_img_head'>{{scope.row.qrcodeName}}</span><br/>
									<span v-show='scope.row.isFollowConfig'><i class='el-icon-check color-33cccc font-weight-bold'></i>关注微信</span><br/>
									<span v-show='scope.row.isPushConfig'><i class='el-icon-check color-33cccc font-weight-bold'></i>推送消息</span><i class='iconfont color-33cccc icon-xiaoxi'></i><br/>
									<span><i class='el-icon-check color-33cccc font-weight-bold'></i>打标签 <i class='iconfont color-33cccc icon-biaoqian'></i></span>
								</div>
							</template>
						</el-table-column>
						<el-table-column align='center' prop="number" label="带来粉丝数">0</el-table-column>
						
						<el-table-column align='center' prop="link" label="操作">
							<template slot-scope="scope">
									<el-row>
										<el-col :span='6'>
											<span @click='download(scope.row)' class='table_detail color-33cccc cursor-pointer'>下载</span>
										</el-col>
										<el-col :span='6' @click.native='statistics(scope.row)'>
											<span class='table_detail color-33cccc cursor-pointer'>统计</span>
										</el-col>
										<el-col :span='6'>
											<span class='table_detail color-33cccc cursor-pointer'>粉丝</span>
										</el-col>
										<el-col :span='6'>
											<span class='table_editor color-33cccc cursor-pointer'>修改</span>
										</el-col>
									</el-row>	
							</template>
						</el-table-column>
					</el-table>
			   	</el-row>
			   	<el-row style='padding:20px 0;'>
			   		<el-col align='right'>
			   			<div class='graphic_message_page_show'>
				         	<el-row class='text-align-right'>
				         		 <el-pagination
							      @size-change="handleSizeChange"
							      @current-change="handleCurrentChange"
							      :current-page="1"
							      :page-sizes="[8, 16, 24, 32]"
							      :page-size="8"
							      layout="total, sizes, prev, pager, next, jumper"
							      :total="total">
							    </el-pagination>
				         	</el-row>
				         </div>
			   		</el-col>
			   		
			   	</el-row>
		    </el-tab-pane>
		    <!---->
		    <!--统计-->
		    <el-tab-pane label="统计" name="second">
		    			<el-row style='border-bottom:1px solid #e4e4e4;padding-left:20px;'>
		    				<el-col :span='4' align='left'>
		    					<span style='display:inline-block;height:14px;width:4px;background:#33cccc;margin-right:12px;'></span>总览
		    				</el-col>
		    				
		    				<el-col :span='20' align='right' class='QRCode_tab_head'>
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
		    						扫描总次数<span class='el-icon-question QrCode_question'></span>
		    					</span><br />
		    					<span class='font-weight-bold' style='font-size:38px;'>20</span>
		    				</el-col>
		    				<el-col style='padding:35px;line-height:40px;' :span='6'>
		    					<span class='color-666'>
		    						带来粉丝总数<span class='el-icon-question QrCode_question'></span>
		    					</span>
		    						<br />
		    					<span class='font-weight-bold' style='font-size:38px;'>20</span>
		    				</el-col>
		    				<el-col style='padding:35px;line-height:40px;' :span='6'>
		    					<span class='color-666'>
		    						流失粉丝总数<span class='el-icon-question QrCode_question'></span>
		    					</span>
		    						<br />
		    					<span class='font-weight-bold' style='font-size:38px;'>20</span>
		    				</el-col>
		    				<el-col style='padding:35px;line-height:40px;' :span='6'>
		    					<span class='color-666'>
		    						净增粉丝总数<span class='el-icon-question QrCode_question'></span>
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
		    			
		    			<echart-static :options='options'></echart-static>
		    			
		    </el-tab-pane>
		    <!---->
		     
		 </el-tabs>

	 </el-container>
</el-container>
</template>

<script>
import EchartStatic  from '@/components/common/echart_statistic'
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
			listContent: [],
			total: 0,
			listContentStatu: false,
	        baseURL: this.$axios.getWeChartBaseURL(),
	        options: {
	        	title: {
			        text: ''
			    },
			    tooltip: {
			        backgroundColor: 'rgba(0,0,0,0)',
			        formatter: function(p) {
			        	return "<div style='padding:10px 5px;text-align:left;border-radius:5px;border:1px solid "+p.color+";color:" + p.color + "';>" + p.name +'<br/>' + p.seriesName +':' + p.data + "</div>"
			        }
			    },
			    legend: {
			        data:[{name:'扫描次数'},{name:'带来粉丝数'},{name:'流失粉丝数'}],
			        padding:[0,5],
			        bottom: 0,
			        textStyle: {
			        	fontWeight: 'bold'
			        	
			        },
			        pageIconInactiveColor: '#000'
			    },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '10%',
			        containLabel: true
			    },
			    toolbox: {
//			        feature: {
//			            saveAsImage: {}
//			        }
			    },
			    xAxis: {
			        type: 'category',
			        boundaryGap: false,
			        offset: 0,
			        nameGap: 10,
			        data: ['05-31', '06-1', '06-2', '06-3', '06-4', '06-5', '06-6'],
			        axisLine: {
			        	show: true,
			        	lineStyle: {
			        		color:'#c0d0e0',
			        		width: 1,
			        		type: 'solid'
			        	}
			        },
			        axisTick:{//控制x轴上的间隔突出的小线条样式
					　　show:'true',//显示与否
					　　lineStyle:{//线条样式
					　　　　color: '#c0d0e0',
					　　　　width: 1,
					　　　　type: 'solid'
					　　},
						length: 12
					},
					axisLabel: {//控制x轴上的文字的样式
					　　show: true,//显示与否
					　　textStyle: { color: '#a3a3a3' },//控制x轴字体样式
					　　// formatter: '{value} °C'//轴上的数据带单位
					
					} 
			    },
			    yAxis: {
			        type: 'value',
			        show: true,
			        splitLine: {
			        	show: true,
			        	lineStyle: {
			        		color: '#ededed',
			        		width: 1,
			        		type: 'solid'
			        	}
			        },
			        axisLine: {
			        	show: false,	
			        },
			        axisLabel: {
			        	textStyle: { color: '#fff' }
			        },
			        axisTick:{
		                show:false
		            }
			    },
			    series: [
			        {
			            name:'扫描次数',
			            type:'line',
			            color:'#29a1a6',
			            data:[0, 0, 0, 1, 0, 0, 0],
			            tooltip: {
					        //trigger: 'axis'
					        borderColor: '#29a1a6'
					    }
			        },
			        {
			            name:'带来粉丝数',
			            type:'line',
			            color:'#88c07a',
			            data:[0, 1, 0, 1, 0, 0, 0],
			            tooltip: {
					        //trigger: 'axis'
					        borderColor: '#88c07a'
					    }
			            // itemStyle : { normal: {label : {show: true,formatter:function(p){return p.value > 0 ? (p.value):'';}}}}
			        },
			        {
			            name:'流失粉丝数',
			            type:'line',
			            color:'#ff9900',
			            width: 2,
			            data:[5, 5, 2, 10, 6, 2, 5],
			            tooltip: {
					        //trigger: 'axis'
					        borderColor: '#88c07a'
					    }
			        }
			    ]
	        }
		}
	},
	mounted() {
		this.Init(0)
		this.showChart = true
	},
	methods: {
	  
	  handleClick(tab, event) {
        //console.log(tab, event);
      },
      handleSelectionChang() {
      	
      },
      handleSelectionChange() {
      	
      },
      handleSizeChange(val) {
      	  let skip_number = (val -1)*8
          this.Init(skip_number)
      },
      handleCurrentChange(val) {
      	  let skip_number = (val -1)*8
          this.Init(skip_number)
      },
      openQrCode() {
      	let name =  'QRCodeAdd'
      	this.$router.push({name})
      },
      statistics(index) {
      	let name = 'QRCodeStatistics'
      	this.$router.push({name})
      },
      Init(skip_num) {
      	let url = this.baseURL + '/api/services/app/QrcodeManagement/GetAll'
      	let [qrcodeName,groupId,ouId,skipCount,maxResultCount] = ['',1,38,skip_num,8]
      	let bodyParam = {qrcodeName,groupId,ouId,skipCount,maxResultCount}
      	this.$axios.gets(url,bodyParam).then((res) => {
      		if (res.success) {
      			if (res.result.items.length > 0) {
      				res.result.items.forEach((res) => {
      					res.number = 0
      				})
      				this.listContent = res.result.items
      				this.listContentStatu = true
      				this.total = res.result.totalCount
      			} else {
      				this.listContentStatu = false
      			}
      		}
      	},(err) => {
      		
      	})
      },
      batch_downloads() {
      	let id_str = ''
      	this.listContent.forEach((list,index) => {
      		id_str += list.id + ','
      	})
      	window.location.href = this.baseURL + '/api/services/app/QrcodeManagement/DownLoadFiles?ids=' +id_str 
      },
      download(detail) {
      	window.location.href = this.baseURL + '/api/services/app/QrcodeManagement/DownLoadFile?id=' +detail.id
      }
   },
   components: {
   		EchartStatic
   }

})
</script>

<style scoped>
@import '//at.alicdn.com/t/font_561828_52cs36nfetw.css';
.color-ccc{color:#ccc;}
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
.color-33cccc{color:#33CCCC;}
.font-size-36{font-size:50px;}
.graphic_QRCode{padding-top:10px;padding-left:32px;box-sizing:border-box;background:#f2f2f2;height:100%;width:100%;padding-right:10px;}
.text-align-left{text-align:left;}
.graphic_message_head{width:100%;height:77px;background:#fff;position:relative;padding-left:84px;box-sizing:border-box;padding-top:14px;padding-bottom:15px;}
.graphic_message_head_img{position:absolute;top:14px;left:23px;display:block;width:50px;height:50px;border-radius:6px;}
.wechart_type{display:inline-block;padding:0 7px;padding-top:2px;padding-bottom:1px;font-size:12px;border:1px solid #33CCCC; color:#33CCCC;margin-top:5px;}
.QrCode_question{font-size:18px;color:#ccc;margin-left:10px;cursor:pointer;}
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
.graphic_QRCode .el-radio-button__inner{padding-top:7px;padding-bottom:7px;}
.graphic_QRCode .QRCode_tab_head .el-input__inner{height:30px;line-height:30px;}
.graphic_QRCod .el-date-editor .el-range-separator
.graphic_QRCode .el-radio-button__orig-radio:checked+.el-radio-button__inner {
    color: #fff;
    background-color: #33CCCC;
    border-color: #33CCCC;
    -webkit-box-shadow: -1px 0 0 0 #33CCCC;
    box-shadow: -1px 0 0 0 #33CCCC;
}
.graphic_QRCode .QRCode_tab_head .el-date-editor .el-range__icon{
	line-height:30px;
}
.graphic_QRCode .el-radio-group{padding-bottom:4px;}
</style>