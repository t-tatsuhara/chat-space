class MessagesController < ApplicationController

    before_action :set_group, only: [:index, :create]

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = Messages.new(message_params)
    if @message.save
      redirect_to group_messages_path(@group), notice: 'メッセージの送信に失敗しました'
    else
      redirect_to group_messages_path(@group), alert: 'メッセージを入力してください'
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id,group_id: params[:group_id])
  end
  
  
  def set_group
    @group = Group.find(params[:group_id])
  end

end
