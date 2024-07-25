import React from 'react'

export const Withdraw = ({withdraw}) => {
  return (
     <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-4">Withdraw Your Tokens</h1>
        <p className="text-gray-700 mb-6">
         You can withdraw your assets after your cliff time;
        </p>
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={withdraw}>
         Withdraw
        </button>
      </div>
    </div>
  )
}

