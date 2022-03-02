<!-- 书本分类 -->
<template>
	<view class="book-classify">
		<!-- https://ext.dcloud.net.cn/plugin?id=4639 -->
		<view v-if="!isempty">
			<dropdown-screen @finish="finish" class="dropdown-screen" :listArr="listArr" :itemArr="itemArr">
			</dropdown-screen>
			<book-card-item class="book-classify-item" :bookClassifyInfo="bookClassifyInfo"></book-card-item>
			<uni-load-more iconType="snow" :status="status" :contentText="contentText" v-if="loadingShow">
			</uni-load-more>
		</view>
		<empty-result v-else class="empty-result">
			<template v-slot:tips>
				<view class="tips">暂无数据～😢</view>
			</template>
		</empty-result>
	</view>

</template>

<script>
	import {
		getBookByCategoryId
	} from '../../utils/api.js'

	export default {
		data() {
			return {
				listArr: ['推荐指数', '下载量', '收藏'],
				itemArr: [
					[{
						text: '按推荐指数升序排序',
						vallue: 1
					}, {
						text: '按推荐指数降序排序',
						vallue: 2
					}],
					[{
						text: '按下载量升序排序',
						vallue: 3
					}, {
						text: '按下载量降序排序',
						vallue: 4
					}],
					[{
						text: '按收藏数量升序排序',
						vallue: 5
					}, {
						text: '按收藏数量降序排序',
						vallue: 6
					}]
				],
				bookClassifyInfo: [],
				queryParam: {
					'pageNo': 1,
					'pageSize': 7,
					'categoryId': 0
				},
				flag: false,
				total: 0,
				status: 'loading',
				loadingShow: false,
				isempty:false,
				contentText: {
					contentnomore: "没有更多数据了！😄😄😄"
				}
			};
		},
		onLoad(option) {
			this.queryParam.categoryId = option.id
			uni.setNavigationBarTitle({   ///
				title: option.categoryname,
			})
			this.getBookByCategory();
		},
		//上拉加载更多
		onReachBottom() {
			let param = this.queryParam;
			//数据全部请求完毕
			if (param.pageSize * param.pageNo >= this.total) {
				this.status = 'no-more'
				return;
			}
			//节流阀开启的状态下不再发起请求
			if (this.flag) {
				return;
			}
			this.loadingShow = true
			this.queryParam.pageNo++;
			this.getBookByCategory();
		},
		onPullDownRefresh() {
			// uni.startPullDownRefresh()
			console.log("下拉")
			// this.queryParam.pageNo = 1;
			// this.queryParam.total = 0
			// this.flag = false
			// this.bookClassifyInfo = []
			// this.getBookByCategory();
			// uni.stopPullDownRefresh()
		},
		methods: {
			//按照图书分类id分页查询图书
			getBookByCategory() {
				getBookByCategoryId(this.queryParam).then(res => {
					if(res.data.length===0){
						this.isempty = true
					}
					//打开节流阀
					this.flag = true
					//得到总条数  
					this.total = res.total;
					let param = this.queryParam;
					if (param.pageNo * param.pageSize >= this.total) {
						this.status = 'no-more'
						this.loadingShow = true
					}
					//将新数据与旧数据进行拼接
					this.bookClassifyInfo = [...this.bookClassifyInfo, ...res.data]

					//数据请求完毕关闭节流阀
					this.flag = false
				})
			},
			finish(e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.book-classify {
		width: 100%;
		margin-top: 44px;

		.book-classify-item {
			width: 90%;
		}

		.dropdown-screen {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			z-index: 999;
		}
		.empty-result{
			// display: flex;
		}
	}
</style>
