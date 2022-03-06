const baseUrl = "http://localhost:8989";
let token = '';

function service(options = {}) {
	const value = uni.getStorageSync('token')
	if (value) {
		token = value
	}
	options.url = `${baseUrl}${options.url}`;
	//配置请求头
	options.header = {
		'content-type': 'application/x-www-form-urlencoded',
		'Authorization': `${token}`
	};
	return new Promise((resolved, rejected) => {
		//成功
		options.success = (res) => {
			if (Number(res.data.code) == 20000) { //请求成功
				resolved(res.data.data);
			} 
			else {
				uni.showToast({
					icon: 'error',
					duration: 3000,
					title: `${res.data.message}`
				});
				rejected(res.data.msg); //错误
			}

		}
		//错误
		options.fail = (err) => {
			uni.navigateTo({
				url:'/subpkg/error/error.vue'
			})
			rejected(err); //错误
		}
		uni.request(options);

	});
}
export default service;
