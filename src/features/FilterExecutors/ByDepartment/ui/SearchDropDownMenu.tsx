'use client'

import { useState, useRef, useEffect, useMemo, ChangeEvent, KeyboardEvent } from 'react'

export interface DropdownOption<T> {
    value: T
    label: string
}

interface SearchableDropdownProps<T> {
    options: DropdownOption<T>[]
    value: T | null
    onSelect: (value: T | null) => void
    placeholder?: string
    disabled?: boolean
    className?: string
}

export const SearchDropDownMenu = <T,>({
    options,
    value,
    onSelect,
    placeholder = 'Выберите...',
    disabled = false,
    className = ''
}: SearchableDropdownProps<T>) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [userInput, setUserInput] = useState<string>('')
    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Вычисляем отображаемое значение
    const searchTerm = useMemo(() => {
        if (isOpen) {
            return userInput
        }
        
        if (userInput.length === 0 && value !== null){
            console.log(userInput, 'ss', value)
            return userInput
        }

        if (value !== null && value !== undefined) {
            const selected = options.find(opt => opt.value === value)
            return selected ? selected.label : ''
        }
        
        return ''
    }, [isOpen, userInput, value, options])

    const filteredOptions: DropdownOption<T>[] = useMemo(() => 
        options.filter(option =>
            option.label.toLowerCase().includes(userInput.toLowerCase())
        ),
        [options, userInput]
    )

    const isUserInputValid = useMemo(() => {
        const selected = options.find(opt => opt.value === value)
        return selected ? userInput.toLowerCase() === selected.label.toLowerCase() : false
    }, [userInput, value, options])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false)
                if (!isUserInputValid) {
                    setUserInput('')
                    onSelect(null)
                }
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isUserInputValid, onSelect])

    const handleSelect = (option: DropdownOption<T> | null): void => {
        onSelect(option?.value ?? null)
        setUserInput(option?.label ?? '')
        setIsOpen(false)
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setUserInput(e.target.value)
        setIsOpen(true)
    }

    const handleInputClick = (): void => {
        setIsOpen(true)
        inputRef.current?.select()
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Escape') {
            setIsOpen(false)
            setUserInput('')
            onSelect(null)
            inputRef.current?.blur()
        }
        if (e.key === 'Enter' && filteredOptions.length > 0 && isOpen) {
            e.preventDefault()
            if (e.currentTarget.value.length === 0) {
                handleSelect(null)
            }
            handleSelect(filteredOptions[0])
        }
    }

    return (
        <div ref={containerRef} className={`relative w-full max-w-xs ${className}`}>
            <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                onClick={handleInputClick}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={disabled}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-foreground 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         disabled:bg-gray-100"
                autoComplete="off"
            />
            
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault()
                    setIsOpen(!isOpen)
                    inputRef.current?.focus()
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text"
            >
                <svg className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && !disabled && (
                <div className="absolute z-50 w-full mt-1 bg-foreground border border-gray-300 
                              rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredOptions.length === 0 ? (
                        <ul className="px-4 py-3 text-gray-500 text-sm">Ничего не найдено</ul>
                    ) : (
                        filteredOptions.map((option) => (
                            <li
                                key={String(option.value)}
                                onClick={() => handleSelect(option)}
                                onMouseDown={(e) => e.preventDefault()}
                                className={`px-4 py-2 hover:bg-blue-50 cursor-pointer 
                                         ${option.value === value ? 'bg-blue-100' : ''}`}
                            >
                                {option.label}
                            </li>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}