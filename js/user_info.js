$(function () {
  let form = layui.form;
  let layer = layui.layer;
  form.verify({
    nameLength: function (val) {
      if (val.length > 6) {
        return '昵称长度过长'
      }
    }
  })
  initUserInfo()
  // 初始化用户信息
  function initUserInfo() {
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('error')
        } else {
          console.log(res)
        }
      }
    });
  }
})