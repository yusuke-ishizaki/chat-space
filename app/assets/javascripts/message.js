$(function () {
    function buildHTML(message) {
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
            ${message.image}
            </div>
            </div>`;
        return html;
    }
    

    $('.form__message').on('submit', function (e) {
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
            $('.messages').append(html);
            scroll_view()
        })
        .fail(function () {
            alert('error');
        })
    })
}) 