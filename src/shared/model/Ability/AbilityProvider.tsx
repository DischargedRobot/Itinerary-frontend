"use client"

import { createContext, useContext, ReactNode } from "react"
import { createContextualCan } from "@casl/react"
import { AbilityBuilder, createMongoAbility, MongoAbility } from "@casl/ability"
import { IUser } from "@/entities/User"

export type TRole = "Foreman" | "Executor"

export type Actions = "manage" | "read" | "create" | "update" | "delete"
export type Subjects = "all" | "Task" | "Operation" | "Executor" | "Department" | "User"

export type AppAbility = MongoAbility<[Actions, Subjects]>


const defaultAbility = createMongoAbility<AppAbility>(
    [{ action: "manage", subject: "all" },]
)

export const AbilityContext = createContext<AppAbility>(
    defaultAbility
)

export const Can = createContextualCan(AbilityContext.Consumer)

interface AbilityProviderProps {
    user?: IUser | null
    children: ReactNode
}

export const useAbility = () => useContext(AbilityContext)

export const AbilityProvider = ({ user, children }: AbilityProviderProps) => {
    const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility)

    const role = (user?.role ?? "") as string
    const isForeman = role === "Бригадир" || role === "Foreman"
    const isExecutor = role === "Исполнитель" || role === "Executor"

    if (isForeman) {
        can("manage", "all")
    } else if (isExecutor) {
        can("read", "all")

    }

    const ability = build()

    return (
        <AbilityContext.Provider value={ability}>
            {children}
        </AbilityContext.Provider>
    )
}
