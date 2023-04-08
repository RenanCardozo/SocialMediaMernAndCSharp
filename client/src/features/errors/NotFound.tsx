import { Button, Icon, Segment, Header } from "semantic-ui-react";
import {Link} from 'react-router-dom'

export default function NotFound(){
    return(
        <Segment placeholder>
            <Header icon>
                <Icon name='search' />
                Oops - We've looked everywhere but could not find what you are looking for!
            </Header>
            <Segment.Inline>
                <Button as={Link} to="/activities">Go Back</Button>
            </Segment.Inline>
        </Segment>
    )
}