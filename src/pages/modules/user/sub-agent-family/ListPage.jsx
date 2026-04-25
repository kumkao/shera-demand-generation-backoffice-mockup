import { Badge, Button, Card, Group, Stack, Text, TextInput, Title } from '@mantine/core'
import { DataTable } from 'mantine-datatable'

const columns = [
  { accessor: 'familyName', title: 'Family Name' },
  { accessor: 'subAgents', title: 'Sub-agents' },
  { accessor: 'createdAt', title: 'Created At' },
  { accessor: 'updatedAt', title: 'Updated At' },
  { accessor: 'createdBy', title: 'Created By' }
]

const records = Array.from({ length: 12 }).map((_, index) => {
  return {
    id: index + 1,
    familyName: `Family ${String(index + 1).padStart(3, '0')}`,
    subAgents: `Sub-agent ${(index % 5) + 1}`,
    createdAt: `2026-01-${String((index % 28) + 1).padStart(2, '0')}`,
    updatedAt: `2026-02-${String((index % 28) + 1).padStart(2, '0')}`,
    createdBy: `User ${(index % 4) + 1}`,
  }
})

function Page({ onOpenDetail }) {
  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2}>Sub-agent Family</Title>
          <Text c="dimmed">List view from specs/pages/User/Sub-agent Family/table.md.</Text>
        </div>
        <Button>Add New Family</Button>
      </Group>
      <Card withBorder radius="md" p="md">
        <Group justify="space-between" mb="sm">
          <TextInput label="Search Label" placeholder="Search by Name or Sub-agent Name" style={{ flex: 1 }} />
          <Badge variant="light">Total: 1,240 items | Selected: 0</Badge>
        </Group>
        <DataTable
          withTableBorder
          withColumnBorders
          striped
          highlightOnHover
          idAccessor="id"
          records={records}
          columns={columns}
          minHeight={320}
          onRowClick={({ record }) => onOpenDetail?.(record.id)}
        />
      </Card>
    </Stack>
  )
}

export default Page
