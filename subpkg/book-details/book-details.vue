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
				@writeComment="writeComment" class="book-comments" :comments="comments">
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
		download
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
				comments: null,
				iconColor: '#C0C0C0',
				whoClickMe: null,
				parentid: 0,
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
					pageNo: 1,
					pageSize: 3
				}
			};
		},
		async onLoad(option) {
			this.bookid = option.id
			uni.setNavigationBarColor({
				frontColor: "#000000",
				backgroundColor: "#F1F1F2"
			});
			await this.getBook();
			this.isCollection(this.bookid);
			await this.commentList();
			this.getLikedCount(this.comments.data)
		},
		methods: {
			//获取图书信息
			getBook() {
				getBookById(this.bookid).then(res => {
					this.bookinfo = res
				})
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
			send(value) {

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
					console.log('writeComment')
					addComment(data).then(res => {
						if (res) {
							uni.hideLoading();
							uni.showToast({
								title: '发布成功'
							})
						}
					})
				} else if (this.whoClickMe === 'replay') {
					let data = {
						content: value,
						bookid: this.bookid,
						parentid: this.parentid
					}
					replayByParentId(data).then(res => {
						if (res) {
							uni.hideLoading();
							uni.showToast({
								title: '评论成功'
							})
						}
					})
				}
				// 重定向强制刷新页面
				uni.redirectTo({
					url: '/subpkg/book-details/book-details?id=' + this.bookid
				})
				this.isInputShow = false
			},
			myinput() {
				this.isInputShow = true
			},
			//删除收藏记录
			deleteCollection(bookid) {
				let that = this;
				delCollection(bookid).then(res => {
					uni.showToast({
						title: '取消收藏成功',
						icon: 'none'
					})
					that.options = [{
						icon: 'heart',
						text: '收藏',
						color: '#000',
						size: '20',
					}]
				})
			},
			//添加收藏记录
			addCollection(bookid) {
				let that = this;
				addCollection(bookid).then(res => {
					uni.showToast({
						title: '收藏成功',
						icon: 'none'
					})
					that.options = [{
						icon: 'heart-filled',
						text: '取消收藏',
						color: 'red',
						size: '20',
					}]
				})
			},
			// 用户点击收藏，如果用户收藏了该图书则删除收藏记录，否则加入到用户收藏记录当中
			itemClick() {
				let bookid = this.bookid;
				let that = this;
				getCollectionByUserAndBookID(bookid).then(res => {
					if (res) {
						that.deleteCollection(bookid)
					} else {
						that.addCollection(bookid)
					}
					that.getBook()
				})
			},
			isCollection(bookid) {
				let that = this;
				getCollectionByUserAndBookID(bookid).then(res => {
					if (res) {
						that.options = [{
							icon: 'heart-filled',
							text: '取消收藏',
							color: 'red',
							size: '20',
						}]
					}
				})
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
			//这里的 url 就是pdf文件的路径，直接调用此方法就可以打开pdf文件
			openReport(url) {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				wx.downloadFile({
					url: url,
					success: function(res) {
						console.log(res)
						uni.hideLoading()
						var filePath = res.tempFilePath;
						uni.showLoading({
							title: '正在打开',
							mask: true
						})
						wx.openDocument({
							filePath: filePath,
							fileType: 'pdf',
							success: function(res) {
								console.log(res)
								uni.hideLoading()
								console.log('打开文档成功');
							},
							fail: function(err) {
								uni.hideLoading()
								console.log('fail:' + JSON.stringify(err));
							}
						});
					},
					fail: function(err) {
						uni.hideLoading()
						console.log('fail:' + JSON.stringify(err));
					}
				});
			},
			// 下载
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
								fail: () => console.log('下载失败')
							})
						}
					},
					fail(reson) {
						console.log(reson)
						uni.showToast({
							icon: 'error',
							title: '下载失败'
						})
					}
				});
			},
			//获取评论列表
			async commentList() {
				let bookid = this.bookid
				let data = this.query
				await getCommentList(bookid, data).then(res => {
					//判断用户是否对评论点赞
					for (let comment of res.data) {
						isLiked(comment.id).then(res => {
							if (res) {
								comment.isSelected = true
							} else {
								comment.isSelected = false
							}
						})
					}
					this.comments = res
				});
			},
			//用户点赞取消点赞	
			thumbsup(index, id) {
				isLiked(id).then(res => {
					if (res) {
						liked(id).then(res => {
							uni.showToast({
								title: '取消点赞',
								icon: 'none'
							})
						})
					} else {
						liked(id).then(res => {
							uni.showToast({
								title: '点赞成功',
								icon: 'none'
							})
						})
					}
				})
			},
			//回复
			replay(index, id) {
				console.log(id)
				this.isInputShow = true
				this.whoClickMe = 'replay'
				this.parentid = id
			},
			//根据评论获取点赞总数
			getLikedCount(param) {
				for (let item of param) {
					likedCount(item.id).then(res => {
						item.likeNum = res
					})
				}
			},
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
