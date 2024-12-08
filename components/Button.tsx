import { FC, ReactNode } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import styles from './Button.style'
import Text from './Text'

interface ButtonProps extends TouchableOpacityProps {
    children: ReactNode
}

const Button: FC<ButtonProps> = ({ children, style, ...props }) => {
    return (
        <TouchableOpacity style={[styles.button, style]} {...props}>
            <Text>{children}</Text>
        </TouchableOpacity>
    )
}

export default Button
