<template>
	<view>
		<view class="circle-friends" 
			:style="{backgroundImage: 'url('+ userinfo.backgroundImg + ')'}">
			<view class="personinfo">
				<text class="nickname">{{userinfo.username}}</text>
				<image  @click="reviewImage(userinfo.avatar)"  :src="userinfo.avatar" class="avatar"></image>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		mapState
	} from 'vuex'
	import {
		previewImage
	} from '../../utils/previewPictures.js'
	export default {
		props: {
			'userinfo': {
				type: Object,
				required: true
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
		},

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
