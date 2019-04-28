json.array! @new_message do |message|
  json.content    message.content
  json.image      message.image
  json.name       message.user.name
  json.date       message.created_at
  json.id         message.id
end 