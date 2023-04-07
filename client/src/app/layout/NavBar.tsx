import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <Menu inverted fixed="top" >
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src="/assets/GoldLogo-removebg-preview.png" alt="logo" style={{ marginRight: '10px' }} />
                    FriendSpace
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name="Activities" />
                <Menu.Item>
                    <Button as={NavLink} to='/createActivity' positive content="Create Activity" />
                </Menu.Item>
            </Container>
        </Menu>
    )
}