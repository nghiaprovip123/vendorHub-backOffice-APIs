import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, SessionCardData } from './session';

export async function getSession() {
    const cookieStore = await cookies();
    const session = await getIronSession<SessionCardData>(cookieStore, sessionOptions);
    return session;
}