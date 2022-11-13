import React from 'react';

export default function Error() {
    document.title = "QnA | Not Found"
    return (
        <section className="flex">
            <div className='child'>
                <h1 className="text-primary">That page does not exist</h1>
                <h2>Go <a href="/">home</a></h2>
            </div>
        </section>
    );
}