import React from 'react';
import { useDispatch } from 'react-redux';
import { setChannelInfo } from '../../../features/appSlice';
import './sidebarChannel.css';

function SidebarChannel({ id, title }) {
  const dispatch = useDispatch();

  return (
    <div
      className="sidebarChannel"
      onClick={() => dispatch(setChannelInfo({ channelId: id, channelName: title }))}
    >
      <h4>
        <span className="sidebarChannel__hash">#</span>
        {title}
      </h4>
    </div>
  );
}

export default SidebarChannel;
