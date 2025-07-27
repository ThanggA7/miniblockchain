"use client";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("address");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    address: "",
    amount: "",
    recipient: "",
  });

  const endpoints = [
    {
      id: "address",
      method: "GET",
      title: "Get all addresses",
      description: "Retrieve all wallet addresses in the system",
      endpoint: "/api/address",
      example: "https://miniblockchain.vercel.app/api/address",
      requestBody: null,
    },
    {
      id: "wallet",
      method: "GET",
      title: "Get wallet info",
      description: "Retrieve information for a specific wallet address",
      endpoint: "/api/wallet/:address",
      example:
        "https://miniblockchain.vercel.app/api/wallet/686cd78ceabb453001dc499b2e2bfd5a6ff48da6d776480a543a7bf0432611bc",
      requestBody: null,
    },
    {
      id: "transaction",
      method: "GET",
      title: "Get transactions",
      description: "Retrieve transactions for a specific wallet address",
      endpoint: "/api/transaction/:address",
      example:
        "https://miniblockchain.vercel.app/api/transaction/686cd78ceabb453001dc499b2e2bfd5a6ff48da6d776480a543a7bf0432611bc",
      requestBody: null,
    },
    {
      id: "create",
      method: "POST",
      title: "Create wallet",
      description: "Create a new wallet with public/private key pair",
      endpoint: "/api/wallet/create",
      example: "https://miniblockchain.vercel.app/api/wallet/create",
      requestBody: null,
    },
    {
      id: "send",
      method: "POST",
      title: "Send transaction",
      description: "Send coins from one wallet to another",
      endpoint: "/api/transaction/send",
      example: "https://miniblockchain.vercel.app/api/transaction/send",
      requestBody: {
        senderAddress:
          "686cd78ceabb453001dc499b2e2bfd5a6ff48da6d776480a543a7bf0432611bc",
        recipientAddress: "recipient_wallet_address_here",
        amount: 10,
        privateKey:
          "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
      },
    },
  ];

  const sampleResponse = {
    _id: "688480f24c392e2c2faac2f2",
    address: "686cd78ceabb453001dc499b2e2bfd5a6ff48da6d776480a543a7bf0432611bc",
    publicKey:
      "-----BEGIN PUBLIC KEY-----\nMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEBZp1ktg4cK2jBKEyvSWUE2nTHxiMsqhF\n6CpHq7u6iOP5zfngqc0LtD3RxD7ppikuq8joKX4WjgxjPyYapqDyeA==\n-----END PUBLIC KEY-----\n",
    privateKey:
      "-----BEGIN PRIVATE KEY-----\nMIGEAgEAMBAGByqGSM49AgEGBSuBBAAKBG0wawIBAQQg7+jWjQIBB54JDNETUHYH\nElo7iRxzc2D2e9Ljt3LLXLqhRANCAAQFmnWS2DhwraMEoTK9JZQTadMfGIyyqEXo\nKkeru7qI4/nN+eCpzQu0PdHEPummKS6ryOgpfhaODGM/JhqmoPJ4\n-----END PRIVATE KEY-----\n",
    balance: 1900,
    __v: 0,
  };

  const handleTryIt = async () => {
    setLoading(true);
    setResponse("");

    try {
      const endpoint = endpoints.find((e) => e.id === activeTab);
      let url = endpoint.example;

      if (formData.address && url.includes(":address")) {
        url = url.replace(":address", formData.address);
      }

      const options = {
        method: endpoint.method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (endpoint.method === "POST" && activeTab === "send") {
        options.body = JSON.stringify({
          senderAddress: formData.address,
          recipientAddress: formData.recipient,
          amount: Number(formData.amount),
          privateKey: "YOUR_PRIVATE_KEY_HERE",
        });
      }

      const res = await fetch(url, options);
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(JSON.stringify({ error: error.message }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const activeEndpoint = endpoints.find((e) => e.id === activeTab);

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mini Blockchain API
          </h1>
          <p className="text-gray-600">
            Simple and clear documentation for your blockchain API
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <nav className="md:w-64 flex-shrink-0">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              Endpoints
            </h2>
            <ul className="space-y-2">
              {endpoints.map((endpoint) => (
                <li key={endpoint.id}>
                  <button
                    onClick={() => setActiveTab(endpoint.id)}
                    className={`w-full text-left px-4 py-3 rounded-md text-sm font-medium flex items-center ${
                      activeTab === endpoint.id
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span
                      className={`inline-block w-12 text-center py-1 rounded mr-3 text-xs ${
                        endpoint.method === "GET"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-purple-50 text-purple-700 border border-purple-200"
                      }`}
                    >
                      {endpoint.method}
                    </span>
                    {endpoint.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Main content */}
          <main className="flex-1">
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <span
                  className={`px-3 py-1 rounded-md text-sm font-medium mr-3 ${
                    activeEndpoint.method === "GET"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-purple-50 text-purple-700 border border-purple-200"
                  }`}
                >
                  {activeEndpoint.method}
                </span>
                <h2 className="text-xl font-bold text-gray-900">
                  {activeEndpoint.title}
                </h2>
              </div>

              <p className="text-gray-700 mb-6">{activeEndpoint.description}</p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Endpoint
                  </h3>
                  <div className="bg-gray-50 p-3 rounded-md border border-gray-200 overflow-x-auto">
                    <code className="text-gray-900 font-mono text-sm">
                      {activeEndpoint.endpoint}
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Example
                  </h3>
                  <div className="bg-gray-50 p-3 rounded-md border border-gray-200 overflow-x-auto">
                    <code className="text-gray-900 font-mono text-sm">
                      {activeEndpoint.example}
                    </code>
                  </div>
                </div>

                {/* Parameters */}
                {(activeTab === "wallet" || activeTab === "transaction") && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                      Parameters
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Wallet Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter wallet address"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                )}

                {activeTab === "send" && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                      Transaction Details
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200 space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Sender Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Sender wallet address"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Recipient Address
                        </label>
                        <input
                          type="text"
                          name="recipient"
                          value={formData.recipient}
                          onChange={handleInputChange}
                          placeholder="Recipient wallet address"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Amount
                        </label>
                        <input
                          type="number"
                          name="amount"
                          value={formData.amount}
                          onChange={handleInputChange}
                          placeholder="Amount to send"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleTryIt}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Try it out"}
                </button>
              </div>
            </div>

            {/* Response */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Response
              </h3>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                {response ? (
                  <pre className="text-sm text-gray-900 overflow-x-auto">
                    {response}
                  </pre>
                ) : (
                  <div>
                    <pre className="text-sm text-gray-900 overflow-x-auto">
                      {JSON.stringify(sampleResponse, null, 2)}
                    </pre>
                    <p className="text-sm text-gray-500 mt-2">
                      Example response - try the endpoint to see real data
                    </p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
