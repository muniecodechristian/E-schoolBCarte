import { HeroSection } from '@/components/blocks/hero-section-1'
import Footer from '@/components/ui/footer'
import Navbar from '@/components/ui/navbar'
import NosStatistiques from '@/components/ui/nos-statistiques'
import HomeSection from '@/components/ui/sections/HomeSection'
import HomeSection2 from '@/components/ui/sections/HomeSection2'
import SplineSceneBasic from '@/components/ui/sections/SplineSceneBasic'
import TestimonialV2 from '@/components/ui/testimonial-v2'
import React from 'react'



function Home() {
  return (
    <>
     <Navbar/>
   
       <SplineSceneBasic/>

        <NosStatistiques/>
   
       <HomeSection2/>

       <TestimonialV2/>
       <Footer/>
    </>
  )
}

export default Home
