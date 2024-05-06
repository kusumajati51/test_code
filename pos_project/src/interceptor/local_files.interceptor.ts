import { Injectable, mixin, NestInterceptor, Type } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage } from "multer";
import { extname } from "path";

interface LocalFilesInterceptorOptions {
  fieldName: string;
  path?: string;
}
 
export default function LocalFilesInterceptor(options : LocalFilesInterceptorOptions): Type<NestInterceptor>{
  @Injectable()
  class Interceptor implements NestInterceptor {
    fileInterceptor: NestInterceptor;
    constructor(configService: ConfigService) {
      const filesDestination = configService.get('UPLOADED_FILES_DESTINATION');
      const destination = `${filesDestination}${options.path}`
      console.log(destination)
 
      const multerOptions: MulterOptions = {
        storage: diskStorage({
          destination,
          filename: this.editFileName
          
        })
      }
 
      this.fileInterceptor = new (FileInterceptor(options.fieldName, {...multerOptions, fileFilter: this.imageFilter}));
    } 
    intercept(...args: Parameters<NestInterceptor['intercept']>) {
      return this.fileInterceptor.intercept(...args);
    } 

    imageFilter(req, file, callback) {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
      }
      callback(null, true);
    }

    editFileName(req, file, callback) {
      const name = file.originalname.split('.')[0];
      const fileExtName = extname(file.originalname);
      const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      callback(null, `${name}-${randomName}${fileExtName}`);
    }
    
    
  }
  return mixin(Interceptor);
}