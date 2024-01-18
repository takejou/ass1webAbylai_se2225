import {Person} from "./Person";

export class Book {
    private readonly book: BookInterface;

    constructor(title: string, author: Person, publishYear: string, pageCount: number, price: number) {
        this.book = {title, author, publishYear, pageCount, price};
    }

    getObject(): BookInterface {
        return this.book;
    }

    getTitle(): string {
        return this.book.title;
    }

    getAuthor(): Person {
        return this.book.author;
    }

    getPublishYear(): string {
        return this.book.publishYear;
    }

    getPageCount(): number {
        return this.book.pageCount;
    }

    getPrice(): number {
        return this.book.price;
    }
}

interface BookInterface {
    title: string;
    author: Person;
    publishYear: string;
    pageCount: number;
    price: number;
}