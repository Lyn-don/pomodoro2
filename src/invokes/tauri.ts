/*
    This file contains methods to get data from tauri's api.
    Like os type and window settings
*/
import { invoke } from "@tauri-apps/api/tauri";

async function play_alarm() {
	await invoke("play_alarm");
}

export { play_alarm };
