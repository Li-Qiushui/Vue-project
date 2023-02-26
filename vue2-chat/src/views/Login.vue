<template>
	<div class="login">
		<div class="title">
			<h2>登录</h2>
		</div>
		<div class="input">
			<form action="">
				<el-input placeholder="账号" v-model="user.id">
				</el-input>
				<el-input placeholder="密码" v-model="user.password" show-password>
				</el-input>
			</form>
		</div>
		<div class="button">
			<el-button>注册</el-button>
			<el-button type="primary" @click="login()">
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
				user: {
					id: '',
					password: ''
				}
			}
		},
		mounted() {
			this.global.ValidationData(this);
		},
		methods: {
			login() {
				this.axios.post('/login', {
					data: {

					}
				}).then(res => {
					let UserData = {};
					let data = res.data;
					if (data.code == 200) {
						UserData = data.data;
					}
					let JsonUserData = JSON.stringify(UserData);
					localStorage.setItem('UserData', JsonUserData)
					this.global.UserData = UserData
					this.$router.push('/');
				})
			}
		}
	}
</script>

<style scoped>
	.login {
		height: 100%;
		padding: 10px;
		padding-top: 20%;
	}

	.title {
		padding: 16px 0;
		text-align: center;
	}

	.title h2 {
		font-size: 32px;
	}

	.input {
		padding: 0 10px;
	}

	.el-input {
		margin-top: 24px;
	}

	/deep/ .el-input__inner {
		height: 50px;
		line-height: 50px;
	}

	.button {
		display: flex;
		column-gap: 24px;
		padding: 0 10px;
		margin-top: 16px;
	}

	.el-button {
		width: 100%;
		height: 50px;
		line-height: 30px;
		margin-top: 16px;
	}

	.el-button+.el-button {
		margin-left: 0;
	}
</style>
