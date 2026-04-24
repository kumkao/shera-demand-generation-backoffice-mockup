import { useMemo, useState } from 'react'
import { AppShell, Avatar, Burger, Group, Menu, NavLink, ScrollArea, Text, UnstyledButton } from '@mantine/core'
import {
  IconChevronRight,
  IconHome2,
  IconLockPassword,
  IconLogout2,
  IconSettings,
  IconUserCircle,
} from '@tabler/icons-react'
import { Link, useLocation } from 'react-router-dom'

const menuIconMap = {
  Home: IconHome2,
  User: IconUserCircle,
  Sale: IconSettings,
  'Campaign & Point': IconSettings,
  'Reward & Redemption': IconSettings,
  'Receipt Scanner': IconSettings,
  'Media & Content': IconSettings,
  Settings: IconSettings,
}

function PrivateLayout({ navItems, userMenu, appVersion, username, children, onLogout }) {
  const location = useLocation()
  const [opened, setOpened] = useState(false)

  const currentPath = location.pathname

  const userMenuItems = useMemo(() => {
    return userMenu.map((item, index) => {
      if (item.type === 'divider') {
        return <Menu.Divider key={`divider-${index}`} />
      }

      const lower = item.label.toLowerCase()
      if (lower.includes('profile')) {
        return (
          <Menu.Item key={item.label} leftSection={<IconUserCircle size={16} />}>
            {item.label}
          </Menu.Item>
        )
      }

      if (lower.includes('password')) {
        return (
          <Menu.Item key={item.label} leftSection={<IconLockPassword size={16} />}>
            {item.label}
          </Menu.Item>
        )
      }

      if (lower.includes('logout')) {
        return (
          <Menu.Item color="red" key={item.label} leftSection={<IconLogout2 size={16} />} onClick={onLogout}>
            {item.label}
          </Menu.Item>
        )
      }

      return <Menu.Item key={item.label}>{item.label}</Menu.Item>
    })
  }, [onLogout, userMenu])

  return (
    <AppShell
      header={{ height: 62 }}
      navbar={{ width: 320, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      footer={{ height: 38 }}
      padding="md"
      className="shell-bg"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={() => setOpened((prev) => !prev)} hiddenFrom="sm" size="sm" />
            <Text fw={800} className="brand-mark">
              SHERA BO
            </Text>
          </Group>
          <Menu shadow="md" width={220} position="bottom-end">
            <Menu.Target>
              <UnstyledButton>
                <Group gap="xs">
                  <Text fw={600}>{username || 'Admin User'}</Text>
                  <Avatar radius="xl" color="orange">
                    {(username || 'A').slice(0, 1).toUpperCase()}
                  </Avatar>
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>{userMenuItems}</Menu.Dropdown>
          </Menu>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="sm">
        <AppShell.Section grow component={ScrollArea}>
          {navItems.map((item) => {
            if (item.type === 'single') {
              return (
                <NavLink
                  key={item.route}
                  component={Link}
                  to={item.route}
                  label={item.title}
                  leftSection={<IconHome2 size={16} />}
                  active={currentPath === item.route}
                />
              )
            }

            const SectionIcon = menuIconMap[item.title] || IconSettings

            return (
              <NavLink key={item.title} label={item.title} leftSection={<SectionIcon size={16} />} defaultOpened>
                {item.children.map((child) => (
                  <NavLink
                    key={child.route}
                    component={Link}
                    to={child.route}
                    label={child.title}
                    leftSection={<IconChevronRight size={12} />}
                    active={currentPath === child.route || currentPath.startsWith(`${child.route}/`)}
                  />
                ))}
              </NavLink>
            )
          })}
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>

      <AppShell.Footer>
        <Group h="100%" px="md" justify="space-between" className="footer-row">
          <Text size="sm">Copyright 2026 Shera</Text>
          <Text size="sm">{appVersion}</Text>
        </Group>
      </AppShell.Footer>
    </AppShell>
  )
}

export default PrivateLayout
