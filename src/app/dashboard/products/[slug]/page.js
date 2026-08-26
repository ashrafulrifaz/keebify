import React from 'react';

const page = async ({params}) => {
    const {slug} = await params
    
    return (
        <div className='px-6 py-4'>
            hello {slug}
        </div>
    );
};

export default page;