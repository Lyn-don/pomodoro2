// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::io::BufReader;

use rusqlite::{Connection,Result};
use serde::Serialize;
use std::fs::File;
use rodio::{Decoder, OutputStream, source::Source};


// create the error type that represents all errors possible in our program
#[derive(Debug, thiserror::Error)]
enum Error {
  #[error(transparent)]
  Io(#[from] std::io::Error)
}

// we must manually implement serde::Serialize
impl serde::Serialize for Error {
  fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
  where
    S: serde::ser::Serializer,
  {
    serializer.serialize_str(self.to_string().as_ref())
  }
}

#[derive(Debug, Serialize)]
struct Task{
    id: i32,
    task: String,
    timestamp: i64,
    complete: i64
}

#[tauri::command]
fn play_alarm(){
// Get a output stream handle to the default physical sound device
let (_stream, stream_handle) = OutputStream::try_default().unwrap();
let file = BufReader::new(File::open("./media/alarm.wav").unwrap());
let source = Decoder::new(file).unwrap();
stream_handle.play_raw(source.convert_samples()).unwrap();
std::thread::sleep(std::time::Duration::from_secs(5));
}

//creates the the db if it doesn't exist
#[tauri::command]
fn create_db(db: String)-> Result<(),String> {
    //creates a connection to the database
    Connection::open(format!("{}.db",db)).map_err(|err| err.to_string())?;
    Ok(())
}

//creates a table in the database
#[tauri::command]
fn create_table(db:String ,query: String) -> Result<(),String> {
    //creates a connection to the database
    let conn = Connection::open(format!("{}.db",db)).map_err(|err| err.to_string())?;

    //creates a table in the database
    conn.execute(
        format!("{}",query).as_str(),
        [],
    ).map_err(|err| err.to_string())?;

    Ok(())
}
/*
 "CREATE TABLE IF NOT EXISTS task (
                id INTEGER PRIMARY KEY,
                task TEXT NOT NULL,
                timestamp BIGINT NOT NULL,
                completed BIGINT NOT NULL
            );"
 */

#[tauri::command]
fn insert_row(
    db: String,
    query: String,
) -> Result<(), String> {

    //creates a connection to the database
    let conn = Connection::open(format!("{}.db",db)).map_err(|err| err.to_string())?;

    //inserts a new task into the database
    conn.execute(&query,[]).map_err(|err| err.to_string())?;

    if conn.changes()>0 {
        Ok(())
    }else{
        Err(String::from("Insertion failed!"))
    }
}

#[tauri::command]
fn delete_row(id: i32, table: String, db: String) -> Result<(),String> {

    //creates a connection to the database
    let conn = Connection::open(format!("{}.db",db)).map_err(|err| err.to_string())?;

    //creates a table in the database
    conn.execute(
        format!(
            "DELETE FROM {} WHERE id={};",
            table,id  
        ).as_str(),
        [],
    ).map_err(|err| err.to_string())?;

    Ok(())
}

//gets all task from the database
#[tauri::command]
fn get_tasks() -> Result<Vec<Task>,Error> {
    //creates a connection to the database
    let conn = Connection::open("user_data.db").unwrap();

    //gets all api keys from the database
    let mut stmt = conn.prepare("SELECT id, task, timestamp, complete FROM task;").unwrap();

    let iterator = stmt.query_map([], |row| {
           
               let id:i32 = row.get(0)?;
               let task:String= row.get(1)?;
               let timestamp:i64= row.get(2)?;
               let complete:i64= row.get(3)?;

                Ok(Task {
                     id,
                     task,
                     timestamp,
                     complete
                })
            }).unwrap().map(|result| result.unwrap()).collect::<Vec<Task>>();
    
    let mut tasks = Vec::new();

    for task in iterator {
        tasks.push(task);
    };
        Ok(tasks)

}



fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![delete_row,insert_row,create_table,create_db,get_tasks,play_alarm])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
