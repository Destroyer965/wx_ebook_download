<template>
	<view class="empty-result">
		<image class="empty-result-img"
			src="http://wx-ebook-download.oss-cn-chengdu.aliyuncs.com/image/img_data_3x.jpg"></image>
		<slot name="tips" ></slot>
		<button class="goHome" @click="goHome">返回首页</button>
	</view>
</template>

<script>
	export default {
		name: "empty-result",
		data() {
			return {};
		},
		methods:{
			goHome(){
				uni.switchTab({
					url:'../../pages/index/index'
				})
				
			}
		}
	}
</script>

<style lang="scss">
	.empty-result {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		margin-top: 100px;
		.empty-result-img {
			width: 600rpx;
			height: 370rpx;
		}

		.goHome {
			width: 179px;
			height: 44px;
			margin: 34px 0px;
			line-height: 44px;
			background: rgb(255, 255, 255);
			border-radius: 53px;
			font-size: 14px;
			color: rgb(70, 92, 255);
			border: 1px solid rgb(70, 92, 255);
			
		}
	}
</style>
