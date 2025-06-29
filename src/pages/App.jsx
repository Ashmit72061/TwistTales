import { useState } from 'react'
import '../styles/App.css'
import Nav from '../components/LandingNav.jsx'
import StoryPretext from '../components/Story-pretext.jsx'
import StoryTextbox from '../components/Story-textbox.jsx'
import RoomCodeSection from '../components/RoomCodeSection.jsx'

export default function App() {
  return (
    <>
      <Nav />
      <RoomCodeSection />
      <StoryPretext />
      <StoryTextbox />
    </>
  )
}