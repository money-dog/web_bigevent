$(function () {
  initArticle()
  // 获取文章列表
  function initArticle() {
    $.ajax({
      type: "GET",
      url: "/my/article/cates",
      success: function (res) {
        console.log(res)
      }
    });
  }
})