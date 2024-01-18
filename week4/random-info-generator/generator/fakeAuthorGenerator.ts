import { randUser, randBetweenDate, User } from '@ngneat/falso';
import { Person } from "../models/Person";

export function generateRandomFakeAuthorData(count: number): Person[] {
    let authors: Person[] = [];

    for (let i = 0; i < count; i++) {
        const user: User = randUser();
        const birthday = randBetweenDate({ from: new Date('01/01/1900'), to: new Date('01/01/2011') });

        const fakeAuthor = new Person(user.firstName, user.lastName, birthday.toLocaleDateString());
        authors.push(fakeAuthor);
    }

    return authors;
}
