import { makeAutoObservable } from "mobx";
import { ServerError } from "../Models/serverError";

export default class CommonStore{
    error: ServerError | null = null;

    constructor(){
        makeAutoObservable(this);
    }

    setServerError(error: ServerError){
        this.error = error;
    }
}