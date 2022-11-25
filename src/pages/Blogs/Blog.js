import React from 'react';

const Blog = ({blog}) => {
    return (
        <div className='p-5 space-y-3 shadow hover:shadow-md hover:cursor-pointer'>
            <h1 className='text-2xl'>{blog.title}</h1>
            <p>{blog.description}</p>
        </div>
    );
};

export default Blog;