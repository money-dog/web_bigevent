$(function () {
  // 点击注册账号的链接
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });

  // 点击登录的链接
  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });

  // 从layui获取form对象，自定义校验规则
  let form = layui.form;
  form.verify({
    pwd: [
      /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    username: function (value, item) { //value：表单的值、item：表单的DOM对象
      if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
        return '用户名不能有特殊字符';
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return '用户名首尾不能出现下划线\'_\'';
      }
      if (/^\d+\d+\d$/.test(value)) {
        return '用户名不能全为数字';
      }
    },
    repwd: function (value) {
      let pwd = $('.reg-box [name=password]').val();
      if (pwd != value) {
        return '两次密码不一致';
      }
    }
  })

  // 监听注册表单提交事件
  let layer = layui.layer;
  $('#form_reg').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/api/reg",
      data: {
        username: $('#form_reg [name="account"]').val(),
        password: $('#form_reg [name="password"]').val(),
        repassword: $('#form_reg [name="repassword"]').val(),
      },
      function (res) {
        if (res.status != 0) {
          return layer.msg('只想弱弱提示');
        } else {
          console.log('success')
        }
      }
    });
  });

  $('#form_login').submit(function (e) {
    e.preventDefault();
    $.post("/api/login",
      $(this).serialize(),
      function (res) {
        if (res.status != 0) {
          return layer.msg('只想弱弱提示');
        } else {
          location.href = '../index.html';
          layer.msg('成功');
        }
      }
    );
  })
});