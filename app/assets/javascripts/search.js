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

  var member_list = $("#member_search_result");
  function appendMembers(user_name, user_id) {
    var html = `<div class='box-user clearfix js-chat-member' id="${user_id}">
            <input name='group[user_ids][]' type='hidden' value="${user_id}">
            <p class='box-user__name'>${user_name}</p>
            <a class='user_search_remove box-user__btn box-user__btn--remove js-remove-btn'>削除</a>
            </div>`
    member_list.append(html);
  }
  $(function () {
    $(document).on("click", '.user_search_add', function () {
      var user_name = $(this).attr("data-user-name");
      var user_id = $(this).attr("data-user-id");
      appendMembers(user_name, user_id);
    });
    $(document).on("click", '.user_search_remove', function () {
      $(this).parent().remove();
    });
  });
  
})
  