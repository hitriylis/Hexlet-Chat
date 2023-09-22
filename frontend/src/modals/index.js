import Add from './Add';
import Remove from './Remove';

const modals = {
  adding: Add,
  removing: Remove,
};

const getModal = (modalName) => modals[modalName];

const renderModal = (modalType) => {
  if (!modalType) {
    return null;
  }
  const Component = getModal(modalType);
  return <Component />;
};

export default renderModal;
