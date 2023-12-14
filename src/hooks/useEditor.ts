import { useState } from "react";

export function useEditor() {
  const [value, setValue] = useState<number>(0);

  return {
    value,
    setValue,
  };
}
