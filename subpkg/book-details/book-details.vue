<!-- 书本详情 -->
<template>
	<view class="detail" @click="myClick">
		<book-introduction :bookimg="bookinfo.imgUrl" :bookname="bookinfo.bookName"
			:bookpublisher="bookinfo.bookPublish" :bookauthor="bookinfo.bookAuthor" :bookisbn="bookinfo.bookIsbn"
			class="book-introduction-card"></book-introduction>
		<uni-card class="card-data">
			<view class="left-downloadCount">
				<text class="download-num my-font-size-22">{{bookinfo.downloadCount}}</text>
				<text class="download-text">下载次数</text>
			</view>
			<view class="center-collectionCount">
				<text class="collection-num my-font-size-22">{{bookinfo.collectionCount}}</text>
				<text class="collection-text">收藏次数</text>
			</view>
			<view class="right-score">
				<view class="score-num">
					<uni-rate :readonly="true" :touchable="false" :value="bookinfo.recommendationIndex" />
				</view>
				<text class="score">推荐指数</text>
			</view>
		</uni-card>
		<uni-card class="introduction-card">
			<text class="introduction-card-title">简介</text>
			<view class="introduction-card-content" :class="{showMoreDetail:isShowMoreDetail}">
				<text selectable=true user-select=true class="model_text">
					{{bookinfo.bookIntrduction}}
				</text>
				<view class="model_detail" v-if="!isShowMoreDetail" @click="moreDetail">
					<uni-icons color="#4876f1" type="bottom" style="margin-right: 10rpx;"></uni-icons>
					<text class="more_detail">更多详情</text>
				</view>
				<view class="model_put_away" v-else @click="putAway">
					<uni-icons color="#4876f1" type="top" style="margin-right: 10rpx;"></uni-icons>
					<text>收起</text>
				</view>

			</view>
		</uni-card>
		<view>
			<book-comments @thumbsup="thumbsup" @replay="replay" :iconColor="iconColor" v-if="comments"
				@writeComment="writeComment" class="book-comments" :comments="comments" :total="total" :count="count"
				:isempty="isemty">
				<view slot="loading" class="loading">
					<uni-load-more v-if="loadingShow" iconType="snow" :status="status" :contentText="contentText">
					</uni-load-more>
				</view>
			</book-comments>
		</view>
		<my-input @send.stop="send" @myinput="myinput" class="myinput" v-if="isInputShow"></my-input>
		<my-book-nav @itemClick="itemClick" @readOnline="readOnline" @download="download" class="bottom"
			:options="options" :buttonGroup="buttonGroup"></my-book-nav>
	</view>
</template>

<script>
	import {
		getBookById,
		getCollectionByUserAndBookID,
		delCollection,
		addCollection,
		getCommentList,
		addComment,
		likedCount,
		isLiked,
		liked,
		commentById,
		replayByParentId,
		download,
		commentCountById
	} from '../../utils/api'
	import {
		mapState,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				isInputShow: false,
				bookinfo: [],
				isShowMoreDetail: false,
				bookid: 0,
				comments: [],
				total: 0,
				count: 0,
				iconColor: '#C0C0C0',
				whoClickMe: null,
				parentid: 0,
				loadingShow: false,
				flag: false,
				isPull:false,
				status: 'loading',
				isemty: false,
				contentText: {
					contentnomore: "没有更多数据了！📖📖📖"
				},
				options: [{
					icon: 'heart',
					text: '收藏',
					size: '20',
				}],
				buttonGroup: [{
						text: '在线阅读',
						backgroundColor: '#fff',
						color: '#38C16E'
					},
					{
						text: '下载',
						backgroundColor: '#38C16E',
						color: '#fff'
					}
				],
				query: {
					'pageNo': 1,
					'pageSize': 3
				}
			};
		},
		async onLoad(option) {
			uni.getSavedFileList({
			    success: function (res) {
			        if (res.fileList.length > 0) {
				    // 删除本地存储的文件
				    uni.removeSavedFile({
					filePath: res.fileList[0].filePath
				    });
			        }
			    }
			});
			this.bookid = option.id
			uni.setNavigationBarColor({
				frontColor: "#000000",
				backgroundColor: "#F1F1F2"
			});
			this.getBook();
			this.isCollection(this.bookid);
			await this.commentList(this.query);
			this.getLikedCount(this.comments)
		},
		onReachBottom() {
			this.isPull =true
			let pageNo = this.query.pageNo;
			let pageSize = this.query.pageSize;
			if (pageNo * pageSize >= this.total) {
				this.loadingShow = true;
				this.status = 'no-more'
				return;
			}
			let query = {
				pageNo: this.query.pageNo++,
				pageSize
			}
			if (this.flag) {
				return;
			}
			this.loadingShow = true;
			this.commentList()
		},
		methods: {
			//获取图书信息
			async getBook() {
				let res = await getBookById(this.bookid);
				this.bookinfo = res
			},
			//点击展开现实更多
			moreDetail() {
				this.isShowMoreDetail = true
			},
			putAway() {
				this.isShowMoreDetail = false
			},
			myClick() {
				this.isInputShow = false
			},
			writeComment() {
				this.whoClickMe = 'writeComment'
				this.isInputShow = !this.isInputShow
			},
			// 发布评论
			async send(value) {
				let data = {
					content: value,
					bookid: this.bookid
				}
				if (value == '') {
					uni.showToast({
						icon: 'error',
						title: '请输入评论内容'
					})
					return;
				}
				uni.showLoading({
					title: '正在发布'
				})
				if (this.whoClickMe === 'writeComment') {
					let res = await addComment(data);
					if (res) {
						uni.hideLoading();
						uni.showToast({
							title: '发布成功'
						})
					}
				} else if (this.whoClickMe === 'replay') {
					let data = {
						content: value,
						bookid: this.bookid,
						parentid: this.parentid
					}
					let res = replayByParentId(data)
					if (res) {
						uni.hideLoading();
						uni.showToast({
							title: '评论成功'
						})
					}
				}
				//再次请求评论数据
				this.commentList(this.query);
				this.isInputShow = false
			},
			myinput() {
				this.isInputShow = true
			},
			//删除收藏记录
			async deleteCollectionById(bookid) {
				await delCollection(bookid);
				uni.showToast({
					title: '取消收藏成功',
					icon: 'none'
				})
				this.options = [{
					icon: 'heart',
					text: '收藏',
					color: '#000',
					size: '20',
				}]
			},
			//添加收藏记录
			async addCollectionById(bookid) {
				await addCollection(bookid);
				uni.showToast({
					title: '收藏成功',
					icon: 'none'
				})
				this.options = [{
					icon: 'heart-filled',
					text: '取消收藏',
					color: 'red',
					size: '20',
				}]

			},
			// 用户点击收藏，如果用户收藏了该图书则删除收藏记录，否则加入到用户收藏记录当中
			async itemClick() {
				let bookid = this.bookid;
				let res = await getCollectionByUserAndBookID(bookid);
				if (res) {
					await this.deleteCollectionById(bookid)
				} else {
					await this.addCollectionById(bookid)
				}
				//重新获取图书信息
				this.getBook();
			},
			//判断用户是否收藏该图书
			async isCollection(bookid) {
				let res = await getCollectionByUserAndBookID(bookid);
				if (res) {
					this.options = [{
						icon: 'heart-filled',
						text: '取消收藏',
						color: 'red',
						size: '20',
					}]
				}
			},
			readOnline() {
				let webUrl =
					'https://yangjiahai.oss-accelerate.aliyuncs.com/%E3%80%8A%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E3%80%8B%E6%95%99%E7%A8%8Bc%E8%AF%AD%E8%A8%80%E7%89%88.pdf'
				console.log("在线阅读")
				switch (uni.getSystemInfoSync().platform) {
					case 'android':
						console.log('安卓')
						// 这里直接调用原生的方法，我们上面定义的
						this.openReport(webUrl)
						break;
					case 'ios':
						console.log('IOS')
						//这里跳转web-view页面
						uni.navigateTo({
							url: '../book-read/book-read?url=' + webUrl
						})
						break;
					default:
						uni.navigateTo({
							url: '../book-read/book-read?url=' + webUrl
						})
						break;
				}
			},
			
			//下载
			download() {
				uni.showLoading({
					title: '正在下载'
				})
				uni.downloadFile({
					url: 'https://yangjiahai.oss-accelerate.aliyuncs.com/%E6%94%BB%E5%9F%8E%E7%8B%AE%E8%AE%BA%E5%9D%9B_%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9C%A3%E7%BB%8F%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%B3%BB%E7%BB%9F%EF%BC%88%E5%8E%9F%E4%B9%A6%E7%AC%AC%E4%BA%8C%E7%89%88%EF%BC%89.pdf',
					// filePath:'/',
					success: (res) => {
						if (res.statusCode == 200) {
							//保存到本地
							uni.saveFile({
								tempFilePath: res.tempFilePath,
								success: (res) => {
									download(this.bookid).then(res => {
										this.getBook();
									})
									uni.hideLoading()
									//res.savedFilePath文件的保存路径
									//保存成功并打开文件
									uni.openDocument({
										filePath: res.savedFilePath,
										success: (res) => console.log('成功打开文档')
									})
								},
								fail: (e) => {
									console.log(e)
									uni.hideLoading()
									uni.showToast({
										icon: 'fail',
										title: '下载失败'
									})
								}
							})
						}
					},
					fail(reson) {
						console.log(reson)
						uni.showToast({
							icon: 'fail',
							title: '下载失败'
						})
					}
				});
			},
			//分页获取评论列表
			async commentList() {
				let bookid = this.bookid
				let data = this.query
				this.flag = true;
				let res = await getCommentList(bookid, data)
				if (res.data.length === 0) {
					this.isemty = true;
				}
				this.flag = false
				this.total = res.total
				this.count = res.count
				for (let comment of res.data) {
					//判断用户是否对评论点赞
					let isliked = await isLiked(comment.id);
					if (isliked) {
						comment.isSelected = true
					} else {
						comment.isSelected = false
					}
				}
				let pageNo = this.query.pageNo;
				let pageSize = this.query.pageSize;
				if (pageNo * pageSize >= this.total) {
					this.loadingShow = true;
					this.status = 'no-more'
				}
				this.isPull?this.comments = [...this.comments, ...res.data]:this.comments = res.data
				// this.comments = [...this.comments, ...res.data]
				
			},
			//用户点赞取消点赞	
			async thumbsup(index, id) {
				this.comments[index].isSelected = !this.comments[index].isSelected
				//判断用户是否已点赞
				let res = await isLiked(id);
				if (res) {
					await liked(id)
					uni.showToast({
						title: '取消点赞',
						icon: 'none'
					})
				} else {
					await liked(id)
					uni.showToast({
						title: '点赞成功',
						icon: 'none'
					})
				}
				await this.getCommentCountById(id)
			},
			//回复
			replay(index, id) {
				console.log(id)
				this.isInputShow = true
				this.whoClickMe = 'replay'
				this.parentid = id
			},
			//根据评论获取点赞总数
			async getLikedCount(param) {
				for (let item of param) {
					let res = await likedCount(item.id)
					item.likeNum = res
				}
			},
			//根据评论id获取点赞数量
			async getCommentCountById(id) {
				let res = await commentCountById(id);
				for (let item of this.comments) {
					if (item.id == id) {
						item.likeNum = parseInt(res)
					}
				}
			}
		},

		computed: {
			...mapState(['userinfo']),
		}
	}
</script>

<style lang="scss" scoped>
	.showMoreDetail {
		overflow: unset !important;
		height: auto !important;
	}



	.detail {
		background-color: $my-bg-color;
		height: 100%;

		.book-introduction-card {
			padding-top: 40rpx;
		}

		.card-data {
			display: flex;
			justify-content: space-around;
			width: 95%;
			height: 200rpx;
			margin: 20rpx auto;
			background-color: #fff;
			border-radius: 10rpx;

			.left-downloadCount,
			.center-collectionCount,
			.right-score {
				justify-content: center;
				align-items: center;
				display: grid;
				text-align: center;
			}

			.download-text,
			.collection-text,
			.score {
				font-weight: 0;
			}

		}

		.introduction-card {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			position: relative;
			width: 95%;
			margin: 0 auto;
			border-radius: 10rpx;
			background-color: #fff;

			>text {
				margin: 15rpx 0 0 20rpx;
			}

			.introduction-card-title {
				font-size: 16px;
				font-weight: 800;
			}

			.introduction-card-content {
				position: relative;
				width: 90%;
				height: 100px;
				margin: 10rpx auto 20rpx;
				text-align: justify;
				overflow: hidden;


				.model_text {
					font-size: 26rpx;
					line-height: 20px;
				}

				.model_detail {
					width: 130rpx;
					position: absolute;
					right: 0;
					bottom: 0;
					background: #fff;
					font-size: 26rpx;
					color: #657180;

					.more_detail {
						position: absolute;
						right: 0;
						color: #4876f1;
						margin-left: 5px;
					}

				}

				.model_put_away {
					position: absolute;
					right: 0px;
					bottom: 0;
					background: #fff;
					font-size: 26rpx;
					color: #4876f1;
				}
			}
		}

		.book-comments {
			display: block;
			margin-top: 10px;
		}

		.bottom {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
		}

		.myinput {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			z-index: 999999;

		}
	}
</style>
