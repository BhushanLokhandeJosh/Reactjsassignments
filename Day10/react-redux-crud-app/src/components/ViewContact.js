import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';


export default function ViewContact() {
    const {id} = useParams();
    // console.log(id);
    
    const {contact} = useSelector(state => state.data);
    // console.log(contact);

    const singleContact = contact.find((item)=>item.id === parseInt(id));
    console.log(singleContact);
 
  return (
   <div style={{margin:"10%"}}>
    <div className="col-md-6 mx-auto">
          <table className="table table-hover">
            <thead className="text-white bg-dark text-center">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Number</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "center", border: "1px solid black" }}>
              {singleContact && (
                <tr>
                  <td>{singleContact.name}</td>
                  <td>{singleContact.email}</td>
                  <td>{singleContact.number}</td>
                </tr>
                )}
                </tbody>
                </table>

                <Link to="/">
                <button className='btn btn-light'>Go Back</button>
                </Link>
                </div>
                </div>
                
  )
}
