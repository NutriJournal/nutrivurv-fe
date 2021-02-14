import { useEffect, useState } from 'react';
import fetch from 'isomorphic-unfetch';

const DailyVibe = () => {
  const [quotes, setQuotes] = useState([]);
  const [current, setCurrent] = useState({});

  useEffect(() => {
    const abortController = new AbortController();

    try {
      fetch('https://type.fit/api/quotes', { signal: abortController.signal })
        .then((r) => r.json())
        .then((data) => {
          setQuotes(data);
          setCurrent(data[randomizer()]);
        });
    } catch (error) {
      !abortController.signal.aborted &&
        console.error(`There was a problem with yout request: ${error}`);
    }

    return () => abortController.abort();
  }, []);

  const randomizer = () => {
    return Math.floor(Math.random() * 1000 + 1);
  };

  return (
    <div className="border-b border-gray-200 w-auto">
      <h2 className="muli text-gray-900 text-xl font-medium">Daily Vibe</h2>
      <p className="muli text-gray-600">{`${current.text} ${
        current.author === null ? '' : ` -- ${current.author}`
      }`}</p>
    </div>
  );
};

export default DailyVibe;
