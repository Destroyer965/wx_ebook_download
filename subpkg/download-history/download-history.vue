<template>
	<view>
		<uni-swipe-action v-if="!isempty">
			<block v-for="(item,index) in historyList" :key="index">
				<block v-for="child in item.children" :key="child.id">
					<uni-swipe-action-item class="action-item" :right-options="options" @click="bindClick($event,child.id,index)">
						<view class="action-content">
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
			<uni-load-more v-if="loadingShow" iconType="snow" :status="status" :contentText="contentText">
			</uni-load-more>
		</uni-swipe-action>
		<empty-result v-else style="height: 100%;">
			<template v-slot:tips>
				<view class="tips">你暂时还没有下载历史哦～</view>
			</template>
		</empty-result>

	</view>
</template>

<script>
	import {
		queryDownloadHistory,
		delDownloadHistory,
	} from '../../utils/api.js'
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
				total: 0,
				query: {
					pageNo: 1,
					pageSize: 7
				},
				isempty: false,
				flag: false,
				status: 'loading',
				loadingShow: false,
				contentText: {
					contentnomore: "没有更多数据了！🥲🥲🥲"
				},
				historyList: []
			};
		},
		methods: {
			async bindClick(e, id,index) {
				if (e.index === 1) {
					console.log(id)
					let res = await delDownloadHistory(id)
					//删除元素
					this.historyList.splice(index, 1)
					if (res) {
						uni.showToast({
							title: "删除成功",
							duration: 2000
						})
					}
				}
			},
			//获取下载记录
			async getDownloadHistory() {
				//开启节流阀
				this.flag = true;
				let res = await queryDownloadHistory(this.query);
				//数据请求完毕关闭节流阀
				this.flag = false
				//无数据
				if (res.data.length === 0) {
					this.isempty = true
				}
				//记录总数
				this.total = res.total
				// 数据请求完毕
				if (this.query.pageNo * this.query.pageSize >= this.total) {
					this.status = 'no-more';
					this.loadingShow = true;
				}
				this.historyList = [...this.historyList, ...res.data];
			},
		},
		 onLoad() {
			uni.setNavigationBarTitle({
				title: '历史下载'
			});
			 this.getDownloadHistory();
		},
		onReachBottom() {
			//数据全部请求完毕
			if (this.query.pageSize * this.query.pageNo >= this.total) {
				this.status = 'no-more'
				return;
			}
			this.loadingShow = true
			if (this.flag) {
				return;
			}
			this.loadingShow
			this.query.pageNo++;
			this.getDownloadHistory()
		},
		//下拉刷新
		onPullDownRefresh() {
			this.query.pageNo = 1;
			let query = this.query
			this.historyList = []
			this.loadingShow=false
			queryDownloadHistory(query).then(res => {
				this.historyList = res.data
				this.total = res.total
			})
			uni.stopPullDownRefresh()
		}
	}
</script>

<style lang="scss">
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

	.tips {
		color: #b2b2b2;
		font-size: 24rpx;
	}
</style>
