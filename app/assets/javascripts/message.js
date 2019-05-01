$(function () {
  function buildHTML(message) {
    var img =(message.image.url)? img = `<img src = ${message.image.url} class: "lower-message_image">`:"";  
    var html =
      `<div class="message"  data-id="${message.id}">
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
　
  $(".form__submit").prop("data-disable-with", false); 
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
      $("form")[0].reset();
    })
    .fail(function () {
      alert('error');
    });
  })

  let interval = setInterval(function(){
    var message_id = $('.message').last().data('id')
    if (location.href.match(/\/groups\/\d+\/messages/)) {
      $.ajax({
        type: 'GET',
        url: location.href,
        dataType: 'json',
        data: { id: message_id }
      })
      .done(function (json) {
        if (json.length !== 0) {
          json.forEach(function(message) {
            var html= buildHTML(message);  
            $('.main__bottom').append(html);                 
          });
        }    
        scroll_view();
        $(".form__submit").prop("disabled", false); 
      })
      .fail(function () {
        alert('自動更新失敗');
      });
    }else{
      clearInterval(interval);
    }
  } , 5000);

});
