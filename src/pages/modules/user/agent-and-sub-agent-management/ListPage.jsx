import { useMemo, useState } from 'react'
import { ActionIcon, Badge, Button, Card, Group, Menu, Select, Stack, Text, TextInput, Title } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { IconDots, IconEye, IconFileSpreadsheet, IconSearch } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'

const baseColumns = [
  {
    accessor: 'agentId',
    title: 'ID',
    render: ({ agentId }) => (
      <Text ff="monospace" size="sm">
        {agentId}
      </Text>
    ),
  },
  { accessor: 'name', title: 'Agent/Sub-agent Name' },
  { accessor: 'ownerPhone', title: 'Owner Phone' },
  { accessor: 'totalPoints', title: 'Total Points', textAlign: 'right' },
  {
    accessor: 'userType',
    title: 'User Type',
    render: ({ userType }) => (
      <Badge variant="light" color={userType === 'Agent' ? 'blue' : 'indigo'}>
        {userType}
      </Badge>
    ),
  },
  { accessor: 'registeredDate', title: 'Registered Date' },
  {
    accessor: 'status',
    title: 'Status',
    render: ({ status }) => {
      const color =
        status === 'Verified' ? 'teal' : status === 'Waiting For Approve' ? 'yellow' : 'gray'

      return <Badge color={color}>{status}</Badge>
    },
  },
]

const allRecords = Array.from({ length: 1240 }).map((_, index) => ({
  id: index + 1,
  agentId: `AGT-${String(index + 1).padStart(4, '0')}`,
  name: `${index % 3 === 0 ? 'Sub-agent' : 'Agent'} ${index + 1}`,
  ownerPhone: `08${String(10000000 + index).slice(0, 8)}`,
  totalPoints: (index + 1) * 35,
  registeredDate: `2026-${String((index % 12) + 1).padStart(2, '0')}-${String((index % 28) + 1).padStart(2, '0')} ${String(index % 24).padStart(2, '0')}:${String((index * 7) % 60).padStart(2, '0')}`,
  status: index % 3 === 0 ? 'Not Verified' : index % 3 === 1 ? 'Verified' : 'Waiting For Approve',
  activeState: index % 2 === 0 ? 'Active' : 'Inactive',
  userType: index % 3 === 0 ? 'Sub-agent' : 'Agent',
}))

function Page({ onOpenDetail }) {
  const [records, setRecords] = useState(allRecords)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState(null)
  const [userType, setUserType] = useState(null)
  const [registeredDateRange, setRegisteredDateRange] = useState([null, null])
  const [selectedRecords, setSelectedRecords] = useState([])
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(10)

  const onRowMenuAction = (record, action) => {
    if (action === 'toggle-status') {
      setRecords((prev) =>
        prev.map((item) =>
          item.id === record.id
            ? { ...item, activeState: item.activeState === 'Active' ? 'Inactive' : 'Active' }
            : item,
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
      title: '',
      width: 110,
      render: (record) => (
        <Group gap={6} wrap="nowrap" justify="flex-end">
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
          <Menu shadow="md" width={160} position="bottom-end">
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
              <Menu.Item onClick={() => onRowMenuAction(record, 'toggle-status')}>
                {record.activeState === 'Active' ? 'Inactive' : 'Active'}
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
        record.ownerPhone.toLowerCase().includes(search.toLowerCase())
      const byStatus = !status || record.status === status
      const byUserType = !userType || record.userType === userType

      const [startDate, endDate] = registeredDateRange
      const hasDateFilter = Boolean(startDate && endDate)
      const recordDate = new Date(record.registeredDate)
      const byDate = !hasDateFilter || (recordDate >= startDate && recordDate <= endDate)

      return bySearch && byStatus && byUserType && byDate
    })
  }, [records, registeredDateRange, search, status, userType])

  const pageRecords = useMemo(() => {
    const from = (page - 1) * recordsPerPage
    const to = from + recordsPerPage
    return filteredRecords.slice(from, to)
  }, [filteredRecords, page, recordsPerPage])

  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2}>Agent & Sub-agent Management</Title>
          <Text c="dimmed">List view from specs/pages/User/Agent & Sub-agent Management/table.md.</Text>
        </div>
      </Group>

      <Card withBorder radius="md" p="md">
        <Group align="end" wrap="nowrap" gap="sm">
          <TextInput
            label="Search Label"
            placeholder="Search by Name or Phone"
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
              label="Status"
              data={['Not Verified', 'Verified', 'Waiting For Approve']}
              value={status}
              clearable
              w={220}
              onChange={(value) => {
                setStatus(value)
                setPage(1)
              }}
            />
            <DatePickerInput
              type="range"
              label="Registered Date"
              value={registeredDateRange}
              clearable
              w={260}
              onChange={(value) => {
                setRegisteredDateRange(value)
                setPage(1)
              }}
            />
            <Select
              label="User Type"
              data={['Agent', 'Sub-agent']}
              value={userType}
              clearable
              w={160}
              onChange={(value) => {
                setUserType(value)
                setPage(1)
              }}
            />
            <ActionIcon variant="light" color="orange" size="sm" aria-label="Export to Excel" mt={24}>
              <IconFileSpreadsheet size={16} />
            </ActionIcon>
          </Group>
        </Group>

        <Group justify="flex-start" mt="md" mb="xs">
          <Badge variant="light">Total: 1,240 items | Selected: {selectedRecords.length}</Badge>
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
