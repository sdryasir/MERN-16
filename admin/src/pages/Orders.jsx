import React from 'react'
import {useFetch} from '../hook/useFetch'
import moment from "moment";

function Orders() {

    const {data, error, loading} = useFetch('http://localhost:7000/orders');

    console.log(data);
    
    
    return (
        <div class="container-fluid pt-4 px-4">
            <div class="row g-4">
                <div class="col-12">
                    <div class="bg-secondary rounded h-100 p-4">    
                        <h6 class="mb-4">Orders</h6>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Customer Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Order Amount</th>
                                        <th scope="col">Payment Status</th>
                                        <th scope="col">Order Status</th>
                                        <th scope="col">Created At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data?.orders && data?.orders?.length>0 && data?.orders?.map((item, idx)=>(
                                            <tr key={idx}>
                                                <th scope="row">{idx+1}</th>
                                                <td>{item?.customer?.name}</td>
                                                <td>{item?.customer?.email}</td>
                                                <td>{item?.amount_total}</td>
                                                <td>{item?.payment_status}</td>
                                                <td>{item?.orderStatus}</td>
                                                <td>{moment(item?.createdAt).format("DD-MM-YY hh:mm A")}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders