$(function () {
  // 调用获取用户信息的函数
  getUserInfo();
  $('#btnLogout').on('click', function () {
    // 提示用户是否退出
    layer.confirm('确定退出登录？', {
      icon: 3,
      title: '提示'
    }, function (index) {
      // 清除本地的token
      localStorage.removeItem('token');
      // 跳转到登录界面
      location.href = '/login.html';
      layer.close(index);
    })
  })
})

function getUserInfo() {
  $.ajax({
    type: "'GET",
    url: "/my/userinfo",
    success: function (res) {
      if (res.status != 0) {
        return layui.layer.msg('获取用户信息失败')
      } else {
        renderAvatar(res.data);
      }
    },
    error: function (e) {
      console.log(e)
    },
    // 验证身份认证是否成功
    // complete: function (res) {
    //   // 可以使用res.responseJSON拿到服务器返回的数据
    //   if (res.responseJSON.status === 1 && res.responseJSON.message == '身份认证失败！') {
    //     localStorage.removeItem('token');
    //     location.href = '/login.html';
    //   }
    // }
  });
}

function renderAvatar(user) {
  let name = user.nickname || user.username;
  $('.welocome').html('欢迎&nbsp;&nbsp;' + name);
  if (user.user_pic != null) {
    $('.text-avatar').hide();
    $('.layui-nav-img').attr('src', user.user_pic).show();
  } else {
    $('.layui-nav-img').hide();
    let firstStr = name[0].toUpperCase();
    $('.text-avatar').html(firstStr).show();
  }
}