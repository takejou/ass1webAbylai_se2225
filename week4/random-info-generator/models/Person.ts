export class Person {
    private readonly person: PersonInterface;

    constructor(name: string, surname: string, birthday: string) {
        this.person = { name, surname, birthday };
    }

    getObject(): PersonInterface {
        return this.person;
    }

    getName(): String {
        return this.person.name;
    }

    getSurname(): String {
        return this.person.surname;
    }

    getFullName(): String {
        return this.person.name + " " + this.person.surname;
    }

    getBirthday(): string {
        return this.person.birthday;
    }
}

interface PersonInterface {
    name: string;
    surname: string;
    birthday: string;
}