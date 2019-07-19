class GroupsController < ApplicationController
  before_action :set_group, only: [:update, :edit]

  def index
  end

  def new
    @group = Group.new
    @group.users << current_user
    @users = User.find(@group.users.ids)
  end

  def create
    @group = Group.new(group_params)
    if @group.save  
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
  end

  def update
    @users = User.find(@group.users.ids)
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: 'グループを編集しました'
    else
      render :edit
    end
  end

  def edit
    @users = User.find(@group.users.ids)
  end


  
  private
  def group_params
    params.require(:group).permit(:name, { user_ids: [] })
  end
  
  def set_group
    @group = Group.find(params[:id])
  end
  
end
