import axios from 'axios'
import React,{useState,useEffect} from 'react'
import Header from '../components/Header'
import { AppRoutes } from '../constants/AppRoutes'

const ContainerList = () => {
  const [containerList, setContainerList] = useState([])
  
    useEffect(() => {
      const getContainerList = async () => {
        try {
          const response = await axios.get(AppRoutes.allContainersList)
        //   console.log(response.data)
          setContainerList(response?.data?.data?.containersList || [])
        } catch (error) {
          console.log(error)
        }
      }
      getContainerList()
    }, [])
    const allKeys = containerList.length > 0 ? Object.keys(containerList[0]).filter((key) => key !== '_id' && key !== '__v' && key !== 'createdAt' && key !== 'updatedAt') : []

    return (
        <div className="relative overflow-x-auto">
            <Header/>
      <table className="w-full text-sm text-left text-black bg-white border border-gray-300">
        <thead className="text-xs uppercase bg-gray-100 text-gray-700">
                    <tr className="border-b">
                    <th className="px-6 py-3">S.No</th>
           {
             allKeys.map((key) => (
                <th key={key} className="px-4 py-3">{key.replace(/([A-Z])/g, ' $1')}</th>
              ))
           }
          </tr>
        </thead>
        <tbody>
          {containerList.length > 0 ? (
                        containerList.map((container, index) => {
                            
                            return <tr key={index} className="border-b">
                    <td className="px-4 py-4 text-center">{index + 1}</td>
                
               {allKeys.map((key) => {
                   let value = container[key]
                   if (key === 'Destination' && typeof value === 'object') {
                    value = `From: ${value.From} → To: ${value.To}`
                   }
                   return <td className="px-4 py-4 text-center" key={key}>{value}</td>
                   
               
               })}
         </tr>
            })
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-red-600 font-medium">
                No Containers Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ContainerList
