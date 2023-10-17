/* eslint-disable react-hooks/exhaustive-deps */

// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useMemo } from 'react';
// import { Container, Row } from 'react-bootstrap';
// import { toast } from 'react-toastify';
// import { useTranslation } from 'react-i18next';

// import getModalComponent from '../Modals';
// import ChatBox from './ChatBox';
// import fetchDataThunk from '../../slices/thunks';
// import { useAuth, useSocket } from '../../hooks';
// import { selectors as modalsSelectors } from '../../selectors/modalSelectors';

// const ChatPage = () => {
//   const { t } = useTranslation();
//   const socket = useSocket();
//   const dispatch = useDispatch();
//   const modalType = useSelector(modalsSelectors.selectModalType);
//   const { getAuthHeader } = useAuth();
//   const authHeaders = useMemo(() => ({ headers: getAuthHeader() }), [getAuthHeader]);

//   useEffect(() => {
//     const handleFetchData = async () => {
//       try {
//         dispatch(fetchDataThunk(authHeaders));
//         socket.connectSocket();
//       } catch (error) {
//         if (error.isAxiosError && error.response.status === 409) {
//           toast.error(t('errors.network'));
//         } else {
//           toast.error(t('errors.authorization'));
//           console.error(error.message);
//         }
//       }
//     };

//     handleFetchData();
//   }, [dispatch, socket, authHeaders]);

//   return (
//     <Container className="h-100 my-4 overflow-hidden rounded shadow">
//       <Row className="h-100 bg-white flex-md-row">
//         <ChatBox />
//       </Row>
//       {getModalComponent(modalType)}
//     </Container>
//   );
// };

// export default ChatPage;

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import getModalComponent from '../Modals';
import ChatBox from './ChatBox';
import fetchDataThunk from '../../slices/thunks';
import { useAuth, useSocket } from '../../hooks';
import { selectors as modalsSelectors } from '../../selectors/modalSelectors';

const ChatPage = () => {
  const { t } = useTranslation();
  const socket = useSocket();
  const dispatch = useDispatch();
  const modalType = useSelector(modalsSelectors.selectModalType);
  const { logOut, getAuthHeader } = useAuth();

  useEffect(() => {
    const handleFetchData = async () => {
      try {
        dispatch(fetchDataThunk(getAuthHeader()));
        socket.connectSocket();
      } catch (error) {
        if (error.isAxiosError && error.response.status === 409) {
          toast.error(t('errors.network'));
        } else {
          logOut();
          toast.error(t('errors.authorization'));
        }
      }
    };

    handleFetchData();
  }, []);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <ChatBox />
      </Row>
      {getModalComponent(modalType)}
    </Container>
  );
};

export default ChatPage;
