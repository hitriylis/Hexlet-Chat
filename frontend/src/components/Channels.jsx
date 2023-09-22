import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import AddChannelSVG from './AddChannel';
import { setChannel } from '../slices/channelsSlice';

const Channels = () => {
  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleSetChannel = (id) => dispatch(setChannel(id));

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels')}</b>
        <Button variant="" className="p-0 text-primary btn-group-vertical">
          <AddChannelSVG />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map(({ id, name }) => (
          <li className="nav-item w-100" key={id}>
            <Button
              variant={id === currentChannelId ? 'secondary' : ''}
              className="w-100 rounded-0 text-start"
              onClick={() => handleSetChannel(id)}
            >
              <span className="me-1">#</span>
              {name}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Channels;
