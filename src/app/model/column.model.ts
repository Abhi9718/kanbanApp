import { Card } from "./card.model";
import { User } from "./user.model";

export class Column {

    columnName:String|undefined|null;
    category:Array<String|null|undefined>=[];
    date: null | String | undefined;
    cardList:Array<Card>=[];
    projectPriority:String|undefined|null;
    listOfUsers:Array<User>|Array<String>=[];
}
