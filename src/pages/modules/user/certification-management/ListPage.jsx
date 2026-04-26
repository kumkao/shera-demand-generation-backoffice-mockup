import { useMemo, useState } from 'react'
import { ActionIcon, Badge, Button, Card, Group, Image, Menu, Select, Stack, Text, TextInput, Title } from '@mantine/core'
import { IconCopy, IconDots, IconEye, IconSearch, IconTrash } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'

const initialRecords = Array.from({ length: 1240 }).map((_, index) => ({
  id: index + 1,
  badgeImage: `https://picsum.photos/seed/cert-${index + 1}/80/48`,
  certificationName: `Certification ${index + 1}`,
  description: `Certification description ${index + 1}`,
  expireDate: `2027-${String((index % 12) + 1).padStart(2, '0')}-${String((index % 28) + 1).padStart(2, '0')}`,
  status: index % 2 === 0 ? 'Active' : 'Inactive',
  updatedAt: `2026-03-${String((index % 28) + 1).padStart(2, '0')} ${String(index % 24).padStart(2, '0')}:${String((index * 5) % 60).padStart(2, '0')}:00`,
  createdAt: `2026-02-${String((index % 28) + 1).padStart(2, '0')} ${String((index + 3) % 24).padStart(2, '0')}:${String((index * 3) % 60).padStart(2, '0')}:00`,
  createdBy: 'System Label',
  isPublic: index % 2 === 0,
}))

function Page({ onOpenDetail }) {
  const [records, setRecords] = useState(initialRecords)
  const [search, setSearch] = useState('')
  const [publicFilter, setPublicFilter] = useState(null)
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(10)

  const onRowMenuAction = (record, action) => {
    if (action === 'view') {
      onOpenDetail?.(record.id)
      return
    }

    if (action === 'duplicate') {
      const nextId = Math.max(...records.map((item) => item.id)) + 1
      setRecords((prev) => [
        {
          ...record,
          id: nextId,
          certificationName: `${record.certificationName} (Copy)`,
        },
        ...prev,
      ])
      return
    }

    if (action === 'delete') {
      setRecords((prev) => prev.filter((item) => item.id !== record.id))
    }
  }

  const columns = [
    {
      accessor: 'badgeImage',
      title: 'Badge Image',
      render: ({ badgeImage }) => <Image src={badgeImage} alt="badge" w={64} h={40} radius="sm" fit="cover" />,
    },
    { accessor: 'certificationName', title: 'Certification Name', textAlign: 'right' },
    { accessor: 'description', title: 'Description', textAlign: 'right' },
    { accessor: 'expireDate', title: 'Expire Date' },
    {
      accessor: 'status',
      title: 'Status',
      render: ({ status }) => (
        <Badge color={status === 'Active' ? 'teal' : 'gray'} variant="light">
          {status}
        </Badge>
      ),
    },
    { accessor: 'updatedAt', title: 'Updated At' },
    { accessor: 'createdAt', title: 'Created At' },
    { accessor: 'createdBy', title: 'Created By' },
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
              <Menu.Item leftSection={<IconEye size={14} />} onClick={() => onRowMenuAction(record, 'view')}>
                View
              </Menu.Item>
              <Menu.Item leftSection={<IconCopy size={14} />} onClick={() => onRowMenuAction(record, 'duplicate')}>
                Duplicate
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item leftSection={<IconTrash size={14} />} color="red" onClick={() => onRowMenuAction(record, 'delete')}>
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
      const bySearch = !search || record.certificationName.toLowerCase().includes(search.toLowerCase())
      const byPublic = !publicFilter || (publicFilter === 'Public' ? record.isPublic : !record.isPublic)
      return bySearch && byPublic
    })
  }, [publicFilter, records, search])

  const pageRecords = useMemo(() => {
    const from = (page - 1) * recordsPerPage
    const to = from + recordsPerPage
    return filteredRecords.slice(from, to)
  }, [filteredRecords, page, recordsPerPage])

  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2}>Certification Management</Title>
          <Text c="dimmed">List view from specs/pages/User/Certification Management/table.md.</Text>
        </div>
        <Button>+ Add New Certification</Button>
      </Group>

      <Card withBorder radius="md" p="md">
        <Group align="end" wrap="nowrap" gap="sm" mb="sm">
          <TextInput
            label="Search"
            placeholder="Search by Name"
            leftSection={<IconSearch size={16} />}
            style={{ flex: 1 }}
            value={search}
            onChange={(event) => {
              setSearch(event.currentTarget.value)
              setPage(1)
            }}
          />
          <Select
            label="Public"
            data={['Public', 'Hidden']}
            value={publicFilter}
            clearable
            w={170}
            onChange={(value) => {
              setPublicFilter(value)
              setPage(1)
            }}
          />
        </Group>

        <Group justify="flex-start" mb="xs">
          <Badge variant="light">Total: {filteredRecords.length} items | Selected: 0</Badge>
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
