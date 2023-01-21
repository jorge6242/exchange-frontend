import { createContext, useContext } from "react";

import useExampleActions from "../../actions/example.action";

const StoreContext = createContext(null);

function StoreProvider({children}) {
  const useExampleStore = useExampleActions();

  const stores = {
    useExampleStore,
  };
  return (
    <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>
  );
}

// This hook will be used to inject the stores on the component we want

export function useStore(storeName) {
  const stores = useContext(StoreContext);
  return stores[storeName];
}

export default StoreProvider;
