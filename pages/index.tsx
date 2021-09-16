import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'

interface ApiObject {
  data: {
    name: string
  }
}

const Home: NextPage = () => {

  const [text, setText] = useState('');
  const [followers, setFollowers] = useState('')

  const handelChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setText(ev.target.value)
  }

  const handleSubmit = async () => {
    const followers: ApiObject = await axios.get(`/api/followers?name=${text}`)
    setFollowers(followers.data.name)
  }

  return (
    <>
      <input type="text" value={text} onChange={handelChange} ></input>
      <button onClick={handleSubmit}>Fetch</button>
      <br />
      <Image layout="fill" src={followers ? `/${followers}` : ''} />
    </>
  )
}


export default Home
