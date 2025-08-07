import { useState, useEffect } from "react";

export const useFetch = (url)=>{
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
          const getData = async ()=>{
            setLoading(true);
            try {
                const res = await fetch(url, {
                    credentials: "include"
                });
                const data = await res.json();
                setData(data);
            } catch (error) {
                setError(error.message || "Something wentr wrong");
            }finally{
                setLoading(false);  
            }
          }
          getData();
    },[url])

    return {
        data,
        error,
        loading
    }
}












