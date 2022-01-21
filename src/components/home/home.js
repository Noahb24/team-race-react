import React, { useEffect } from 'react';
import {Image, Stack, Button, Modal, Form} from 'react-bootstrap'
import bikes from '../../media/uptonBikes.jpeg'
import './home.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

import { addPostsFromServer, clearNewPost, selectNewPost, selectPostModal, selectPosts, startPostModal, stopPostModal, updateNewPost } from './homeSlice'

const url = process.env.STATUS === 'production' ? 'https://team-race-react.vercel.app/api' : "http://localhost:5000"

const Home = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectPosts)
  const postModal = useSelector(selectPostModal)
  const newPost = useSelector(selectNewPost)

  const fetchPosts = () => {
    console.log(`${url}/posts/queryposts`)
    axios.get(`${url}/posts/queryposts`)
    .then(res => {
      dispatch(addPostsFromServer(res.data ))
    })
  }

  const startModal = () => {
    dispatch(startPostModal())
  }

  const stopModal = () => {
    dispatch(stopPostModal())
  }

  const handleNewPostChange = (type, value) => {
    dispatch(updateNewPost({
      type,
      value
    }))
  }

  const handleNewPostSumbit = async () => {
    await axios.post(`${url}/posts/newPost`, {
      name: newPost.name,
      content: newPost.content
    })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })

    dispatch(clearNewPost())
    dispatch(stopPostModal())
    fetchPosts()
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
        <Stack className='fullHeight'>
            <Image className='homeImage' src={bikes} id='gallery'/>
            <div id='feed'>
              <h1 className='centerTextBox' id='feedHeader'>Team Race Feed</h1>
              <Button onClick={() => startModal()} size='sm' id='newPostButton'>New Post</Button>
              <div id='feedPosts'>
                {
                  posts.map((post, i) => {
                    return (
                      <div key={i} className = 'post'>
                        <h4 id='postDate'>{post.date}</h4>
                        <h4 id='postName'>{post.name}</h4>
                        <p id='postContent'>{post.content}</p>
                      </div>
                    )
                  })
                }
              </div>
              
              
                <Modal
                show={postModal}
                onHide={stopModal}
                backdrop='static'
                keyboard='false'
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Blog Post</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form.Control type='text' placeholder='Name' 
                      value={newPost.name} onChange={e => handleNewPostChange('name', e.target.value)}/>
                    <Form.Control as='textarea' rows={5} placeholder='Post' 
                      value={newPost.content} onChange={e => handleNewPostChange('content', e.target.value)}/>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant='secondary' onClick={stopModal}>Close</Button>
                    <Button variant='primary' onClick={handleNewPostSumbit}>Post</Button>
                  </Modal.Footer>
                </Modal>
            </div>
            
            
           
        </Stack>
  )
}

export default Home
