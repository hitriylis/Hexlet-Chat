import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route index element={<h1>Main Page</h1>} />
      <Route path="login" element={<h1>Login page</h1>} />
      <Route path="*" element={<h1>Not found page </h1>} />
    </Routes>
  </BrowserRouter>
);

export default App;
