import { useMemo, useState } from 'react'
import { ActionIcon, Badge, Button, Card, Group, Menu, Select, Stack, Text, TextInput, Title } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { IconChevronDown, IconDots, IconDownload, IconEye, IconSearch } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'

const baseColumns = [
  { accessor: 'userId', title: 'User ID' },
  { accessor: 'name', title: 'Name', textAlign: 'right' },
  { accessor: 'phone', title: 'Phone', textAlign: 'center' },
  { accessor: 'userType', title: 'User Type' },
  { accessor: 'registerDate', title: 'Register Date' },
  {
    accessor: 'status',
    title: 'Status',
    render: ({ status }) => <Badge color={status === 'Active' ? 'teal' : 'gray'}>{status}</Badge>,
  },
]

const allRecords = Array.from({ length: 123 }).map((_, index) => ({
  id: index + 1,
  userId: `U${String(index + 1).padStart(6, '0')}`,
  name: `End User ${index + 1}`,
  phone: `08${String(10000000 + index).slice(0, 8)}`,
  userType: index % 3 === 0 ? 'Contractor' : index % 2 === 0 ? 'Designer' : 'Technician',
  registerDate: `2026-04-${String((index % 28) + 1).padStart(2, '0')} ${String((index % 24).toString().padStart(2, '0'))}:${String((index * 5) % 60).toString().padStart(2, '0')}`,
  status: index % 2 === 0 ? 'Active' : 'Inactive',
}))

function Page({ onOpenDetail }) {
  const [records, setRecords] = useState(allRecords)
  const [search, setSearch] = useState('')
  const [userType, setUserType] = useState('All')
  const [status, setStatus] = useState('All')
  const [registerDateRange, setRegisterDateRange] = useState([null, null])
  const [selectedRecords, setSelectedRecords] = useState([])
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(10)

  const onRowMenuAction = (record, action) => {
    if (action === 'duplicate') {
      const nextId = records.length + 1
      const duplicate = {
        ...record,
        id: nextId,
        userId: `U${String(nextId).padStart(6, '0')}`,
        name: `${record.name} (Copy)`,
      }
      setRecords((prev) => [duplicate, ...prev])
      return
    }

    if (action === 'toggle-status') {
      setRecords((prev) =>
        prev.map((item) =>
          item.id === record.id ? { ...item, status: item.status === 'Active' ? 'Inactive' : 'Active' } : item,
        ),
      )
      return
    }

    if (action === 'delete') {
      setRecords((prev) => prev.filter((item) => item.id !== record.id))
    }
  }

  const columns = [
    ...baseColumns,
  {
    accessor: 'actions',
    title: 'Actions',
    render: (record) => (
      <Group gap={6} wrap="nowrap">
        <Button
          size="xs"
          variant="light"
          leftSection={<IconEye size={12} />}
          onClick={(event) => {
            event.stopPropagation()
            onOpenDetail?.(record.id)
          }}
        >
          View
        </Button>
        <Menu shadow="md" width={180} position="bottom-end">
          <Menu.Target>
            <ActionIcon
              variant="subtle"
              onClick={(event) => {
                event.stopPropagation()
              }}
            >
              <IconDots size={16} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => onRowMenuAction(record, 'duplicate')}>Duplicate</Menu.Item>
            <Menu.Item onClick={() => onRowMenuAction(record, 'toggle-status')}>
              {record.status === 'Active' ? 'Inactive' : 'Active'}
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item color="red" onClick={() => onRowMenuAction(record, 'delete')}>
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    ),
  },
]

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const bySearch =
        !search ||
        record.name.toLowerCase().includes(search.toLowerCase()) ||
        record.phone.toLowerCase().includes(search.toLowerCase())

      const byUserType = userType === 'All' || record.userType === userType
      const byStatus = status === 'All' || record.status === status
      const [startDate, endDate] = registerDateRange
      const hasDateFilter = Boolean(startDate && endDate)
      const recordDate = new Date(record.registerDate)
      const byDate = !hasDateFilter || (recordDate >= startDate && recordDate <= endDate)

      return bySearch && byUserType && byStatus && byDate
    })
  }, [records, registerDateRange, search, status, userType])

  const pageRecords = useMemo(() => {
    const from = (page - 1) * recordsPerPage
    const to = from + recordsPerPage
    return filteredRecords.slice(from, to)
  }, [filteredRecords, page, recordsPerPage])

  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2}>End-User Management</Title>
          <Text c="dimmed">Search, filter, and manage end-user records.</Text>
        </div>
        <Button>+ Add New Item</Button>
      </Group>

      <Card withBorder radius="md" p="md">
        <Group align="end" wrap="nowrap" gap="sm">
          <TextInput
            label="Search"
            placeholder="Search Name or Phone Number"
            leftSection={<IconSearch size={16} />}
            style={{ flex: 1 }}
            value={search}
            onChange={(event) => {
              setSearch(event.currentTarget.value)
              setPage(1)
            }}
          />
          <Group align="end" wrap="nowrap" gap="sm">
            <Select
              label="User Type"
              data={['All', 'Contractor', 'Designer', 'Technician']}
              value={userType}
              w={170}
              onChange={(value) => {
                setUserType(value || 'All')
                setPage(1)
              }}
            />
            <DatePickerInput
              type="range"
              label="Register Date"
              value={registerDateRange}
              w={280}
              clearable
              presets={[
                { value: [new Date(2026, 3, 1), new Date(2026, 3, 7)], label: 'This week' },
                { value: [new Date(2026, 3, 1), new Date(2026, 3, 30)], label: 'This month' },
              ]}
              onChange={(value) => {
                setRegisterDateRange(value)
                setPage(1)
              }}
            />
            <Select
              label="Status"
              data={['All', 'Active', 'Inactive']}
              value={status}
              w={170}
              onChange={(value) => {
                setStatus(value || 'All')
                setPage(1)
              }}
            />

            <Menu shadow="md" width={180} position="bottom-end">
              <Menu.Target>
                <Button variant="light" rightSection={<IconChevronDown size={14} />}>
                  Actions
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item leftSection={<IconDownload size={14} />}>Export CSV</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>

        <Group justify="space-between" mt="md" mb="xs">
          <Text size="sm" c="dimmed">
            Total: {filteredRecords.length} items | Selected: {selectedRecords.length}
          </Text>
          <Badge variant="light">Comfortable Density</Badge>
        </Group>

        <DataTable
          withTableBorder
          withColumnBorders
          striped
          highlightOnHover
          recordsPerPage={recordsPerPage}
          recordsPerPageOptions={[10, 25, 50, 100]}
          onRecordsPerPageChange={(value) => {
            setRecordsPerPage(value)
            setPage(1)
          }}
          totalRecords={filteredRecords.length}
          page={page}
          onPageChange={setPage}
          idAccessor="id"
          records={pageRecords}
          columns={columns}
          selectedRecords={selectedRecords}
          onSelectedRecordsChange={setSelectedRecords}
          minHeight={320}
          onRowClick={({ record }) => onOpenDetail?.(record.id)}
        />
      </Card>
    </Stack>
  )
}

export default Page
