import { IContact } from './IContact';

export interface IClient {

    clientId  : number;
    firstName : string;
    lastName : string;
    contact : IContact;

}
