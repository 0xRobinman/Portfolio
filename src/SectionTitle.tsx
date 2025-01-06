import React from 'react'
import './SectionTitle.css'


function SectionTitle({title} : {title: string}) { 

    return (
        <div className='section_title'>
            @{title}
        </div>
    )   
}

export default SectionTitle;