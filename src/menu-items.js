export default {
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
                            title: 'Pasien',
                            type: 'item',
                            url: '/management/patient'
                        },
                        {
                            id: 'medicine',
                            title: 'Obat',
                            type: 'item',
                            url: '/management/medicine'
                        },
                        {
                            id: 'request',
                            title: 'Pemeriksaan',
                            type: 'item',
                            url: '/management/request'
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
                    id: 'profile',
                    title: 'Profile',
                    type: 'item',
                    icon: 'feather icon-file',
                    url: '/profile'
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