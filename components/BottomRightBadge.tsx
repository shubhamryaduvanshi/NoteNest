import { Box, Text } from "native-base"

interface BottomRightBadgeProps {
    textToShow: string
}

const BottomRightBadge = ({ textToShow }: BottomRightBadgeProps) => {
    return (
        <Box position={'absolute'} right={2} bottom={2} bgColor={'blueGray.100'} px={2} rounded={'full'}>
            <Text fontSize={'xs'}>
                {textToShow}
            </Text>
        </Box>
    )
}

export default BottomRightBadge