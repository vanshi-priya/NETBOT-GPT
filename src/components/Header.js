import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, Supported_Languages } from "../utils/constants";
import { toggleGptSearchView  } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const user = useSelector(store => store.user)
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch)
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {    //onAuthStateChanged - works on every state change sign in, sign out, login
                                                    //rather than using dispatch action on every single action we use onAuthStateChanged
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
        navigate("/browse")
      } else {
        dispatch(removeUser());
        navigate("/")
      }
    });
    //unsubscribe when component unmount
    return () => unsubscribe();
  }, []);


  const handleGPTSearchClick = () => {
     dispatch(toggleGptSearchView());
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  }


  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img
        className="w-44 mx-auto md:mx-0"
        src={LOGO}
        alt="logo"
      />
      {user && (<div className="flex p-4 justify-between">
        {showGPTSearch && (
        <select className="p-2 m-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
         {Supported_Languages.map((lang) => (
          <option key={lang.identifier} value={lang.identifier} >
          {lang.name}
          </option>
         ))}
        </select>
        )}
        <button onClick={handleGPTSearchClick} className="py-2 px-4 mx-4 my-2 bg-purple-500 text-white rounded-lg">{showGPTSearch ? "HomePage" : "GPT Search" }</button>
        <img
          className="w-10 mt-2 h-10 hidden md:block"
          alt="usericon"
          src={user?.photoURL}
        />
        <button onClick={handleSignOut} className=" font-semibold text-white">
          (Sign Out)
        </button>
      </div>
      )}
    </div>
  );
};

export default Header;


