$(function(){

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix" >
                  <p class="chat-group-user__name">${user.user_name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.user_id}" data-user-name="${user.user_name}">追加</div>
                </div>`
    return html
  }

  function appendUserdel(user_name,user_id){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user_id}'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class="chat-group-user__name">${user_name}</p>
                  <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</div>
                </div>`
    return html
  }

  $('#user-search-field').on('keyup',function(){
    var input = $('#user-search-field').val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })
    .done(function(users){
      $("#user-search-result").empty();
      users.forEach(function(user){
        if (user.user_name !== 0) {
          $('#user-search-result').append(appendUser(user));
          if (input.length === 0){
            $('#user-search-result').empty();
          } 
        }
        else {
          $('#user-search-result').empty();
        }
      });

    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    });
  });

  $(document).on("click",".user-search-add",function(){
    var name = $(this).attr('data-user-name');
    var id = $(this).attr('data-user-id');
    $('.js-add-user').append(appendUserdel(name,id));
    $(this).parent().remove();
  })

  $(document).on("click",".user-search-remove",function(){
    var name = $(this).attr('data-user-name');
    var id = $(this).attr('data-user-id');
    $(this).parent().remove();
  })

});

