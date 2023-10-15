import { modalSlice } from '../slices/modalSlice';

const { actions } = modalSlice;

const selectors = {
  selectModalType: (state) => state.modals.modalType,

  selectOpened: (state) => state.modals.isOpened,

  selectTargetId: (state) => state.modals.TargetId,
};

export { actions, selectors };
