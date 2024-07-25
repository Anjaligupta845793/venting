
import {ethers} from 'ethers';
import { useState,useEffect } from 'react';
import {ContractAddress,ContractABI } from './constants/constant.js';

import { Hero } from './components/Hero.jsx';
import { Withdraw } from './components/Withdraw.jsx';
import { Strartvesting } from './components/Strartvesting.jsx';



function App() {
   const [account, setaccount] = useState(null);
    const [IsConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [address, setaddress] = useState(null);
    const [roal, setroal] = useState("");
    const [amount, setamount] = useState(0);
    const [vesting, setvesting] = useState(false)

   useEffect(() => {
    
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return() => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    }
  })
   function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setaccount(accounts[0]);
      
    } else {
      setIsConnected(false);
      setaccount(null);
      
    }
  }

   async function ConnectWallet() {
    if (window.ethereum){
       try{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address =  await signer.getAddress();
        setaccount(address)
        setIsConnected(true);
       } catch(err){
        console.error(err)
       }
    }else{
      console.error("please install metamask")
    }

  }
  async function startveting(){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      
      const contractInstance = new ethers.Contract (
        ContractAddress, ContractABI, signer
      );
      

      const tx = await contractInstance.startVesting();
      await tx.wait();
      setvesting(true);
      
  }
  async function addBeneficiaries(){
 const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      
      const contractInstance = new ethers.Contract (
        ContractAddress, ContractABI, signer
      );
      const amountInWei = ethers.utils.parseUnits(amount, 18); // 
      const tx = await contractInstance.addBeneficiary(address,roal,amountInWei);
      tx.wait();
      console.log("benficiary addedd")
  }
  async function withdraw(){
     if(window.ethereum){
      try {
         const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      
      const contractInstance = new ethers.Contract (
        ContractAddress, ContractABI, signer
      );
      console.log(contractInstance)
      const tx = await contractInstance. withdrawTokens();
      tx.wait();
      } catch (error) {
        window.alert("cliff period is not over yet")
      }
     }
  }
 

  return (
    <>
    <Hero account={account} connect={ConnectWallet} IsConnected={IsConnected}/>
   
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add addBeneficiary</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
             Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name={address}
              type="text"
              onChange={(e) => setaddress(e.target.value)}
              placeholder="Address"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Roal
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name={roal}
              type="Roal"
              placeholder="Roal"
               onChange={(e) => setroal(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Amount">
              Amount
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              name={amount}
              type="Amount"
              placeholder="Amount"
              onChange={(e) => setamount(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={addBeneficiaries}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
    <Strartvesting status = {vesting} start = {startveting}/>
   <Withdraw withdraw={withdraw}/>
   
   
    </>
  )
}

export default App
