import React from 'react'
import PostHeader from './PostHeader'
import { Box, Image } from '@chakra-ui/react'
import PostFooter from './PostFooter'
import useGetUserProfileById from '../../hooks/useGetUserProfileById'

const FeedPost = ({ post }) => {
  const { userProfile } = useGetUserProfileById(post.createdBy)
  return (
    <>
      <PostHeader post={post} creatorProfile={userProfile} />
      <Box my={2} borderRadius={4} overflow={"hidden"} alignItems={"center"}>
        <Image mx={"auto"} src={post.imageURL} />
      </Box>
      <PostFooter post={post} creatorProfile={userProfile} />
    </>
  )
}

export default FeedPost