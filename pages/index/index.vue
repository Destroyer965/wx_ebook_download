<template>
	<view class="home">
		<view class="search">
			<navigator url="../../subpkg/book-search/book-search" class="search-btn">
				<icon size=18 type="search" style="margin: 0 20px;"></icon>
				<view class="font-baseColor">请输入要搜索的书名</view>
			</navigator>
		</view>
		<view class="top">

			<kong-swiper class="swiper" autoplay=true indicator-dots:true :swiperList="bannerList" next-margin="46rpx"
				previous-margin="46rpx" space-between="20rpx" scale="0.8" circular></kong-swiper>
		</view>
		<uni-swiper-dot>
			<swiper class="classification" indicator-dots=true @change="changeSwiperItem">
				<swiper-item class="classification-card" v-for="(item,index) in categoryPages" :key="index"
					style="left: 16rpx;">
					<view class="classification-item" v-for="item in categoryList" :key="item.id"
						@click="toCategary(item.categoryName,item.id)">
						<image :src="item.imgUrl"></image>
						<text class="classification-name">{{item.categoryName}}</text>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view class="content">
			<my-card class="card" v-for="(item,index) in bookRecommendedList" :key="item.id" :bookinfo="item">
				<block v-slot:card-item>
					<view class="card-item-list">
						<block v-for="child in item.children"  :key="child.id">
							<view class="card-item" @click="goDetail(child.id)">
								<lazyLoad class="image" width="160rpx" height="140rpx" :src="child.imgUrl"></lazyLoad>
								<text class="card-item-text">{{child.bookName}}</text>
							</view>
						</block>

					</view>
				</block>
			</my-card>
			<uni-load-more iconType="snow" :status="status" :contentText="contentText" v-if="loadingShow">
			</uni-load-more>
		</view>

	</view>
</template>

<script>
	import {
		banner,
		category,
		recommendedList
	} from "../../utils/api.js"
	import lazyLoad from '@/components/muqian-lazyLoad/muqian-lazyLoad.vue'
	export default {
		components: {
			lazyLoad
		},
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 500,
				bannerList: [],
				categoryList: [],
				bookRecommendedList: [],
				pageNo: 1,
				pageSize: 8,
				categoryPages: 0,
				recommendPageNo: 1,
				recommendPageSize: 4,
				recommendTotal: 0,
				loadingShow: false,
				flag: false,
				status: 'loading',
				contentText: {
					contentnomore: "没有更多数据了！😭😭😭"
				}
			}

		},

		methods: {
			//分类轮播图滑动触发时间
			changeSwiperItem(e) {
				this.pageNo = e.detail.current + 1
				this.getCategory()
			},
			//跳转分类页面
			toCategary(categoryname, id) {
				uni.navigateTo({
					url: "../../subpkg/book-classify/book-classify?id=" + id + "&categoryname=" + categoryname,
				})
			},
			// 获取轮播图
			getBanner() {
				banner().then(res => {
					this.bannerList = res
				});
			},
			// 获取分类
			getCategory() {
				let params = {
					pageNo: this.pageNo,
					pageSize: this.pageSize
				};
				category(params).then(res => {
					this.categoryPages = res.pages
					this.categoryList = res.records
				})
			},
			//获取图书推荐列表
			getRecommendedList() {
				// 打开节流阀
				this.flag = true
				let params = {
					pageNo: this.recommendPageNo,
					pageSize: this.recommendPageSize
				};
				recommendedList(params).then(res => {
					//将新数据与就数据进行拼接
					this.bookRecommendedList = [...this.bookRecommendedList, ...res.data]
					this.recommendTotal = res.total
				})
				// 关闭节流阀
				this.flag = false
			},
			goDetail(param) {
				uni.navigateTo({
					url: '../../subpkg/book-details/book-details?id=' + param
				})
			}
		},

		onLoad() {
			this.getBanner(),
				this.getCategory(),
				this.getRecommendedList()
		},
		onReachBottom() {
			// 数据请求完毕
			if ((this.recommendPageNo * (this.recommendPageSize * 4)) >= this.recommendTotal) {
				this.loadingShow = true
				this.status = 'no-more'
				return;
			}
			//显示加载更多
			this.loadingShow = true
			if (this.flag) return;
			this.recommendPageNo++
			this.getRecommendedList()

		}

	}
</script>

<style lang="scss" scoped>
	.home {
		background-color: $my-bg-color;

		.search {
			position: fixed;
			top: 0;
			width: 100%;
			height: 70rpx;
			padding-bottom: 15px;
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

				width: 95% !important;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				align-items: center;
				height: 100%;
				margin: 0 auto;

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
			margin-top: 10px;
			padding-bottom: 10px;
			background-color: #fff;

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

						.image {
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
