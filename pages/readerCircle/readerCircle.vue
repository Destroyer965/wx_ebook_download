<template>
	<view>
		<circle-friends :userinfo="userinfo"></circle-friends>
		<view>
			<uni-fab horizontal="right" class="uni-fab" vertical="bottom" @fabClick="fabClick"></uni-fab>
		</view>
		<circle-friends-item :previewList="previewList"></circle-friends-item>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import {
		queryReadcircle
	} from '../../utils/api.js'
	export default {
		data() {
			return {
				myinfo: [{
					id: 1,
					nickname: '🐶',
					bgImgSrc: 'http://wx-ebook-download.oss-cn-chengdu.aliyuncs.com/freind-cicle-background/IMG_2532.JPG',
					avartar: 'https://img1.baidu.com/it/u=2978275592,376851900&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=498'
				}],
				previewList: [],
				query:{
					pageNo:1,
					pageSize:3
				},
				total:0
			}
		},
		methods: {
			fabClick() {
				uni.navigateTo({
					url: '../../subpkg/write-friend-circle/write-friend-circle'
				})
			},
			async getReadcircle() {
				let res = await queryReadcircle(this.query);
				console.log(res)
				this.previewList = res.data
				this.total = res.total
			}
		},
		onLoad() {
			this.getReadcircle();
		},
		computed: {
			...mapState(['userinfo'])
		}
	}
</script>

<style lang="scss">

</style>
