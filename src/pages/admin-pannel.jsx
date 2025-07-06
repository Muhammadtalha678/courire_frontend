import React, { useState } from 'react'
import Header from '../components/Header'
import CreateUser from '../components/CreateUser'
import AddCity from '../components/AddCity'
import AddBranch from '../components/AddBranch'
import AdminPanelButton from '../components/AdminPannelButton'
const AdminPannel = () => {
  const [isBranchAdd,setIsBranchAdd] = useState(false)
  const [isCityAdd,setIsCityAdd] = useState(false)
  const [isUserAdd,setIsUserAdd] = useState(false)
    return (
    <div className='flex flex-col h-screen'>
          
    <Header/>
    <div className="flex justify-center items-center  bg-gray-300 h-full">
          <div className=" p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {isBranchAdd ? "Add Branch" : isCityAdd ? "Add City" : "Admin Pannel"}
      </h2>
    
      {
        isBranchAdd ? (
          <>
            <AddBranch/>
            {/* <p className='text-red-600 text-sm'>{emailErr}</p> */}
          </>
        )  : isCityAdd ? (
          <>
            <AddCity/>
            {/* <p className='text-red-600 text-sm'>{emailErr}</p> */}
          </>
                            ) : isUserAdd ? (
        <CreateUser/>
        ) : (null)
        
      }
      {
        isBranchAdd ?
        (<>
         <AdminPanelButton 
         disabled={isCityAdd} 
         onClick={() => {
        setIsUserAdd(false)
        setIsBranchAdd(false)
        setIsCityAdd(true) }}
        label={"Add City"}
        />
         <AdminPanelButton 
         disabled={isUserAdd} 
         onClick={() => {
             setIsBranchAdd(false)
             setIsCityAdd(false)
             setIsUserAdd(true)
         }}
         label={"Add User"}
        />
        </>) : isCityAdd ? (
            <>
         <AdminPanelButton 
         disabled={isBranchAdd} 
         onClick={() => {
            setIsCityAdd(false); setIsUserAdd(false); setIsBranchAdd(true)
         }}
         label={"Add Branch"}
        />
         <AdminPanelButton 
         disabled={isUserAdd} 
         onClick={() => {
            setIsBranchAdd(false); setIsCityAdd(false); setIsUserAdd(true)
         }}
         label={"Add User"}
        />
      
            </>
        ): isUserAdd ? (
            <>
                 <AdminPanelButton 
         disabled={isBranchAdd} 
         onClick={() => {
            setIsCityAdd(false); setIsUserAdd(false); setIsBranchAdd(true)
         }}
         label={"Add Branch"}
        />
                 <AdminPanelButton 
         disabled={isCityAdd} 
         onClick={() => {
            setIsCityAdd(true); setIsUserAdd(false); setIsBranchAdd(false)
         }}
         label={"Add City"}
        />
            </>
        ) : (
            <>
            <AdminPanelButton 
              disabled={isBranchAdd} 
              onClick={() => {
                setIsCityAdd(false); setIsUserAdd(false); setIsBranchAdd(true)
              }}
              label={"Add Branch"}
            />
            <AdminPanelButton 
              disabled={isCityAdd} 
              onClick={() => {
                setIsUserAdd(false); setIsBranchAdd(false); setIsCityAdd(true)
              }}
              label={"Add City"}
            />
            <AdminPanelButton 
              disabled={isUserAdd} 
              onClick={() => {
                setIsBranchAdd(false); setIsCityAdd(false); setIsUserAdd(true)
              }}
              label={"Add User"}
            />
          </>
        )
     }
     
      
     
    </div>
  </div>
    </div>
  )
}

export default AdminPannel
