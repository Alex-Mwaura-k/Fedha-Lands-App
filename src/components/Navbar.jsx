// import { useState } from "react";
// import { Link } from "react-router-dom"; // <--- Import Link

// const Navbar = () => {
//   const [activeSubmenu, setActiveSubmenu] = useState(null);

//   const toggleSubmenu = (e, name) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setActiveSubmenu(activeSubmenu === name ? null : name);
//   };

//   return (
//     <nav
//       className="navbar navbar-expand-lg fixed-top site-navbar"
//       data-bs-theme="dark"
//     >
//       <div className="container-md">
//         {/* LOGO: Now clicks back to Home */}
//         <Link className="navbar-brand" to="/">
//           <img
//             src="/icons/logo.png"
//             alt="Fedha Land Ventures"
//             width="150"
//             className="d-inline-block align-text-top"
//           />
//         </Link>

//         {/* Mobile Toggle */}
//         <button
//           className="navbar-toggler ms-auto"
//           type="button"
//           data-bs-toggle="offcanvas"
//           data-bs-target="#offcanvasNavbar"
//           aria-controls="offcanvasNavbar"
//         >
//           <i className="bi bi-list"></i>
//         </button>

//         {/* Menu Items */}
//         <div
//           className="offcanvas offcanvas-end"
//           tabIndex="-1"
//           id="offcanvasNavbar"
//           aria-labelledby="offcanvasNavbarLabel"
//         >
//           <div className="offcanvas-header">
//             <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
//               Menu
//             </h5>
//             <button
//               type="button"
//               className="btn-close"
//               data-bs-dismiss="offcanvas"
//               aria-label="Close"
//             ></button>
//           </div>

//           <div className="offcanvas-body">
//             <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
//               {/* HOME LINK: Fixed to go to "/" */}
//               <li className="nav-item">
//                 <Link className="nav-link active" to="/">
//                   Home
//                 </Link>
//               </li>

//               {/* Properties Dropdown */}
//               <li className="nav-item dropdown">
//                 <a
//                   className="nav-link dropdown-toggle"
//                   href="#"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   Properties
//                 </a>
//                 <ul className="dropdown-menu mt-2">
//                   {/* Nested Dropdown: Royal Garden */}
//                   <li className="dropdown-submenu">
//                     <a
//                       className="dropdown-item dropdown-toggle"
//                       href="#"
//                       onClick={(e) => toggleSubmenu(e, "royal")}
//                     >
//                       Royal Garden Kithyoko
//                     </a>
//                     <ul
//                       className={`dropdown-menu ${
//                         activeSubmenu === "royal" ? "show" : ""
//                       }`}
//                     >
//                       <li>
//                         <Link className="dropdown-item" to="/property/1">
//                           Phase V
//                         </Link>
//                       </li>
//                       <li>
//                         <Link className="dropdown-item" to="/property/4">
//                           Phase IV
//                         </Link>
//                       </li>
//                     </ul>
//                   </li>

//                   <li>
//                     <Link className="dropdown-item" to="/property/2">
//                       Kijani Garden Malindi
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to="/property/3">
//                       Unity Garden
//                     </Link>
//                   </li>

//                   {/* Nested Dropdown: Kitengela */}
//                   <li className="dropdown-submenu">
//                     <a
//                       className="dropdown-item dropdown-toggle"
//                       href="#"
//                       onClick={(e) => toggleSubmenu(e, "kitengela")}
//                     >
//                       Kitengela
//                     </a>
//                     <ul
//                       className={`dropdown-menu ${
//                         activeSubmenu === "kitengela" ? "show" : ""
//                       }`}
//                     >
//                       <li>
//                         <a className="dropdown-item" href="#">
//                           Phase I
//                         </a>
//                       </li>
//                       <li>
//                         <a className="dropdown-item" href="#">
//                           Phase II
//                         </a>
//                       </li>
//                     </ul>
//                   </li>
//                 </ul>
//               </li>

//               {/* Note: Hashtag links only work if you are ON the home page.
//                   We will fix this later for multi-page navigation. */}
//               <li className="nav-item">
//                 <Link className="nav-link" to="/about">
//                   About
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/blogs">
//                   Blog
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/gallery">
//                   Gallery
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/contact">
//                   Contact
//                 </Link>
//               </li>
//             </ul>

//             <div className="phone d-flex flex-column align-items-end mt-lg-0">
//               <div className="p-number d-flex align-items-center gap-2">
//                 <a
//                   href="tel:+254715113103"
//                   className="nav-link p-0 contact-link"
//                 >
//                   +254715113103
//                 </a>
//                 <a
//                   href="https://www.instagram.com"
//                   target="_blank"
//                   className="text-decoration-none social-icon"
//                 >
//                   <i className="bi bi-instagram"></i>
//                 </a>
//                 <a
//                   href="https://www.facebook.com"
//                   target="_blank"
//                   className="text-decoration-none social-icon"
//                 >
//                   <i className="bi bi-facebook"></i>
//                 </a>
//                 <a
//                   href="https://www.tiktok.com"
//                   target="_blank"
//                   className="text-decoration-none social-icon"
//                 >
//                   <i className="bi bi-tiktok"></i>
//                 </a>
//               </div>
//               <div className="email small">
//                 <a
//                   href="mailto:fedhalandventures@gmail.com"
//                   className="nav-link p-0 contact-link"
//                 >
//                   fedhalandventures@gmail.com
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
