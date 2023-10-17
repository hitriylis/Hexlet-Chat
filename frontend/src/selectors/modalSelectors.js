import { modalSlice } from '../slices/modalSlice';

const { actions } = modalSlice;

const selectors = {
  selectModalType: (state) => state.modals.modalType,

  selectOpened: (state) => state.modals.isOpened,

  selectTargetId: (state) => state.modals.targetId,

};

export { actions, selectors };
