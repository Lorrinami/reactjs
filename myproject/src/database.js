import sqlite3 from 'sqlite3';
import * as tabeles from './tables';
export const db = new sqlite3.Database('./db.sqlite');

export const getSql = (query) => {
    return new Promise((resolve,reject) => {
        console.log(query.text);
        console.log(query.value);
        db.all(query.text, query.value, (err, rows) => {
            if(err){
                reject(err);
            }else{
                resolve(rows);
            }
        })
    })
}