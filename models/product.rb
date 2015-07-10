

class Product
  include DatabaseConnector
  
  def initialize(args={})
    @id = args["id"] || args[:id]
    @general_info = args["general_info"] || args[:general_info]
    @technical_specs = args["technical_specs"] || args[:technical_specs]
    @where_to_buy = args["where_to_buy"] || args[:where_to_buy]
  end
  
  

end