import { modalSlice } from '../slices/modalSlice';

const { actions } = modalSlice;

const selectors = {
  selectModalType: (state) => state.modals.modalType,
};

export { actions, selectors };
