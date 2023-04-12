import axios, { AxiosError, AxiosResponse } from 'axios';
import { Activity, ActivityFormValues } from '../Models/activity';
import { toast } from 'react-toastify';
import { router } from '../router/Routes';
import { store } from '../stores/store';
import { User, UserFormValues } from '../Models/user';
import { Photo, Profile, UserActivity } from '../Models/profile';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(
    (config) => {
        const token = store.commonStore.token;
        if (token && config) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;

}, (error: AxiosError) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // rome-ignore lint/style/noNonNullAssertion: <explanation>
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                router.navigate('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key]);
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('unauthorized')
            break;
        case 403:
            toast.error('forbidden')
            break;
        case 404:
            router.navigate('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;

    }
    return Promise.reject(error);
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete(url).then<T>(responseBody),
}

const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: ActivityFormValues) => requests.post<void>('/activities', activity),
    update: (activity: ActivityFormValues) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.delete<void>(`/activities/${id}`),
    attend: (id: string) => requests.post<void>(`/activities/${id}/attend`, {})
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user),

}

const Profiles = {
    get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
    uploadPhoto: (file: Blob) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios.post<Photo>('photos', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
    deletePhoto: (id: string) => requests.delete(`/photos/${id}`),
    updateProfile: (profile: Partial<Profile>) => requests.put(`/profiles`,
        profile),
    updateFollowing: (username: string) => requests.post(`/follow/${username}`, {}),
    listFollowing: (username: string, predicate: string) =>
        requests.get<Profile[]>(`/follow/${username}?predicate=${predicate}`),
    listActivities: (username: string, predicate: string) =>
        requests.get<UserActivity[]>(`/profiles/${username}/activities?
predicate=${predicate}`)
}

const agent = {
    Activities,
    Account,
    Profiles,
}

export default agent;
