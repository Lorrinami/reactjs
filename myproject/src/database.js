import sqlite3 from 'sqlite3';
import * as tabeles from './tables';
export const db = new sqlite3.Database('./db.sqlite');

export const getSql = (query) => {
    return new Promise((resolve,reject) => {
        console.log(query.text);
        db.all(query.text, query.values, (err, rows) => {
            if(err){
                reject(err);
            }else{
                resolve(rows);
            }
        })
    })
}