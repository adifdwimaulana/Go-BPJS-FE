import cookie from 'react-cookies'

let route;

if(cookie.load('roleId') < 3){
    route = {
        items: [
            {
                id: 'navigation',
                title: 'Navigation',
                type: 'group',
                icon: 'icon-navigation',
                children: [
                    {
                        id: 'dashboard',
                        title: 'Dashboard',
                        type: 'item',
                        url: '/dashboard',
                        icon: 'feather icon-home',
                    },
                    {
                        id: 'management',
                        title: 'Manajemen',
                        type: 'collapse',
                        icon: 'feather icon-file-text',
                        children: [
                            {
                                id: 'patient',
                                title: 'Anggota',
                                type: 'item',
                                url: '/management/patient'
                            },
                            {
                                id: 'request',
                                title: 'Pemeriksaan',
                                type: 'item',
                                url: '/management/request'
                            },
                        ]
                    },
                    {
                        id: 'logout',
                        title: 'Keluar',
                        type: 'item',
                        icon: 'feather icon-log-out',
                        url: '/logout'
                    }
                ]
            }
        ]
    }
} else {
    route = {
        items: [
            {
                id: 'navigation',
                title: 'Navigation',
                type: 'group',
                icon: 'icon-navigation',
                children: [
                    {
                        id: 'dashboard',
                        title: 'Dashboard',
                        type: 'item',
                        url: '/dashboard',
                        icon: 'feather icon-home',
                    },
                    {
                        id: 'management',
                        title: 'Manajemen',
                        type: 'collapse',
                        icon: 'feather icon-file-text',
                        children: [
                            {
                                id: 'medicine',
                                title: 'Obat',
                                type: 'item',
                                url: '/management/medicine'
                            },
                            {
                                id: 'reqmed',
                                title: 'Permintaan Obat',
                                type: 'item',
                                url: '/management/reqmed'
                            }
                        ]
                    },
                    {
                        id: 'logout',
                        title: 'Keluar',
                        type: 'item',
                        icon: 'feather icon-log-out',
                        url: '/logout'
                    }
                ]
            }
        ]
    }
}



export default route