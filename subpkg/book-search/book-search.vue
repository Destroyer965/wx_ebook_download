<template>
	<view class="book-search">
		<!-- 搜索框 -->
		<view class="search-box">
			<uni-easyinput confirm-type="search" v-model="inputValue" trim="all" :focus=true @input="inputValueHandler"
				class="search-input" :inputBorder=false placeholder="请输入你要搜索的书名" prefixIcon="search" clearSize=18>
			</uni-easyinput>
		</view>
		<!-- 搜索建议列表 -->
		<seach-advice-list v-if="searchContext" @addHistory="addHistory" :searchContext="searchContext">
		</seach-advice-list>
		<empty-result v-if="searchContext.length===0">
			<template v-slot:tips>
				<view class="tips">暂无搜索内容～</view>
			</template>
		</empty-result>
		<view class="search-content" v-if="!searchContext">
			<view class="search-other" v-if="searchHistory.length > 0">
				<view class="search-title">
					<text class="search-text">历史搜索</text>
					<uni-icons type="trash" size=26 @click="deleteHistory"></uni-icons>
				</view>
				<view class="search-content">
					<block v-for="(item,index) in searchHistory" :key="index">
						<text class="search-item" @click="toDetail(item.id)">{{item.bookName}}</text>
					</block>
				</view>
			</view>
			<view class="search-other">
				<view class="search-title">
					<text class="search-text">热门搜索</text>
				</view>
				<view class="search-rank" v-for="(item,index) in bookList" :key="item.id">
					<view>
						<text v-if="index === 0" class="t-icon t-icon-redu1"></text>
						<text v-else-if="index === 1" class="t-icon t-icon-redu2"></text>
						<text v-else-if="index=== 2" class="t-icon t-icon-redu3"></text>
						<text v-else class="search-rank-num">{{index+1}}</text>
						<text class="search-rank-text">{{item.bookName}}</text>
					</view>
					<view class="search-num">
						<text>{{item.searchCount}}热度</text>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		fuzzyQueryBook,
		addSearchHistory,
		delSearchHistory,
		querySearchHistory,
		querySearchrank,
		getBookById

	} from '../../utils/api.js'
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				content: '确认删除全部历史记录',
				timer: null,
				inputValue: '',
				isInput: false,
				searchHistory: [],
				bookList: [],
				// 排行榜
				searchRank: null,
				// 搜索建议列表
				searchContext: null,
			};
		},

		methods: {
			addHistory(id) {
				let searchArr = uni.getStorageSync('searchList') || [];
				searchArr.unshift(id)
				uni.setStorageSync("searchList", searchArr)
				this.searchHistory = []
				this.queryHistory()
			},
			async queryHistory() {
				let bookKey = uni.getStorageSync('searchList') || []
				let newBookKey = Array.from(new Set(bookKey))
				for (let id of newBookKey) {
					let res = await getBookById(id)
					this.searchHistory.push(res)
				}
			},
			// 删除历史记录
			deleteHistory() {
				this.show = true;
				uni.showModal({
					title: '提示',
					content: '你确定要删除所有历史记录吗?',
					success: (res) => {
						if (res.confirm) {
							uni.removeStorageSync("searchList")
							this.searchHistory=[]
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			async inputValueHandler() {
				if (!this.inputValue) {
					this.searchContext = null
					return;
				}
				let res = await fuzzyQueryBook(this.inputValue);
				this.searchContext = res
			},
			toDetail(id) {
				uni.navigateTo({
					url: '../../subpkg/book-details/book-details?id=' + id
				})
			},
			async querySearchrank() {
				let res = await querySearchrank()
				for (let item of res) {
					let book = await getBookById(item.book_id);
					book.searchCount = item.search_count
					this.bookList.push(book)
				}
			}

		},
		onLoad() {
			this.queryHistory();
			this.querySearchrank();
		},
		computed: {
			...mapState(['userinfo'])
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
			height: auto;

			.search-input {
				width: 90%;
				border-radius: 15px;
				background-color: $my-bg-color;
				margin-top: 10px;
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
					display: flex;
					justify-content: space-between;
					font-size: 28rpx;

					.search-rank-num {
						font-size: 32rpx;
						color: #C0C0C0;
					}

					.search-rank-text {
						margin-left: 20rpx;
						color: #6A6E76;
					}

					.search-num {
						color: #AEB1BA;
					}
				}
			}
		}
	}
</style>
