"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSession = getSession;
const iron_session_1 = require("iron-session");
const headers_1 = require("next/headers");
const session_1 = require("./session");
async function getSession() {
    const cookieStore = await (0, headers_1.cookies)();
    const session = await (0, iron_session_1.getIronSession)(cookieStore, session_1.sessionOptions);
    return session;
}
