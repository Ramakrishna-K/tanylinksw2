


import React, { useEffect, useState } from "react";
import axios from "axios";

import AddLinkForm from "../components/AddLinkForm";
import LinkRow from "../components/LinkRow";
export default function Dashboard() {
  const [links, setLinks] = useState([]);

  const fetchLinks = async () => {
    try {
      const res = await axios.ge("https://tinylink-h97x.onrender.com/links");
      setLinks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchLinks(); }, []);

  const handleAdd = (newLink) => { if(newLink) setLinks([newLink, ...links]); };
  const handleDelete = (code) => { setLinks(links.filter(l => l.code !== code)); };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <AddLinkForm onAdd={handleAdd} />
      <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
        <thead className="bg-gray-200">
          <tr className="text-center">
            <th className="border px-4 py-2">Short Code</th>
            <th className="border px-4 py-2">Target URL</th>
            <th className="border px-4 py-2">Total Clicks</th>
            <th className="border px-4 py-2">Last Clicked</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.length === 0 ? (
            <tr>
              <td colSpan="5" className="border px-4 py-2 text-center">No links found</td>
            </tr>
          ) : (
            links.map(link => (
              <LinkRow key={link.code} link={link} onDelete={handleDelete} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
