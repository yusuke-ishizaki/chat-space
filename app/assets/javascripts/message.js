$(function () {
    function buildHTML(message) {
        var img ="";
        if (message.image.url){
        var img = `<img src = ${message.image.url} class: "lower-message_image">`
        }

        var html =
            `<div class="message">
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
        })
        .fail(function () {
            alert('error');
        });
    })
}) 