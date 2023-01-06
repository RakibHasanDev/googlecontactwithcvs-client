import axios from 'axios';
import { CSVLink } from 'react-csv';
import React, { useEffect, useRef, useState } from 'react';

const Users = () => {
   
    const [contacts, setContacts] = useState([])
    const csvDownloadRef = useRef(null)
   
    const [allContacts, setAllContacts] = useState([])

    useEffect(() => {
        fetch('https://cvsserver.vercel.app/allUsers')
            .then(res => res.json())
        .then(data=>setAllContacts(data))

    }, [])

    const headers = [{

        label: "Email", key: "email"
    }]
    const contactHandler = () => {

        axios
            .get('https://cvsserver.vercel.app/allUsers')
            
            .then(({ data }) => {
                setContacts(data);
                setTimeout(() => {
                    csvDownloadRef.current.link.click();
                }, 500);
               
                
        })
        
    }
console.log(contacts)
    return (
        <div>
            <div className='mt-10 text-center'>
                
                <CSVLink
                
                    data={contacts}
                    headers={headers}
                    filename="contacts"
                    target="_blank"
                    ref={csvDownloadRef}
                
                />

                <button
                    
                    onClick={contactHandler}
                    className='bg-sky-600 btn px-8 py-3 rounded-md text-white font-semibold text-xl hover:bg-blue-900'>
                    Import Contacts
                </button>
            </div>
            
               
                 <div  className='mt-10'>
                <h3 className='text-3xl my-5 text-center font-semibold'>All Contacts</h3>

                
                  
                        <div className="overflow-x-auto">
                            <table className="table md:w-[50%] mx-auto w-[90%]">

                                <thead>
                                    <tr>
                                        <th>Serial</th>
                                        <th>contact email</th>
                                      
                                    </tr>
                                </thead>
                                <tbody>

                                    {allContacts?.map((contact, index) => <tr className="hover"
                                            key={contact._id}>
                                            <th>{index + 1}</th>
                                            <td>{ contact?.email}</td>
                                            

                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
            </div>

           

            
            
            
        </div>
    );
};

export default Users;