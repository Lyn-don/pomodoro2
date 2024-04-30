import { invoke } from "@tauri-apps/api/tauri";

/**
 *
 * @param db
 */
async function createDb(db: string) {
	await invoke("create_db", { db: db });
}

/**
 *
 * @param db
 * @param table
 */
async function createTable(db: string, table: string) {
	await invoke("create_table");
}

/**
 *
 * @param db
 * @param query
 */
async function insertRow(db: string, query: string) {
	await invoke("insert_row", { db: db, query: query });
}

/**
 *
 * @param {string} db
 * @param {string} table
 * @param {number} id
 */
async function deleteRow(db: string, table: string, id: number) {
	await invoke("delete_row", { db: db, table: table, id: id });
}

/**
 * gets all tasks in the task table
 * @returns {Promise<object[]>}
 */
async function getTask(): Promise<object[]> {
	let tasks: object[] = await invoke("get_tasks").then((res: any) =>
		JSON.parse(res)
	);
	return tasks;
}

export { createDb, createTable, insertRow, deleteRow, getTask };
