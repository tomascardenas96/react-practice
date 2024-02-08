import { useEffect, useRef, useState } from "react";

export function useSearch() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true)

  useEffect(() => {
      if (isFirstInput.current) {
          isFirstInput.current = search === ''
          return
        }

    if (search === "") {
      setError("No se puede realizar una busqueda vacia");
      return;
    }

    setError(null);
  }, [search]);

  return { search, setSearch, error };
}
