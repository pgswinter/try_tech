const fs = require("fs");

const addChapterImgObj = (chapterObj, inputObj) => {
    // Check obj empty
    if (Object.keys(chapterObj) === 0) {
        chapterObj[Object.keys(inputObj)[0]] = Object.values(inputObj)[0]
    } else {
        // Duplicated item
        const duplicatedItem = Object.keys(chapterObj).filter(item => item === Object.keys(inputObj)[0])
        duplicatedItem.length > 0 ? false : chapterObj[Object.keys(inputObj)[0]] = Object.values(inputObj)[0];
    }
    return chapterObj;
}

const chapter_image_obj = {
    'Tiểu Bạch Long Thiếu':
        ['http://upload.imageinstant.com/content/2019-09-11/637038218836059433.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038218853560808.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038218861686408.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038218876218793.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038218892938807.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038218900283128.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038218925753885.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038218936223401.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038218948568130.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038218956537496.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038218978101651.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219087797632.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219099986092.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219105455270.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219110768157.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219116706100.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219120768925.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219123894168.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219129832141.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219137332707.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219140457938.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219145302047.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219159053133.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219165772410.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219171397854.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219174991888.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219187492817.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219209369545.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219286719266.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219292500937.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219296720012.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219300314042.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219308127159.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219311564927.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219346098843.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219387352039.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219395477678.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219400321784.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219404228314.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219408916180.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219427355122.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219431105395.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219434230622.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219437668393.jpg',
            'http://upload.imageinstant.com/content/2019-09-11/637038219441731210.jpg']
}

const readFileSync = fs.readFileSync('./data-store/chapter_img.json');

const currentData = readFileSync.toString();
const newData = addChapterImgObj(JSON.parse(currentData), chapter_image_obj);

fs.writeFileSync('./data-store/chapter_img.json', JSON.stringify(newData, null, 4));