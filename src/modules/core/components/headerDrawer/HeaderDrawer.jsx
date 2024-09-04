import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import estilos from './headerDrawer.module.css';
import { Link } from 'react-router-dom';
import { Divider } from '@mui/material';
import { useAuth } from '@m/core/hooks/useAuth';

export default function HeaderDrawer() {
    const [open, setOpen] = React.useState(false);

    const isAuthenticated = useAuth((state) => state.isAuthenticated)

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 350 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {[['Principal', '/'], ['Restaurantes', '/allrestaurants'], ['Información', '/info']]
                    .map(
                        (text) => (
                            <ListItem key={text} disablePadding>
                                <Link className='headerNav-a' to={text[1]}>
                                    <ListItemButton>
                                        {/* <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon> */}
                                        <ListItemText primary={text[0]} />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        )
                    )}
            </List>
            <Divider />
            <List>
                {
                    isAuthenticated
                        ?
                        <>
                            <ListItem disablePadding>
                                <Link className='headerDrawerBtnAccess' to='/profile'>
                                    <ListItemButton>
                                        <ListItemText primary='Perfil' />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        </>
                        :
                        <>
                            <ListItem disablePadding>
                                <Link className='headerDrawerBtnAccess' to='/login'>
                                    <ListItemButton>
                                        <ListItemText primary='Ingresa' />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                            <ListItem disablePadding>
                                <Link className='headerDrawerBtnAccess' to='/login'>
                                    <ListItemButton>
                                        <ListItemText primary='Regístrate' />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        </>
                }
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={toggleDrawer(false)}>
                        <ListItemText primary='Cerrar' />
                    </ListItemButton>
                </ListItem>
            </List>

        </Box>
    );

    return (
        <div className='Header-Drawer'>
            <Button onClick={toggleDrawer(true)}><img className='drawerIcon' src='/principalPage/icons/optionLinesIcon.png' /></Button>
            <Drawer className={estilos.headerDrawerLi} anchor={'right'} open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}
