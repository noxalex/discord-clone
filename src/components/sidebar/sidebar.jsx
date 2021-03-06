import React from 'react';
import { useSelector } from 'react-redux';
import db from '../../firebase';
import { selectUser } from '../../features/userSlice';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CallIcon from '@material-ui/icons/Call';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import { Avatar } from '@material-ui/core';
import SidebarChannel from './sidebarChannel';
import './sidebar.css';

function Sidebar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = React.useState([]);

  React.useEffect(() => {
    db.collection('channels').onSnapshot((snapshot) =>
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        })),
      ),
    );
  }, []);

  const handleAddChannel = () => {
    const channelName = prompt('Please enter a new channel name');

    if (channelName) {
      db.collection('channels').add({
        channelName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h2>React</h2>
        <ExpandMoreIcon />
      </div>

      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon className="sidebar__addChanel" />
            <h4>Text channels</h4>
          </div>
          <AddIcon onClick={handleAddChannel} />
        </div>
        <div className="sidebar__channelsList">
          {channels.map(({ id, channel }) => (
            <SidebarChannel key={id} id={id} title={channel.channelName} />
          ))}
        </div>
      </div>

      <div className="sidebar__voice">
        <SignalCellularAltIcon className="sidebar__voiceIcon" fontSize="large" />
        <div className="sidebar__voiceInfo">
          <h3>Voice connected</h3>
          <p>stream</p>
        </div>
        <div className="sidebar__voiceIcons">
          <InfoOutlinedIcon />
          <CallIcon />
        </div>
      </div>

      <div className="sidebar__profile">
        <Avatar src={user.photo} />
        <div className="sidebar__profileInfo">
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0, 5)}</p>
        </div>
        <div className="sidebar__profileIcons">
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
