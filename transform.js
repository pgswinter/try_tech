const fs = require("fs");
const zlib = require('zlib');

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

const addChapterImgObj = (chapterObj, inputObj) => { 
  // Check obj empty
  if(Object.keys(chapterObj) === 0) {
    chapterObj[Object.keys(inputObj)[0]] = Object.values(inputObj)[0]
  } else {
    // Duplicated item
    const duplicatedItem = Object.keys(chapterObj).filter(item => item === Object.keys(inputObj)[0])
    duplicatedItem.length > 0 ? false : chapterObj[Object.keys(inputObj)[0]] = Object.values(inputObj)[0];
  }
  return chapterObj;
}

const manga_info = {
  "name": "QUAN HỆ NGUY HIỂM",
  "summary": "Luật sư ly hôn hoàng kim – Đường Đường vì một vụ ly hôn hàng chục tỷ mà thoắt lên giá trên trời, nhưng nhân vật nam chính trong vụ ly hôn lại là thần tượng của mình! Đến giờ, Đường Đường vẫn không dám tin, anh chàng đẹp trai, nhà giàu, xuất sắc mà mình sùng bái lại là một tên biến thái giả vờ đứng đắn!",
  "in_reactive": "Đang tiến hành",
  "update_nettruyen": "[Cập nhật lúc: 11:43 11/09/2019]"
};

const chapter_image_obj = {
  'Tiểu Bạch Điềm Thê Của Long Thiếu':
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
console.log('1.1');
const readStream = fs.createReadStream('./data-store/chapter_img.json');
const writeStream = fs.createWriteStream('./data-store/new_chapter_img.json');

// const readStream = fs.createReadStream('./data-store/all_manga.json');
// const writeStream = fs.createWriteStream('./data-store/new_all_manga.json');

readStream
  .on('data', data => {
    const chunk = data.toString();
    // const newChunk = addMangaObj(JSON.parse(chunk), manga_info)
    const newChunk = addChapterImgObj(JSON.parse(chunk), chapter_image_obj)
    writeStream.write(JSON.stringify(newChunk, null, 4));
  })
  .on('end', () => {
    console.log('END 1.1. START 2.1');
    const readUpdateStream = fs.createReadStream('./data-store/new_chapter_img.json');
    const writeCompressStream = fs.createWriteStream('./data-store/new_chapter_img.json.gz');
    // const readUpdateStream = fs.createReadStream('./data-store/new_all_manga.json');
    // const writeCompressStream = fs.createWriteStream('./data-store/new_all_manga.json.gz');

    readUpdateStream
      .on("data", data => {
        console.log(data.toString());
      })
      .on("end", () => {
        console.log("LISTEN EVENT WAS END");
      })
      .pipe(zlib.createGzip())
      .pipe(writeCompressStream)
      .on('finish', () => {
        console.log('END 2.1. START 3');
        const readCompressStream = fs.createReadStream('./data-store/new_chapter_img.json.gz');
        // const readCompressStream = fs.createReadStream('./data-store/new_all_manga.json.gz');

        readCompressStream
          .pipe(zlib.createGunzip())
          .pipe(fs.createWriteStream('./data-store/chapter_img.json'))
          // .pipe(fs.createWriteStream('./data-store/all_manga.json'))
          .on('finish', () => {
            fs.unlink('./data-store/new_chapter_img.json.gz', (err) => {
              if (err) throw err;
              console.log('./data-store/new_chapter_img.json.gz was deleted');
            });
            fs.unlink('./data-store/new_chapter_img.json', (err) => {
              if (err) throw err;
              console.log('./data-store/new_chapter_img.json was deleted');
            });
            console.log('THE END!');
          })
      })
  });

// console.log('1.1');
// const readStream = fs.createReadStream('./data-store/abc.txt');
// const writeStream = fs.createWriteStream('./data-store/new_abc.txt');

// readStream
//   .on('data', data => {
//     const chunk = data.toString();
//     const newChunk = "My family is the best!!!!. " + chunk;
//     writeStream.write(JSON.stringify(newChunk));
//   })
//   .on('end', () => {
//     console.log('END 1.1. START 2.1');
//     const readUpdateStream = fs.createReadStream('./data-store/new_abc.txt');
//     const writeCompressStream = fs.createWriteStream('./data-store/new_abc.txt.gz');

//     readUpdateStream
//       .on("data", data => {
//         console.log(data.toString());
//       })
//       .on("end", () => {
//         console.log("LISTEN EVENT WAS END");
//       })
//       .pipe(zlib.createGzip())
//       .pipe(writeCompressStream)
//       .on('finish', () => {
//         console.log('END 2.1. START 3');
//         console.log('3');
//         const readCompressStream = fs.createReadStream('./data-store/new_abc.txt.gz');

//         readCompressStream
//           .pipe(zlib.createGunzip())
//           .pipe(fs.createWriteStream('./data-store/abc.txt'))
//           .on('finish', () => {
//             fs.unlink('./data-store/new_abc.txt.gz', (err) => {
//               if (err) throw err;
//               console.log('./data-store/new_abc.txt.gz was deleted');
//             });
//             fs.unlink('./data-store/new_abc.txt', (err) => {
//               if (err) throw err;
//               console.log('./data-store/new_abc.txt was deleted');
//             });
//             console.log('THE END!');
//           })
//       })
//   });