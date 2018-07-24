//domain model
export class Asset {
    //declaration
    constructor(
        public assetId: string,
        public participantId: string, 
        public loanAmount: string, 
        public commitAmount: string, 
        public remAMount: string, 
        public loanCurrency: string, 
        public intRate: string, 
        public assetStatus: string,
        public zip: string
    ) {


    }
}