const sql=require('mysql2');
const fs = require('fs');
class database{
    constructor(configFile,tableName){
        this.dbConfig=JSON.parse(fs.readFileSync(configFile));
        this.con=sql.createConnection(this.dbConfig);
        this.tableName=tableName;
    }
    insert(keyValuePairFile) {
        const keyValue=JSON.parse(fs.readFileSync(keyValuePairFile));
        this.con.connect(function(err){
            if(err) throw err;
            console.log("Connected");
        });
        const colNames=Object.keys(keyValue).join(",");
        const value=Object.values(keyValue);
        const querys=`INSERT INTO railway.${this.tableName}(${colNames}) VALUES(?)`;
        this.con.query(querys,[value],(error)=>{
            if(error){
                console.error("error",error);
                return;
            }
            else{
                console.log("Record insurted");
            }
        });
    
    };
}
const db=new database("db_config.json","inserttest");
db.insert("insertKeyValue.json");