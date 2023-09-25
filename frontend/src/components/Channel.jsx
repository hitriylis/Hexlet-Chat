import { useDispatch } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { open } from '../slices/modalsSlice';
import { setChannel } from '../slices/channelsSlice';
import { useFilter } from '../hooks';

const Channel = ({ isActive, channel }) => {
  const { t } = useTranslation();
  const filterProfanity = useFilter();
  const dispatch = useDispatch();
  const handleSetChannel = (id) => dispatch(setChannel(id));
  const showModal = (modal) => () => dispatch(open(modal));

  const notRemovable = (
    <Button
      variant={isActive ? 'secondary' : ''}
      className="w-100 rounded-0 text-start border-0"
      onClick={() => handleSetChannel(channel.id)}
    >
      <span className="me-1">#</span>
      {channel.name}
    </Button>
  );

  const removable = (
    <Dropdown as={ButtonGroup} className="d-flex">
      <Button
        variant={isActive ? 'secondary' : ''}
        className="w-100 rounded-0 text-start text-truncate border-0"
        onClick={() => handleSetChannel(channel.id)}
      >
        <span className="me-1">#</span>
        {filterProfanity(channel.name)}
      </Button>
      <Dropdown.Toggle
        split
        variant={isActive ? 'secondary' : ''}
        className="flex-grow-0 border-0"
      >
        <span className="visually-hidden">{t('modalManageChannel')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={showModal({ modalType: 'removing', channelId: channel.id })}>
          {t('modalRemove')}
        </Dropdown.Item>
        <Dropdown.Item onClick={showModal({ modalType: 'renaming', channelId: channel.id })}>
          {t('modalRename')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <li className="nav-item w-100">
      {channel.removable ? removable : notRemovable}
    </li>
  );
};

export default Channel;
