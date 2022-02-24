<template>
	<view class="content">
		<ren-dropdown-filter :filterData='filterData' :defaultIndex='defaultIndex' @ed='ed' @dateChange='dateChange'>
		</ren-dropdown-filter>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				filterData: [
					[{
						text: '全部状态',
						value: ''
					}, {
						text: '状态1',
						value: 1
					}, {
						text: '状态2',
						value: 2
					}, {
						text: '状态3',
						value: 3
					}],
					[{
						text: '全部类型',
						value: ''
					}, {
						text: '类型1',
						value: 1
					}, {
						text: '类型2',
						value: 2
					}, {
						text: '类型3',
						value: 3
					}]
				],
				defaultIndex: [0, 0]
			}
		},
		onLoad() {

		},
		methods: {
			dateChange(d){
			               uni.showToast({
			                   icon:'none',
			                   title:d
			               })
			            }
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
