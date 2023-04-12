import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Segment, Header, Comment, Loader } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, FieldProps } from 'formik';
import { format , formatDistance, formatDistanceToNow, isValid} from "date-fns";
import * as Yup from 'yup';

interface Props {
    activityId: string;

}

export default observer(function ActivityDetailedChat({ activityId }: Props) {

    const { commentStore } = useStore();

    useEffect(() => {
        if (activityId) {
            commentStore.createHubConnection(activityId);
        }
        return () => {
            commentStore.clearComments();
        }
    }, [commentStore, activityId]);

    console.log("First Comment CreatedAt:", commentStore.comments[0]?.createdAt);
    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{ border: 'none' }}
            >
                <Header>Chat about this event</Header>
            </Segment>
            <Segment attached clearing>
                <Comment.Group>
                    {commentStore.comments.map(comment => (
                        <Comment key={comment.id}>
                            <Comment.Avatar src={comment.image || '/assets/user.png'} />
                            <Comment.Content>
                                <Comment.Author as={Link} to={`/profiles/${comment.username}`}>{comment.displayName}</Comment.Author>
                                <Comment.Metadata>
                                    <>
                                    {console.log("createdAt:", comment.createdAt)}
                                    <div>{formatDistanceToNow(new Date(comment.createdAt))}</div>
                                    </>
                                </Comment.Metadata>
                                <Comment.Text style={{ whiteSpace: 'pre-wrap' }}>{comment.body}</Comment.Text>
                            </Comment.Content>
                        </Comment>

                    ))}

                    <Formik
                        onSubmit={(values, { resetForm }) => commentStore.addComment(values).then(() => resetForm())}
                        initialValues={{ body: '' }}
                        validationSchema={Yup.object({
                            body: Yup.string().required()
                        })}

                    >
                        {({ isSubmitting, isValid, handleSubmit }) => (
                            <Form className='ui form' >
                                <Field name='body'>
                                    {(props: FieldProps)=>(
                                        <div style={{position: 'relative'}}>
                                            <Loader active={isSubmitting} />
                                            <textarea 
                                            placeholder='Enter your comment here (Enter to submit, SHIFT + enter for new line)'
                                            rows={2}
                                            {...props.field}
                                            onKeyDown={e =>{
                                                
                                                if (e.key === 'Enter' &&e.shiftKey) {
                                                    return;
                                                }
                                                
                                                if (e.key === 'Enter' &&!e.shiftKey) {
                                                    e.preventDefault();
                                                    isValid && handleSubmit();
                                                }
                                            }}
                                            />
                                        </div>
                                    )}
                                </Field>
                            </Form>
                        )}

                    </Formik>
                </Comment.Group>
            </Segment>
        </>

    )
})
