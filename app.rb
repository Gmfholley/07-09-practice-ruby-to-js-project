require 'date'                   # ruby's built-in date function
require 'chronic'                # gem that parses date/time
require 'sqlite3'                # gem that handles database
require 'pry'                    # gem that handles debugging
require 'sinatra'                # gem that handles html views & controller
require 'sinatra/reloader'       # reloads sinatra without restarting
require 'active_support'         # all kinds of goodies! including blank?, underscore, humanize, pluralize
require 'active_support/core_ext/string/filters.rb'
require 'active_support/core_ext/object/blank.rb'
require 'active_support/inflector.rb'


# Database set up modules and helper classes required by models

require_relative 'database_connector.rb'
require_relative 'foreign_key.rb'

CONNECTION=SQLite3::Database.new("products.db")
CONNECTION.results_as_hash = true
CONNECTION.execute("PRAGMA foreign_keys = ON;")


CONNECTION.execute("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, general_info TEXT NOT NULL, technical_specs TEXT NOT NULL, where_to_buy TEXT NOT NULL);")

# models


require_relative 'models/product.rb'

# controllers

require_relative 'controllers/menu.rb'
require_relative 'controllers/menu_item.rb'
require_relative 'controllers/method_to_call.rb'

require_relative 'controllers/defined_menus.rb'



helpers DefinedMenus

get "/home" do
  @menu = crud_menu(Product)
  @with_links = true
  erb :menu
end

get "/product/update/:x" do
  @m = Product.create_from_database(params["x"].to_i)
  erb :create
end

get "/product/create/:x" do
  @m = Product.create_from_database(params["x"].to_i)
  erb :create
end

get "/product/create" do
  @m = Product.new()
  erb :create
end



get "/product/submit" do 
  @m = Product.new(params["create_form"])
  if @m.valid?
    @m.save_record
    @message = "Successfully saved!"
    @menu = crud_menu(Product)
    @with_links = true
    erb :menu
  else
    @message = "Not saved"
    erb :create
  end
  
end


get "/product/update" do 
  @menu = object_menu(Product, "update")
  @with_links = true
  erb :menu
end

get "/product/show" do 
  @menu = object_menu(Product, "show")
  @with_links = false
  erb :menu
end

get "/product/delete" do 
  @menu = object_menu(Product, "delete")
  @with_links = true
  erb :menu
end

get "/product/delete/:x" do
  if Product.ok_to_delete?(params["x"].to_i)
    Product.delete_record(params["x"].to_i)
    @menu = crud_menu(Product)
    @with_links = true
    erb :menu
  else
    @message = "Cannot delete this record.  It must be in use in another database."
    @menu = object_menu(Product, "delete")
    @with_links = true
    erb :menu
  end
end

