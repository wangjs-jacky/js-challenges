import { useState } from 'react';

interface funType {
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
}

type useBooleanType = [boolean, funType];

const useBoolean = (initialValue: boolean = false): useBooleanType => {
  const [flag, setFlag] = useState(initialValue);
  const setTrue = () => setFlag(true);
  const setFalse = () => setFlag(false);
  const toggle = () => setFlag((s) => !s);
  return [flag, { setTrue, setFalse, toggle }];
};

export default useBoolean;
