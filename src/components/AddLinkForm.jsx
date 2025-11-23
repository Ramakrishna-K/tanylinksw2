


import React, { useState } from "react";
import axios from "axios";

export default function AddLinkForm({ onAdd }) {
  const [longUrl, setLongUrl] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!longUrl) return setError("URL is required");

    try {
      const res = await axios.post("https://tinylink-h97x.onrender.com/links", { longUrl, shortcode: shortcode || undefined });
      onAdd(res.data);
      setLongUrl(""); setShortcode("");
    } catch (err) {
      setError(err.response?.data?.error || "Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input type="url" placeholder="Enter long URL" value={longUrl} onChange={e=>setLongUrl(e.target.value)} required className="border px-2 py-1 rounded w-full"/>
      <input type="text" placeholder="Custom shortcode (optional)" value={shortcode} onChange={e=>setShortcode(e.target.value)} className="border px-2 py-1 rounded w-52"/>
      <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">Add</button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}

