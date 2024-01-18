import {randBetweenDate, randBook} from '@ngneat/falso';
import {Book} from "../models/Book";
import {Person} from "../models/Person";

export function generateRandomFakeBooks(count: number): Book[] {
    let books: Book[] = [];

    for (let i = 0; i < count; i++) {
        const book = randBook();
        const [firstName, lastName] = splitFullName(book.author);

        const authorBirthday = randBetweenDate({ from: new Date('01/01/1900'), to: new Date('01/01/2011') });
        const fakeAuthor = new Person(firstName, lastName, authorBirthday.toLocaleDateString());

        const publishedYear = randBetweenDate({ from: new Date('10/07/1910'), to: new Date() });
        const pageCount = Math.floor(Math.random() * 1_300);
        const price = Math.floor(Math.random() * 150_000);

        books.push(
            new Book(book.title, fakeAuthor, publishedYear.toLocaleDateString(), pageCount, price)
        );
    }

    return books;
}

function splitFullName(fullName: string): [string, string] {
    const [firstName, ...lastNameParts] = fullName.split(" ");
    const lastName = lastNameParts.join(" ");
    return [firstName, lastName];
}