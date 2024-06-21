import React, { useMemo } from 'react';
import { ReactTicker } from "@guna81/react-ticker";
import { useQuery } from '@apollo/client';
import { GET_TICKER_MEWS_DATA } from './tickerNews.qql';
import classes from './tickerNews.module.css';

const renderItem = (item) => {
  return (
    <p
      className={classes.marqeeSpan}
    >
      {item.value}
    </p>
  );
};

const TickerNews = () => {

  const { loading, error, data } = useQuery(GET_TICKER_MEWS_DATA, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first"
  });

  const getTickerNews = useMemo(() => {
    if (data && data.getTickerNews) {
        return data.getTickerNews;
      }
      return null;
  }, [data]);

  return (
    getTickerNews && getTickerNews.length > 0 ? (
      <div className={classes.tickerNewsRoot}>
        <div className={classes.newsticker}>
          <ReactTicker
            data={getTickerNews}
            component={renderItem}
            speed={55}
            keyName="_id"
            tickerStyle={{
              width: '100%',
              height: '26px',
              backgroundColor: '#FFC629',
              zIndex: 99,
            }}
            tickerClassName="news-ticker"
          />
        </div>
      </div>
    ) : null
  );
};

export default TickerNews;
