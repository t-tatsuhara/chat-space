$(function(){

  function scrollBottom(){
    $('.right-body').animate({scrollTop: $('.right-body')[0].scrollHeight},300,'swing')
  }

  function buildHTML(message){
    var content = message.content ? `${message.content}` : "";
    var image = message.image ? `<img class="right-body__user__image" src="${message.image}">` : "";

    var html =  `<div class="right-body__user" data-id="${message.id}" >
                  <p class="right-body__user__name">
                    ${message.user_name}
                  </p>
                  <p class="right-body__user__date">
                    ${message.created_at}
                  </p>
                  <p class="right-body__user__comment">
                    ${content}
                  </p>
                    ${image}
                </div>`
    return html;
  }

  var buildMessageHTML = function(message) {

    var html_temp = '<div class="right-body__user" data-id=' + message.id + '>' +
                      '<div class="right-body__user__name">' +
                        message.user_name +
                      '</div>' +
                      '<div class="right-body__user__date">' +
                        message.created_at +
                      '</div>'
  
    if (message.content && message.image.url) {
      var html = html_temp +
          '<p class="right-body__user__comment">' +
            message.content +
          '</p>' +
          '<img src="' + message.image.url + '" class="lower-message__image" >' +
        '</div>' 
    } else if (message.content) {
      var html = html_temp +
          '<p class="right-body__user__comment">' +
            message.content +
          '</p>' +
        '</div>' 
    } else if (message.image.url) {
      var html = html_temp +
          '<img src="' + message.image.url + '" class="lower-message__image" >' +
        '</div>' 
    };
    return html;
  };

  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
  
    $.ajax({
      type: "POST",
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){      
      var html = buildHTML(message);
      $(".right-body").append(html);
      $("#new_message")[0].reset();
      scrollBottom();
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $('.right-footer__form__send').prop('disabled',false);
    }

    )
  });

  var reloadMessages = function() {
    last_message_id = $('.right-body__user:last').data('id');
    group_id = $('.contaner__right').data('group-id');
    var url = `/groups/${group_id}/api/messages`;

    $.ajax({
      url: url,
      type: 'GET',
      data: {id: last_message_id},
      dataType: 'json'
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML = buildMessageHTML(message);
      });
      $(".right-body").append(insertHTML);
      scrollBottom();
    })
    .fail(function() {
      console.log('error');
    });
  };

  $(window).on('load',function(){
    if(document.getElementById('right-message') != null){
      setInterval(reloadMessages, 5000);
    }
  });
});
