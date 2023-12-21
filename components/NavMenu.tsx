import { Box, Menu, HamburgerIcon } from "native-base";
import { Pressable } from "react-native";


const NavMenu = () => {
    return (
        <Box alignItems="center">
            <Menu w="190" trigger={triggerProps => {
                return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                    <HamburgerIcon size="6" />
                </Pressable>;
            }}>
                <Menu.Item>Arial</Menu.Item>
                <Menu.Item>Nunito Sans</Menu.Item>
                <Menu.Item>Roboto</Menu.Item>
                <Menu.Item>Poppins</Menu.Item>
                <Menu.Item>SF Pro</Menu.Item>
                <Menu.Item>Helvetica</Menu.Item>
                <Menu.Item isDisabled>Sofia</Menu.Item>
                <Menu.Item>Cookie</Menu.Item>
            </Menu>
        </Box>
    )
}

export default NavMenu