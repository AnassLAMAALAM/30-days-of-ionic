import { IContact } from './IContact';

export interface IClient {

    clientId  : Number;
    firstName : String;
    lastName : String;
    contact : IContact;

}
