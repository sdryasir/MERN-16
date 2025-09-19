import React, {useEffect, useState} from 'react'
import socket from '../utils/socket';
import moment from 'moment';
function Navbar() {


  const [notifications, setNotifications] = useState([]);

  useEffect(()=>{
    const handleNewOrder = (data) => {
        setNotifications((prev) => [...prev, data]);
    };

    socket.on("new-order", handleNewOrder);

    return () => {
        socket.off("new-order", handleNewOrder); // cleanup
    };
  },[])



  return (
    <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
                <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
                    <h2 className="text-primary mb-0"><i className="fa fa-user-edit"></i></h2>
                </a>
                <a href="#" className="sidebar-toggler flex-shrink-0">
                    <i className="fa fa-bars"></i>
                </a>
                <form className="d-none d-md-flex ms-4">
                    <input className="form-control bg-dark border-0" type="search" placeholder="Search"/>
                </form>
                <div className="navbar-nav align-items-center ms-auto">
                    <div className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                            <i className="fa fa-envelope me-lg-2"></i>
                            <span className="d-none d-lg-inline-flex">Message</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
                            <a href="#" className="dropdown-item">
                                <div className="d-flex align-items-center">
                                    <img className="rounded-circle" src="assets/img/user.jpg" alt="" style={{width: '40px', height: '40px'}}/>
                                    <div className="ms-2">
                                        <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                                        <small>15 minutes ago</small>
                                    </div>
                                </div>
                            </a>
                            <hr className="dropdown-divider"/>
                            <a href="#" className="dropdown-item">
                                <div className="d-flex align-items-center">
                                    <img className="rounded-circle" src="assets/img/user.jpg" alt="" style={{width: '40px', height: '40px'}}/>
                                    <div className="ms-2">
                                        <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                                        <small>15 minutes ago</small>
                                    </div>
                                </div>
                            </a>
                            <hr className="dropdown-divider"/>
                            <a href="#" className="dropdown-item">
                                <div className="d-flex align-items-center">
                                    <img className="rounded-circle" src="assets/img/user.jpg" alt="" style={{width: '40px', height: '40px'}}/>
                                    <div className="ms-2">
                                        <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                                        <small>15 minutes ago</small>
                                    </div>
                                </div>
                            </a>
                            <hr className="dropdown-divider"/>
                            <a href="#" className="dropdown-item text-center">See all message</a>
                        </div>
                    </div>
                    <div className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                            <span className='position-relative'>
                                <i className="fa fa-bell me-lg-2"></i>
                                {
                                    notifications.length ==0 ? null :<span className='position-absolute' style={{top:'-15px', right:'9px', color:'red'}}>{notifications.length}</span>
                                }
                            </span>
                            <span className="d-none d-lg-inline-flex">Notificatin</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
                            
                            {
                                notifications?.length ==0? <p>No notitfication</p>:
                                notifications && notifications?.map((notification)=>{
                                    return (
                                        <>
                                            <a href="#" className="dropdown-item">
                                                <h6 className="fw-normal mb-0">{notification?.customer?.name} Created Order</h6>
                                                <small>{moment.utc(notification?.createdAt).fromNow()}</small>
                                            </a>
                                            <hr className="dropdown-divider"/>
                                        </>
                                    )
                                })
                            }
                            
                            
                            
                           
                            {/* <a href="#" className="dropdown-item text-center">See all notifications</a> */}
                        </div>
                    </div>
                    <div className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                            <img className="rounded-circle me-lg-2" src="assets/img/user.jpg" alt="" style={{width: '40px', height: '40px'}}/>
                            <span className="d-none d-lg-inline-flex">John Doe</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
                            <a href="#" className="dropdown-item">My Profile</a>
                            <a href="#" className="dropdown-item">Settings</a>
                            <a href="#" className="dropdown-item">Log Out</a>
                        </div>
                    </div>
                </div>
            </nav>
  )
}

export default Navbar