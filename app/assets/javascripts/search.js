$(function () {
  var user_list = $("#user_search_result");
  function appendUsers(user) {
    var html = `<div class='box-user clearfix js-chat-member'>
        <div class='box-form__field--right'>
          <p class="box-user__name">${user.name}</p>
        <a class="user_search_add box-user__btn box-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
        </div>
      </div>`
    user_list.append(html); 
  }
  $("#user-search-field").on("keyup", function () {
    var input = $("#user-search-field").val();
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { name: input },
        dataType: 'json'
      })
      .done(function (users) {
        $('#user_search_result').empty();
        if(users.length !== 0 ) {
          users.forEach(function (user) {
            appendUsers(user);
          })
        }
      })
      .fail(function () {
        alert('検索に失敗しました');
      });
  })
})