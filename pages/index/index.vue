<template>
	<view class="home" :style="{height: wh + 'px'}">
		<view class="search">
			<navigator url="../../subpkg/book-search/book-search" class="search-btn">
				<icon size=18 type="search" style="margin: 0 20px;"></icon>
				<view class="font-baseColor">请输入要搜索的书名</view>
			</navigator>
		</view>
		<view class="top">

			<kong-swiper class="swiper" autoplay=true indicator-dots:true :swiperList="list" next-margin="46rpx" previous-margin="46rpx"
				space-between="20rpx" scale="0.8" circular></kong-swiper>
		</view>
		<view class="classification">
			<view class="classification-card">
				<navigator class="classification-item" url="../../subpkg/book-classify/book-classify">
					<image src="../../static/image/go.jpeg" mode=""></image>
					<text class="classification-name">go</text>
				</navigator>
				<view class="classification-item">
					<image src="../../static/image/go.jpeg" mode=""></image>
					<text class="classification-name">go</text>
				</view>
				<view class="classification-item">
					<image src="../../static/image/go.jpeg" mode=""></image>
					<text class="classification-name">go</text>
				</view>
				<view class="classification-item">
					<image src="../../static/image/go.jpeg" mode=""></image>
					<text class="classification-name">go</text>
				</view>
				<view class="classification-item">
					<image src="../../static/image/go.jpeg" mode=""></image>
					<text class="classification-name">go</text>
				</view>
				<view class="classification-item">
					<image src="../../static/image/go.jpeg" mode=""></image>
					<text class="classification-name">go</text>
				</view>
				<view class="classification-item">
					<image src="../../static/image/go.jpeg" mode=""></image>
					<text class="classification-name">go</text>
				</view>
				<view class="classification-item">
					<image src="../../static/image/go.jpeg" mode=""></image>
					<text class="classification-name">go</text>
				</view>
			</view>
		</view>
		<view class="content">

			<my-card class="card" :title="title">
				<block v-slot:card-item>
					<view class="card-item-list">
						<navigator url="../../subpkg/bookDetails/bookDetails" class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</navigator>
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
					</view>
				</block>
			</my-card>
			<my-card class="card" :title="title">
				<block v-slot:card-item>
					<view class="card-item-list">
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
					</view>
				</block>
			</my-card>
			<my-card class="card" :title="title">
				<block v-slot:card-item>
					<view class="card-item-list">
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
					</view>
				</block>
			</my-card>
			<my-card class="card" :title="title">
				<block v-slot:card-item>
					<view class="card-item-list">
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
					</view>
				</block>
			</my-card>
			<my-card class="card" :title="title">
				<block v-slot:card-item>
					<view class="card-item-list">
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
					</view>
				</block>
			</my-card>
			<my-card class="card" :title="title">
				<block v-slot:card-item>
					<view class="card-item-list">
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
					</view>
				</block>
			</my-card>
			<my-card class="card" :title="title">
				<block v-slot:card-item>
					<view class="card-item-list">
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
					</view>
				</block>
			</my-card>
			<my-card class="card" :title="title">
				<block v-slot:card-item>
					<view class="card-item-list">
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
					</view>
				</block>
			</my-card>
			<my-card class="card" :title="title">
				<block v-slot:card-item>
					<view class="card-item-list">
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
					</view>
				</block>
			</my-card>
			<my-card class="card" :title="title">
				<block v-slot:card-item>
					<view class="card-item-list">
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
						<view class="card-item">
							<image
								src="https://img1.baidu.com/it/u=2191085387,3198199511&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
								mode=""></image>
							<text class="card-item-text">Java核心技术卷I</text>
						</view>
					</view>
				</block>
			</my-card>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 500,
				// 当前设备可用高度
				wh: 0,
				title: 'Java',
				list: [{
						image: 'http://t13.baidu.com/it/u=191155337,618510844&fm=224&app=112&f=JPEG?w=500&h=500'
					},
					{
						image: 'https://img1.baidu.com/it/u=302050158,1428065152&fm=253&fmt=auto&app=138&f=PNG?w=491&h=681'
					},
					{
						image: 'https://img1.baidu.com/it/u=3065359493,4178691884&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
					}
				]
			}

		},
		onLoad() {
			// 获取当前设备信息
			let sys = uni.getSystemInfoSync();
			this.wh = sys.windowHeight;
		},
		methods: {

		},
		onPullDownRefresh() {
			console.log(1)
		},

	}
</script>

<style lang="scss" scoped>
	.home {
		background-color: #C0C0C0;

		.search {
			position: fixed;
			top: 0;
			width: 100%;
			height: 70rpx;
			padding-bottom: 20px;
			background-color: $my-color-base;
			z-index: 999;

			.search-btn {
				display: flex;
				align-items: center;
				width: 90%;
				height: 70rpx;
				margin: 0 auto;
				background-color: #fff;
				border-radius: 25px;
			}
		}

		.top {

			    margin-top: 109rpx;
			    height: 169px;
			    background-color: #fff;

			.swiper {
				width: 100%;
				height: 150px;

				.swiper-list {
					width: 100%;
					height: 100%;
				}

				.swiper-item {
					width: 100%;
					height: 100%;

					image {
						width: 100%;
						height: 100%;
					}
				}

			}
		}

		.classification {
			display: flex;
			justify-content: center;
			width: 100%;
			height: 180px;
			margin-top: 10px;
			background-color: #fff;

			.classification-card {
				width: 95%;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				align-items: center;
				height: 100%;

				.classification-item {
					width: 150rpx;
					height: 170rpx;

					image {
						display: flex;
						width: 120rpx;
						height: 120rpx;
						margin: 0 auto;
						border-radius: 50%;
					}

					.classification-name {
						display: block;
						text-align: center;
					}
				}
			}

		}

		.content {
			margin: 10px 0;

			.card {
				box-shadow: 3px 3px 3px #aaaaaa;
				margin-bottom: 10px;

				.card-item-list {
					display: flex;
					justify-content: space-between;
					width: 95%;
					height: 110px;
					margin: 10px auto;

					.card-item {
						width: 80px;
						height: 100%;

						image {
							width: 100%;
							height: 70px;
						}

						.card-item-text {
							width: 100%;
							font-size: 24rpx;
							text-align: center;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;

						}
					}

				}
			}

		}
	}
</style>
