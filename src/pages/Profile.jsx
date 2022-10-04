import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;
  function onLogout() {
    auth.signOut();
    navigate("/");
  }
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onsubmit() {
    // Edit profile into Database
    try {
      if (auth.currentUser.displayName !== name){
        //update display name in firebase auth
        await updateProfile(auth.currentUser, {
          displayName:name,
        });
        // update name in the firestore
        const docRef = doc(db, "users", auth.currentUser.uid)
        await updateDoc(docRef,{
          name,
        });
      }
      toast.success('Profile details updated')
    } catch (error) {
      toast.error("Could not update the profile details")
    }
  }
  return (
    <div>
      <>
        <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
          <h1 className="text-3xl text-center mt-6 font-bold ">My Profile</h1>
          <div className="w-full md:w-[50%] mt-6 px-3">
            <form>
              {/* Name Input */}
              <input
                type="text"
                id="name"
                value={name}
                disabled={!changeDetail}
                onChange={onChange}
                className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ${
                  changeDetail && "bg-red-200 focus:bg-red-200"
                }`}
              />
              {/* Email Input */}
              <input
                type="email"
                id="email"
                value={email}
                disabled
                className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition  "
              />

              <div className="flex justify-between  whitespace-nowrap text-sm sm:text-lg md-6">
                <p className="flex items-center">
                  Do you want to change your name?
                  <span
                    onClick={() => {
                      changeDetail && onsubmit();
                      setChangeDetail((preState) => !preState);
                    }}
                    className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer"
                  >
                    {changeDetail ? "Apply change" : "Edit"}
                  </span>
                </p>
                <p
                  onClick={onLogout}
                  className="text-blue-600  hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer"
                >
                  Sign Out
                </p>
              </div>
            </form>
          </div>
        </section>
      </>
    </div>
  );
}
