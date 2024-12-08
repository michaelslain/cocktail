import { FC } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import Text from './Text'
import styles from './HyperLink.style'

interface HyperLinkProps extends TouchableOpacityProps {
    children: string
}

const HyperLink: FC<HyperLinkProps> = ({ children, style, ...props }) => {
    return (
        <TouchableOpacity {...props}>
            <Text style={[styles.text, style]}>{children}</Text>
        </TouchableOpacity>
    )
}

export default HyperLink
