<!-- 书本详情 -->
<template>
	<view class="detail" @click="myClick">
		<book-introduction :bookimg="bookinfo.imgUrl" :bookname="bookinfo.bookName" :bookpublisher="bookinfo.bookPublish"
			:bookauthor="bookinfo.bookAuthor" :bookisbn="bookinfo.bookIsbn" class="book-introduction-card"></book-introduction>
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
				<text selectable=true user-select=true @longpress='copyText(introductionContent)' class="model_text">
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
		<uni-goods-nav class="bottom" @click="onClick" @buttonClick="buttonClick" :buttonGroup="buttonGroup"
			:fill="true" :options="options" />
		<book-comments @writeComment="writeComment" class="book-comments" :commentUserinfo="commentUserinfo">
		</book-comments>
		<my-input @send="send" class="myinput" v-if="isInputShow"></my-input>
	</view>
</template>

<script>
	import {getBookById} from '../../utils/api'
	export default {
		data() {
			return {
				isInputShow: false,
				bookinfo:null,
				isShowMoreDetail:false,
				bookid:0,
				commentUserinfo: [{
						id: 1,
						useravatar: 'http://ebook-download-admin.oss-cn-chengdu.aliyuncs.com/images/touxiang/xiaohuangren.jpg',
						username: '🌻',
						userCommentsTime: '刚刚',
						userCommentsContent: '项目 wx_ebook_download编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。',
						userCommentNum: 0,
						children: [{
								id: 1,
								username: '沉迷学习无法自拔',
								commnentText: '我也觉得很不错'
							},
							{
								id: 2,
								username: '帅的一比',
								commnentText: '我也是这样觉得'
							}
						]

					},
					{
						id: 2,
						useravatar: 'http://ebook-download-admin.oss-cn-chengdu.aliyuncs.com/images/touxiang/xiaohuangren.jpg',
						username: '😄',
						userCommentsTime: '刚刚',
						userCommentsContent: '项目 wx_ebook_download编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。',
						userCommentNum: 1,
					}
				],
				options: [{
					icon: 'heart',
					text: '收藏',
					size: '36',
					color: '#ff0000'
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
				]


			};
		},
		onLoad(option) {
			this.bookid = option.id
			uni.setNavigationBarColor({
				frontColor:"#000000",
				backgroundColor:"#F1F1F2"
			});
			this.getBook()
		},
	
		methods: {
			getBook(){
				getBookById(this.bookid).then(res => {
					this.bookinfo = res
				})
			},
			buttonClick(e) {    
				console.log(e)
			},
			onClick(e) {
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
			},
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
				this.isInputShow = !this.isInputShow
			},
			send(value) {
				console.log(value)
				this.isInputShow = false
			},
			// 长按复制
			copyText(data) {
				uni.setClipboardData({
					data: data,
					success() {
						uni.showToast({
							title: '已复制到剪贴板',
							icon: 'none',
							position: 'top'
						})
					}
				})

			}
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
		padding-bottom: 70px;

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
