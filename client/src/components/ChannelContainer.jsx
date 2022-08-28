import { Channel, MessageTeam } from "stream-chat-react";
import { ChannelInner, CreateChannel, EditChannel } from "./";

const EmptyState = () => (
  <div className="channel-empty__container">
    <p className="channel-empty__first">Start of Chat History</p>
    <p className="channel-empty__second">Send Messages etc</p>
  </div>
);
const ChannelContainer = ({
  isCreating,
  setIsCreating,
  setIsEditing,
  createType,
  isEditing,
}) => {
  if (isCreating) {
    return (
      <div className="channel__container">
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    );
  }
  if (isEditing) {
    return (
      <div className="channel__container">
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    );
  }

  return (
    <div className="channel__container">
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
};

export default ChannelContainer;
