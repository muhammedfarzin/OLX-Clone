import { createContext, useState } from "react";


export const CategoryContext=createContext(null)
export const FilterSearchContext=createContext(null)

function Category({children}){
    const [categories,setCategories]=useState()
    const [filterSearch,setFilterSearch]=useState()
    const [searchResult,setSearchResult]=useState([])
    const [filter,setFilter]=useState(Boolean)

    return(
        <CategoryContext.Provider value={{categories,setCategories}}>
            <FilterSearchContext.Provider value={{filterSearch,setFilterSearch,filter,setFilter,searchResult,setSearchResult}}>
                {children}
            </FilterSearchContext.Provider>
        </CategoryContext.Provider>
    )
}

export default Category