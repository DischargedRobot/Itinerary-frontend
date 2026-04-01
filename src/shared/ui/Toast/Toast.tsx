'use client'

import './Toast.scss'

import { useToast } from "@/shared/model/Toast"
import { TToast } from "@/shared/model/Toast/useToastStore"
import { CheckOutlined, ExclamationOutlined, WarningOutlined } from "@ant-design/icons"

const icons = new Map<TToast, React.ReactNode>([
    ['warning', <WarningOutlined className="toast__icon" key={'warning'}/>],
    ['success', <CheckOutlined className="toast__icon" key={'success'}/>],
    [ 'error', <ExclamationOutlined className="toast__icon" key={'error'}/>],
])

export const Toast = () => {

    const {
        title,
        message,
        type,
        isVisible,
        isFade,
        toast,
    } = useToast()

    console.log(isVisible, 'TOAST', isFade)
    return (
        isVisible 
        ? (
            <div ref={toast} className={`toast z-50 ${'toast_'+type} ${isFade ?  'toast_fade-out' : 'toast_fade-in'}`}>
                {icons.get(type)}
                <h5 className="toast__title">{title}</h5>
                <span className="toas__text">{message}</span>
            </div>
        )
        : ''
    )

}