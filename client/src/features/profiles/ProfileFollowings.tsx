import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Card, Grid, Header, Tab } from "semantic-ui-react";
import ProfileCard from "./ProfileCard";

export default observer(function ProfileFollowings() {
    const { profileStore } = useStore();
    const { profile, followings, loadingFollowings, activeTab } = profileStore;

    const headerContent = () => {
        return activeTab === 4
            ? `People following ${profile?.displayName}`
            : `People ${profile?.displayName} is following`;
    };

    const renderProfileCards = () => {
        return followings.map((profile) => (
            <ProfileCard key={profile.username} profile={profile} />
        ));
    };

    return (
        <Tab.Pane loading={loadingFollowings}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated="left" icon="user" content={headerContent()} />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Card.Group itemsPerRow={4}>{renderProfileCards()}</Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})