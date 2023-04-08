import { Link } from "react-router-dom";
import { Container, Segment, Header, Image, Button } from "semantic-ui-react";

export default function HomePage() {
    return (
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as="h1" inverted>
                    <Image size='massive' src='/assets/GoldLogo-removebg-preview.png' alt='Logo' style={{marginBottom: 12, height: '100%' , width:'100%'}} />
                    
                </Header>
                <Header as="h2" inverted content='Welcome to The Lions Den' />
                <Button as={Link} to="/activities" size="huge" inverted>Take me to the Den!</Button>
            </Container>
        </Segment>
    )
}