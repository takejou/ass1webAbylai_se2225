import {generateRandomFakeBooks} from "./generator/fakeBookGenerator";
import {generateBookExcelFile} from "./excel/generateBookExcelFile";

const generatedFakeAuthorList = generateRandomFakeBooks(3000);

generateBookExcelFile(generatedFakeAuthorList)
    .then(() => console.log('Excel file generated'))
    .catch((err) => console.error('Error generating Excel:', err));