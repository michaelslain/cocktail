import { FC } from 'react'
import { useNavigation } from '../contexts/NavigationContext'
import Home from '../pages/Home'
import Drug from '../pages/Drug'

const Navigation: FC = () => {
    const { currentPage } = useNavigation()

    switch (currentPage) {
        case 'home':
            return <Home />
        case 'drug':
            return <Drug />
        default:
            return <Home />
    }
}

export default Navigation
