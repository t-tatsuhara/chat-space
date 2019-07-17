$(function(){

  function scrollBottom(){
    $('.right-body').animate({scrollTop: $('.right-body')[0].scrollHeight},300,'swing')
  }

  function buildHTML(message){
    var content = message.content ? `${message.content}` : "";
    var image = message.image ? `<img class="right-body__user__image" src="${message.image}">` : "";

    var html =  `<div class="right-body__user">
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
      $(".right-footer__form__box__text").val("");
      $(".hidden").val("");
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
});

