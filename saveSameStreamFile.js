const fs = require('fs');
const zlib = require('zlib');
const crypto = require('crypto');

const manga_info = {
    "hello": "Hello World"
}

const addMangaObj = (mangaArr, inputObj) => {
    // Check arr empty
    if (mangaArr.length === 0) {
        mangaArr.push(inputObj);
    } else {
        // Duplicated item
        const duplicatedItem = mangaArr.filter(item => item.name === inputObj.name);
        duplicatedItem.length > 0 ? false : mangaArr.push(inputObj);
    }
    return mangaArr;
}


// can not read file has containt CAMEL style name 
const readMangaStream = fs.createReadStream('./data-store/all_manga.json');
const writeMangaStream = fs.createWriteStream('./data-store/zlip_manga.json');

readMangaStream.on("data", data => {
    const chunk = data.toString();
    // const chunk = Buffer.from(data.toString(), "utf8");
    // console.log(`read file ---------------------------: `, chunk);
    console.log(`read file chunk length---------------------------: `, JSON.parse(chunk).length);

    const updateChunk = addMangaObj(JSON.parse(chunk), manga_info);
    console.log(`write file ---------------------------: `, JSON.stringify(updateChunk));
    const bufferManga = Buffer.from(JSON.stringify(updateChunk), "utf8");
    writeMangaStream.write(bufferManga);
})

fs.createReadStream('./data-store/zlip_manga.json')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('./data-store/zlip_manga.json.gz'));

fs.createReadStream('./data-store/zlip_manga.json.gz')
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream('./data-store/haha.json'));