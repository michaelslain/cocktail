import { FC, ReactNode } from 'react'
import { Text as RNText, TextProps } from 'react-native'
import styles from './Text.style'

interface CustomTextProps extends TextProps {
    children: ReactNode
}

const Text: FC<CustomTextProps> = ({ children, style, ...props }) => {
    return (
        <RNText style={[styles.text, style]} {...props}>
            {children}
        </RNText>
    )
}

export default Text
