import { Badge, Button, Card, Group, Stack, Text, TextInput, Title } from '@mantine/core'
import { DataTable } from 'mantine-datatable'

const columns = [
  { accessor: 'col1', title: "Col Name" },
  { accessor: 'col2', title: "Col Name" },
  { accessor: 'col3', title: "Col Name" },
  { accessor: 'col4', title: "Col Name" },
  { accessor: 'col5', title: "Col Name" }
]

const records = Array.from({ length: 12 }).map((_, index) => {
  const record = { id: index + 1 }

  columns.forEach((column, colIndex) => {
    if (colIndex === 0) {
      record[column.accessor] = String(index + 1).padStart(4, '0')
    } else if (column.title.toLowerCase().includes('status')) {
      record[column.accessor] = index % 2 === 0 ? 'Active' : 'Pending'
    } else {
      record[column.accessor] = column.title + ' ' + (index + 1)
    }
  })

  return record
})

function Page({ onOpenDetail }) {
  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2}>Sale Management</Title>
          <Text c="dimmed">List view from specs/pages/Sale/Sale Management/table.md.</Text>
        </div>
        <Button>Primary Action</Button>
      </Group>
      <Card withBorder radius="md" p="md">
        <Group justify="space-between" mb="sm">
          <TextInput label="Global Search" placeholder="Search..." style={{ flex: 1 }} />
          <Badge variant="light">{records.length} rows</Badge>
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
