import { Avatar, Box, Flex, Text } from 'native-base';
import NavMenu from './NavMenu';

const Header = () => {
    return (
        <Flex minH="20"
            bg="amber.200"
            minW={'100%'}
            alignItems={'flex-end'}
            justifyContent={'space-between'}
            flexDir={'row'}
            p={2}
            pb={3}
        >
            <Flex flexDir={'row'} alignItems={'center'}>
                <NavMenu />
                <Text ml={2} fontSize={'xl'} fontWeight={'bold'}>NoteNest</Text>
            </Flex>
            <Avatar bg="green.500" size={'sm'} source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            }}>
                AJ
            </Avatar>
        </Flex>
    )
}

export default Header