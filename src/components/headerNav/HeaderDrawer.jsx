import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import estilos from './headerDrawer.module.css';

export function HeaderDrawer() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 350 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {['Principal', 'Categorías', 'Acerca de nosotros'].map(
                    (text) => (
                        <ListItem key={text} disablePadding>
                        <a className='header-a' href='#'>
                            <ListItemButton>
                                {/* <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon> */}
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </a>
                        </ListItem>
                    )
                )}
            </List>
        </Box>
    );

    return (
        <div className='Header-Drawer'>
            <Button onClick={toggleDrawer(true)}><img className='drawerIcon' src='/principalPage/icons/optionLinesIcon.png'/></Button>
            <Drawer className={estilos.headerDrawerLi} anchor={'right'} open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}
