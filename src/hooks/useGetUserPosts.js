import { useEffect, useState } from 'react';
import usePostStore from '../store/postStore';
import useShowToast from './useShowToast';
import useUserProfileStore from '../store/userProfileStore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

const useGetUserPosts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setPosts } = usePostStore();
  const showToast = useShowToast();
  const userProfile = useUserProfileStore((state) => state.userProfile);

  useEffect(() => {
    const getPosts = async () => {
      if (!userProfile) return;
      setIsLoading(true);
      setPosts([]);
      try {
        const q = query(collection(firestore, "posts"), where("createdBy", "==", userProfile.uid));
        const querySnapshot = await getDocs(q);
        const posts = [];
        querySnapshot.forEach(doc => {
          posts.push({ ...doc.data(), id: doc.id });
        });
        posts.sort((a, b) => b.createdAt - a.createdAt); // Ensure 'createdAt' is correctly handled
        setPosts(posts);
      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };
    getPosts();
  }, [userProfile, setPosts, showToast]);

  return { isLoading, posts: usePostStore(state => state.posts) };
};

export default useGetUserPosts;
