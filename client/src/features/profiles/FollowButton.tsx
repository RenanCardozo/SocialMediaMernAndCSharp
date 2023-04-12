import React, { SyntheticEvent } from "react";
import { Profile } from "../../app/Models/profile";
import { observer } from "mobx-react-lite";
import { Button, Reveal, SemanticCOLORS } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

interface Props {
    profile: Profile;
}

export default observer(function FollowButton({ profile }: Props) {
    const { profileStore, userStore } = useStore();
    const { updateFollowing, loading } = profileStore;

    if (userStore.user?.username === profile.username) return null;


    function handleFollow(e: SyntheticEvent, username: string) {
        e.preventDefault();
        profile.following ? updateFollowing(username, false) : updateFollowing(username, true);
    }
    const buttonContent = () => ({
        visible: {
            content: profile.following ? "Following" : "Not Following",
        },
        hidden: {
            content: profile.following ? "Unfollow" : "Follow",
            color: (profile.following ? "red" : "green") as SemanticCOLORS,
        },
    });

    return (
        <Reveal animated="move">
            <Reveal.Content visible style={{ width: "100%" }}>
                <Button fluid color="teal" content={buttonContent().visible.content} />
            </Reveal.Content>
            <Reveal.Content hidden style={{ width: "100%" }}>
                <Button
                    fluid
                    basic
                    color={buttonContent().hidden.color}
                    content={buttonContent().hidden.content}
                    loading={loading}
                    onClick={(e) => handleFollow(e, profile.username)}
                />
            </Reveal.Content>
        </Reveal>
    )
})