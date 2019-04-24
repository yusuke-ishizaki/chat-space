$(function () {
  function buildHTML(message) {
    var img =(message.image.url)? img = `<img src = ${message.image.url} class: "lower-message_image">`:"";  
    var html =
      `<div class="message" data-message-id="${message.id}">
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${ message.name}
          </div>
          <div class="upper-message__date">
            ${ message.date}
          </div>
        </div>
        <div class="lower-meesage">
          <p class="lower-message__content">
            ${ message.content}
          </p>
            ${img}
        </div>
      </div>`;
    return html;
  }
  function scroll_view() {
    $('.main__bottom') .animate({scrollTop: $('.main__bottom')[0].scrollHeight},'fasts')
  }  
　
  $('#new_message').on('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");  
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })  
    .done(function (data) {
      var html = buildHTML(data);
      $('.main__bottom').append(html);
      scroll_view()
      $(".form__submit").prop("disabled", false); 
      $("form")[0].reset();
    })
    .fail(function () {
      alert('error');
    });
  })

  function autoUpdate() {
    var data = $('.message').last().data('id')
    var user_url = document.location.pathname;
    if (user_url.match(/messages/)) {
      $.ajax({
          type: 'GET',
          url: user_url,
          dataType: 'json',
          data: { data: data }
      })
      .done(function (json) {
          var insertHTML = '';
          if (json.messages.length !== 0) {
              json.messages.forEach(function(message) {
                  insertHTML += buildHTML(message);                     
              });
          }    
          $('.messages').append(insertHTML);
          form_reset();                     
          scroll_view();
      })
      .fail(function () {
          alert('自動更新失敗');
      });
    }
  };
  setInterval(autoUpdate, 2000);
})
