import React, { createContext, useState } from 'react'

export const addProjectResponseContext = createContext()
export const editProjectResponseContext = createContext()
export const isAuthTokenContext = createContext()

function ContextShare({children}) {
    // Children is a predefined props used to share data between all components
    // Data to share
    const [addProjectResponse, setAddProjecResponse] = useState({})
    const [editProjectResponse, setEditProjecResponse] = useState({})
    const [isAuthToken, setIsAuthToken] = useState(true)

  return (
    <>
      <addProjectResponseContext.Provider value={{addProjectResponse, setAddProjecResponse}}>
        <editProjectResponseContext.Provider value={{editProjectResponse, setEditProjecResponse}}>
          <isAuthTokenContext.Provider value={{isAuthToken, setIsAuthToken}}>
             {children}
          </isAuthTokenContext.Provider>
        </editProjectResponseContext.Provider>
      </addProjectResponseContext.Provider>
      {/* Value    - the data which is to be shared is given in this attribute
          Provider - provides data to all components */}
    </>
  )
} 

export default ContextShare