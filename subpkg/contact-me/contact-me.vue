<template>
	<view class="contact-me" :style="{height: wh + 'px'}">
		<uni-notice-bar class="notice-bar" showIcon=true showClose=true scrollable="true" single="true"
			text="[单行] 若你在使用过程中有任何问题都可以扫码添加作者想作者询问"></uni-notice-bar>
		<image class="erweima" src="http://wx-ebook-download.oss-cn-chengdu.aliyuncs.com/image/IMG_2530.JPG"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wh: 0
			};
		},
		onLoad() {

			// 获取当前设备信息
			let sys = uni.getSystemInfoSync();
			this.wh = sys.windowHeight;

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
