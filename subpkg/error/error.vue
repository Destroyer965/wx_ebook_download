<template>
	<view class="empty-result">
		<image class="empty-result-img"
			src="https://wx-ebook-download.oss-cn-chengdu.aliyuncs.com/image/%E7%BD%91%E7%BB%9C%E6%95%85%E9%9A%9C.png"></image>
		<slot name="tips" ></slot>
		<button class="goHome" @click="goHome">刷新</button>
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
		    height: 350px;
		    margin-top: 100px;
		    position: fixed;
		    top: 10%;
		    margin: 0 auto;
		    width: 100%;
		.empty-result-img {
			width: 600rpx;
			height: 450rpx;
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
