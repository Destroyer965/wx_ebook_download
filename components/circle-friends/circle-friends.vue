<template>
	<view>
		<block v-for="item in myinfo" :key="item.id">
			<view class="circle-friends" @longpress="longpress" @click="reviewImage(bgImgSrc)"
				:style="{backgroundImage: 'url('+ item.bgImgSrc + ')'}">
				<view class="personinfo">
					<text class="nickname">{{item.nickname}}</text>
					<image :src="item.avartar" class="avatar"></image>
				</view>
			</view>
		</block>
	</view>

</template>

<script>
	import {
		previewImage
	} from '../../utils/previewPictures.js'
	export default {
		props: {
			'myinfo': {
				type: Array,
				default: [{
					id: 1,
					nickname: '🐶',
					bgImgSrc: 'http://wx-ebook-download.oss-cn-chengdu.aliyuncs.com/freind-cicle-background/IMG_2532.JPG',
					avartar: 'https://img1.baidu.com/it/u=2978275592,376851900&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=498'
				}]
			}
		},
		name: "circle-friends",
		data() {
			return {};
		},
		methods: {
			// 点击预览图片
			reviewImage(bgImgSrc) {
				previewImage(bgImgSrc)
			},
			longpress() {
				console.log(1)
			}
		}
	}
</script>

<style lang="scss">
	.circle-friends {
		position: relative;
		width: 100%;
		height: 250px;
		background-size: 100% 100%;
		background-repeat: no-repeat;

		.personinfo {
			display: flex;
			position: absolute;
			right: 20rpx;
			bottom: -25px;

			.nickname {
				margin-top: 10px;
				font-size: 24px;
				color: #000;
				padding-right: 10px;
			}

			.avatar {
				width: 70px;
				height: 70px;
				border-radius: 10px;
			}
		}
	}
</style>
