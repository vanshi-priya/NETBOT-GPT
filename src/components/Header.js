// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../utils/firebase";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { useDispatch, useSelector } from "react-redux";
// import { addUser, removeUser } from "../utils/userSlice";
// import { LOGO, Supported_Languages } from "../utils/constants";
// import { toggleGptSearchView } from "../utils/gptSlice";
// import { changeLanguage } from "../utils/configSlice";

// const Header = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector((store) => store.user);
//   const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
//   const handleSignOut = () => {
//     signOut(auth)
//       .then(() => {})
//       .catch((error) => {
//         navigate("/error");
//       });
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       //onAuthStateChanged - works on every state change sign in, sign out, login
//       //rather than using dispatch action on every single action we use onAuthStateChanged
//       if (user) {
//         const { uid, email, displayName, photoURL } = user;
//         dispatch(
//           addUser({
//             uid: uid,
//             email: email,
//             displayName: displayName,
//             photoURL: photoURL,
//           })
//         );
//         navigate("/browse");
//       } else {
//         dispatch(removeUser());
//         navigate("/");
//       }
//     });
//     //unsubscribe when component unmount
//     return () => unsubscribe();
//   }, []);

//   const handleGptSearchClick = () => {
//     dispatch(toggleGptSearchView());
//   };

//   const handleLanguageChange = (e) => {
//     dispatch(changeLanguage(e.target.value));
//   };

//   return (
//     <div className="absolute w-full px-4 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row items-center justify-between">
//       <img className="w-32 mb-2 md:w-44 md:mb-0" src={LOGO} alt="logo" />
//       {user && (
//         <div className="w-full flex flex-row items-center justify-between md:justify-end md:space-x-4">
//           {showGptSearch && (
//             <select
//               className="p-1 bg-gray-900 text-white rounded-md text-sm md:ml-auto"
//               onChange={handleLanguageChange}
//             >
//               {Supported_Languages.map((lang) => (
//                 <option key={lang.identifier} value={lang.identifier}>
//                   {lang.name}
//                 </option>
//               ))}
//             </select>
//           )}

//           <button
//             className="py-1 md:py-2 px-3 bg-purple-800 text-white rounded-lg text-sm"
//             onClick={handleGptSearchClick}
//           >
//             {showGptSearch ? "Homepage" : "GPT Search"}
//           </button>

//           <div className="flex items-center space-x-2 ml-4">
//             <img
//               className="hidden md:inline-block w-10 h-10 rounded-full"
//               alt="usericon"
//               src={user?.photoURL}
//             />
//             <button
//               onClick={handleSignOut}
//               className="text-sm md:text-lg font-semibold text-white"
//             >
//               (Sign Out)
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Header;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, Supported_Languages } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGPTSearch);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    //unsubscribe when component unmount
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-full px-4 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row items-center justify-between">
      <img className="w-36 mb-2 md:w-44 md:mb-0" src={LOGO} alt="logo" />
      {user && (
        <div className="w-full flex flex-row items-center justify-between md:justify-end md:space-x-4">
          {showGptSearch && (
            <select
              className="p-1 bg-gray-900 text-white rounded-md text-sm md:ml-auto"
              onChange={handleLanguageChange}
            >
              {Supported_Languages.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            className="py-1 md:py-2 px-3 bg-purple-800 text-white rounded-lg text-sm"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>

          <div className="flex items-center space-x-2 ml-4">
            <img
              className="hidden md:inline-block w-10 h-10"
              alt="usericon"
              src={user?.photoURL}
            />
            <button
              onClick={handleSignOut}
              className="text-sm md:text-lg font-semibold text-white"
            >
              (Sign Out)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
