import { useEffect, useState } from "react";

function useFetch(url) {
  const [activity, setActivity] = useState([]); //for all todo list.
  const [error, setError] = useState(null);
  const [pending, setIsPending] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((resp) => {
        if (!resp.ok) {
          throw Error("Couldn't fetch data for that resource...");
        } else {
          return resp.json();
        }
      })
      .then((result) => {
        setActivity(result);
        setIsPending(false);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  }, [url]);

  return { activity, pending, error };
}

export default useFetch;
