import { useCallback } from 'react';
import filter from 'leo-profanity';
import { FilterContext } from '.';

const FilterProvider = ({ children }) => {
  filter.add(filter.getDictionary('ru'));
  const filterProfanity = useCallback((word) => filter.clean(word), []);

  return <FilterContext.Provider value={filterProfanity}>{children}</FilterContext.Provider>;
};

export default FilterProvider;
