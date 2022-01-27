
// 点击预览图片
export function previewImage(imgsrc){
		let imgs = [];
		imgs.push(imgsrc);
		uni.previewImage({
			current: 0,
			urls: imgs,
			// 长按保存图片
			longPressActions: {
				itemList: ['保存图片'],
				success: data => {
					uni.saveImageToPhotosAlbum({
						filePath: payUrl,
						success: function() {
							uni.showToast({
								icon: 'success',
								title: '保存成功'
							})
						},
						fail: (err) => {
							uni.showToast({
								icon: 'none',
								title: '保存失败，请重新尝试'
							})
						}
					});
				},
				fail: (err) => {
					console.log(err.errMsg);
				}
			}
		});
}