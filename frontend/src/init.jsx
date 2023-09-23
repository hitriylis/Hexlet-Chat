import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as StoreProvider } from 'react-redux';
import App from './components/App';
import resources from './locales';
import AuthProvider from './contexts/AuthProvider';
import store from './slices';
import SocketProvider from './contexts/SocketProvider';
import FilterProvider from './contexts/FilterProvider';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
    <StoreProvider store={store}>
      <SocketProvider>
        <AuthProvider>
          <I18nextProvider i18n={i18n}>
            <FilterProvider>
              <App />
            </FilterProvider>
          </I18nextProvider>
        </AuthProvider>
      </SocketProvider>
    </StoreProvider>
  );
};

export default init;
