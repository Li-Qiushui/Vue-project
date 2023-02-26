<template>
	<div class="Index">
		<div class="ChatList">
			<div class="item" 
				v-for="(item,index) in ChatList" 
				:key="index"
				@click="toChat(item)">
				<el-avatar 
					fit="cover"
					:size="50"
					:src="item.avatar">
				</el-avatar>
				<div class="info">
					<p class="name" v-text="item.name">
					</p>
					<p class="msg" v-text="item.msg">
					</p>
				</div>
				<div class="tag">
					<p v-text="global.Timestamp(item.timestamp)"></p>
					<el-badge :value="item.newmsg" :max="99" v-if="item.newmsg != 0">
					</el-badge>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Bus from "../script/Bus.js"

	export default {
		name: 'Index',
		props: {

		},
		data() {
			return {
				ChatList: []
			}
		},
		mounted() {
			this.getChatList();
		},
		methods: {
			getChatList() {
				this.axios.post("/chatlist").then(res => {
					let data = res.data;
					let ListData = data.data.chatlist;
					ListData = ListData.sort((a, b) => b.timestamp - a.timestamp)
					this.ChatList = ListData;
				})
			},
			toChat(Chatting) {
				this.$router.push('/Chat');
				setTimeout(() => {
					Bus.$emit('Chatting',Chatting);
				},10)
			}
		}
	}
</script>

<style scoped>
	.Index {
		padding-left: 10px;
		height: 100%;
	}

	.ChatList {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding-right: 6px;
		overflow-y: scroll;
	}

	.item {
		cursor: pointer;
		transition: 150ms;
		display: flex;
		padding: 5px 10px;
		margin: 5px 0;
		border-radius: 4px;
	}

	.Index .el-avatar {
		display: block;
		margin-right: 10px;
	}

	.Index /deep/ .el-avatar img {
		width: 100%;
	}

	.item:hover {
		background-color: rgba(0, 170, 255, 0.2);
	}

	.item .info {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.item .info .name {
		font-size: 16px;
	}

	.item .info .msg {
		color: #999;
		font-size: 14px;
	}

	.Index .tag {
		display: flex;
		align-items: flex-end;
		flex-direction: column;
		margin-left: auto;
	}

	.Index .tag p {
		margin-bottom: 4px;
		color: #999;
		font-size: 12px;
	}

	.Index /deep/ .el-badge {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		background-color: #f56c6c;
	}

	.Index /deep/ .el-badge sup {
		border: none;
		background-color: transparent;
	}
</style>
