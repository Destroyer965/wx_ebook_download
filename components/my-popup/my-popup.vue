<template>
	<view class="my-popup" @click="popup">
		<view class="my-popup-box">
			<view class="my-popup-box-item fabulous">
				<text class="iconfont icon-xihuan"></text>
				<text class="my-popup-box-item-text">赞</text>
			</view>
			<text>|</text>
			<view class="my-popup-box-item comment">
				<text class="iconfont icon-pinglun"></text>
				<text class="my-popup-box-item-text">评论</text>
			</view>
			<text>|</text>
			<view class="my-popup-box-item comment" @click="report">
				<text class="iconfont icon-jubao"></text>
				<text class="my-popup-box-item-text">举报</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-popup",
		data() {
			return {

			};
		},
		methods:{
			popup(){
				this.$emit('popup')
			},
			report(){
				uni.navigateTo({
					url:'../../subpkg/report/report'
				})
			}
		}
	}
</script>

<style lang="less">
	.my-popup-box {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 40px;
		background-color: #4C4C4C;
		border-radius: 4px;

		.my-popup-box-item {
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0 12px 0 12px;

			.iconfont {
				font-size: 18px;
				color: #fff;
			}

			.my-popup-box-item-text {
				color: #fff;
				font-size: 14px;
				padding-left: 5px;
			}
		}
	}
</style>
