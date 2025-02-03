import React, { useContext, useEffect, useState } from 'react';

 
// Context (werehouse)
// Provider (Delivery )
// Consumer (usecontext(you))

 export const API_URL =`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const AppContext = React.createContext();


// we need to craete a provider fun 

const AppProvider = ({children}) =>{

   const [isLoading , setIsLoading] = useState(true);
   const [movie , setMovie] = useState ([]);
   const [isError , setIsError] = useState({show:"false", msg:" "});
   const [query, setQuery] = useState("Friends");


    const getMovies =  async(url) =>{
      setIsLoading(true);
       try{ 
         const res = await fetch (url);
         const data =  await res.json();
         console.log(data);

         if(data.Response === "True") {
            setIsLoading(false);
            setIsError({
               show: false,
               msg: " ",
             });
            setMovie(data.Search);
         }else{
              setIsError({
                show: true,
                msg: data.Error,
              })
         }
         

       }catch(error){
        console.log(error);
      
       } 
    }

    useEffect(()=>{
       let timerOut = setTimeout (()=>{
         getMovies(`${API_URL} &s=${query}`);
      }, 500)

      // useeffect always return only one function that is cleanup function 
      return ()=> clearTimeout(timerOut);

    },[query]);


  return <AppContext.Provider value={{isError,isLoading,movie , query, setQuery}}>
    {children}
  </AppContext.Provider>
};




// global custom hook
const useGlobalContext = ()=>{
   return useContext(AppContext)
}

export { AppContext, AppProvider,useGlobalContext}