<template>
<div class='dailog_picture'>
	<el-dialog width='68%' class='el-dialog_picture' :modal-append-to-body='isOutBody' title="选择图片" :show-close='false'  :visible="showDailog">
	<i @click="cancel" class='el-icon-close close_header'></i>
	<el-container>
	  	<el-aside style='padding-top:20px;border-right:1px solid #e4e4e4;' width="100px">
	  		<el-row>
	  			<el-col class='dailog_pic_head_list' align='left'>全部图片(640)</el-col>
	  		</el-row>
	  		<el-row align='left'>
	  			<el-col class='dailog_pic_head_list' align='left'>未分组(640)</el-col>
	  		</el-row>
	  		<el-row align='left'>
	  			
	  			<el-col class='dailog_pic_head_list' align='left'>微信小点(640)</el-col>
	  		</el-row>
	  		<el-row align='left'>
	  			
	  			<el-col class='dailog_pic_head_list' align='left'>文章配图(640)</el-col>
	  		</el-row>
	  		<el-row align='left'>
	  			
	  			<el-col class='dailog_pic_head_list' align='left'>操作说明(640)</el-col>
	  		</el-row>
	  	</el-aside>
	  	<el-container style='padding-left:15px;'>
	  		<el-main style='overflow-x: hidden;height:500px;'>
	  			<el-row v-show='listContentStatu' :gutter="10" style='height:480px;'>
	      	 		<el-col class='graphic_message_col' :span="6" v-for="(list, index) in listContent" :class='{"graphic_message_col_active ": list.statu}' :key="index" @click.native='chooseTab_picture(index)' :offset="index > 0 ? 0 : 0">
					    <el-card :body-style="{ 'padding': '0',paddingTop: '10px' }">
					      <img :src="list.wxMediaUrl" class="graphic_message_image">
					      <div class='text-align-left' style="padding: 14px; box-sizing:border-box;">
					        <div class="bottom">
					          <el-row>
					          	<el-col align='left' :span='24' class='font-size-13 text-ellipsis color-999'>{{list.mediaName}}</el-col>
					          	
					          </el-row>
					        </div>
					      </div>
					    </el-card>
					    <el-row class='choose_active'>
					    	<i class='el-icon-check'></i>
					    </el-row>
				  </el-col>
	      	 	</el-row>
	      	 	<el-row v-show='!listContentStatu' style='line-height:300px;'>
	      	 		暂无数据
	      	 	</el-row>
	  		</el-main>
	  		<el-footer>
	  			<el-row>
		         	<el-col :span='16' align='left'>
		         		<el-pagination style='margin-top:0;margin-bottom:10px;'
					      @size-change="handleSizeChange"
					      @current-change="handleCurrentChange"
					      :current-page="1"
					      :page-sizes="[8, 16, 24, 32]"
					      :page-size="8"
					      layout="total, sizes, prev, pager, next, jumper"
					      :total="total">
					    </el-pagination>
		         	</el-col>
		        
		   
		        	<el-col :span='8' align='right'>
		         		<el-button class='float-left weChart_simulcast' type="primary" @click="save">保存</el-button>
				 		<el-button class='weChart_cancel' @click="cancel">取消</el-button>
		         	</el-col> 
		        </el-row>
	  		</el-footer>
	  	</el-container>
	</el-container>
	<!---->
	    
	</el-dialog>
</div>
</template>

<script>
export default ({
	props: ['showDailog'],
	data() {
		return {
			SearchKey: '',
			baseURL: this.$axios.getWeChartBaseURL(),
			total: 0,
			listContent: '',
			listContentStatu: false,
			isOutBody: false,
			picture_data: [{statu: false},{statu: false},{statu: false},{statu: false},{statu: false},{statu: false},{statu: false},{statu: false}]
		}
	},
	created() {
		this.Init(1)
	},
	methods: {
	  chooseTab_picture(index) {
	  	Array.from(this.listContent,res => res.statu = false)
	  	this.listContent[index].statu = true
	  },
	  handleSizeChange(val) {
	      let skip_number = (val -1)*8
          this.Init(skip_number)
	  },
	  handleCurrentChange(val) {
	      let skip_number = (val -1)*8
          this.Init(skip_number)
	  },
	  cancel() {
	  	this.$emit('picture_close')
	  },
	  save() {
	  	let choose_item = {url:'',title: '',wxMediaId: ''}
	  	if (this.listContent.length > 0) {
	  		this.listContent.forEach((list) => {
		  		if (list.statu) {
		  			choose_item.url= list.wxMediaUrl
		  			choose_item.title= list.mediaName
		  			choose_item.wxMediaId = list.wxMediaId
		  		}
	  		})
	  	}
	  	this.$emit('picture_close',choose_item)
	  },
	  Init (skip_num) {
        let [uploadStatus,mediagroupId,mediaName,mediaTypeid,ouId,classId,sorting,skipCount,maxResultCount] = ['','','',1,38,'','',skip_num,8]
        let [url,bodyParam] = [this.baseURL + '/api/services/app/WxMediaManagement/GetAll',{uploadStatus,mediagroupId,mediaName,mediaTypeid,ouId,classId,sorting,skipCount,maxResultCount}]
        this.$axios.gets(url,bodyParam).then((res)=> {
          if (res.success) {
            if (res.result.items.length > 0) {
              this.total = res.result.totalCount
              res.result.items.forEach((list) => {
              	list.statu = false
              })
              this.listContentStatu = true
              this.listContent = res.result.items
            } else {
              this.listContentStatu = false
            }
          }
          
        },(err) => {
           console.log('err' + err)
           
        })
        
      }
	}
})
</script>

<style scoped>
.dailog_picture .close_header{
	position:absolute;
	top:10px;
	right:10px;
	font-size:20px;
	cursor:pointer;
}
.text-ellipsis{ overflow: hidden;text-overflow: ellipsis;white-space: nowrap; }
</style>
<style>
	.dailog_picture .el-dialog_picture .el-dialog{
	height:auto;
}
.dailog_picture .el-dialog_picture .el-dialog__body{
	padding-bottom:0;
	padding-top:0;
}
.dailog_picture .el-dialog__header{
	padding:0;text-align:left;
	font-size:14px;
	padding-top:16px;
	padding-left:22px;
	padding-bottom:17px;
	border-bottom:1px solid #e4e4e4;
}
.dailog_picture .el-dialog__header .el-dialog__title{
	font-size:16px;
}
.dailog_picture .el-dialog__body{padding-top:20px;}
.dailog_picture .graphic_message_comapny_level {
    padding-left: 11px;
    padding-top: 12px;
    padding-bottom: 13px;
    padding-right: 14px;
}
.dailog_picture .graphic_message_image {
    display: block;
    width: 94%;
    height: 150px;
    margin: 0 auto;
}
.dailog_picture .graphic_message_col{
	margin-top:10px;
	position:relative;
}
.dailog_picture .graphic_message_col_active:after{
	display:block;
	right:5px;
	height:100%;
	content: '';
	position:absolute;
	opacity: 0.35;
	top:0;
	left:5px;
	background:#000;
	
	box-sizing:border-box;
}
.dailog_picture .choose_active{
	position:absolute;
	top:40%;
	left:0;
	right:0;
	color:#FFFFFF;
	font-size:70px;
	font-weight:bold;
	z-index:100;
	display:none;
	
}
.dailog_picture .graphic_message_col_active .choose_active{
	display:block;
}
.dailog_picture .dailog_pic_head_list{
	font-size:12px;
	height:32px;
	line-height:32px;
	color:#999;
	cursor:pointer;
}

</style>