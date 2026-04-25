import { pageRegistry } from './pageRegistry'

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const menuStructure = [
  { title: 'Home', children: [] },
  {
    title: 'User',
    children: [
      'Agent & Sub-agent Management',
      'End-user',
      'Sub-agent Family',
      'Referral management & Report',
      'Certification Management',
      'Portfolio report',
      'Member Media and Announcement',
    ],
  },
  { title: 'Sale', children: ['Sale Management', 'Sale Network Management'] },
  {
    title: 'Campaign & Point',
    children: ['Campaign Management', 'QR Code Management', 'Direct Point', 'Point Transfer Report'],
  },
  {
    title: 'Reward & Redemption',
    children: ['Reward Item Management', 'E-Voucher Management', 'Redemption management', 'Redemption Report'],
  },
  { title: 'Receipt Scanner', children: ['Manage & Verify & Fraud', 'OCR Sampling Check'] },
  { title: 'Media & Content', children: ['Inspiring Catalog', 'Knowledge Base'] },
  {
    title: 'Settings',
    children: ['Admin Management', 'External link settings', 'Consent Management'],
  },
  {
    title: 'Builder',
    children: ['Form Builder', 'Table Builder'],
  },
]

const userMenu = [
  { type: 'item', label: 'My Profile' },
  { type: 'item', label: 'Change Password' },
  { type: 'divider' },
  { type: 'item', label: 'logout' },
]

const registryByKey = new Map(pageRegistry.map((page) => [`${page.section}::${page.title}`, page]))

export const getSpecsModel = () => {
  const navItems = menuStructure.map((section) => {
    if (section.title === 'Home') {
      return { type: 'single', title: 'Home', route: '/home' }
    }

    return {
      type: 'section',
      title: section.title,
      children: section.children.map((title) => {
        const fallbackRoute = `/${slugify(section.title)}/${slugify(title)}`
        const item = registryByKey.get(`${section.title}::${title}`)

        if (!item) {
          return {
            section: section.title,
            title,
            route: fallbackRoute,
            hasListView: false,
            hasDetailView: false,
            hasReportView: false,
            ListComponent: null,
            DetailComponent: null,
            ReportComponent: null,
          }
        }

        return item
      }),
    }
  })

  const routes = new Map()
  navItems.forEach((item) => {
    if (item.type === 'single') {
      routes.set(item.route, item)
      return
    }
    item.children.forEach((child) => routes.set(child.route, child))
  })

  return {
    navItems,
    userMenu,
    routes,
    loginSpec: '',
    homeSpec: '',
    appVersion: 'v0.1.0',
  }
}
