<template>
	<view>
		<block v-for="(item,index) in bookClassifyInfo" :key="item.id">
			<navigator class="card-item" url="#">
				<lazyLoad  width="150rpx" height="150rpx" class="left-img" :src="item.imgUrl"></lazyLoad>
				<view class="right-box">
					<text class="item-title my-font-16">{{item.bookName}}</text>
					<text class="item-content my-font-14-gray">
						{{item.bookIntrduction}}
					</text>
					<text class="item-publish my-font-14-gray">{{item.bookAuthor}}</text>
				</view>
			</navigator>
		</block>
	</view>
</template>

<script>
	import lazyLoad from '@/components/muqian-lazyLoad/muqian-lazyLoad.vue'
	export default {
		components:{lazyLoad},
		props: {
			'bookClassifyInfo': {
				type: Array,
				required: true
			}
		},
		name: "book-card-item",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.card-item {
		@extend .align-center;
		height: 200rpx;
		width: 95%;
		margin: 0 auto;

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
</style>
