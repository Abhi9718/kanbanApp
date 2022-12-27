import { Column } from "./column.model";

export class User {

     userEmailID:String|null|undefined;
     userName:String|null|undefined="";
     mobileNo:String|null|undefined="";
     address:String|null|undefined="";
     userPassword:String|null|undefined="";
     columnList:Array<Column>=[];
}
