<template>
	<div id="app">
		<div class="TopBar">
			<div class="left" @click="$router.go(-1)">
				<img :src="LeftImgUrl">
			</div>
		</div>
		<div class="Page">
			<router-view ref="child1Container" :play='play'></router-view>
		</div>
		<Playbar v-show="bottomBar" @save='save' :playlist='playlist' :play='play' />
	</div>
</template>

<script>
	import Playbar from './components/Playbar'
	import LeftImgUrl from '@/assets/Left.svg'
	export default {
		name: 'app',
		components: {
			Playbar
		},
		watch: {
			'$route': function() {
				console.log(this.$route.path == '/login')
				if (this.$route.path == '/play' || this.$route.path == '/login') {
					this.bottomBar = false;
				} else {
					this.bottomBar = true;
				}
			}
		},
		data() {
			return {
				playlist: [],
				play: '',
				user: "",
				bottomBar: true,
				LeftImgUrl
			}
		},
		methods: {
			save() {
				this.$refs.child1Container.durationUpdate();
			}
		},
		mounted() {
			//判断是否登录
			if (localStorage.user == undefined) {
				this.$router.push('/login')
				return false
			};
			let user = JSON.parse(localStorage.user);
			if (user.account == undefined) {
				this.$router.push('/login')
			} else {
				this.user = user;
				const main = this;
				this.axios.get(this.ApiURl + '/login/status', {
					params: {
						cookie: user.cookie
					}
				}).then(function(res) {
					const data = res.data.data;
					if (data.code != 200) {
						main.$router.push('/login')
					}
				})
			}
		}
	}
</script>

<style>
	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		-webkit-tap-highlight-color: transparent;
	}

	body {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	img {
		-webkit-user-drag: none;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	#app {
		max-width: 435px;
		width: 100%;
		height: 100vh;
		margin: 0 auto;
		border: 1px solid #E0E0E0;
		overflow: hidden;
		background-color: #fafafa;
	}

	.TopBar {
		display: flex;
		width: 100%;
		height: 50px;
		padding: 5px 10px;
	}

	.TopBar .left {
		padding: 5px 0;
	}

	.Page {
		height: calc(100% - 100px);
	}
</style>
