<template>
	<view class="book-search">
		<!-- 搜索框 -->
		<view class="search-box">
			<view class="search-item">
				<input confirm-type="search" :value="inputValue" :auto-focus="true" @input="inputValueHandler"
					class="search-input" placeholder="请输入你要搜索的书名" />
				<icon class="search-icon" size=18 type="search"></icon>
				<button class="search-btn" @click="search">搜索</button>
			</view>
		</view>
		<!-- 搜索建议列表 -->
		<seach-advice-list v-if="isInput" :searchContext="searchContext"></seach-advice-list>
		<view class="search-content" v-else>
			<view class="search-other" v-if="searchHistory.length > 0">
				<view class="search-title">
					<text class="search-text">历史搜索</text>
					<uni-icons type="trash" size=26 @click="deleteHistory"></uni-icons>
				</view>
				<view class="search-content">
					<block v-for="(item,index) in searchHistory" :key="index">
						<text class="search-item">{{item}}</text>
					</block>

				</view>
			</view>
			<view class="search-other">
				<view class="search-title">
					<text class="search-text">热门搜索</text>
				</view>
				<view class="search-rank" v-for="item in searchRank" :key="item.id">

					<text v-if="item.rank === 1" class="t-icon t-icon-redu1"></text>
					<text v-else-if="item.rank === 2" class="t-icon t-icon-redu"></text>
					<text v-else-if="item.rank === 3" class="t-icon t-icon-redu2"></text>
					<text v-else class="search-rank-num">{{item.rank}}</text>
					<text class="search-rank-text">{{item.bookName}}</text>


				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '确认删除全部历史记录',
				timer: null,
				inputValue: '',
				isInput: false,
				searchHistory: [
					'Java权威指南',
					'计算机网路'
				],
				// 排行榜
				searchRank: [{
						id: 1,
						rank: 1,
						bookName: 'Java编程思想'
					}, {
						id: 2,
						rank: 2,
						bookName: 'Java核心技术卷I'
					},
					{
						id: 3,
						rank: 3,
						bookName: '算法导论'
					},
					{
						id: 4,
						rank: 4,
						bookName: '计算机网络'
					},
				],
				// 搜索建议列表
				searchContext: [{
					id: 1,
					title: 'Java核心技术卷I',
					url: ''
				}, {
					id: 2,
					title: 'Java核心技术卷II',
					url: ''
				}, {
					id: 3,
					title: 'Java核心技术卷I',
					url: ''
				}]
			};
		},

		methods: {
			// 删除历史记录
			deleteHistory() {
				this.show = true;
				uni.showModal({
					title: '提示',
					content: '你确定要删除所有历史记录吗?',
					success: res => {
						if (res.confirm) {
							this.searchHistory = [];
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			inputValueHandler(e) {
				// 对输入框进行防抖处理
				// clearTimeout();
				// this.timer = setTimeout(() => {
				// 	this.inputValue = e.detail.value
				// }, 500);
				this.inputValue = e.detail.value
				if (this.inputValue.trim().length != 0) {
					console.log(2)
					this.isInput = true
				} else {
					this.isInput = false
				}

			},

			// 搜索
			search() {

				if (this.inputValue.trim().length != 0) {
					var set = new Set();
					set.add(this.inputValue);
					this.searchHistory.forEach(item => {
						set.add(item)
					})

					this.searchHistory = [...set]
				}
				this.inputValue = ''
			},


		}
	}
</script>

<style lang="scss">
	@import url("/static/fonts/iconfont.css");

	.book-search {
		height: 100%;

		.search-box {
			display: flex;
			justify-content: center;
			width: 100%;
			background-color: #F1F1F2;
			.search-item {
				position: relative;
				display: flex;
				width: 90%;
				height: 70rpx;
				margin: 20rpx 0 20rpx 0;

				.search-icon {
					position: absolute;
					left: 20rpx;
					top: 16rpx;
				}

				.input-placeholder {
					font-size: 28rpx;
				}

				.search-input {
					flex: 4;
					height: 100%;
					background-color: #fff;
					padding-left: 70rpx;
					border-top-left-radius: 15px;
					border-top-right-radius: 0px;
					border-bottom-left-radius: 15px;
					border-bottom-right-radius: 0px;
				}

				.search-btn {
					flex: 1;
					height: 100%;
					text-align: center;
					color: #fff;
					font-size: 28rpx;
					line-height: 70rpx;
					background: linear-gradient(to right, #fa709a 0%, #fee140 100%);
					border-top-left-radius: 0;
					border-top-right-radius: 15px;
					border-bottom-left-radius: 0;
					border-bottom-right-radius: 15px;
				}
			}

		}

		.search-content {

			width: 100%;
			background-color: #fff;
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;

			.search-other {
				width: 90%;
				margin: 0 auto;
				padding: 20rpx 0 0 0;

				.search-title {
					display: flex;
					justify-content: space-between;
				}

				.search-content {
					display: flex;
					justify-content: flex-start;
					flex-wrap: wrap;
					margin-top: 10px;

					.search-item {
						display: block;
						margin-right: 10px;
						margin-bottom: 10px;
						padding: 0 10px;
						font-size: 24rpx;
						background-color: #F1F1F2;
						color: #7A7B7A;
						text-align: center;
						height: 70rpx;
						line-height: 70rpx;
						border-radius: 20px;

					}
				}

				.search-rank {
					width: 100%;
					padding: 10rpx 0;

					.search-rank-num {
						font-size: 32rpx;
						color: #C0C0C0;
					}

					.search-rank-text {
						margin-left: 20rpx;
					}
				}
			}
		}
	}
</style>
