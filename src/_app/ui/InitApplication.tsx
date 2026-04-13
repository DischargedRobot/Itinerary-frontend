"use client"

import { IUser, useUserStore } from "@/entities/User"
import { useEffect } from "react"
import { useInitial } from "../model"

interface Props {
    user?: IUser
}

export const InitApplication = ({ user }: Props) => {
    const setCurrentUser = useUserStore((state) => state.setCurrentUser)
    useInitial()
    useEffect(() => {
        if (!user) {
            return
        }

        setCurrentUser(user)
    }, [setCurrentUser, user])

    return null
}
