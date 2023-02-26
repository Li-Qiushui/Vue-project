<template>
	<div id="app">
		<el-container>
			<el-header height="auto">
				<router-view name="header" :UserData="UserData"></router-view>
			</el-header>
			<el-main>
				<Keep-alive>
					<router-view></router-view>
				</Keep-alive>
			</el-main>
			<el-footer height="auto">
				<router-view name="footer"></router-view>
			</el-footer>
		</el-container>
	</div>
</template>

<script>
	import Bus from "./script/Bus.js"

	export default {
		name: 'App',
		components: {

		},
		data() {
			return {
				UserData: {}
			}
		},
		mounted() {
			this.UserData = this.global.ValidationData(this);
			Bus.$emit('UserData',this.UserData);
		},
		methods: {
			
		}
	}
</script>

<style>
	::-webkit-scrollbar {
		width: 4px;

	}

	::-webkit-scrollbar-thumb {
		background-color: #eaecf1;
		border-radius: 3px;
	}

	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	#app {
		width: 100%;
		height: 100vh;
		max-width: 450px;
		margin: 0 auto;
		border: 1px solid #f1f1f1;
	}

	#app .el-container {
		width: 100%;
		height: 100%;
	}

	#app .el-header {
		padding: 0;
	}

	#app .el-main {
		padding: 0;
	}
</style>
