// src/components/WebsiteSwitcher/WebsiteSwitcher.js
import React from 'react';
import { useQuery } from '@apollo/client';
import GET_WEBSITES from './getWebsites.graphql';

const WebsiteSwitcher = () => {
  const { loading, error, data } = useQuery(GET_WEBSITES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { websites } = data;

  return (
    <div className="website-switcher">
      <label>Switch Website:</label>
      <select>
        {websites.map((website) => (
          <option key={website.id} value={website.code}>
            {website.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default WebsiteSwitcher;
