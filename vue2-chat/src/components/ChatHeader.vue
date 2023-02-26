<template>
	<div class="header">
		<el-button plain @click="$router.go(-1)" class="btn-1" icon="el-icon-arrow-left">
		</el-button>
		<div class="info">
			<p class="name">{{Chatting.name}}</p>
			<p class="state">{{'手机'}}在线</p>
		</div>
	</div>
</template>

<script>
	import Bus from "../script/Bus.js"

	export default {
		name: 'IndexHeader',
		props: ['UserData'],
		data() {
			return {
				Chatting: {}
			}
		},
		mounted() {
			Bus.$off('Chatting');
			Bus.$on('Chatting',Chatting => {
				this.Chatting = Chatting;
			})
		}

	}
</script>

<style scoped>
	.header {
		display: flex;
		width: 100%;
		padding: 10px;
	}

	.header .el-button {
		padding: 0;
		border: none;
		font-size: 32px;
	}

	.header .el-button.btn-1 {
		overflow: hidden;
		padding-right: 8px;
	}

	.header .el-button.btn-1 /deep/ i {
		margin-left: -8px;
	}

	.header .info {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.header .info .state {
		margin-top: 4px;
		color: #555;
		font-size: 12px;
	}
</style>
