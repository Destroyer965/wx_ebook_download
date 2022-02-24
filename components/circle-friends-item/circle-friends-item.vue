<template>
	<view @click="hideIsShow">
		<view class="circle-friends-item" v-for="(item,index) in previewList" :key="item.id">
			<view class="left-img">
				<image :src="item.userAvatar"></image>
			</view>
			<view class="right-box">
				<text class="nickname">{{item.nickName}}</text>
				<view class="circle-friends-content">
					<view class="circle-friends-content-text">
						{{item.contentText}}
					</view>
					<view class="circle-friends-content-img">
						<block v-for="(img,index) in item.contentImg" :key="img.id">
							<image @click="previewImg(img.imgSrc)" :src="img.imgSrc">
							</image>
						</block>
					</view>
				</view>
				<view class="location" @click="viewLocation">{{item.location}}</view>
				<view class="right-box-bottom">
					<text class="left-time">{{item.previewTime}}</text>

					<view class="right-more">
						<my-popup ref="more" class="my-popup"  :class="[isShow == index ? 'show' : 'hide']"  ></my-popup>
						<text class="iconfont icon-gengduo" @click.stop="more(index)"></text>
					</view>
				</view>
				<view class="review">
					<view class="fabulous-list">
						<text class="iconfont icon-xihuan"></text>
						<view class="fabulous-list-item" v-for="(fabulous,index) in item.fabulousList" :key="index">
							<text class="fabulous-list-name">{{fabulous}}</text>
						</view>
					</view>
					<view class="review-item" v-for="(review,index) in item.reviewList" :key="index">
						<text class="review-nickname">{{review.reviewName}}</text>
						<text>:</text>
						<text class="review-text">{{review.reviewContext}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		previewImage
	} from '../../utils/previewPictures'
	export default {
		props: {
			'previewList': {
				type: Array
			}
		},
		name: "circle-friends-item",
		data() {
			return {
				isShow: -1,
			};
		},
		methods: {
			previewImg(imgSrc) {
				console.log(imgSrc)
				previewImage(imgSrc);
			},
			more(index) {
				if (index == this.isShow) {
					this.isShow = -1
					return false
				};
				this.isShow = index
			},
			// 隐藏
			hideIsShow: function() {
				this.isShow = -1;
			},

			viewLocation() {
				uni.openLocation({
					longitude: 116.39747,
					latitude: 39.9085
				})
			}

		},



	}
</script>

<style lang="scss">
	.show {
		display: block;
	}

	.hide {
		display: none;
	}

	.circle-friends-item {
		display: flex;
		justify-content: flex-start;
		background-color: #fff;
		padding: 20rpx;

		.left-img {
			image {
				width: 90rpx;
				height: 90rpx;
				border-radius: 15rpx;
				margin-right: 20rpx;

			}
		}

		.right-box {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			flex: 1;

			.nickname {
				font-size: 32rpx;
				color: #576B95;
			}

			.circle-friends-content-text {
				font-size: 28rpx;
				color: #000000;
				margin-top: 10px;
			}

			.circle-friends-content-img {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				margin-top: 10px;

				image {
					width: 32%;
					height: 100px;
					margin-bottom: 5px;
				}
			}

			.location {
				color: #576B95;
				font-size: 13px;
			}

			.right-box-bottom {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 40px;

				.left-time {
					color: #ccc;
					font-size: 24rpx;
				}

				.right-more {
					display: flex;
					justify-content: center;
					align-items: center;
					z-index: 100;

					.my-popup {
						margin-right: 10px;
						z-index: 99;
					}

					.iconfont {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 80rpx;
						height: 50rpx;
						font-size: 18px;
						background-color: #F7F7F7;
						border-radius: 10rpx;

					}
				}
			}

			.review {
				margin-top: 20rpx;
				background-color: #F7F7F7;
				border-radius: 10rpx;
				padding: 5px 0;

				.fabulous-list {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					flex-wrap: wrap;
					padding: 0 10px 5px 10px;

					.iconfont {
						color: #576B95 !important;
						font-size: 30rpx;
					}

					.fabulous-list-item {
						padding-left: 10px;

						.fabulous-list-name {
							font-size: 30rpx;
							color: #576B95;
							margin-right: 10rpx;
						}
					}
				}

				.review-item {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					flex-wrap: wrap;
					padding-left: 10px;

					.review-nickname {
						font-size: 30rpx;
						color: #576B95;
					}

					.review-text {
						font-size: 30rpx;
						color: #000000;
						margin-left: 10px;
					}
				}
			}
		}


	}
</style>
