export class Genre {
    private readonly genre: GenreInterface;

    constructor(name: string) {
        this.genre = { name };
    }
}

interface GenreInterface {
    name: string;
}