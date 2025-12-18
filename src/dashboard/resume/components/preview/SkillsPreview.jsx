import React from 'react'

function SkillsPreview({resumeInfo}) {
  return (
    <div className='my-6'>
    <h2 className='text-center font-bold text-sm mb-2'
    style={{
        color:resumeInfo?.themeColor
    }}
    >Skills</h2>
    <hr style={{
        borderColor:resumeInfo?.themeColor
    }} />

    <div className='grid grid-cols-1 md:grid-cols-2 gap-3 my-4'>
        {resumeInfo?.skills.map((skill,index)=>(
            <div key={index} className='flex items-center gap-2'>
                <h2 className='text-xs flex-1 min-w-0 truncate'>{skill.name}</h2>
                <div className='h-2 bg-gray-200 w-20 sm:w-24 md:w-28 lg:w-[120px] flex-shrink-0'>
                    <div className='h-2'
                        style={{
                            backgroundColor:resumeInfo?.themeColor,
                            width:skill?.rating+'%'
                        }}
                    >
                    </div>
                </div>
            </div>
        ))}
    </div>
    </div>
  )
}

export default SkillsPreview