import csvParse from "csv-parse";
import fs from "fs";

class ImportCategoryUseCase {
  execute(file: Express.Multer.File): void {
    const stream = fs.createReadStream(file.path);
    const parsefile = csvParse();
    stream.pipe(parsefile);

    parsefile.on("data", async (line) => {
      console.log(line);
    });
  }
}

export { ImportCategoryUseCase };
