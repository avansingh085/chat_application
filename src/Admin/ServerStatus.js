import React, { useState } from "react";
import ServerGraph from "./ServerGraph";

const ServerDashboard = () => {
  const [servers, setServers] = useState([
    {
      id: 1,
      name: "Server-1",
      url: "http://server1.com",
      description: "Main application server",
      cpu: "4 vCPUs",
      ram: "16 GB",
      load: 60,
      concurrency: 120,
      status: "Online",
      probability: 0.5,
    },
    {
      id: 2,
      name: "Server-2",
      url: "http://server2.com",
      description: "Backup server",
      cpu: "2 vCPUs",
      ram: "8 GB",
      load: 30,
      concurrency: 80,
      status: "Online",
      probability: 0.3,
    },
  ]);

  const [newServer, setNewServer] = useState({
    name: "",
    url: "",
    description: "",
    cpu: "",
    ram: "",
    load: 0,
    concurrency: 0,
    status: "Online",
    probability: 0.5,
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedServer, setSelectedServer] = useState(servers[0]);
  const [showGraph, setShowGraph] = useState(true);

  const addServer = () => {
    const newId = servers.length + 1;
    setServers([...servers, { id: newId, ...newServer }]);
    setShowAddModal(false);
  };

  const handleServerClick = (server) => {
    setSelectedServer(server);
    setShowGraph(true);
  };

  const handleDeleteServer = (id) => {
    setServers(servers.filter((server) => server.id !== id));
  };

  const handleToggleServerStatus = (id) => {
    setServers(
      servers.map((server) =>
        server.id === id
          ? { ...server, status: server.status === "Online" ? "Closed" : "Online" }
          : server
      )
    );
  };

  const handleProbabilityChange = (id, probability) => {
    setServers(
      servers.map((server) =>
        server.id === id ? { ...server, probability: parseFloat(probability) } : server
      )
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Server Management Dashboard</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setShowAddModal(true)}
        >
          Add Server
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Server List */}
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-lg font-bold mb-4">Server List</h2>
          {servers.map((server) => (
            <div
              key={server.id}
              className={`p-3 mb-2 border rounded cursor-pointer ${
                selectedServer.id === server.id ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
              onClick={() => handleServerClick(server)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{server.name}</h3>
                  <p className="text-sm text-gray-600">URL: {server.url}</p>
                  <p className="text-sm text-gray-600">Load: {server.load}%</p>
                </div>
                <span
                  className={`px-2 py-1 text-sm rounded ${
                    server.status === "Online" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
                  }`}
                >
                  {server.status}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <p>Description: {server.description}</p>
                <p>CPU: {server.cpu}</p>
                <p>RAM: {server.ram}</p>
              </div>

              {/* Additional controls */}
              <div className="mt-4">
                <button
                  onClick={() => handleToggleServerStatus(server.id)}
                  className="bg-yellow-500 text-white px-4 py-1 rounded mr-2"
                >
                  {server.status === "Online" ? "Close Server" : "Open Server"}
                </button>
                <button
                  onClick={() => handleDeleteServer(server.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Delete Server
                </button>
              </div>

              {/* Probability Control */}
              <div className="mt-4">
                <label className="block text-sm font-medium">Probability of Selection</label>
                <input
                  type="number"
                  value={server.probability}
                  onChange={(e) => handleProbabilityChange(server.id, e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  min="0"
                  max="1"
                  step="0.01"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Graph */}
        {showGraph && selectedServer && <ServerGraph serverName={selectedServer.name} />}
      </div>

      {/* Add Server Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Server</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addServer();
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Server Name</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={newServer.name}
                  onChange={(e) => setNewServer({ ...newServer, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">URL</label>
                <input
                  type="url"
                  className="w-full border rounded px-3 py-2"
                  value={newServer.url}
                  onChange={(e) => setNewServer({ ...newServer, url: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  value={newServer.description}
                  onChange={(e) => setNewServer({ ...newServer, description: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">CPU Size</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={newServer.cpu}
                  onChange={(e) => setNewServer({ ...newServer, cpu: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">RAM Size</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={newServer.ram}
                  onChange={(e) => setNewServer({ ...newServer, ram: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-gray-500 hover:underline mr-4"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServerDashboard;
