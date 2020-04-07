import styled from 'styled-components';
import { Image } from 'semantic-ui-react'


export const StyledAvatar = styled(Image)({
    '&:hover': {
        cursor: 'pointer',
        transform: 'scale(1.5)'
    }
})
