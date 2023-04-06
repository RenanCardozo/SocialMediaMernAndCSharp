import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

export default function NavBar() {
    return (
        <Menu inverted fixed="top" >
            <Container>
                <Menu.Item header>
                    <img src="/assets/GoldLogo-removebg-preview.png" alt="logo" style={{marginRight: '10px'}} />
                    FriendsSpace
                </Menu.Item>
                <Menu.Item name="Activities"/>
                <Menu.Item>
                    <Button positive content="Create Activity"/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}