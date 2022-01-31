<template>
	<view class="person">
		<view class="userinfo">
			<view class="userinfo-top" v-if="isLogin">
				<view class="user-baseinfo">
					<view class="user-avartar">
					</view>
					<view class="user-baseinfo-right">

						<text class="user-nickname">
							🌻
						</text>
						<view class="user-grade t-icon t-icon-chuangxianghuangjinvip">

						</view>
					</view>
				</view>
				<view class="sign-in" @click="signIn">签到</view>
			</view>
			<view class="userinfo-top" v-else>
				<view class="user-baseinfo">
					<view class="user-avartar">
					</view>
					<view class="user-baseinfo-right">

						<text class="user-nickname" style="font-size: 18px;">
							请登录
						</text>

					</view>
				</view>
			</view>
			<view class="userinfo-bottom">
				<view class="userinfo-item">
					<text class="item-num">{{downloadNum}}</text>
					<text class="item-text">下载</text>
				</view>
				<view class="userinfo-item">
					<text class="item-num">{{collectionNum}}</text>
					<text class="item-text">收藏</text>
				</view>
				<view class="userinfo-item">
					<text class="item-num">{{integral}}</text>
					<text class="item-text">积分</text>
				</view>
			</view>
		</view>
		<view class="person-list">
			<navigator url="../../subpkg/download-history/download-history" class="list-item">
				<view class="list-item-text">
					<text class="iconfont icon-xiazaijilu"></text>

					<text class="item-text">下载记录</text>
				</view>
				<uni-icons type="right"></uni-icons>
			</navigator>
			<view class="list-item">
				<view class="list-item-text">
					<text class="iconfont icon-shoucang"></text>

					<text class="item-text">我的收藏</text>
				</view>
				<uni-icons type="right"></uni-icons>
			</view>
			<navigator url="../../subpkg/problem-feedback/problem-feedback" class="list-item">
				<view class="list-item-text">
					<text class="iconfont icon-wentifankui"></text>
					<text class="item-text">问题反馈</text>
				</view>
				<uni-icons type="right"></uni-icons>
			</navigator>
			<navigator url="../../subpkg/contact-me/contact-me" class="list-item">
				<view class="list-item-text">
					<text class="iconfont icon-tuichu"></text>
					<text class="item-text">联系作者</text>
				</view>
				<uni-icons type="right"></uni-icons>
			</navigator>
			<view class="list-item" @click="logout">
				<view class="list-item-text">
					<text class="iconfont icon-tuichu"></text>
					<text class="item-text">退出登录</text>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="footer-top">
				<view class="footer-top-title">
					<text class="iconfont icon-github"></text>
					<text class="support-subject-text">支持项目</text>
				</view>
				<view class="footer-top-title">
					<text class="iconfont icon-mianzeshengming1"></text>
					<text class="support-subject-text">免责声明</text>
				</view>

			</view>
			<view class="footer-copyright">
				<text>Copyright © 2022 Design By yangjiahai</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin: true,
				downloadNum: 999,
				collectionNum: 999,
				integral: 999
			}
		},
		methods: {
			// 签到
			signIn() {
				uni.showToast({
					title: '签到成功'
				})
			},
			logout() {
				uni.showActionSheet({
					title:'你确定要退出吗？',
					itemList:['退出登录'],
					itemColor:'#FE2B2B',
					success() {
						console.log('退出成功')
					}
				})
			}
		},

	}
</script>

<style lang="scss" scoped>
	@import url("/static/fonts/iconfont.css");

	.person {
		position: relative;
		background-color: $my-bg-color;
		height: 100%;

		.userinfo {
			height: 350rpx;
			background-color: $my-color-base;
			border-bottom-left-radius: 40rpx;
			border-bottom-right-radius: 40rpx;

			.userinfo-top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 90%;
				margin: 0 auto;

				.user-baseinfo {
					display: flex;
					justify-content: flex-start;
					align-items: center;


					.user-avartar {
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;
						background-image: url(https://img1.baidu.com/it/u=2978275592,376851900&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=498);
						background-size: 100% 100%;
						background-repeat: no-repeat;
						margin-right: 20rpx;
					}

					.user-baseinfo-right {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						align-items: center;

						.user-nickname {
							font-size: 50rpx;
						}

						.user-grade {
							width: 90px;
							height: 29px;
							background-repeat: no-repeat;
							background-position: center;
							background-size: 100% 100%;
						}
					}


				}

				.sign-in {
					width: 150rpx;
					height: 60rpx;
					color: #fff;
					font-size: 30rpx;
					text-align: center;
					border-radius: 32rpx;
					line-height: 60rpx;
					font-weight: 800;
					background-color: #E85656;
				}

			}

			.userinfo-bottom {
				display: flex;
				justify-content: space-around;
				margin-top: 60rpx;

				.userinfo-item {
					display: flex;
					flex-direction: column;
					text-align: center;

					.item-num {
						color: #E85656;
						font-size: 36rpx;
					}

					.item-text {
						font-size: 28rpx;
					}
				}
			}
		}

		.person-list {
			width: 95%;
			margin: 20rpx auto;
			background-color: #fff;
			border-radius: 10rpx;

			.list-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 90%;
				height: 98rpx;
				margin: 0 auto;

				.item-text {
					font-size: 16px;
					margin-left: 20rpx;

				}

			}
		}

		.footer {
			width: 100%;
			position: absolute;
			left: 0;
			bottom: 10px;

			width: 100%;

			.footer-top {
				display: flex;
				justify-content: center;

				.footer-top-title {
					display: flex;
					align-items: center;
					margin-right: 20rpx;

					.iconfont {
						color: #C0C0C0;
					}

					.support-subject-text {
						color: #C0C0C0;
						font-size: 14px;
						margin-left: 5px;
					}
				}
			}

			.footer-copyright {
				display: flex;
				justify-content: center;
				color: #C0C0C0;
				font-size: 12px;
			}
		}
	}
</style>
