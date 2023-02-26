export default {
	ValidationData(Vue) {
		let JsonUserData = localStorage.getItem('UserData');
		let UserData = JSON.parse(JsonUserData);
		if (Vue.$route.path != '/login') {
			if (UserData == undefined) {
				Vue.$router.push('/login');
			} else {
				Vue.$router.push('/');
			}
		}
		return UserData;
	},
	Timestamp(time) {
		let timestamp = parseInt(new Date().getTime() / 1000);
		let day = Math.floor((timestamp - time) / 3600 / 24)
		if (day == 0) {
			return '今天';
		} else {
			return day + '天前';
		}
	}
}
