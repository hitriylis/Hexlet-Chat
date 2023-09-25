import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { AddChannelIcon } from './icons';
import renderModal from '../modals';
import { open } from '../slices/modalsSlice';
import Channel from './Channel';

const Channels = () => {
  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const { modalType } = useSelector((state) => state.modals);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const showModal = (modal) => () => dispatch(open(modal));

  const lastRef = useRef();
  useEffect(() => {
    lastRef.current?.lastElementChild?.scrollIntoView();
  }, [channels]);

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels')}</b>
        <Button
          variant=""
          className="p-0 text-primary btn-group-vertical"
          onClick={showModal({ modalType: 'adding' })}
        >
          <AddChannelIcon />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
        ref={lastRef}
      >
        {channels.map((channel) => (
          <Channel key={channel.id} channel={channel} isActive={currentChannelId === channel.id} />
        ))}
      </ul>
      {renderModal(modalType)}
    </div>
  );
};

export default Channels;
