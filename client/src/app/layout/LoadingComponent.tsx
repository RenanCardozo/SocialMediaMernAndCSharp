import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react';

interface Props {
    inverted?: boolean;
    content?: string;


}

export default function LoadingComponent({inverted = true, content = "Loading.... Please wait :)"}: Props){
    return(
        <Dimmer active={true} inverted={inverted}>
            <Loader content={content}/>
        </Dimmer>
    )
}