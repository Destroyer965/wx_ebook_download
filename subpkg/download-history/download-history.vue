<template>
	<view>
		<uni-swipe-action v-if="historyList.length > 0">
			<block v-for="(item,index) in historyList" :key="item.id">
				<uni-swipe-action-item class="action-item" :right-options="options" @click="bindClick($event,index)"
					@change="swipeChange($event, item.id)">
					<view class="action-content">
						<image class="left-img" :src="item.bookImg">
						</image>
						<view class="right-box">
							<text class="item-title my-font-16">{{item.bookName}}</text>
							<text class="item-content my-font-14-gray">
								{{item.bookIntruduction}}
							</text>
							<text class="item-publish my-font-14-gray">{{item.historyTime}}</text>
						</view>
					</view>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<empty-result v-else style="height: 100%;">
			<template v-slot:tips>
				<view class="tips">你暂时还没有下载历史哦～</view>
			</template>
		</empty-result>
	</view>
</template>

<script>
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
				historyList: [{
						id: 1,
						bookImg: 'https://img13.360buyimg.com/n1/jfs/t1/92329/23/8897/158518/5e09abdcE2cd17eb5/056bbe9e4803be8d.jpg',
						bookName: '1Java核心技术卷I',
						bookIntruduction: '本书由拥有20多年教学与研究经验的资深Java技术专家撰写（获Jolt大奖），是程序员的优选Java指南。本版针对Java SE 9、10和 11全面更新。【卷1共12章】 第1章概述Java语言的特色功能； 第2章详细论述如何下载和安装JDK以及本书的程序示例； 第3章开始讨论Java 语言，包括变量、循环和简单的函数；',
						historyTime: '2022-0125'
					}, {
						id: 2,
						bookImg: 'https://img13.360buyimg.com/n1/jfs/t1/92329/23/8897/158518/5e09abdcE2cd17eb5/056bbe9e4803be8d.jpg',
						bookName: '2Java核心技术卷I',
						bookIntruduction: '本书由拥有20多年教学与研究经验的资深Java技术专家撰写（获Jolt大奖），是程序员的优选Java指南。本版针对Java SE 9、10和 11全面更新。【卷1共12章】 第1章概述Java语言的特色功能； 第2章详细论述如何下载和安装JDK以及本书的程序示例； 第3章开始讨论Java 语言，包括变量、循环和简单的函数；',
						historyTime: '2022-0125'
					},
					{
						id: 3,
						bookImg: 'https://img13.360buyimg.com/n1/jfs/t1/92329/23/8897/158518/5e09abdcE2cd17eb5/056bbe9e4803be8d.jpg',
						bookName: '3Java核心技术卷I',
						bookIntruduction: '本书由拥有20多年教学与研究经验的资深Java技术专家撰写（获Jolt大奖），是程序员的优选Java指南。本版针对Java SE 9、10和 11全面更新。【卷1共12章】 第1章概述Java语言的特色功能； 第2章详细论述如何下载和安装JDK以及本书的程序示例； 第3章开始讨论Java 语言，包括变量、循环和简单的函数；',
						historyTime: '2022-0125'
					},
					{
						id: 4,
						bookImg: 'https://img13.360buyimg.com/n1/jfs/t1/92329/23/8897/158518/5e09abdcE2cd17eb5/056bbe9e4803be8d.jpg',
						bookName: '3Java核心技术卷I',
						bookIntruduction: '本书由拥有20多年教学与研究经验的资深Java技术专家撰写（获Jolt大奖），是程序员的优选Java指南。本版针对Java SE 9、10和 11全面更新。【卷1共12章】 第1章概述Java语言的特色功能； 第2章详细论述如何下载和安装JDK以及本书的程序示例； 第3章开始讨论Java 语言，包括变量、循环和简单的函数；',
						historyTime: '2022-0125'
					}
				]
			};
		},
		methods: {
			bindClick(e, id) {
				if (e.index === 1) {
					this.historyList.splice(id, 1)
					uni.showToast({
						title:"删除成功",
						duration:2000
					})
				}
			},
			swipeChange(e, index) {
				// console.log('当前状态：' + e + '，下标：' + index)
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: '历史下载'
			});

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
