<template>
	<view class="person">
		<view class="userinfo">
			<view class="userinfo-top" v-if="userinfo">
				<view class="user-baseinfo">
					<view class="user-avartar">
						<image :src="userinfo.avatar"></image>
					</view>
					<view class="user-baseinfo-right">
						<text class="user-nickname">
							{{userinfo.username}}
						</text>
						<view class="user-grade t-icon t-icon-chuangxiangqingtongvip" v-if="userinfo.points<=100">
						</view>
						<view class="user-grade t-icon t-icon-chuangxiangbaiyinvip" v-else-if="userinfo.points<=300">
						</view>
						<view class="user-grade t-icon t-icon-chuangxianghuangjinvip" v-else-if="userinfo.points<=500">
						</view>
						<view class="user-grade t-icon t-icon-Lv60" v-else>
						</view>

					</view>
				</view>
				<view class="sign-in" v-if="isCanSignIn" @click="signIn">签到</view>
				<view class="sign-in already-signed-in" v-else @click="alreadySignIn">已签到</view>
			</view>
			<view class="userinfo-top" v-else>
				<view class="user-baseinfo">
					<uni-icons class="unlogin-avartar" size="40" type="person" color="#fff">
					</uni-icons>
					<view class="user-baseinfo-right">

						<text class="user-nickname" @click="login" style="font-size: 18px;color: #fff;">
							登录/注册
						</text>

					</view>
				</view>
			</view>
			<view class="userinfo-bottom">
				<view class="userinfo-item">
					<text class="item-num">{{downloadCount}}</text>
					<text class="item-text">下载</text>
				</view>
				<view class="userinfo-item">
					<text class="item-num">{{collectionCount}}</text>
					<text class="item-text">收藏</text>
				</view>
				<view class="userinfo-item">
					<text class="item-num">{{userinfo ? userinfo.points : 0 }}</text>
					<text class="item-text">积分</text>
				</view>
			</view>
		</view>
		<view class="person-list">
			<navigator url="../../subpkg/download-history/download-history" class="list-item">
				<view class="list-item-text">
					<text class="iconfont icon-yunduanxiazai"></text>

					<text class="item-text">下载记录</text>
				</view>
				<uni-icons type="right"></uni-icons>
			</navigator>
			<navigator url="../../subpkg/collection-records/collection-records" class="list-item">
				<view class="list-item-text">
					<text class="iconfont icon-shoucang1"></text>

					<text class="item-text">我的收藏</text>
				</view>
				<uni-icons type="right"></uni-icons>
			</navigator>
			<navigator url="../../subpkg/problem-feedback/problem-feedback" class="list-item">
				<view class="list-item-text">
					<text class="iconfont icon-wentifankui"></text>
					<text class="item-text">问题反馈</text>
				</view>
				<uni-icons type="right"></uni-icons>
			</navigator>
			<navigator url="../../subpkg/contact-me/contact-me" class="list-item">
				<view class="list-item-text">
					<text class="iconfont icon-pinglun"></text>
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
				<text>Copyright © 2022 Designed By yangjiahai</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		login,
		logout,
		getUserInfo,
		queryDownloadHistory,
		getCollectionById,
		registration,
		firstinto
	} from "../../utils/api.js"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				integral: 0,
				query: {
					pageNo: 1,
					pageSize: 1
				},
				downloadCount: 0,
				collectionCount: 0,
				isCanSignIn: true

			}
		},
		methods: {
			//将用户信息存入vuex中
			...mapMutations(['getUser']),
			// 签到
			async signIn() {
				let res = await registration();
				console.log(res)
				if (res === 1) {
					this.isCanSignIn = false;
					this.userInfo()
					uni.showToast({
						title: "签到成功",
					})
				} else {
					this.isCanSignIn = true;
				}
				console.log(res)
			},
			//已签到
			alreadySignIn() {
				uni.showToast({
					title: "您今天已经签到了，请明天再来！",
					icon: "none"
				})
			},
			login() {
				console.log('刷新登录')
				let that = this;
				//	获取用户信息
				uni.getUserProfile({
					desc: "获取用户信息",
					success(e) {
						uni.showLoading({
							title: "正在登录"
						})
						//拉取用户成功，调用登录
						uni.login({
							provider: 'weixin',
							success: (res) => {
								console.log(res)
								if (res.errMsg == "login:ok") {
									let param = {
										code: res.code,
										rawData: e.rawData
									}
									// 请求后端接口换取 openid 和 session_key,
									login(param).then(res => {
										// 将token存储到Storage中
										uni.setStorageSync('token', res)
										uni.hideLoading()
										uni.showToast({
											title: "登录成功"
										})
										// 获取用户信息
										that.userInfo()
									})
								} else {
									uni.showToast({
										title: '登录失败'
									})
								}
							}
						})
					},
					fail(e) {
						uni.showToast({
							icon: "fail",
							title: "您取消了授权!",
							duration: 2000
						})
					}
				})
			},

			// 获取用户信息
			async userInfo() {
				let res = await getUserInfo()
				//用户信息存入Storage
				uni.setStorageSync('userinfo', res)
				//用户信息存入vuex
				this.getUser(res)
			},
			// 退出登录
			logout() {
				let that = this
				uni.showActionSheet({
					title: '你确定要退出吗？',
					itemList: ['退出登录'],
					itemColor: '#FE2B2B',
					success() {
						logout()
						// 清除Storage
						uni.removeStorageSync('token')
						uni.removeStorageSync('userinfo')
						that.downloadCount=0;
						that.collectionCount=0
						//清除vuex中的数据//
						that.getUser(null)
						uni.showToast({
							title: '退出成功',
						})
					}
				})
			},
			async getDownloadHistory() {
				if(!uni.getStorageSync("userinfo")){
					return;
				}
				let res = await queryDownloadHistory(this.query);
				this.downloadCount = res.total
			},
			async getCollection() {
				if(!uni.getStorageSync("userinfo")){
					return;
				}
				let res = await getCollectionById(this.query);
				this.collectionCount = res.total
			},
			async isFirstinto() {
				let res = await firstinto()
				//用户一天内首次进入小程序可以进行签到，否则不能进行签到
				if (res) {
					this.isCanSignIn = true
				} else {
					this.isCanSignIn = false
				}
			}

		},
		onLoad() {
			this.isFirstinto()
			this.getDownloadHistory()
			this.getCollection()
		},
		computed: {
			...mapState(['userinfo']),
		}
	}
</script>

<style lang="scss" scoped>
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
						background-size: 100% 100%;
						background-repeat: no-repeat;
						margin-right: 20rpx;

						image {
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}

					.unlogin-avartar {
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;
						background-color: $my-bg-color-gray;
						background-size: 100% 100%;
						background-repeat: no-repeat;
						margin-right: 20rpx;
						line-height: 120rpx;
						text-align: center;
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

				.already-signed-in {
					background-color: #ccc;
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
