class AddCoverIToEbooks < ActiveRecord::Migration[7.2]
  def change
    add_column :ebooks, :cover_i, :string
  end
end
