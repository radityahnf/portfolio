import { Poppins, DM_Sans } from 'next/font/google'

export const poppins_init = Poppins({
    subsets: ['latin'],
    display: 'swap',
    weight: ["400", "500", "600", "700"],
    variable: '--font-poppins'
})

export const dm_sans_init = DM_Sans({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-dm-sans',
    weight: ["400", "500", "600", "700"]
    
})

export const poppins = poppins_init.className
export const dm_sans = dm_sans_init.className