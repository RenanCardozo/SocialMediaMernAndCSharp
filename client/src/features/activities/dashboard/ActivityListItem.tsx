
import { Button, Icon, Item, Segment, Label } from "semantic-ui-react";
import { Activity } from "../../../app/Models/activity";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import ActivityListItemAttendee from "./ActivityListItemAttendee";


interface Props {
    activity: Activity
}

export default function ActivityListItem({ activity }: Props) {

    return (
        <Segment.Group>
            <Segment>
                {activity.isCancelled &&
                <Label attached="top" color="red" content="Cancelled" style={{textAlign: 'center'}} />
                }
                <Item.Group>
                    <Item>
                        <Item.Image style={{marginBottom: 6}} size="tiny" circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                            <Item.Description> Hosted by {activity.host?.displayName}</Item.Description>
                            {activity.isHost && (
                                <Item.Description >
                                    <Label basic color="orange">
                                        You Are Hosting this activity
                                    </Label>
                                </Item.Description>
                            )}
                            {activity.isGoing && !activity.isHost && (
                                <Item.Description>
                                    <Label basic color='green'>
                                        You Are Going to this activity
                                    </Label>
                                </Item.Description>
                            )}
                            {!activity.isGoing &&!activity.isHost && (
                                <Item.Description>
                                    <Label basic color='red'>
                                     You Are Not Going to this activity. Click View to Attend!
                                    </Label>
                                </Item.Description>
                            )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(activity.date!, 'MMMM dd yyyy h:mm aa')}
                    <Icon name='marker' /> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                <ActivityListItemAttendee attendees={activity.attendees!} />
            </Segment>
            <Segment clearing>
                <span>
                    {activity.description}
                    <Button
                        as={Link}
                        to={`/activities/${activity.id}`}
                        color="teal"
                        floated="right"
                        content='View'
                    />
                </span>
            </Segment>
        </Segment.Group>
    )
}