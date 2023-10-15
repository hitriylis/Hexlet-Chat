import { modalSlice } from '../slices/modalSlice';

const { actions } = modalSlice;

const selectors = {
  selectModalType: (state) => state.modals.modalType,

  selectOpened: (state) => state.modals.isOpened,
};

export { actions, selectors };
