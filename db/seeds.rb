Department.destroy_all
Item.destroy_all

2.times do
  d = Department.create(name: Faker::Commerce.department)
  3.times do |i|
    d.items.create(name: Faker::Commerce.product_name, price: "#{i}.99")
  end
end

puts "seeded"
