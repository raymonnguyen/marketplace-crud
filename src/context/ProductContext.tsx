import { createContext,Dispatch, SetStateAction, useState } from 'react'


interface ProductContextType {
 isRequiredRefetchAPI: boolean | null
setIsRequiredRefetchAPI: Dispatch<SetStateAction<boolean | null>>
}

const ProductContext = createContext<ProductContextType>(
    {} as ProductContextType
  )
  interface ProductContextPropType {
    children: JSX.Element | JSX.Element[]
  }
export const ProductContextProvider = ({children}:ProductContextPropType) => {
    const [isRequiredRefetchAPI,setIsRequiredRefetchAPI] =  useState<boolean | null>(false)
  return (
    <ProductContext.Provider
      value={{
        setIsRequiredRefetchAPI,
        isRequiredRefetchAPI
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export default ProductContext
