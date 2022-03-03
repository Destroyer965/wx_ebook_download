import request from "./request.js"
//登录
export function login(data) {
	return request({
		url: '/auth/login',
		method: 'POST',
		data
	})
}
// 获取用户信息
export function getUserInfo() {
	return request({
		url: '/auth/getUserInfo',
		method: 'GET',
	})
}
//获取轮播图
export function banner() {
	return request({
		url: '/system/banner',
		method: 'GET',
	})
}
//获取图书分类
export function category(param) {
	return request({
		url: '/book/categoryList?pageNo=' + param.pageNo + '&pageSize=' + param.pageSize,
		method: 'GET',
	})
}
//获取图书推荐列表
export function recommendedList(param) {
	return request({
		url: '/book/recommendedList?pageNo=' + param.pageNo + '&pageSize=' + param.pageSize,
		method: 'GET'
	})
}
//按照图书分类id分页查询图书
export function getBookByCategoryId(param) {
	return request({
		url: '/book/category?categoryId=' + param.categoryId + '&pageNo=' + param.pageNo + '&pageSize=' + param
			.pageSize,
		method: 'GET',
	})
}
//根据图书id查询图书信息
export function getBookById(param) {
	return request({
		url: '/book/' + param,
		method: 'GET',
	})
}
//根据用户id查询用户收藏列表
export function getCollectionById(param) {
	return request({
		url: '/collection/select?pageNo=' + param.pageNo + "&pageSize=" + param.pageSize,
		method: 'GET',
	})
}
//根据用户id和图书id查询该用户是否收藏该图书
export function getCollectionByUserAndBookID(param) {
	return request({
		url: '/collection/' + param,
		method: 'GET',
	})
}
// 根据用户id图书id添加收藏记录
export function addCollection(param) {
	return request({
		url: '/collection/add/' + param,
		method: 'PUT',
	})
}
// 根据用户id图书id删除收藏记录
export function delCollection(param) {
	return request({
		url: '/collection/del/' + param,
		method: 'DELETE',
	})
}

//根据图书id查询图书评论列表
export function getCommentList(param,data) {
	return request({
		url: '/book/comments/' + param,
		data,
		method: 'GET',
	})
}

//根据图书id发布图书评论
export function addComment(data) {
	return request({
		url: '/book/comments/publish',
		data,
		method: 'POST',
	})
}
//根据图书评论获取点赞总数
export function likedCount(param) {
	return request({
		url: '/user/liked/count/'+param,
		method: 'GET',
	})
}
// 查看用户是否对该评论点赞
export function isLiked(param) {
	return request({
		url: '/user/isliked/'+param,
		method: 'GET',
	})
}
// 对图书评论点赞
export function liked(param) {
	return request({
		url: '/user/liked/'+param,
		method: 'GET',
	})
}
// 根据评论id查询评论信息
export function commentById(param) {
	return request({
		url: '/book/comment/'+param,
		method: 'GET',
	})
}
// 根据评论id查询回复信息
export function replayByParentId(data) {
	return request({
		url: '/book/comments/replay/',
		method: 'POST',
		data
	})
}
// 根据评论id查询评论数量
export function commentCountById(param) {
	return request({
		url: '/book/comment/count/'+param,
		method: 'GET',
	})
}
//下载
export function download(param){
	return request({
		url: '/book//download/'+param,
		method: 'GET',
	})
}