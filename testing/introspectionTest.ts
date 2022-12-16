import { Client, Pool, PoolClient } from '../deps.ts';
import { QueryBuilder } from '../library/querybuilder.ts';
import { poolConnection, query } from '../library/connection.ts';
import "https://deno.land/x/dotenv/load.ts";

// import '../testClassList1.js'

// import { config } from "../deps.ts"
import "https://deno.land/std@0.168.0/dotenv/mod.ts"
// app.ts
// import { config } from "https://deno.land/std@0.168.0/dotenv/mod.ts";

// console.log(await config.DatabaseURI());
console.log(Deno.env.get('SECRETPASS'));
const URI = Deno.env.get('DatabaseURI')

// console.log(config()
const ponder: QueryBuilder = await poolConnection(
  URI,
  3,
  true,
);

// console.log(await ponder.findAllinOne('basket_a'));

console.log( await ponder.introspect());

// const testBasket = new basket_a();
// ponder.disconnect();

// const password: string = config()['SECRETPASS']

// console.log('password', password)


// const tables = await query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'");
// const columnList = await query(`SELECT column_name, is_nullable, table_name, data_type FROM information_schema.columns WHERE table_schema = 'public' ORDER BY table_name;`);
// // console.log('list columns', columnList);
// const  people  = tables[10];
// console.log(people)