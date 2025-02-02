import { useState } from 'react'
import useShowToast from "./useShowToast"
import { query } from 'firebase/database'
import { collection, getDocs, where } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'

const useSearchUser = () => {
  const [isLoading, setIsloading] = useState(false)
  const [user, setUser] = useState(null)
  const showToast = useShowToast()

  const getUserProfile = async (username) => {
    setIsloading(true)
    setUser(null)
    try {
      const q = query(collection(firestore, "users"), where("username", "==", username))

      const querySnapshot = await getDocs(q)
      if (querySnapshot.empty) return showToast("Error", "User not found", "error")

      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      })

    } catch (error) {
      showToast("Error", error.message, "error")
      setUser(null)
    } finally {
      setIsloading(false)
    }
  }

  return { isLoading, user, getUserProfile, setUser }
}

export default useSearchUser