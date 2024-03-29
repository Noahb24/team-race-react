/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {Image, Stack, Button, Modal, Form, Tabs, Tab} from 'react-bootstrap'
import homeImage from '../../media/2022RobbRanch.jpeg'
import './home.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addPostsFromServer, clearNewPost, selectNewPost, selectPostModal, selectPosts, startPostModal, stopPostModal, update, updateNewPost } from './homeSlice'
import SandBagger from './sandbagger';
import Highlights from './Highlights';
import PowerPoints from './powerPoints';

require("dotenv").config();

const url = process.env.NODE_ENV === 'development' ? "http://localhost:5000" : 'https://team-race-server.vercel.app'

const Home = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectPosts)
  const postModal = useSelector(selectPostModal)
  const newPost = useSelector(selectNewPost)

  const fetchPosts = () => {
	axios.get(`${url}/posts/queryposts`)
	.then(res => {
	  dispatch(addPostsFromServer(res.data ))
	})
  }

  const fetchCurrentPoints = () => {
	axios.get(`${url}/points/getCurrentPoints`)
	.then(res => {
		dispatch(update({type: 'points', value: res.data}))
	})
  }

  const fetchHighlightVideo = () => {
	axios.get(`${url}/youtube/highlight_podcast`)
	.then(res => {
		dispatch(update({type: 'highlight_podcast', value: res.data}))
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
	fetchCurrentPoints()
	fetchHighlightVideo()
  }, [])

  return (
	  <div className='homeMainBox'>
		<div className='left-sidebar'>
			<Tabs
				defaultActiveKey='power-points'
				className="mb-3 sidebar-tabs"
				variant='tabs'
			>
				<Tab
					eventKey='sand-bagger'
					title='Sand Bagger'
				>
					<SandBagger />
				</Tab>
				<Tab
					eventKey='power-points'
					title='Power Points'
				>
					<PowerPoints />
				</Tab>
			</Tabs>
		</div>

		<Stack className='fullHeight ms-auto' id='homeMiddle' >
			<Image className='homeImage' src={homeImage} id='gallery'/>
			<div id='feed'>
				<h1 className='centerTextBox' id='feedHeader'>Team Race Shat</h1>
				<Button onClick={() => startModal()} size='sm' id='newPostButton'>New Post</Button>
				<div id='feedPosts'>
				{
				  posts.slice(0).reverse().map((post, i) => {
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

		  <Highlights />

	  </div>
  )
}

export default Home
