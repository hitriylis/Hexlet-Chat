import axios from 'axios';

import routes from '../routes';

export default async (headers) => {
  const { data } = await axios.get(routes.dataPath(), headers);

  return data;
};
