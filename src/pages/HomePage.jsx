import { Card, Group, SimpleGrid, Text, Title } from '@mantine/core'
import { IconActivity, IconChartBar, IconShield, IconUsers } from '@tabler/icons-react'

const stats = [
  { label: 'Total users', value: '24,891', icon: IconUsers },
  { label: 'Active campaigns', value: '38', icon: IconChartBar },
  { label: 'Pending verifications', value: '276', icon: IconShield },
  { label: 'Daily events', value: '12,400', icon: IconActivity },
]

function HomePage() {
  return (
    <div>
      <Group justify="space-between" mb="lg">
        <div>
          <Title order={2}>Home</Title>
          <Text c="dimmed">Overview snapshot for operations, campaigns, and user activities.</Text>
        </div>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} withBorder radius="md" p="lg">
              <Group justify="space-between" mb="sm">
                <Text size="sm" c="dimmed">
                  {stat.label}
                </Text>
                <Icon size={18} />
              </Group>
              <Title order={3}>{stat.value}</Title>
            </Card>
          )
        })}
      </SimpleGrid>
    </div>
  )
}

export default HomePage
