import { Select } from "antd"
import { useSelectEquipment } from "../model"
import { IEquipment } from "@/shared/lib"
import css from "styled-jsx/css"

interface Props { 
    defaultValue: IEquipment
}

export const SelectEquipment = (props: Props) => {

    const {
        defaultValue
    } = props

    const { equipments } = useSelectEquipment()

    return (
        <Select
            className="text text_2very-litle"
            styles={{
                popup: {
                    root: {
                        width: 100
                    },
                    list: {
                        color: 'red',
                        width: 200,
                    }
            }}}
            options={equipments.map(equip => ({label: equip.name, value: equip.id}))}
            defaultValue={defaultValue}
        />
    )
}