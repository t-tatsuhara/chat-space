class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  validates_presence_of :content, unless: :image? 

  mount_uploader :image, ImageUploader

end
