//file to create classes and definitions to map commands to PostGres
//filling out the rows on our tables here retrieving and adding/info

import { Pool, PoolClient, Client } from "../deps.ts"; 

import { poolConnection, query, poolDisconnect } from "./connection.ts";

//starting queries
    //select, where, update, delete, insert, create table

    //join could be second half
// we have to declare the types before the constructor
export class QueryBuilder {
    pool: Pool
    constructor(pool: Pool){
        //old parameters:
        // URI: string, pools: number, isLazy: boolean
        //we had tried putting connection method here but did not work
        //release method was not found
        //open the pool
        // this.pool = new Pool(URI, pools, isLazy)
        this.pool = pool;
    }

    //first method, find all data from a table
    async findAllinOne(table: string) {
        // connect via this.pool
        // const connect = await this.pool.connect();
        //take in argument to make query to run
        const queryStr  = `SELECT * FROM ${table};`;
        //execute actual query by passing string into query function imported from connection
        //which will also create individual connection and release after return
        const result = await query(queryStr);
        //execute actual query passing in query string made from arguments
        // const { rows } = await connect.queryObject(queryStr);
        //release pool connection
        // connect.release();
        //then will return result from query to where findAllinONe is being called
        return result;        
    }
    //disconnecting with our pool here. User will have to disconnect manually, if they so choose



//everything above here is for the SQL user testing.



















































































































    //Below this is Model functionality:
    
    async createTable(tableName: string, columns: any) {
        //convert args into SQL command to create a new table
        // const heffalumpCreateTable = `CREATE TABLE ${tableName} args1, args2, args3, etc' --> Maybe use Object.keys(args) to get column names; iterate through and concatenate to this string
        // connection.query(heffalumpCreateTable)  --> sends create table to our sequel database
        //create a pool connection, disconnect after we create a string
        //use for in to iterate over the args obj to get the columns
        //removed brackets around if not exists
        
        const args = columns;
        let tableQueryString = `CREATE TABLE IF NOT EXISTS ${tableName} (`;
        for (const columns in args) {
          //first check to see if value of key-value pair is array of data
          let tempString = "";
          if (Array.isArray(args[columns])) {
            //console.log("is array?");
            //need to spread out array elements
            for (let i = 0; i < args[columns].length; i++) {
              if (i === 0) {
                //console.log("inside for loop");
                //datatype
                tempString = tempString.concat(`${args[columns][i]}`);
                //console.log("first loop pass string. Sam is found:", tempString);
              } else if (i === 1) {
                //length
                tempString = tempString.concat(`(${args[columns][i]})`);
              } else {
                //any column-constraints
                tempString = tempString.concat(` ${args[columns][i]}`);
                //console.log("third pass. Matt says this better work:", tempString);
              }
            }
          } //---> we're going to force user to use no arrays //need a helper function to make sure that users are using the correct data type
          tableQueryString = tableQueryString.concat(`${columns} ${tempString},`);
        }
        //we've added all the columns to the tablequery string
        //remove that last comma
        const stringWithoutFinalComma = tableQueryString.slice(0, -1);
        const finalQuery = stringWithoutFinalComma.concat(");");
        //console.log(
          //"Supreme Commander Stella is pleased with final query. Vice Supreme Comander Corey is stil not impressed:",
          //finalQuery,
        //);
        //const connect = await this.pool.connect();//update logic understand connection to DB
            //execute actual query passing in query string made from arguments
            await query(finalQuery); //does createTable return anything
            //release pool connection
            //if success
            
            const response = `${tableName} has been created!`;
            //then will return result from query to where findAllinONe is being called
            return response;      
      }
    //disconnecting with our pool here. User will have to disconnect manually, if they so choose
    async disconnect() {
      await poolDisconnect();
      console.log('truly disconnect and feed me cat father - Tinsely')
  } 
}


//for now, exporting for use to Workspace, but eventually will export or be packaged for use as module hosted on deno.land
// export queryBuilder;


//originally
    //connection was in User
    //QueryBuilder "method" was able to work (from querybuilder file)

    //conection will be in querybuilder file, in a new func called connecitonbuilder
    //querybuilder mehtod, still lives in querybuilder file