// ! These functions will only be used on the server, we are importing 'server-only' so that the client cannot invoke these function.
// ! These functions will be used to get data in the server components

import "server-only";

export async function getPlayer() {}

export async function getRoom() {}

export async function getLeaderboardData() {}
