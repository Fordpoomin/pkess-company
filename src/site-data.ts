export type NavLink = {
  label: string
  href: string
  description?: string
}

export type NavGroup = {
  title: string
  href: string
  accent: string
  links: NavLink[]
}

export const productGroups: NavGroup[] = [
  {
    title: 'UPS',
    href: '/category?category=UPS',
    accent: 'Power Backup',
    links: [
      { label: 'Eaton', href: '/category?category=UPS&subcategory=EATON+UPS', description: 'UPS สำหรับงาน critical load' },
      { label: 'Schneider (APC)', href: '/category?category=UPS&subcategory=SCHNEIDER+%28APC%29', description: 'โซลูชันสำหรับ data center และอาคาร' }
    ]
  },
  {
    title: 'Battery VRLA',
    href: '/category?category=Battery+VRLA',
    accent: 'Reliable Runtime',
    links: [
      { label: 'FIAMM', href: '/category?category=Battery+VRLA&subcategory=FIAMM' },
      { label: 'VISION', href: '/category?category=Battery+VRLA&subcategory=VISION' },
      { label: 'PKESS', href: '/category?category=Battery+VRLA&subcategory=PKESS' },
      { label: 'Sacred Sun', href: '/category?category=Battery+VRLA&subcategory=Sacred+Sun' }
    ]
  },
  {
    title: 'Battery Lithium',
    href: '/category?category=Battery+Lithium',
    accent: 'Compact Energy',
    links: [
      { label: 'VISION', href: '/category?category=Battery+Lithium&subcategory=VISION', description: 'ลิเธียมขนาดกะทัดรัดพร้อมประสิทธิภาพสูง' }
    ]
  },
  {
    title: 'BMS',
    href: '/category?category=BMS',
    accent: 'Smart Monitoring',
    links: [
      { label: 'Cellwatch', href: '/detail?category=BMS&detail=Cellwatch+Eaton' },
      { label: 'PKBMS', href: '/detail?category=BMS&detail=PKBMS' },
      { label: 'PBMS 9000 Pro', href: '/detail?category=BMS&detail=PBMS9000Pro' }
    ]
  }
]

export const serviceLinks: NavLink[] = [
  {
    label: 'For SLA Battery',
    href: '/service/sla-battery',
    description: 'ตรวจเช็กและบำรุงรักษาระบบแบตเตอรี่สำรอง'
  },
  {
    label: 'For Lithium Battery',
    href: '/service/lithium-battery',
    description: 'บริการออกแบบ ดูแล และประเมินสมรรถนะระบบลิเธียม'
  }
]

export const menuGroupLinks: NavLink[] = [
  { label: 'Product', href: '/products' },
  { label: 'Service', href: '/services' }
]

export const primaryLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Project', href: '/project' },
  { label: 'Site References', href: '/references' },
  { label: 'Contact Us', href: '/contact' }
]

export const homeSections = [
  '/assets/images/row1.png',
  '/assets/images/row2.png',
  '/assets/images/row4.png',
  '/assets/images/row5-1.png',
  '/assets/images/row5-2.png',
  '/assets/images/row6.png',
  '/assets/images/row7.png',
  '/assets/images/row8.png',
  '/assets/images/row9-1.png',
  '/assets/images/row9-2.png',
  '/assets/images/row9-3.png',
  '/assets/images/row10-1.png',
  '/assets/images/row10-2.png',
  '/assets/images/row11-1.png',
  '/assets/images/row11-2.png'
]
