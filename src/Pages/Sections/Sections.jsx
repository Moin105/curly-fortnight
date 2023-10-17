import React from 'react'
import './styles.css'
import Layout from '../../Layout/Layout'
import SectionBox from '../../Components/SectionBox/SectionBox'
function Sections() {
  return (
    <div>
        <Layout>
            <div className='sections-container'>
            <h2>Sections</h2>
            <div className='section-wrapper'>
               <SectionBox title='Section1' />
               <SectionBox title='Section2' />
               <SectionBox title='Section3' />
               
            </div>
            </div>
        </Layout>
    </div>
  )
}

export default Sections