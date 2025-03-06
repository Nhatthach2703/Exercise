const fs = require('fs');

const creatFile = async (fileName) => {
    try {
        await fs.promises.writeFile(fileName, 'Hello World!');
        console.log(`File ${fileName} created successfully!`);
    } catch (err) {
        console.error(`Error creating file: ${fileName}: `, err);
    }
};

const readFile = async (fileName) => {
    try {
        const data = await fs.promises.readFile(fileName, 'utf8');
        console.log(`Data from file ${fileName}: ${data}`);
    } catch (err) {
        console.error(`Error reading file: ${fileName}: `, err);
    }
};

const appendToFile = async (fileName) => {
    try {
        await fs.promises.appendFile(fileName, '\nThis is additional content');
        console.log(`Content appended to file ${fileName} successfully`);
    } catch (err) {
        console.error(`Error appending to file: ${fileName}: `, err);
    }
};

const deleteFile = async (fileName) => {
    try {
        await fs.promises.unlink(fileName);
        console.log(`File ${fileName} deleted successfully!`);
    } catch (err) {
        console.error(`Error deleting file: ${fileName}: `, err);
    }
}
module.exports = {creatFile, readFile, appendToFile, deleteFile};
