json.content @message.content
json.image @message.image.url
json.user_name current_user.name
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")