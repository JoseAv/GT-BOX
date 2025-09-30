import type { saveJWt } from "../interfaces/login.js"

class cacheUser {
    users: Record<number, saveJWt> = {}

    saveUser = ({ user }: { user: saveJWt }) => {
        this.users = { ...this.users, [user.id]: { ...user } }
        return
    }

    ChangeUser = ({ user }: { user: saveJWt }) => {
        if (!this.users)
            return

        this.users = Object.entries(this.users).reduce((acc, [key, value]) => {
            if (user.id === +key)
                return acc
            acc[+key] = value;
            return acc;
        }, {} as Record<string, saveJWt>);
        return
    }

    searchUser = ({ user }: { user: saveJWt }) => {
        return this.users[user.id] ?? user
    }


}


export const usersCache = new cacheUser()