
import React from "react";
import { useEffect } from "react";
import { useState } from "react";


export const Products = () => {

    const [products, setproducts] = useState([])
    const [filter, setFilter] = useState([]);
    let componentMounted = true;

    const getData = async () => {
        const response = await fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/instaf913f18.json");
        if (componentMounted) {
            setproducts(await response.clone().json())
            setFilter(await response.json())
            console.log(filter)
        }
        return () => {
            componentMounted = false
        }

    }

    useEffect(() => {
        getData()
    },[])
    const Showproducts = () => {
        return (
            <>
                {
                    filter.map((items) => {
                        return (
                            <>
                                <div>
                                    <div className="card" style={{ width: "18rem" }}>
                                        <img src={items.Image} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <p className="card-text">Likes {items.likes}</p>
                                            <p className="card-text">Post Date and Time {items.timestamp}</p>
                                        </div>
                                    </div>
                                </div>

                            </>
                        )
                    })
                }

            </>
        )
    }
    const sortData1=()=>{
            const data1 = products.sort((a,b)=>a.likes-b.likes)
            setFilter(data1)

    }
    

    const SortFunction = ()=>{
        return(
            <>
                <div className="buttons">
                    <button className="btn btn-outline-dark me-2" onClick={()=>{sortData1()}}>Sort By Likes</button>
                    
                </div>
            </>
        )
    }
    return (
        <>
            <h2>All Images</h2>
            <div className="continer-fluid mt-5" style={{widh:"30%", margin:"auto"}}>
                <div className="row text-centre">
                    <SortFunction/>
                    <Showproducts/>

                </div>
            </div>


        </>
    )
}