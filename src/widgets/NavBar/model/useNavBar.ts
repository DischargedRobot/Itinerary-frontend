import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react"

export const useNavBar = () => {

    const location = usePathname()


    return {selectedKeys: location}
}