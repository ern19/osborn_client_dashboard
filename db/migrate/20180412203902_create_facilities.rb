class CreateFacilities < ActiveRecord::Migration[5.2]
  def change
    create_table :facilities do |t|
      t.string :name
      t.string :contact
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
