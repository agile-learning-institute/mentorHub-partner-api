import {PeopleModel} from '../models/peopleModel';

export class PeopleController {
    private peopleModel: PeopleModel;

    constructor() {
        this.peopleModel = new PeopleModel();
    }

    getNames(): void {
        console.log('hello world from getNames');
    }
}

