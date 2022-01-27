<template>
	<view>
		<circle-friends :myinfo="myinfo"></circle-friends>
		<view>
			<uni-fab  horizontal="right" vertical="bottom" @fabClick="fabClick"></uni-fab>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myinfo: [{
					id: 1,
					nickname: '🐶',
					bgImgSrc: 'http://wx-ebook-download.oss-cn-chengdu.aliyuncs.com/freind-cicle-background/IMG_2532.JPG',
					avartar: 'https://img1.baidu.com/it/u=2978275592,376851900&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=498'
				}],
			}
		},
		methods: {
			fabClick() {
				uni.navigateTo({
					url:'../../subpkg/write-friend-circle/write-friend-circle'
				})
			}
		},
		onLoad() {
			uni.hideShareMenu()
		}
	}
</script>

<style>

</style>
