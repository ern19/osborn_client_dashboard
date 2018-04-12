User.destroy_all

aaron = User.create!(
  email: 'aaron@aaron.com',
  password: 'blahblah',
  password_confirmation: 'blahblah'
)

bob = User.create!(
  email: 'bob@bob.com',
  password: 'blahblah',
  password_confirmation: 'blahblah'
)

3.times do
  aaron.facilities.create!(
    name: FFaker::Company.name,
    contact: FFaker::Name.name
  )
end

3.times do
  bob.facilities.create!(
    name: FFaker::Company.name,
    contact: FFaker::Name.name
  )
end

