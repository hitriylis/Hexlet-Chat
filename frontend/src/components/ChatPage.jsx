/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks';
import fetchData from '../slices/fetchData';
import Channels from './Channels';
import Messages from './Messages';

const ChatPage = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const authToken = auth.getAuthToken();
  const authHeader = authToken ? { Authorization: `Bearer ${authToken}` } : {};

  useEffect(() => {
    dispatch(fetchData(authHeader));
  }, []);

  const { error, loading } = useSelector((state) => state.channels);

  if (error) {
    toast.error(t('errorNetwork'));
    auth.logOut();
  }

  if (loading) {
    return (
      <h2>{t('loading')}</h2>
    );
  }

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </div>
    </div>
  );
};

export default ChatPage;
