import { createContext, FC, useState } from 'react';

const emptyFunc = () => {};

type UserContextState = {
  isWalletConnectOpened: boolean;
  isTransactionModalOpened: boolean;
  currencyAmount: string;
  supplyBalance: string;
  setIsWalletConnectOpened: (value: boolean) => void;
  setIsTransactionModalOpened: (value: boolean) => void;
  setCurrencyAmount: (value: string) => void;
  setSupplyBalance: (value: string) => void;
  updateSupplyBalance: (value: string | null | undefined) => void;
};

export const UserContext = createContext<UserContextState>({
  isWalletConnectOpened: false,
  setIsWalletConnectOpened: emptyFunc,
  isTransactionModalOpened: false,
  setIsTransactionModalOpened: emptyFunc,
  currencyAmount: '',
  setCurrencyAmount: emptyFunc,
  supplyBalance: '',
  setSupplyBalance: emptyFunc,
  updateSupplyBalance: emptyFunc,
});

export const UserContextProvider: FC = ({ children }) => {
  const [isWalletConnectOpened, setIsWalletConnectOpened] = useState(false);
  const [isTransactionModalOpened, setIsTransactionModalOpened] =
    useState(false);
  const [currencyAmount, setCurrencyAmount] = useState<string>('');
  const [supplyBalance, setSupplyBalance] = useState<string>('');

  const updateSupplyBalance = async (account: string | null | undefined) => {
    const res = await fetch(`/api/dai-supply/${account}`);
    if (res.ok) {
      const data = await res.json();
      setSupplyBalance(data.cTokenBalance);
    }
  };

  return (
    <UserContext.Provider
      value={{
        isWalletConnectOpened,
        isTransactionModalOpened,
        currencyAmount,
        supplyBalance,
        setIsWalletConnectOpened,
        setIsTransactionModalOpened,
        setCurrencyAmount,
        setSupplyBalance,
        updateSupplyBalance,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
