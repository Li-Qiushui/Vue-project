<template>
	<div class="login">
		<div class="title" >
			<h2>登录</h2>
		</div>
		<div class="input">
			<el-input
				placeholder="账号"
				v-model="user.id">
			</el-input>
			<el-input
				placeholder="密码"
				v-model="user.password"
				show-password>
			</el-input>
		</div>
		<div class="button">
			<el-button>注册</el-button>
			<el-button
				type="primary"
				@click="login()">
				登录</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Login',
		props: {

		},
		data() {
			return {
				user:{
					id:'',
					password:''
				}
			}
		},
		mounted() {
			this.axios.post('/login',{
				data:{
					
				}
			}).then(res => {
				let data = res.data;
				console.log(data.code)
			})
		},
		methods:{
			login() {
				console.log(this.user.id,this.user.password)
			}
		}
	}
</script>

<style scoped>
	.login{
		height: 100%;
		padding-top: 20%;
	}
	.title{
		padding: 16px 0;
		text-align: center;
	}
	.title h2{
		font-size: 32px;
	}
	.el-input{
		margin-top: 24px;
	}
 	/deep/ .el-input__inner{
		height: 50px;
		line-height: 50px;
	}
	.button{
		display: flex;
		column-gap: 24px;
		margin-top: 16px;
	}
	.el-button{
		width: 100%;
		height: 50px;
		line-height: 30px;
		margin-top: 16px;
	}
	.el-button+.el-button{
		margin-left: 0;
	}
</style>
