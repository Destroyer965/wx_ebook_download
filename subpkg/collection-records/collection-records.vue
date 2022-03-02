<template>
	<view class="collection-records">
		<view v-if="!isempty">
			<uni-swipe-action >
				<block v-for="(item,index) in collectionList" :key="index">
					<block v-for="child in item.children" :key="child.id">
						<uni-swipe-action-item class="action-item" :right-options="options"
							@click="bindClick($event,item.bookid)" >
							<view class="action-content" @click="toDetail(item.bookid)">
								<image class="left-img" :src="child.imgUrl">
								</image>
								<view class="right-box">
									<text class="item-title my-font-16">{{child.bookName}}</text>
									<text class="item-content my-font-14-gray">
										{{child.bookIntrduction}}
									</text>
									<text class="item-publish my-font-14-gray">{{item.gmtCreat}}</text>
								</view>
							</view>
						</uni-swipe-action-item>
					</block>
				</block>
			</uni-swipe-action>
			<uni-load-more v-if="loadingShow" iconType="snow" :status="status" :contentText="contentText">
			</uni-load-more>
		</view>
		<empty-result v-else style="height: 100%;">
			<template v-slot:tips>
				<view class="tips">你暂时还没有收藏记录哦～</view>
			</template>
		</empty-result>
	</view>
</template>

<script>
	import {
		getCollectionById,
		delCollection
	} from '../../utils/api'
	export default {
		data() {
			return {
				options: [{
					text: '取消',
					style: {
						backgroundColor: '#465cff'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#ff2b2b'
					}
				}],
				param: {
					pageNo: 1,
					pageSize: 7
				},
				total: 0,
				flag: false,
				status: 'loading',
				loadingShow: true,
				isempty: false,
				collectionList: [],
				contentText: {
					contentnomore: "没有更多数据了！🥲🥲🥲"
				}
			};
		},

		methods: {
			bindClick(e, id) {
				if (e.index === 1) {
					delCollection(id)
					uni.showToast({
						title: "删除成功",
						duration: 2000
					})
					uni.redirectTo({
						url:'/subpkg/collection-records/collection-records'
					})
				}
			},
			//获取用户收藏记录
			getCollectionRecords() {
				this.flag = true;
				getCollectionById(this.param).then(res => {
					if (res.data.length === 0) {
						this.isempty = true
					}
					let query = this.param;
					this.total = res.total;
					if (query.pageNo * query.pageSize >= this.total) {
						this.status = 'no-more'
						this.loadingShow = true
					}
					this.collectionList = [...this.collectionList, ...res.data]
					//数据请求完毕关闭节流阀
					this.flag = false
				})
			},
			//跳转图书详情
			toDetail(bookid) {
				uni.navigateTo({
					url: '../book-details/book-details?id=' + bookid
				})
			},
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: '收藏记录'
			});
			this.getCollectionRecords()

		},
		//上拉加载更多
		onReachBottom() {
			let query = this.param;
			
			//数据全部请求完毕
			if (query.pageSize * query.pageNo >= this.total) {
				this.status = 'no-more'
				return;
			}
			if (this.flag) {
				return;
			}
			this.loadingShow = true
			this.param.pageNo++
			this.getCollectionRecords()
		},
		onPullDownRefresh(){
			let query = this.param;
			query.pageNo = 1;
			getCollectionById(query).then(res => {
				this.collectionList = res.data
			})
			uni.stopPullDownRefresh()
		}

	}
</script>

<style lang="scss" scoped>
	.collection-records {
		width: 100%;

		.action-item {
			height: 150px;

			.action-content {
				display: flex;
				width: 95%;
				margin: 10px auto;

				.left-img {
					width: 150rpx;
					height: 150rpx;
					border-radius: 10rpx;
				}

				.right-box {
					width: 300px;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					margin-left: 20rpx;

					.item-title {
						@extend .overflow-ellipsis;
						-webkit-line-clamp: 1;

					}

					.item-content {

						height: 85rpx;
						@extend .overflow-ellipsis;
						-webkit-line-clamp: 2;
					}
				}
			}
		}
	}


	.tips {
		color: #b2b2b2;
		font-size: 24rpx;
	}
</style>
