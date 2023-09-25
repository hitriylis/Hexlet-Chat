import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as StoreProvider } from 'react-redux';
import { Provider, ErrorBoundary } from '@rollbar/react';
import App from './components/App';
import resources from './locales';
import AuthProvider from './contexts/AuthProvider';
import store from './slices';
import FilterProvider from './contexts/FilterProvider';
import { listen } from './socketApi';
import { addMessage } from './slices/messagesSlice';
import {
  addChannel,
  removeChannel,
  renameChannel,
  setError,
} from './slices/channelsSlice';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    environment: 'production',
  };

  const { dispatch } = store;
  listen('newMessage', (message) => {
    dispatch(addMessage(message));
  });
  listen('newChannel', (channel) => {
    dispatch(addChannel(channel));
  });
  listen('removeChannel', ({ id }) => {
    dispatch(removeChannel(id));
  });
  listen('renameChannel', (channel) => {
    dispatch(renameChannel(channel));
  });
  listen('connect_error', () => {
    dispatch(setError(true));
  });
  listen('connect', () => {
    dispatch(setError(false));
  });

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <StoreProvider store={store}>
          <AuthProvider>
            <I18nextProvider i18n={i18n}>
              <FilterProvider>
                <App />
              </FilterProvider>
            </I18nextProvider>
          </AuthProvider>
        </StoreProvider>
      </ErrorBoundary>
    </Provider>
  );
};

export default init;
