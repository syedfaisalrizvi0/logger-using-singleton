import * as fs from "fs";
import path from "path";

interface CONFIGURATION {
    fileName? : string | undefined ,
    filePath? : string | undefined
}
export default class Logger {
    private static _instance :Logger ;
    private _fileName : string;
    private _filePath : string;
    private constructor(config :CONFIGURATION){
        this._fileName  = config.fileName || new Date().toDateString() + ".txt";
        this._filePath  = config.filePath || "logs";
        if(!fs.existsSync(this._filePath)){
            fs.mkdir(path.join(this._filePath),(err)=>{
                if(err){
                    throw new Error(JSON.stringify(err));
                }
            });
        }
    }
    static getLogger(config? : CONFIGURATION ){
         if(!this._instance){
            this._instance = new Logger(config || {});
         }
         return this._instance;
    }
    getPath() :string {
          return path.join(this._filePath,this._fileName);
    }
    getContent(data : object | string ) :string {
        let postfix  = new Date()+ "\n";
        if(typeof data === "object") return JSON.stringify(data) +postfix;
        return data+postfix;
    }
    write(data : Object | string ) : void {
        try {
            fs.appendFileSync(this.getPath(),this.getContent(data));
        }
        catch(err : any){
            throw new Error(JSON.stringify(err));
        }
    }
}