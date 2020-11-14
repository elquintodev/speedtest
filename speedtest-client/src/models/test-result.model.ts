export class TestResult {

    id: number;
    date: Date;
    downloadSpeed: number;
    uploadSpeed: number;

    constructor(obj?: any) {
        if (obj) {
            this.id = obj.id;
            this.date = (obj.date) ? new Date(obj.date) : undefined;
            this.downloadSpeed = (typeof obj.downloadSpeed === 'number') ? +obj.downloadSpeed : undefined;
            this.uploadSpeed = (typeof obj.uploadSpeed === 'number') ? +obj.uploadSpeed : undefined;
        }
    }

}
