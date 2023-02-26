<template>
	<div class="header">
		<el-avatar
			:size='40'
			icon='el-icon-user'>
		</el-avatar>
		<div class="info">
			<p class="name">{{UserData.name}}</p>
			<p class="state">{{'手机'}}在线</p>
		</div>
		<el-button
			plain
			icon='el-icon-plus'
		></el-button>
	</div>
</template>

<script>
	import Bus from "../script/Bus.js"

	export default {
		name:'IndexHeader',
		props:['UserData'],
		data() {
			return {
				
			}
		},
		mounted() {
			
		}
	}
</script>

<style scoped>
	.header{
		display: flex;
		width: 100%;
		padding: 10px;
	}

	.header .el-avatar {
		font-size: 24px;
		margin-right: 8px;
	}

	.header .info{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.header .info .state {
		color: #555;
		font-size: 14px;
	}

	.header .el-button {
		padding: 0;
		margin-left: auto;
		border: none;
		font-size: 32px;
	}
</style>
