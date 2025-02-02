import React, { useEffect } from 'react'
import { useState } from 'react'
import useShowToast from './useShowToast'
import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'

const useGetUserProfileById = (userId) => {
  const [isLoading, setIsloading] = useState(true)
  const [userProfile, setUserProfile] = useState(null)

  const showToast = useShowToast()

  useEffect(() => {
    const getUserProfile = async () => {
      setIsloading(true)
      setUserProfile(null)
      try {
        const userRef = await getDoc(doc(firestore, "users", userId))
        if (userRef.exists()) {
          setUserProfile(userRef.data())
        }
      } catch (error) {
        showToast("Error", error.message, "error")
      } finally {
        setIsloading(false)
      }
    }
    getUserProfile()
  }, [showToast, setUserProfile,userId])

  return { isLoading, userProfile, setUserProfile }
}

export default useGetUserProfileById