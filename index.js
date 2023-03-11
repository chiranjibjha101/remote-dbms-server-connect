const sql = require('mysql2');
const fs = require('fs');
class database {
    constructor(configFile, tableName) {
        this.dbConfig = JSON.parse(fs.readFileSync(configFile));
        this.con = sql.createConnection(this.dbConfig);
        this.tableName = tableName;
    }
    insert(keyValuePairFile) {
        const keyValue = JSON.parse(fs.readFileSync(keyValuePairFile));
        this.con.connect(function (err) {
            if (err) throw err;
            console.log("Connected");
        });
        const colNames = Object.keys(keyValue).join(",");
        const value = Object.values(keyValue);
        const querys = `INSERT INTO railway.${this.tableName}(${colNames}) VALUES(?)`;
        this.con.query(querys, [value], (error) => {
            if (error) {
                console.error("error", error);
                return;
            }
            else {
                console.log("Record insurted");
            }
        });

    };
    delete(colName,values){   //values=[];
        for(let i=0;i<values.length;i++){
            const querys=`DELETE FROM railway.${this.tableName} WHERE ${colName}=${values[i]};`;
            this.con.query(querys,(error)=>{
                if(error){
                    console.log("some error happend");
                }
                else{
                    console.log("Record deleted");
                }
            });
        }
    };

    update(colName,colValue,colNameOfPrevValue,updatedValues){
        
        const querys=`UPDATE railway.${this.tableName} SET ${colNameOfPrevValue} = '${updatedValues}' WHERE ${colName} = '${colValue}';`;
        this.con.query(querys,(error)=>{
            if(error){
                console.log("some error happend");
            }
            else{
                console.log("Record Updated");
                }
        });
    };

    read(listOfColToSelect,colName,condition){  //listOfcoltSelect=[];
        let listOfcol=listOfColToSelect.join(",");
        const querys=`SELECT ${listOfcol} from railway.${this.tableName} WHERE ${colName}='${condition}';`;
        this.con.query(querys,(error,result)=>{
            if(error){
                console.log("can not read data");
            }
            else{
                console.log(result);
            }

        });
    };
    endConnection(){
        this.con.end((err)=>{
            if(err){
                console.log("can not end connection");
            }
            else{
                console.log("Connection ended");
            }
        });
    };

}
const db = new database("db_config.json", "inserttest");
db.endConnection();