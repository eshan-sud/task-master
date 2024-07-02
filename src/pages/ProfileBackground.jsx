import React from 'react'

export const ProfileBackground = (props) => {
    return (
        <div className='w-full h-screen absolute bg-neutral-800'>
            <div className='text-white bg-black relative m-5 p-5 rounded-full'>Hi, {props.username}</div>
        </div>
    )
}
