const sql=require('mysql2');
const fs = require('fs');
const prompt=require("prompt-sync")({sigint:true});
const dbConfig=JSON.parse(fs.readFileSync('db_config.json'));
const con=sql.createConnection(dbConfig);
const keyValue={
   table:"inserttest",id:"2",name:"cjhs",age:23

};
function insert(keyValue,con) {
    con.connect(function(err){
        if(err) throw err;
        console.log("Connected");
    });
    const querys=`INSERT INTO railway.${keyValue.table}(id,name,age) VALUES(${keyValue.id},"${keyValue.name}",${keyValue.age})`;
    con.query(querys,(error)=>{
        if(error){
            console.error("error",error);
            return;
        }
    });

};

insert(keyValue,con);
