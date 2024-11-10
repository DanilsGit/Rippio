export const links = [
    {
        to: '/adminProfile/restaurantManagement',
        icon: 'https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FsettingsIcon.png?alt=media&token=10bb50e5-e52e-4516-9163-95f8bca1532b',
        text: 'Gestor de negocios'
    }
]

export const  formatDateYMDH_TO_DMY = (date) => {
    const DMY = date.split('T')[0].split('-').reverse().join('-');
    return DMY;
}