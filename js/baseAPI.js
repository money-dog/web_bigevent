$.ajaxPrefilter(function (options) {
  // 拼接根路径
  options.url = 'http://www.liulongbin.top:3008' + options.url;
  // 统一为有权限的接口设置headers属性
  if (options.url.indexOf('/my/') != -1) {
    options.headers = {

      Authorization: localStorage.getItem('token') || ''
    }
  }
  // 全局挂载complete函数
  options.complete = function (res) {
    // 可以使用res.responseJSON拿到服务器返回的数据
    if (res.responseJSON.status === 1 && res.responseJSON.message == '身份认证失败！') {
      localStorage.removeItem('token');
      location.href = '/login.html';
    }
  }
})