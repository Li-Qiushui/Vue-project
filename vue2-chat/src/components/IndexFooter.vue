<template>
	<div class="footer">
		<el-button
			plain
			icon="el-icon-chat-dot-square">
			<span>消息</span>
		</el-button>
		<el-button
			plain
			icon="el-icon-user">
			<span>联系人</span>
		</el-button>
		<el-button
			plain
			icon="el-icon-orange">
			<span>空间</span>
		</el-button>
	</div>
</template>

<script>
	export default {
		
	}
</script>

<style scoped>
	.footer {
		display: flex;
		justify-content: space-between;
	}

	.footer .el-button {
		border: none;
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 4px 10px;
		font-size: 28px;
	}
	.footer .el-button span {
		font-size: 14px;
	}
</style>
