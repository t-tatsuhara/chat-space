FactoryBot.define do
  factory :message do
    content {File.open("#{Rails.root}/public/images/test_image.jpg")}
    user
    group
  end
end
