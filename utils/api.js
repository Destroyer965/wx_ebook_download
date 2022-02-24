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
		url: '/book/'+param, 
		method: 'GET',
	})
}
