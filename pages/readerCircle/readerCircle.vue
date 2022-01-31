<template>
	<view >
		<circle-friends :myinfo="myinfo"></circle-friends>
		<view>
			<uni-fab  horizontal="right" class="uni-fab" vertical="bottom" @fabClick="fabClick"></uni-fab>
		</view>
		<circle-friends-item :previewList="previewList"></circle-friends-item>
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
				previewList:[
					{
						id:1,
						userAvatar:'https://img0.baidu.com/it/u=2704063193,2599266382&fm=253&fmt=auto&app=138&f=JPEG?w=255&h=255',
						nickName:'沉迷学习无法自拔',
						contentText:'今天又是充满希望的一天呢',
						contentImg:['https://img0.baidu.com/it/u=2704063193,2599266382&fm=253&fmt=auto&app=138&f=JPEG?w=255&h=255','https://img0.baidu.com/it/u=2704063193,2599266382&fm=253&fmt=auto&app=138&f=JPEG?w=255&h=255','https://img0.baidu.com/it/u=2704063193,2599266382&fm=253&fmt=auto&app=138&f=JPEG?w=255&h=255','https://img0.baidu.com/it/u=2704063193,2599266382&fm=253&fmt=auto&app=138&f=JPEG?w=255&h=255','https://img0.baidu.com/it/u=2704063193,2599266382&fm=253&fmt=auto&app=138&f=JPEG?w=255&h=255','https://img0.baidu.com/it/u=2704063193,2599266382&fm=253&fmt=auto&app=138&f=JPEG?w=255&h=255','https://img0.baidu.com/it/u=2704063193,2599266382&fm=253&fmt=auto&app=138&f=JPEG?w=255&h=255','https://img0.baidu.com/it/u=2704063193,2599266382&fm=253&fmt=auto&app=138&f=JPEG?w=255&h=255','https://img0.baidu.com/it/u=2704063193,2599266382&fm=253&fmt=auto&app=138&f=JPEG?w=255&h=255'],
						previewTime:'1小时前',
						fabulousList:['全村的希望'],
						reviewList:[
							{reviewName:'全村的希望',reviewContext:'我也是这样认为的！'},
							{reviewName:'全村的希望',reviewContext:'确实！'}
						]
					},
					{
						id:2,
						userAvatar:'https://img0.baidu.com/it/u=2704063193,2599266382&fm=253&fmt=auto&app=138&f=JPEG?w=255&h=255',
						nickName:'沉迷学习无法自拔',
						contentText:'今天又是充满希望的一天呢',
						previewTime:'1小时前',
						fabulousList:['全村的希望'],
						reviewList:[
							{reviewName:'全村的希望',reviewContext:'确实！'}
						]
					},
				]
			}
		},
		methods: {
			fabClick() {
				uni.navigateTo({
					url:'../../subpkg/write-friend-circle/write-friend-circle'
				})
			},
		},
		onLoad() {
			
		}
	}
</script>

<style lang="scss">
	
</style>
