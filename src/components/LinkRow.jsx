


import React from "react";
import axios from "axios";

export default function LinkRow({ link, onDelete }) {
  if (!link) return null;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      try {
        await axios.delete(`https://tinylink-h97x.onrender.com/links/${link.code}`);
        onDelete(link.code);
      } catch (err) { alert(err.response?.data?.error || "Failed to delete"); }
    }
  };

  return (
    <tr className="text-center">
      <td className="border px-4 py-2">
        <a href={`https://tinylink-h97x.onrender.com/${link.code}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{link.code}</a>
      </td>
      <td className="border px-4 py-2">
        <a href={link.long_url} target="_blank" rel="noopener noreferrer">{link.long_url}</a>
      </td>
      <td className="border px-4 py-2">{link.total_clicks}</td>
      <td className="border px-4 py-2">{link.last_clicked ? new Date(link.last_clicked).toLocaleString() : "-"}</td>
      <td className="border px-4 py-2">
        <button onClick={handleDelete} className="text-red-500">Delete</button>
      </td>
    </tr>
  );
}
