import React, { useState, useEffect } from "react";
import "../styles/assignmentStyle.scss";
import { Link } from "react-router-dom";
import { getAssignments } from "../api/assignments";

const Assignment = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getAssignments().then((res) => {
      setItems(res.data.data); // ONLY the array
    });
  }, []);

  return (
    <>
      <div className="assignment-box container assignment-list">
        <h1 className="title">CipherSQLStudio</h1>

        <div className="list-item-horizontal list-header-style">
          <h1 className="list-item">Title</h1>
          <h1 className="list-item">Difficulty</h1>
          <h1 className="list-item">Description</h1>
        </div>

        <div>
          {items.map((item) => (
            <li key={item._id}>
              <Link
                to={`/assignment/${item._id}`}
                className="list-item-horizontal list-item-style"
              >
                <h2 className="list-item">{item.title}</h2>
                <p className="list-item difficulty">{item.description}</p>
                <p className="list-item">{item.question}</p>
              </Link>
            </li>
          ))}
        </div>
      </div>
    </>
  );
};

export default Assignment;

// import React, {useState, useEffect} from 'react'
// import '../styles/assignmentStyle.scss';

// import { Link } from 'react-router-dom';
// import { getAssignments } from "../api/assignments";


// const Assignment = () => {
//       const [items, setItems] = useState([]);
    
//       console.log(items);
//       useEffect(() => {
//         getAssignments().then((res) => setItems(res.data));
//       }, []);

//     return (
//         <>
//             <div className='assignment-box container assignment-list'>
//                 <h1 className="title">CipherSQLStudio</h1>
//                 <div className='list-item-horizontal list-header-style'>
//                     <h1 className='list-item'>Title</h1>
//                     <h1 className='list-item'>Difficulty</h1>
//                     <h1 className='list-item'>Description</h1>
//                 </div>
//                 <div>
//                     {items.map(item => (
//                         <li key={item.id}>
//                             <Link to={`/assignment/${item.id}`} className='list-item-horizontal list-item-style'>
//                                 <h2 className='list-item'>{item.title}</h2>
//                                 <p className='list-item difficulty'>{item.difficulty}</p>
//                                 <p className='list-item'>{item.description}</p>
//                             </Link>
//                         </li>
//                     ))}
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Assignment



// // import React from 'react'
// // import '../styles/assignment.css'
// // import { Link } from 'react-router-dom';

// // const items = [
// //     { id: 1, title: "Page One" },
// //     { id: 2, title: "Page Two" },
// //     { id: 3, title: "Page Three" },
// // ];

// // const Assignment = () => {
    
// //     return (
// //         <>
// //             <h1>CipherSQLStudio</h1>
// //             <div className='assignment-box'>
// //                 <div className='list-item-horizontal list-header-style'>
// //                     <h1 className='list-item'>Title</h1>
// //                     <h1 className='list-item'>Difficulty</h1>
// //                     <h1 className='list-item'>Description</h1>
// //                 </div>
// //                 <div>
// //                     {items.map(item => (
// //                         <li key={item.id}>
// //                             <Link to={`/page/${item.id}`} className='list-item-horizontal list-item-style'>
// //                                 <li className='list-item'>{item.title}</li>
// //                                 <li className='list-item'>Hard</li>
// //                                 <li className='list-item'>Vishesh</li>
// //                             </Link>
// //                         </li>
// //                     ))}
// //                 </div>
// //             </div>
// //         </>
// //     )
// // }

// // export default Assignment