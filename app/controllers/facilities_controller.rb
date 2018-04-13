class FacilitiesController < ApplicationController
  before_action :authenticate_user!
  
  def index
    @facilities = current_user.facilities
    render json: @facilities
  end

  def show
    @facility = Facility.find(params[:id])
    render json: @facility
  end

  def create
    @user = current_user
    @facility = @user.facilities.build(facility_params)

    if @user.save
      render json: @facility, status: :created, location: @facility
    else
      render json: @facility, status: :unprocessable_entity
    end
  end

  def update
    @facility = Facility.find(params[:id])

    if @facility.update(facility_params)
      render json: @facility
    else
      render json: @facility.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @facility = Facility.find(params[:id]).delete
    render status: :ok
  end

  private

  def facility_params
    params.require(:post).permit(:title, :content)
  end
end
