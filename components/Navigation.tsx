import { FC } from 'react'
import { useNavigation } from '../contexts/NavigationContext'
import Home from '../pages/Home'
import Drug from '../pages/Drug'
import Interactions from '../pages/Interactions'

const Navigation: FC = () => {
    const { currentPage } = useNavigation()

    switch (currentPage) {
        case 'drug':
            return <Drug />
        case 'interactions':
            return <Interactions />
        default:
            return <Home />
    }
}

export default Navigation
