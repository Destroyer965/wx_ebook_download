<template>
	<view class="contact-me">
		<uni-notice-bar class="notice-bar" showIcon=true  scrollable="true" single="true"
			text="你在使用过程中的任何问题都可以扫码添加作者向作者咨询"></uni-notice-bar>
		<image class="erweima" src="http://wx-ebook-download.oss-cn-chengdu.aliyuncs.com/image/IMG_2530.JPG"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: '联系作者'
			});
			uni.setNavigationBarColor({
				backgroundColor: "#F1F4F9"
			})

		}
	}
</script>

<style lang="scss">
	.contact-me {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		background-color: #F1F4F9;

		.erweima {
			width: 600rpx;
			height: 700rpx;
			border-radius: 25px;
			box-shadow: 0 10px 10px 0 #6c6c6c;
		}

		.notice-bar {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
		}
	}
</style>
