import React, { useEffect } from 'react'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { BASE_URL } from '../services/baseurl';
import { editProfileAPI } from '../services/allApi';


function Profile() {

  const [open, setOpen] = useState(false);

  const [userProfile, setUserProfile] = useState({
    username: "",
    email: "",
    password: "",
    github: "",
    linkedin: "",
    profile: ""
  })

  const [existingImage, setExistingImage] = useState("")
  const [preview, setPreview] = useState("")
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("existingUser"))

    setUserProfile({ ...userProfile, username: user.username, email: user.email, password: user.password, github: user.github, linkedin: user.linkedin, profile: "" })

    setExistingImage(user.profile)
  }, [isUpdate])
  console.log(existingImage);

  useEffect(() => {
    if (userProfile.profile) {
      setPreview(URL.createObjectURL(userProfile.profile))
    }
  }, [userProfile.profile])

  // Update function
  const handleUpdate = async () => {
    const { username, email, password, github, linkedin, profile } = userProfile

    if (github && linkedin) {

      const reqBody = new FormData()
      reqBody.append("username", username)
      reqBody.append("email", email)
      reqBody.append("password", password)
      reqBody.append("github", github)
      reqBody.append("linkedin", linkedin)
      preview ? reqBody.append("profile", profile) : reqBody.append("profile", existingImage)

      const token = sessionStorage.getItem("token")

      if (preview) {

        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await editProfileAPI(reqBody, reqHeader)
        console.log(result);

        if (result.status === 200) {
          alert('Profile updated successfully')
          sessionStorage.setItem("existingUser", JSON.stringify(result.data))
          setIsUpdate(true)
        }
        else {
          console.log(result.response.data);
        }

      }
      else {

        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }

        const result = await editProfileAPI(reqBody, reqHeader)
        console.log(result);

        if (result.status === 200) {
          alert('Profile updated successfully')
          sessionStorage.setItem("existingUser", JSON.stringify(result.data))
          setIsUpdate(true)
        }
        else {
          console.log(result.response.data);
        }

      }

    }
    else {
      alert('Please fill both the fields')
    }
  }

  return (
    <>
      <div className='card shadow p-5'>
        <div className='d-flex justify-content-between rounded'>
          <h3>Profile</h3>
          <button onClick={() => setOpen(!open)} className='btn btn-outline-success'><i class="fa-solid fa-upload fa-rotate-180"></i></button>
        </div>
        <Collapse in={open}>
          <div>
            <div className='d-flex justify-content-center align-items-center mt-4'>

              <label htmlFor='profile'>
                <input id='profile' type="file" style={{ display: 'none' }} onChange={(e) => setUserProfile({ ...userProfile, profile: e.target.files[0] })} />
                {existingImage == "" ?
                  <img height={'150px'} src={preview ? preview : "https://cdn-icons-png.flaticon.com/512/666/666201.png"} alt="" />
                  : 
                  <img height={'150px'} src={preview ? preview : `${BASE_URL}/uploads/${existingImage}`} alt="" />
                }
              </label>

            </div>
            <div className='mt-5'>

              <input type="text" placeholder='GitHub' className='form-control' value={userProfile.github} onChange={(e) => setUserProfile({ ...userProfile, github: e.target.value })} />

              <input type="text" placeholder='LinkedIn' className='form-control mt-3' value={userProfile.linkedin} onChange={(e) => setUserProfile({ ...userProfile, linkedin: e.target.value })} />

              <button onClick={handleUpdate} className='btn btn-success w-100 mt-3'>Update</button>

            </div>
          </div>
        </Collapse>
      </div>
    </>
  )
}

export default Profile   