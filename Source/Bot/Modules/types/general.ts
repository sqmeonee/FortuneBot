export interface DirData {
    path : string;
    isDirFunction? : (file : string, filePath : string) => any;
    validFileFunction? : (file : string, filePath : string) => any;
}