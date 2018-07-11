<template>
	<el-form :model="ruleForm2" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
		<el-form-item 
			label="账号" 
			prop="userName"
			:rules="[
				{required:true,message:'请输入账号',trigger:'blur'}
			]"
		>
			<el-input type="text" v-model="ruleForm2.userName" auto-complete="off"></el-input>
		</el-form-item>
		<el-form-item 
			label="密码" 
			prop="pass"
			:rules="[
				{required:true,message:'请输入密码',trigger:'blur'}
			]"
		>
			<el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
			<el-button @click="resetForm('ruleForm2')">取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
  data() {
    return {
      ruleForm2: {
        pass: "",
        userName: ""
      },
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) { // 验证成功
					console.log('data',{userName:this.ruleForm2.userName,pass:this.ruleForm2.pass});
					console.log(this.ruleForm2);
					
        } else {
					console.log("error submit!!");
					this.$message.error('错了哦，这是一条错误消息');
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only 私有 -->
<style scoped>
</style>
