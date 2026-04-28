import { useMemo, useState } from 'react'
import { Badge, Button, Card, Group, Select, Stack, Text, TextInput, Title } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'

const allRecords = Array.from({ length: 1240 }).map((_, index) => {
  const userType = index % 2 === 0 ? 'End-user' : 'Sub-agent'
  return {
    id: index + 1,
    userName: `User ${String(index + 1).padStart(4, '0')}`,
    userType,
    totalEarnedPoint: 1000 + index * 13,
    referredCount: (index % 30) + 1,
  }
})

function Page({ onOpenDetail }) {
  const [records, setRecords] = useState(allRecords)
  const [search, setSearch] = useState('')
  const [userTypeFilter, setUserTypeFilter] = useState(null)
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(10)
  const [sortStatus, setSortStatus] = useState({ columnAccessor: 'userName', direction: 'asc' })

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const bySearch = !search || record.userName.toLowerCase().includes(search.toLowerCase())
      const byUserType = !userTypeFilter || record.userType === userTypeFilter
      return bySearch && byUserType
    })
  }, [records, search, userTypeFilter])

  const sortedRecords = useMemo(() => {
    const sorted = [...filteredRecords]
    sorted.sort((a, b) => {
      const accessor = sortStatus.columnAccessor
      const aValue = a[accessor]
      const bValue = b[accessor]

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortStatus.direction === 'asc' ? aValue - bValue : bValue - aValue
      }

      const result = String(aValue).localeCompare(String(bValue))
      return sortStatus.direction === 'asc' ? result : -result
    })
    return sorted
  }, [filteredRecords, sortStatus])

  const pageRecords = useMemo(() => {
    const from = (page - 1) * recordsPerPage
    const to = from + recordsPerPage
    return sortedRecords.slice(from, to)
  }, [page, recordsPerPage, sortedRecords])

  const columns = [
    { accessor: 'userName', title: 'User Name', sortable: true },
    {
      accessor: 'userType',
      title: 'User Type',
      sortable: true,
      render: ({ userType }) => (
        <Badge color={userType === 'End-user' ? 'blue' : 'grape'} variant="light">
          {userType}
        </Badge>
      ),
    },
    { accessor: 'totalEarnedPoint', title: 'Total Earned Point', textAlign: 'right', sortable: true },
    { accessor: 'referredCount', title: 'Referred Count', textAlign: 'right', sortable: true },
    {
      accessor: 'actions',
      title: '',
      width: 130,
      render: (record) => (
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
      ),
    },
  ]

  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2}>Referral Management & Report</Title>
          <Text c="dimmed">List view from specs/pages/User/Referral management & Report/table.md.</Text>
        </div>
        <Button>Export to CSV</Button>
      </Group>

      <Card withBorder radius="md" p="md">
        <Group align="end" wrap="nowrap" gap="sm" mb="sm">
          <TextInput
            label="Search"
            placeholder="Search by name"
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
            data={['End-user', 'Sub-agent']}
            value={userTypeFilter}
            clearable
            w={220}
            onChange={(value) => {
              setUserTypeFilter(value)
              setPage(1)
            }}
          />
        </Group>

        <Group justify="flex-start" mb="xs">
          <Badge variant="light">Total referrals: {filteredRecords.length}</Badge>
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
