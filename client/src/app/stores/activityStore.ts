import { makeAutoObservable, runInAction } from "mobx";
import { Activity, ActivityFormValues } from "../Models/activity";
import agent from '../api/agent';
import { format } from 'date-fns';
import { store } from "./store";
import { Profile } from "../Models/profile";
import { User } from "../Models/user";


export default class ActivityStore {
    activityRegistery = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistery.values()).sort((a, b) =>
            // rome-ignore lint/style/noNonNullAssertion: <explanation>
            a.date!.getTime() - b.date!.getTime());
    }

    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                // rome-ignore lint/style/noNonNullAssertion: <explanation>
                const date = format(activity.date!, "MMM-dd-yyyy");
                activities[date] = activities[date] ? [...activities[date], activity] : [activity]
                return activities;
            }, {} as { [key: string]: Activity[] })
        )
    }

    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                this.setActivity(activity);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity
            return activity;
        }
        else {
            this.setLoadingInitial(true);
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => this.selectedActivity = activity);
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setActivity = (activity: Activity) => {
        // rome-ignore lint/style/noNonNullAssertion: <explanation>
        const user = store.userStore.user;
        if (user) {
            activity.isGoing = activity.attendees!.some(
                a => a.username === user.username // Change = to ===
            )
            activity.isHost = activity.hostUsername === user.username;
            activity.host = activity.attendees?.find(x => x.username === activity.hostUsername);
        }

        activity.date = new Date(activity.date!);
        this.activityRegistery.set(activity.id, activity);
    }

    private getActivity = (id: string) => {
        return this.activityRegistery.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createActivity = async (activity: ActivityFormValues) => {
        const user = store.userStore.user;
        const attendee = new Profile(user!);
        try {
            await agent.Activities.create(activity);
            const newActivity = new Activity(activity);
            newActivity.hostUsername = user!.username;
            newActivity.attendees = [attendee];
            this.setActivity(newActivity);
            runInAction(() => {
                this.selectedActivity = newActivity;
            })
        } catch (error) {
            console.log(error);
        }
    }

    updateActivity = async (activity: ActivityFormValues) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                if (activity.id) {
                    let updatedActivity = { ...this.getActivity(activity.id), ...activity }
                    this.activityRegistery.set(activity.id, updatedActivity as Activity);
                    this.selectedActivity = updatedActivity as Activity;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistery.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateAttendance = async () => {
        const user: User | null = store.userStore.user;
        this.loading = true;

        const handleSuccess = (activity: Activity) => {
            if (activity.isGoing) {
                activity.attendees = activity.attendees?.filter((a: Profile) => a.username !== user?.username);
                activity.isGoing = false;
            } else {
                if (user) {
                    const attendee = new Profile(user);
                    activity.attendees?.push(attendee);
                    activity.isGoing = true;
                }
            }
            this.activityRegistery.set(activity.id, activity);
        };

        const handleError = (error: any) => {
            console.log(error);
        };

        const toggleLoading = () => {
            this.loading = false;
        };

        try {
            const activityId = this.selectedActivity?.id;
            if (activityId) {
                await agent.Activities.attend(activityId);

                runInAction(() => {
                    if (this.selectedActivity) {
                        handleSuccess(this.selectedActivity);
                    }
                });
            } else {
                throw new Error('Activity ID is not defined');
            }
        } catch (error) {
            runInAction(() => {
                handleError(error);
            });
        } finally {
            runInAction(() => {
                toggleLoading();
            });
        }
    };

    cancelActivityToggle = async () => {
        this.loading = true;
        try {
            await agent.Activities.attend(this.selectedActivity!.id);
            runInAction(() => {
                this.selectedActivity!.isCancelled = !this.selectedActivity?.isCancelled;
                this.activityRegistery.set(this.selectedActivity!.id, this.selectedActivity!)
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        } finally {
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}