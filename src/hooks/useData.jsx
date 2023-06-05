import { useState, useEffect } from "react";

export const useData = (url) => {
  const [state, setState] = useState();

  console.log("fetch de : " + url)

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (await fetch(url)).json();

      setState(data);
    };

    dataFetch();
  }, [url]);

  return { data: state };
};
