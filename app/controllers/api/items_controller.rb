class Api::ItemsController < ApplicationController
  def index
    d = Department.find(params[:department_id])
    render json: d.items
  end

  def destroy
    item = Item.find(params[:id]).destroy
    render json: item
  end
end
