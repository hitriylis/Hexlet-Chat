import Add from './Add';

const modals = {
  adding: Add,
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
