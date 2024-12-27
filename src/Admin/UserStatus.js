import React, { useState } from "react";

const UserTable = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", number: "1234567890", blocks: 5 },
    { id: 2, name: "Jane Smith", number: "0987654321", blocks: 3 },
    { id: 3, name: "Alice Brown", number: "1112233445", blocks: 8 },
    { id: 4, name: "Bob White", number: "5566778899", blocks: 2 },
  ]);

  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleDelete = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">User Information</h1>

      <div className="bg-white shadow-md rounded p-4">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th
                className="cursor-pointer px-4 py-2 text-left"
                onClick={() => handleSort("id")}
              >
                ID {sortConfig.key === "id" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="cursor-pointer px-4 py-2 text-left"
                onClick={() => handleSort("name")}
              >
                Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="cursor-pointer px-4 py-2 text-left"
                onClick={() => handleSort("number")}
              >
                Phone Number {sortConfig.key === "number" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="cursor-pointer px-4 py-2 text-left"
                onClick={() => handleSort("blocks")}
              >
                Blocks {sortConfig.key === "blocks" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-2 border-b">{user.id}</td>
                <td className="px-4 py-2 border-b">{user.name}</td>
                <td className="px-4 py-2 border-b">{user.number}</td>
                <td className="px-4 py-2 border-b">{user.blocks}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
