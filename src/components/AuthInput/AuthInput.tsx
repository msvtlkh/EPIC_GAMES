import styles from './AuthInput.module.scss'

interface InputInterface {
    placeholder: string,
    name: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    type?: string
}

export default function AuthInput(props: InputInterface) {
    const { placeholder, name, value, onChange, type } = props

    return(
        <>
            <input type={type} placeholder={placeholder} className={styles.input} name={name} value={value} onChange={onChange} required/>
        </>
    )
}