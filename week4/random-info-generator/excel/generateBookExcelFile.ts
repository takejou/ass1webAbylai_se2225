import * as ExcelJS from 'exceljs';
import {Book} from "../models/Book";

export async function generateBookExcelFile(data: Book[]) {
    const workbook = new ExcelJS.Workbook();
    const authorWorksheet = workbook.addWorksheet('Fake-Authors');
    const bookWorksheet = workbook.addWorksheet('Fake-Books');
    const genreWorksheet = workbook.addWorksheet('Fake-Genres')

    const genres: string[] = [
        'Comedy',
        'Crime',
        'Family and Self',
        'Love',
        'Science Fiction and Fantasy',
        'State of the Nation',
        'War and Travel',
        'Horror'
    ];

    authorWorksheet.columns = [
        { header: 'name', key: 'name' },
        { header: 'surname', key: 'surname' },
        { header: 'birthday', key: 'birthday' },
    ];

    bookWorksheet.columns = [
        {header: 'title', key: 'title'},
        {header: 'author', key: 'author'},
        {header: 'publishYear', key: 'publishYear'},
        {header: 'pageCount', key: 'pageCount'},
        {header: 'price', key: 'price'},
    ]

    genreWorksheet.columns = [
        {header: 'name', key: 'name'},
    ]

    data.forEach((book) => {
        bookWorksheet.addRow({
            title: book.getTitle(),
            author: book.getAuthor().getFullName(),
            publishYear: book.getPublishYear(),
            pageCount: book.getPageCount(),
            price: book.getPrice(),
        })

        authorWorksheet.addRow({
            name: book.getAuthor().getName(),
            surname: book.getAuthor().getSurname(),
            birthday: book.getAuthor().getBirthday(),
        });
    });

    genres.forEach((genre) => {
        genreWorksheet.addRow({
            name: genre,
        })
    })

    await workbook.xlsx.writeFile('fake_library_data.xlsx');
}