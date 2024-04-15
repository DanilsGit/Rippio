import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

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
                        <a href='#'>
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
            <Button onClick={toggleDrawer(true)}><img className='drawerIcon' src='/icons/optionLinesIcon.png'/></Button>
            <Drawer anchor={'right'} open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}
