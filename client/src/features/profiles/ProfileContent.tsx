import React from 'react';
import { Tab } from 'semantic-ui-react';
import ProfilePhotos from './ProfilePhotos';
import { Profile } from '../../app/Models/profile';
import { observer } from 'mobx-react-lite';
import ProfileAbout from './ProfileAbout';
import ProfileFollowings from './ProfileFollowings';
import { useStore } from '../../app/stores/store';
import ProfileActivities from './ProfileActivities';

interface Props {
    profile: Profile;
}

export default observer (function ProfileContent({profile} : Props){
    const{profileStore} = useStore();


    const panes =[
        { menuItem: 'About', render: ()=> <ProfileAbout />},
        { menuItem: 'Photos', render: ()=> <ProfilePhotos profile={profile} />},
        { menuItem: 'Events', render: ()=> <ProfileActivities />},
        { menuItem: 'Following', render: ()=> <ProfileFollowings />},
        { menuItem: 'Followers', render: ()=> <ProfileFollowings />},
        ];

        return (
            <Tab 
            menu={{fluid: true, vertical: true,}}
            menuPosition='right'
            panes={panes}
            onTabChange={(e, data)=> profileStore.setActiveTab(data.activeIndex)}
            />
        )
})