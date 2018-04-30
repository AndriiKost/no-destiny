import React from 'react';
import { Line } from 'rc-progress';

const progressBar = (props) => {
    return (
        <div>
            <Line percent="100" strokeWidth="3" strokeColor='#CB356B' />
        </div>
    )
}

export default progressBar;