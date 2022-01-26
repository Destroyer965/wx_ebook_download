<template>
	<view class="card">
		<view class="card-title">
			<text class="title">{{title}}</text>
			<navigator class="more" url="#">更多&nbsp;&gt;</navigator>
		</view>
		<slot name="card-item"></slot>
	</view>
</template>

<script>
	export default {
		props:{
			title:{
				type:String,
				default:''
			}
		},
		name: "my-card",
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.card {
		width: 100%;
		height: 150px;
		background-color: #fff;

		.card-title {
			width:95%;
			height: 20px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 10px;
			margin: 0 auto;
			.title {
				position: relative;
				display: flex;
				align-items: center;
				height: 100%;
				margin-left: 20px;
				&::before {
					position: absolute;
					left: -10px;
					content: '';
					display: inline-block;
					width: 3px;
					height: 20px;
					background-color: green;
				}
			}
			.more{
				font-size: 12px;
				color: #C0C0C0;
	
			}
		}
	}
</style>
