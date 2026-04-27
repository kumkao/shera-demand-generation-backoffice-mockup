import { useMemo, useState } from 'react'
import { Badge, Button, Card, Group, Image, Select, Stack, Text, TextInput, Title } from '@mantine/core'
import { IconDownload, IconEye, IconSearch } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'

const allRecords = Array.from({ length: 1240 }).map((_, index) => ({
  id: index + 1,
  qrCode: `QR-${String(index + 1).padStart(6, '0')}`,
  qrImage: `/qrcode.png`,
  name: `QRCode ${index + 1}`,
  status: index % 3 === 0 ? 'Active' : index % 3 === 1 ? 'Inactive' : 'Expired',
  expiredAt: `2026-${String((index % 12) + 1).padStart(2, '0')}-${String((index % 28) + 1).padStart(2, '0')} ${String(index % 24).padStart(2, '0')}:${String((index * 7) % 60).padStart(2, '0')}:00`,
  createdAt: `2025-${String((index % 12) + 1).padStart(2, '0')}-${String((index % 28) + 1).padStart(2, '0')} ${String((index + 4) % 24).padStart(2, '0')}:${String((index * 3) % 60).padStart(2, '0')}:00`,
}))

function Page({ onOpenDetail }) {
  const [records, setRecords] = useState(allRecords)
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState(null)
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(10)

  const columns = [
    {
      accessor: 'qrCode',
      title: 'QR Code',
      render: ({ qrCode, qrImage }) => (
        <Group gap="sm" wrap="nowrap">
          <Image src={qrImage} alt="QR Code" w={64} h={64} radius="sm" fit="cover" />
        </Group>
      ),
    },
    { accessor: 'name', title: 'Name', textAlign: 'right' },
    {
      accessor: 'status',
      title: 'Status',
      textAlign: 'center',
      render: ({ status }) => {
        const color = status === 'Active' ? 'teal' : status === 'Inactive' ? 'gray' : 'orange'
        return (
          <Badge color={color} variant="light">
            {status}
          </Badge>
        )
      },
    },
    { accessor: 'expiredAt', title: 'Expired At' },
    { accessor: 'createdAt', title: 'Created AT' },
    {
      accessor: 'actions',
      title: '',
      width: 170,
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
          <Button
            size="xs"
            variant="light"
            leftSection={<IconDownload size={12} />}
            onClick={(event) => {
              event.stopPropagation()
            }}
          >
            Download QRCode
          </Button>
        </Group>
      ),
    },
  ]

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const bySearch = !search || record.name.toLowerCase().includes(search.toLowerCase())
      const byActive = !activeFilter || record.status === activeFilter
      return bySearch && byActive
    })
  }, [activeFilter, records, search])

  const pageRecords = useMemo(() => {
    const from = (page - 1) * recordsPerPage
    const to = from + recordsPerPage
    return filteredRecords.slice(from, to)
  }, [filteredRecords, page, recordsPerPage])

  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2}>QR Code Management</Title>
          <Text c="dimmed">List view from specs/pages/Campaign & Point/QR Code Management/table.md.</Text>
        </div>
        <Button>Create new QRCode</Button>
      </Group>

      <Card withBorder radius="md" p="md">
        <Group align="end" wrap="nowrap" gap="sm" mb="sm">
          <TextInput
            label="Search"
            placeholder="Search By Name"
            leftSection={<IconSearch size={16} />}
            style={{ flex: 1 }}
            value={search}
            onChange={(event) => {
              setSearch(event.currentTarget.value)
              setPage(1)
            }}
          />
          <Select
            label="Active"
            data={['Active', 'Inactive']}
            value={activeFilter}
            clearable
            w={170}
            onChange={(value) => {
              setActiveFilter(value)
              setPage(1)
            }}
          />
        </Group>

        <Group justify="flex-start" mb="xs">
          <Badge variant="light">Total: 1,240 items</Badge>
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
          minHeight={320}
          onRowClick={({ record }) => onOpenDetail?.(record.id)}
        />
      </Card>
    </Stack>
  )
}

export default Page
