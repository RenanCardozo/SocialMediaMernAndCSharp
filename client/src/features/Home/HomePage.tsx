import { Link } from "react-router-dom";
import { Container, Segment, Header, Image, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();
    return (
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as="h1" inverted>
                    <Image size='massive' src='/assets/GoldLogo-removebg-preview.png' alt='Logo' style={{ marginBottom: 12, height: '100%', width: '100%' }} />

                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as="h2" inverted content='Welcome to The Lions Den' />
                        <Button as={Link} to="/activities" size="huge" inverted>Go To The Den!</Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => modalStore.openModal(<LoginForm />)} size="huge" inverted>Login</Button>
                        <Button onClick={() => modalStore.openModal(<RegisterForm />)} size="huge" inverted>Register</Button>
                    </>
                )}
            </Container>
        </Segment>
    )
})