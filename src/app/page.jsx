"use client";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Home() {
  const [data, getData] = useState([]);
  const [privatekey, getPrivatekey] = useState([]);
  const FetchData = async (link) => {
    try {
      const res = await axios.get(link);
      getData(res.data);
    } catch (error) {}
  };

  const PostData = async (link) => {
    try {
      const res = await axios.post(link);
      getData(res.data);
    } catch (error) {}
  };
  const SendMoney = async (link) => {
    try {
      const res = await axios.post(link, {
        from: "686cd78ceabb453001dc499b2e2bfd5a6ff48da6d776480a543a7bf0432611bc",
        to: "1cf62965e5613cd404f589bbe2e214de8b504177c655e9533c41d24e86fae1d3",
        amount: 100,
        privateKey:
          "-----BEGIN PRIVATE KEY-----\nMIGEAgEAMBAGByqGSM49AgEGBSuBBAAKBG0wawIBAQQg7+jWjQIBB54JDNETUHYH\nElo7iRxzc2D2e9Ljt3LLXLqhRANCAAQFmnWS2DhwraMEoTK9JZQTadMfGIyyqEXo\nKkeru7qI4/nN+eCpzQu0PdHEPummKS6ryOgpfhaODGM/JhqmoPJ4\n-----END PRIVATE KEY-----\n",
      });
      getData(res.data);
    } catch (error) {}
  };
  console.log(privatekey);

  return (
    <div className="p-4">
      <h1 className="text-center font-bold text-4xl">Danh sách Endpoints</h1>
      <div className="p-5 border rounded-4xl bg-white mt-5">
        <div>
          <div className="flex gap-2 items-center  ">
            <span className="px-2 py-1 bg-green-200 rounded-[8px]">GET</span>
            <p className="font-bold">Lấy tất cả các địa chỉ trong ví </p>
          </div>
          <p>Trả về mọi thứ có trong dữ liệu</p>
        </div>
        <div>
          <div>
            <p className="font-bold">Endpoint URL:</p>
            <div className="px-2 py-3 border w-full bg-[#dddddd] rounded-2xl">
              <span>/api/address</span>
            </div>
          </div>
          <div>
            <p className="font-bold">Ví dụ:</p>
            <div className="px-2 py-3 border w-full bg-[#dddddd] rounded-2xl overflow-auto">
              <span>https://miniblockchain.vercel.app/api/address</span>
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-3 items-center mt-2 mb-2">
            <span className="font-bold">Response:</span>
            <button
              onClick={() => {
                FetchData("https://miniblockchain.vercel.app/api/address");
              }}
              className="px-4 py-[2px] bg-green-200 rounded-[8px] cursor-pointer"
            >
              Thử
            </button>
          </div>
          <div className="px-2 py-3 border w-full  bg-[#dddddd] rounded-2xl max-h-[400px] overflow-y-auto">
            {data && (
              <pre className="whitespace-pre-wrap break-words text-sm ">
                {JSON.stringify(data, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </div>
      <div className="p-5 border rounded-4xl bg-white mt-[25px]">
        <div>
          <div className="flex gap-2 items-center  ">
            <span className="px-2 py-1 bg-green-200 rounded-[8px]">GET</span>
            <p className="font-bold">Lấy thông tin user</p>
          </div>
          <p>Trả về thông tin của user</p>
        </div>
        <div>
          <div>
            <p className="font-bold">Endpoint URL:</p>
            <div className="px-2 py-3 border w-full bg-[#dddddd] rounded-2xl">
              <span>/api/wallet/address</span>
            </div>
          </div>
          <div>
            <p className="font-bold">Ví dụ:</p>
            <div className="px-2 py-3 border w-full bg-[#dddddd] rounded-2xl overflow-auto">
              <span>
                https://miniblockchain.vercel.app/api/wallet/686cd78ceabb453001dc499b2e2bfd5a6ff48da6d776480a543a7bf0432611bc
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-3 items-center mt-2 mb-2">
            <span className="font-bold">Response:</span>
            <button
              onClick={() => {
                FetchData(
                  "https://miniblockchain.vercel.app/api/wallet/686cd78ceabb453001dc499b2e2bfd5a6ff48da6d776480a543a7bf0432611bc"
                );
              }}
              className="px-4 py-[2px] bg-green-200 rounded-[8px] cursor-pointer"
            >
              Thử
            </button>
          </div>
          <div className="px-2 py-3 border w-full  bg-[#dddddd] rounded-2xl max-h-[400px] overflow-y-auto">
            <pre className="whitespace-pre-wrap break-words text-sm">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      </div>

      <div className="p-5 border rounded-4xl bg-white mt-[25px]">
        <div>
          <div className="flex gap-2 items-center  ">
            <span className="px-2 py-1 bg-green-200 rounded-[8px]">GET</span>
            <p className="font-bold">Truy vết lịch sử giao dịch</p>
          </div>
          <p>Trả về lịch sử giao dịch của 1 user</p>
        </div>
        <div>
          <div>
            <p className="font-bold">Endpoint URL:</p>
            <div className="px-2 py-3 border w-full bg-[#dddddd] rounded-2xl">
              <span>/api/wallet/address</span>
            </div>
          </div>
          <div>
            <p className="font-bold">Ví dụ:</p>
            <div className="px-2 py-3 border w-full bg-[#dddddd] rounded-2xl overflow-auto">
              <span>
                https://miniblockchain.vercel.app/api/transaction/686cd78ceabb453001dc499b2e2bfd5a6ff48da6d776480a543a7bf0432611bc
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-3 items-center mt-2 mb-2">
            <span className="font-bold">Response:</span>
            <button
              onClick={() => {
                FetchData(
                  " https://miniblockchain.vercel.app/api/transaction/686cd78ceabb453001dc499b2e2bfd5a6ff48da6d776480a543a7bf0432611bc"
                );
              }}
              className="px-4 py-[2px] bg-green-200 rounded-[8px] cursor-pointer"
            >
              Thử
            </button>
          </div>
          <div className="px-2 py-3 border w-full  bg-[#dddddd] rounded-2xl max-h-[400px] overflow-y-auto">
            <pre className="whitespace-pre-wrap break-words text-sm">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      </div>

      <div className="p-5 border rounded-4xl bg-white mt-[25px]">
        <div>
          <div className="flex gap-2 items-center  ">
            <span className="px-2 py-1 bg-orange-200 rounded-[8px]">POST</span>
            <p className="font-bold">Tạo user</p>
          </div>
          <p>Tạo một user mới có uid,address,public key , private key</p>
        </div>
        <div>
          <div>
            <p className="font-bold">Endpoint URL:</p>
            <div className="px-2 py-3 border w-full bg-[#dddddd] rounded-2xl">
              <span>/api/wallet/address</span>
            </div>
          </div>
          <div>
            <p className="font-bold">Ví dụ:</p>
            <div className="px-2 py-3 border w-full bg-[#dddddd] rounded-2xl overflow-auto">
              <span>https://miniblockchain.vercel.app/api/wallet/create</span>
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-3 items-center mt-2 mb-2">
            <span className="font-bold">
              Response: Bấm nút bên cạnh để thử tạo user mới , đừng spam vì DB
              có giới hạn.
            </span>
            <button
              onClick={() => {
                PostData(
                  " https://miniblockchain.vercel.app/api/wallet/create"
                );
              }}
              className="px-4 py-[2px] bg-green-200 rounded-[8px] cursor-pointer"
            >
              Thử
            </button>
          </div>
          <div className="px-2 py-3 border w-full  bg-[#dddddd] rounded-2xl max-h-[400px] overflow-y-auto">
            <pre className="whitespace-pre-wrap break-words text-sm">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      </div>

      <div className="p-5 border rounded-4xl bg-white mt-[25px]">
        <div>
          <div className="flex gap-2 items-center  ">
            <span className="px-2 py-1 bg-orange-200 rounded-[8px]">POST</span>
            <p className="font-bold">Gửi tiền </p>
          </div>
          <p>Gửi tiền qua user khác , chưa có sàn vì đ biết code kiểu l gì.</p>
        </div>
        <div>
          <div>
            <p className="font-bold">Endpoint URL:</p>
            <div className="px-2 py-3 border w-full bg-[#dddddd] rounded-2xl">
              <span>/api/transaction/send</span>
            </div>
          </div>
          <div>
            <p className="font-bold">Ví dụ:</p>
            <div className="px-2 py-3 border w-full bg-[#dddddd] rounded-2xl overflow-auto">
              <span>
                https://miniblockchain.vercel.app/api/transaction/send
              </span>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="w-full  h-[50px] rounded-4xl flex flex-col p-2 border">
            <input
              className="w-full h-full outline-none"
              type="text"
              placeholder="Address from"
            />
          </div>
          <div className="mt-2 w-full  h-[50px] rounded-4xl flex flex-col p-2 border">
            <input
              className="w-full h-full outline-none"
              type="text"
              placeholder="Address to"
            />
          </div>
          <div className="mt-2 w-full  h-[50px] rounded-4xl flex flex-col p-2 border">
            <input
              className="w-full h-full outline-none"
              type="text"
              placeholder="Amount"
            />
          </div>
          <div className="mt-2 w-full  h-[50px] rounded-4xl flex flex-col p-2 border">
            <input
              className="w-full h-full outline-none"
              type="text"
              placeholder="PrivateKey"
            />
          </div>
        </div>
        <div className="mt-2">
          <span className="font-bold">
            Lướt lên lấy address dán vào dưới này và bấm vào nút để lấy được
            private key để test
          </span>
          <div className="flex items-center gap-[20px]">
            <div className="mt-2 w-[500px]  h-[50px] rounded-4xl flex flex-col p-2 border">
              <input
                className="w-full h-full outline-none"
                type="text"
                placeholder="Address cần lấy private key"
                onChange={(e) => {
                  getPrivatekey(e.target.value);
                }}
              />
            </div>
            <div className="mt-2 w-[500px]  h-[50px] rounded-4xl flex flex-col p-2 border">
              <input
                className="w-full h-full outline-none"
                type="text"
                placeholder="Copy private key tại đây"
              />
            </div>
            <button
              onClick={() => {
                FetchData(
                  " https://miniblockchain.vercel.app/api/transaction/686cd78ceabb453001dc499b2e2bfd5a6ff48da6d776480a543a7bf0432611bc"
                );
              }}
              className="w-[250px] h-[50px] bg-green-200 rounded-[8px] cursor-pointer"
            >
              Bấm vào đây để get private key
            </button>
          </div>
        </div>
        <div>
          <div className="flex gap-3 items-center mt-2 mb-2">
            <span className="font-bold">Response:</span>
            <button
              onClick={() => {
                FetchData(
                  " https://miniblockchain.vercel.app/api/transaction/686cd78ceabb453001dc499b2e2bfd5a6ff48da6d776480a543a7bf0432611bc"
                );
              }}
              className="px-4 py-[2px] bg-green-200 rounded-[8px] cursor-pointer"
            >
              Thử
            </button>
          </div>
          <div className="px-2 py-3 border w-full  bg-[#dddddd] rounded-2xl max-h-[400px] overflow-y-auto">
            <pre className="whitespace-pre-wrap break-words text-sm">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
