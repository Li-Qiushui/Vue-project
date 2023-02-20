<template>
	<div id="app">
		<Login />
	</div>
</template>

<script>
	import Login from './components/Login.vue'

	export default {
		name: 'App',
		components: {
			Login
		},
		mounted() {
			
		}
	}
</script>

<style>
	*{
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
	#app {
		width: 100%;
		height: 100vh;
		max-width: 450px;
		margin: 0 auto;
	}
</style>
