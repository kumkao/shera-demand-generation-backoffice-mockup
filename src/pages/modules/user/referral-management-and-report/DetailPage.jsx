import { Badge, Button, Card, Group, Stack, Text, Title } from '@mantine/core'
import { DataTable } from 'mantine-datatable'

const childrenRecords = [
  {
    id: 1,
    username: 'Alex Martin',
    joinedDate: '2026-03-12',
  },
  {
    id: 2,
    username: 'Jamie Collins',
    joinedDate: '2026-03-20',
  },
  {
    id: 3,
    username: 'Taylor Brooks',
    joinedDate: '2026-04-02',
  },
]

function ReadOnlyRow({ label, value }) {
  return (
    <Group justify="space-between" align="flex-start" gap="xl" wrap="nowrap">
      <Text c="dimmed" maw={260}>
        {label}
      </Text>
      <Text fw={500} ta="right">
        {value}
      </Text>
    </Group>
  )
}

function Page({ selectedId }) {
  const columns = [
    { accessor: 'username', title: 'User Name' },
    { accessor: 'joinedDate', title: 'Joined Date' },
  ]

  return (
    <Stack gap="md" maw={980} mx="auto" w="100%">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2}>Referral Record Details</Title>
        </div>
      </Group>

        <Stack gap="sm">
          <Title order={3}>Referral performance summary.</Title>
          <Group grow align="stretch">
            <Card withBorder radius="md" p="md">
              <Text size="sm" c="dimmed">
                Total Earned Point
              </Text>
              <Text fw={700} size="xl">
                1,000
              </Text>
            </Card>
            <Card withBorder radius="md" p="md">
              <Text size="sm" c="dimmed">
                Referred Count
              </Text>
              <Text fw={700} size="xl">
                3
              </Text>
            </Card>
          </Group>
        </Stack>

      <Card withBorder radius="md" p="md">
        <Stack gap="sm">
          <Text fw={700}>Section 1: Referrer Information</Text>
          <Text size="sm" c="dimmed">
            Basic read-only information of the selected referrer.
          </Text>
          <ReadOnlyRow label="User Full Name" value="John Smith" />
          <ReadOnlyRow label="User Type" value={<Badge variant="light">End-user / Sub-agent</Badge>} />
          <ReadOnlyRow label="Referral Code" value="XC45UGA8" />
        </Stack>
      </Card>

      <Card withBorder radius="md" p="md">
        <Stack gap="sm">
          <Text fw={700}>Referred List</Text>
          <DataTable
            withTableBorder
            withColumnBorders
            striped
            idAccessor="id"
            records={childrenRecords}
            columns={columns}
            minHeight={240}
          />
        </Stack>
      </Card>

    </Stack>
  )
}

export default Page
