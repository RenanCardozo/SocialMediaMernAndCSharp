import React, { useState } from 'react';
import { useStore } from "../../app/stores/store";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import ProfileEditForm from "./ProfileEditForm";
import { observer } from 'mobx-react-lite';
export default observer(function ProfileAbout() {
    const { profileStore } = useStore();
    const { isCurrentUser, profile } = profileStore;
    const [editMode, setEditMode] = useState(false);
    
    const handleEditMode = () => {
        setEditMode(!editMode);
    };

    const renderProfileContent = () => {
        return editMode ? (
            <ProfileEditForm setEditMode={setEditMode} />
        ) : (
            <span style={{ whiteSpace: "pre-wrap" }}>{profile?.bio}</span>
        );
    };

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width="16">
                    <Header
                        floated="left"
                        icon="user"
                        content={`${profile?.displayName}'s Bio:`}
                    />
                    {isCurrentUser && (
                        <Button
                            floated="right"
                            basic
                            content={editMode ? "Cancel" : "Edit Profile"}
                            onClick={handleEditMode}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width="16">{renderProfileContent()}</Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})