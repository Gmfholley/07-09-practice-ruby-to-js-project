

class Product
  include DatabaseConnector
  
  attr_reader :id, :general_info, :technical_specs, :where_to_buy, :errors
  
  def initialize(args={})
    @id = args["id"] || args[:id]
    @general_info = args["general_info"] || args[:general_info]
    @technical_specs = args["technical_specs"] || args[:technical_specs]
    @where_to_buy = args["where_to_buy"] || args[:where_to_buy]
    @errors = []
  end
  
  def valid?
    validate_field_types
    @errors.length == 0
  end

end