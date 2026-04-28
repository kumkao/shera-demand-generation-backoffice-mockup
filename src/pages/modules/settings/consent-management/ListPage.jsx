import { useMemo, useState } from 'react'
import { Badge, Button, Card, Code, Group, Menu, Select, Stack, Text, TextInput, Title } from '@mantine/core'
import { IconChevronDown, IconRefresh, IconSearch } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'

const userTypes = ['Agent', 'Sub-agent', 'End-user']

const shuffleRecords = (items) => {
  const shuffled = [...items]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]
  }
  return shuffled
}

const createConsentRecords = () => {
  let id = 1
  const rows = userTypes.flatMap((userType, userTypeIndex) =>
    Array.from({ length: 3 }, (_, itemIndex) => {
      const month = userTypeIndex * 3 + itemIndex + 1
      return {
        id: id++,
        consentTitle: `${userType} Consent Policy ${String(itemIndex + 1).padStart(2, '0')}`,
        userType,
        consentVersion: `v1.${itemIndex + 1}.0`,
        status: itemIndex === 0 ? 'Active' : 'Inactive',
        lastUpdated: `2026-${String(month).padStart(2, '0')}-${String(10 + itemIndex).padStart(2, '0')} ${String(9 + itemIndex).padStart(2, '0')}:00:00`,
      }
    }),
  )
  return shuffleRecords(rows)
}

function Page({ onOpenDetail }) {
  const [records, setRecords] = useState(() => createConsentRecords())
  const [search, setSearch] = useState('')
  const [userTypeFilter, setUserTypeFilter] = useState(null)
  const [statusFilter, setStatusFilter] = useState(null)
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(10)
  const [sortStatus, setSortStatus] = useState({ columnAccessor: 'lastUpdated', direction: 'desc' })

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const bySearch =
        !search ||
        record.consentTitle.toLowerCase().includes(search.toLowerCase()) ||
        record.consentVersion.toLowerCase().includes(search.toLowerCase())
      const byUserType = !userTypeFilter || record.userType === userTypeFilter
      const byStatus = !statusFilter || record.status === statusFilter
      return bySearch && byUserType && byStatus
    })
  }, [records, search, statusFilter, userTypeFilter])

  const sortedRecords = useMemo(() => {
    const items = [...filteredRecords]
    items.sort((a, b) => {
      const accessor = sortStatus.columnAccessor
      const aValue = a[accessor]
      const bValue = b[accessor]
      const result = String(aValue).localeCompare(String(bValue))
      return sortStatus.direction === 'asc' ? result : -result
    })
    return items
  }, [filteredRecords, sortStatus])

  const pageRecords = useMemo(() => {
    const from = (page - 1) * recordsPerPage
    const to = from + recordsPerPage
    return sortedRecords.slice(from, to)
  }, [page, recordsPerPage, sortedRecords])

  const activeCounts = useMemo(() => {
    return filteredRecords.reduce(
      (acc, record) => {
        if (record.status === 'Active') {
          acc[record.userType] += 1
        }
        return acc
      },
      { Agent: 0, 'Sub-agent': 0, 'End-user': 0 },
    )
  }, [filteredRecords])

  const handleSetAsActive = (id) => {
    setRecords((prev) => {
      const target = prev.find((item) => item.id === id)
      if (!target) {
        return prev
      }
      return prev.map((item) => {
        if (item.userType !== target.userType) {
          return item
        }
        if (item.id === id) {
          return { ...item, status: 'Active' }
        }
        if (item.status === 'Active') {
          return { ...item, status: 'Inactive' }
        }
        return item
      })
    })
  }

  const columns = [
    { accessor: 'consentTitle', title: 'Consent Title', sortable: true },
    {
      accessor: 'userType',
      title: 'User Type',
      sortable: true,
      render: ({ userType }) => {
        const color = userType === 'Agent' ? 'indigo' : userType === 'Sub-agent' ? 'grape' : 'blue'
        return (
          <Badge color={color} variant="light">
            {userType}
          </Badge>
        )
      },
    },
    {
      accessor: 'consentVersion',
      title: 'Consent Version',
      sortable: true,
      render: ({ consentVersion }) => <Code>{consentVersion}</Code>,
    },
    {
      accessor: 'status',
      title: 'Status',
      textAlign: 'center',
      sortable: true,
      render: ({ status }) => (
        <Badge color={status === 'Active' ? 'teal' : 'gray'} variant="light">
          {status}
        </Badge>
      ),
    },
    { accessor: 'lastUpdated', title: 'Last Updated', sortable: true },
    {
      accessor: 'actions',
      title: '',
      width: 176,
      render: (record) => (
        <Group gap={6} wrap="nowrap" justify="flex-end">
          <Button
            size="xs"
            variant="light"
            onClick={(event) => {
              event.stopPropagation()
              onOpenDetail?.(record.id)
            }}
          >
            View Details
          </Button>
          <Menu position="bottom-end" withinPortal>
            <Menu.Target>
              <Button
                size="xs"
                variant="default"
                rightSection={<IconChevronDown size={12} />}
                onClick={(event) => event.stopPropagation()}
              >
                More
              </Button>
            </Menu.Target>
            <Menu.Dropdown onClick={(event) => event.stopPropagation()}>
              <Menu.Item onClick={() => onOpenDetail?.(record.id)}>View Details</Menu.Item>
              <Menu.Item>Edit</Menu.Item>
              <Menu.Item onClick={() => handleSetAsActive(record.id)}>Set as Active</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      ),
    },
  ]

  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2}>Consent Management</Title>
          <Text c="dimmed">List view from specs/pages/Settings/Consent Management/table.md.</Text>
        </div>
        <Button>+ Create New Consent</Button>
      </Group>

      <Card withBorder radius="md" p="md">
        <Group align="end" gap="sm" wrap="nowrap" mb="sm">
          <TextInput
            label="Search"
            placeholder="Search by consent title or version"
            leftSection={<IconSearch size={16} />}
            style={{ flex: 1 }}
            value={search}
            onChange={(event) => {
              setSearch(event.currentTarget.value)
              setPage(1)
            }}
          />
          <Select
            label="User Type"
            data={['Agent', 'Sub-agent', 'End-user']}
            value={userTypeFilter}
            clearable
            w={180}
            onChange={(value) => {
              setUserTypeFilter(value)
              setPage(1)
            }}
          />
          <Select
            label="Status"
            data={['Active', 'Inactive']}
            value={statusFilter}
            clearable
            w={160}
            onChange={(value) => {
              setStatusFilter(value)
              setPage(1)
            }}
          />
          <Button
            variant="default"
            leftSection={<IconRefresh size={14} />}
            onClick={() => {
              setRecords(createConsentRecords())
              setSearch('')
              setUserTypeFilter(null)
              setStatusFilter(null)
              setPage(1)
            }}
          >
            Refresh
          </Button>
        </Group>

        <Group justify="flex-start" mb="xs">
          <Badge variant="light">Total consents: {filteredRecords.length}</Badge>
          <Badge variant="light">Active by type: Agent {activeCounts.Agent}</Badge>
          <Badge variant="light">Sub-agent {activeCounts['Sub-agent']}</Badge>
          <Badge variant="light">End-user {activeCounts['End-user']}</Badge>
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
          totalRecords={sortedRecords.length}
          page={page}
          onPageChange={setPage}
          idAccessor="id"
          records={pageRecords}
          columns={columns}
          sortStatus={sortStatus}
          onSortStatusChange={setSortStatus}
          minHeight={320}
          onRowClick={({ record }) => onOpenDetail?.(record.id)}
        />
      </Card>
    </Stack>
  )
}

export default Page
