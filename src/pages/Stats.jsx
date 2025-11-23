

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Stats() {
  const { code } = useParams();
  const [link, setLink] = useState(null);

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const res = await axios.get(`https://tinylink-h97x.onrender.com/api/links/${code}`);
        setLink(res.data);
      } catch (err) {
        setLink(null);
      }
    };
    fetchLink();
  }, [code]);

  if (!link) return <p>Link not found</p>;

  return (
    <div className="p-4 max-w-xl mx-auto bg-white shadow-md rounded-md mt-8">
      <h1 className="text-xl font-bold mb-4">Stats for {link.code}</h1>
      <p><strong>URL:</strong> <a href={link.long_url} target="_blank" rel="noopener noreferrer">{link.long_url}</a></p>

      {/* ✅ Display total clicks and last clicked */}
      <p><strong>Total Clicks:</strong> {link.total_clicks}</p>
      <p><strong>Last Clicked:</strong> {link.last_clicked ? new Date(link.last_clicked).toLocaleString() : "-"}</p>

      <p><strong>Created At:</strong> {new Date(link.created_at).toLocaleString()}</p>
    </div>
  );
}

