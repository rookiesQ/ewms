<template>
<div class='dailog_graphic'>
	<el-dialog width='68%' :modal-append-to-body='isOutBody' title="图文消息" :show-close='false'  :visible="showDailog">
	<i @click="cancel" class='el-icon-close close_header'></i>
   	<el-row>
   		<div class="search_input_wapper float-right" @keyup.enter="submitSearch">
                <el-input
                    v-model="SearchKey"
                    placeholder="搜索关键字/规则名称"
                    class="search_input">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
          </div>
   	</el-row>
   	<!--选择内容-->
   	 <el-row v-show='listContentStatu' :gutter="10" style='min-height:560px;'>
  	 	<el-col class='graphic_message_col' :span="6" v-for="(list, index) in listContent" :class='{"graphic_message_col_active ": list.statu}' @click.native='choosePic(index)' :key="index" :offset="index > 0 ? 0 : 0">
		    <el-card :body-style="{ padding: '0px' ,cursor: 'pointer'}">
		      <el-row class='graphic_message_comapny_level'>
		      	<el-col align='left' :span='24' class='text-align-left'>{{list.title}}</el-col>
		      	
		      </el-row>
		      <img :src="list.coverThumbId_WxMediaUrl" class="graphic_message_image">
		      <el-row style="padding: 10px; padding-top:10px;">
		          <el-col align='left' class='font-size-12 text-ellipsis'>{{list.digest}}</el-col>
		          <el-col align='left' style='margin-top:5px;' class='text-align-left font-size-12 color-999'>更新于{{list.modifiedTime | set_time}}</el-col>  	 
		      </el-row>
		      
		    </el-card>
		    <el-row class='choose_active'>
		    	<i class='el-icon-check'></i>
		    </el-row>
		  </el-col>
  	 </el-row>
  	 <el-row v-show='!listContentStatu' style='line-height:300px;'>
  	 	暂无数据
  	 </el-row>
   	<!---->
    <div slot="footer" class="dialog-footer">
    	
     	<el-row>
     		<el-col :span='16'>
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
    
    </div>
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
			isOutBody: false,
			listContent: '',
			listContentStatu: false,
			total: 0
		}
	},
	created() {
		this.Init(1)
	},
	filters: {
        set_time(val) {
          return val.split('T')[0].split('-')[1] + '/'+ val.split('T')[0].split('-')[2]
        }
   },
	methods: {
	  choosePic(index) {
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
	  	this.$emit('graphic_close')
	  },
	  save() {
	  	let choose_item = {url:'',title: '',wxMediaId: ''}
	  	if (this.listContent.length > 0) {
	  		this.listContent.forEach((list) => {
		  		if (list.statu) {
		  			choose_item.url= list.coverThumbId_WxMediaUrl
		  			choose_item.title= list.digest
		  			choose_item.wxMediaId = list.mediaId
		  		}
	  		})
	  	}
	  	this.$emit('graphic_close',choose_item)
	  },
	  Init (skip_num) {
        let [authod,title,ouId,sorting,skipCount,maxResultCount] = ['','',38,'',skip_num,8]
        let [url,bodyParam] = [this.baseURL + '/api/services/app/WXImgDataManagement/GetAll',{authod,title,ouId,sorting,skipCount,maxResultCount}]
        this.$axios.gets(url,bodyParam).then((res)=> {
          if (res.success) {
            if (res.result.items.length > 0) {
              this.total = res.result.totalCount
              res.result.items.forEach((list) => {
              	list.statu = false
              })
              this.listContentStatu = true
              this.listContent = res.result.items
            } else{
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
.dailog_graphic .el-dialog__header {
    padding: 0;
    text-align: left;
    font-size: 14px;
    padding-top: 16px;
    padding-left: 22px;
    padding-bottom: 17px;
    border-bottom: 1px solid #e4e4e4;
}
.dailog_graphic .close_header{
	position:absolute;
	top:10px;
	right:10px;
	font-size:20px;
	cursor:pointer;
}
.text-ellipsis{ overflow: hidden;text-overflow: ellipsis;white-space: nowrap; }
</style>
<style>
.dailog_graphic .el-dialog_picture .el-dialog{
	height:auto;
}
.dailog_graphic .el-dialog_picture .el-dialog__body{
	padding-bottom:0;
	padding-top:0;
}
.dailog_graphic .el-dialog__header{
	padding:0;text-align:left;
	font-size:14px;
	padding-top:16px;
	padding-left:22px;
	padding-bottom:17px;
	border-bottom:1px solid #e4e4e4;
}
.dailog_graphic .el-dialog__header .el-dialog__title{
	font-size:16px;
}
.dailog_graphic .el-dialog__body{padding-top:20px;}
.dailog_graphic .graphic_message_comapny_level {
    padding-left: 11px;
    padding-top: 12px;
    padding-bottom: 13px;
    padding-right: 14px;
}
.dailog_graphic .graphic_message_image {
    display: block;
    width: 94%;
    height: 150px;
    margin: 0 auto;
}
.dailog_graphic .graphic_message_col{
	margin-top:10px;
	position:relative;
}
.dailog_graphic .graphic_message_col_active:after{
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
.dailog_graphic .choose_active{
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
.dailog_graphic .graphic_message_col_active .choose_active{
	display:block;
}
.dailog_graphic .dailog_pic_head_list{
	font-size:12px;
	height:32px;
	line-height:32px;
	color:#999;
	cursor:pointer;
}
.dailog_graphic .search_input_wapper {
    width: 300px !important;
}
.dailog_graphic .el-input__icon {
    height: 100%;
    width: 25px;
    text-align: center;
    -webkit-transition: all .3s;
    transition: all .3s;
    line-height: 33px;
}
.dailog_graphic .el-input__prefix {
    width: 32px;
    left: initial;
    top: 0;
    right: 5px;
    cursor: pointer;
}
.QRCodeAdd .el-input__inner {
    height: 30px;
    padding-right:30px;
    padding-left:5px;
}
.QRCodeAdd .el-input__prefix {
    width: 32px;
    left: initial;
    top: 0;
    right: 5px;
    cursor: pointer;
}
.QRCodeAdd .upload-demo{
	text-align: left;
}
</style>
