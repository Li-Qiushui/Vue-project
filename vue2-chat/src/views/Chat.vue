<template>
	<div class="Chat">
		<div class="MsgList">
			<div class="item"
				v-for="(item,index) in MsgList" 
				:key="index">
				<span>{{item}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Chat',
		data() {
			return {
				MsgList:{}
			}
		},
		mounted() {
			
		},
		methods: {
			
		}
	}
</script>

<style>
</style>
