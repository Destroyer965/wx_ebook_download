<!-- 书本详情 -->
<template>
	<view class="detail" @click="myClick">
		<book-introduction :bookimg="bookimg" :bookname="bookname" :bookpublisher="bookpublisher"
			:bookauthor="bookauthor" :bookisbn="bookisbn" class="book-introduction-card"></book-introduction>
		<uni-card class="card-data">
			<view class="left-downloadCount">
				<text class="download-num my-font-size-22">0</text>
				<text class="download-text">下载次数</text>
			</view>
			<view class="center-collectionCount">
				<text class="collection-num my-font-size-22">0</text>
				<text class="collection-text">收藏次数</text>
			</view>
			<view class="right-score">
				<view class="score-num">
					<uni-rate :readonly="true" :touchable="false" :value="4" />

				</view>
				<text class="score">推荐指数</text>
			</view>
		</uni-card>
		<uni-card class="introduction-card">
			<text class="introduction-card-title">简介</text>
			<view class="introduction-card-content" :class="{showMoreDetail:isShowMoreDetail}">
				<text selectable=true user-select=true @longpress='copyText(introductionContent)' class="model_text">
					{{introductionContent}}
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
	export default {
		data() {
			return {
				wh: 0,
				isInputShow: false,
				bookimg: 'https://img.alicdn.com/imgextra/i1/1049653664/O1CN01x8yrFa1cw9ruiMJLK_!!0-item_pic.jpg_430x430q90.jpg',
				bookname: 'Java从入门到精通',
				bookpublisher: '清华大学出版社',
				bookauthor: '明日科技',
				bookisbn: '9787302581260',
				isShowMoreDetail: false,
				introductionContent: '《Java从入门到精通（第6版）》从初学者角度出发，通过通俗易懂的语言、丰富多彩的实例，详细讲解了使用Java语言进行程序开发需要掌握的知识。全书分为23章，内容包括初识Java，熟悉Eclipse开发工具，Java语言基础，流程控制，数组，类和对象，继承、多态、抽象类与接口，包和内部类，异常处理，字符串，常用类库，集合类，枚举类型与泛型，lambda表达式与流处理，I/O（输入/输出），反射与注释，数据库操作，Swing程序设计，Java绘图，多线程，网络通信，奔跑吧小恐龙，MR人脸识别打卡系统。书中所有知识都结合具体实例进行讲解，涉及的程序代码都给出了详细的注释，可以使读者轻松领会Java程序开发的精髓，快速提高开发技能。',
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
		onLoad() {

		},
	
		methods: {
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

<style lang="scss">
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
				height: 250rpx;
				margin: 10rpx auto 20rpx;
				text-align: justify;
				overflow: hidden;


				.model_text {
					font-size: 26rpx;
				}

				.model_detail {
					width: 68px;
					position: absolute;
					right: 0px;
					bottom: -4rpx;
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
