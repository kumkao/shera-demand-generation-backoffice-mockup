import { useMemo, useState } from 'react'
import { ActionIcon, Badge, Button, Card, Group, Image, Menu, Select, Stack, Text, TextInput, Title } from '@mantine/core'
import { IconArrowsSort, IconCopy, IconDots, IconEye, IconSearch, IconTrash } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'

const initialRecords = Array.from({ length: 42 }).map((_, index) => ({
  id: index + 1,
  order: index + 1,
  mainMenu: `Knowledge Base ${index + 1}`,
  imagePreview: `https://picsum.photos/seed/kb-${index + 1}/80/48`,
  isPublic: index % 2 === 0,
  createdAt: `2026-02-${String((index % 28) + 1).padStart(2, '0')}`,
  updatedAt: `2026-03-${String((index % 28) + 1).padStart(2, '0')} ${String(index % 24).padStart(2, '0')}:${String((index * 5) % 60).padStart(2, '0')}:00`,
  createdBy: 'System Label',
}))

function Page({ onOpenDetail }) {
  const [records, setRecords] = useState(initialRecords)
  const [search, setSearch] = useState('')
  const [publicFilter, setPublicFilter] = useState(null)
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(10)

  const onRowMenuAction = (record, action) => {
    if (action === 'duplicate') {
      const nextId = Math.max(...records.map((item) => item.id)) + 1
      setRecords((prev) => [{ ...record, id: nextId, order: nextId, mainMenu: `${record.mainMenu} (Copy)` }, ...prev])
      return
    }

    if (action === 'toggle-public') {
      setRecords((prev) => prev.map((item) => (item.id === record.id ? { ...item, isPublic: !item.isPublic } : item)))
      return
    }

    if (action === 'delete') {
      setRecords((prev) => prev.filter((item) => item.id !== record.id))
    }
  }

  const moveRecord = (id, direction) => {
    setRecords((prev) => {
      const index = prev.findIndex((item) => item.id === id)
      if (index < 0) return prev

      const nextIndex = direction === 'up' ? index - 1 : index + 1
      if (nextIndex < 0 || nextIndex >= prev.length) return prev

      const next = [...prev]
      ;[next[index], next[nextIndex]] = [next[nextIndex], next[index]]
      return next.map((item, idx) => ({ ...item, order: idx + 1 }))
    })
  }

  const columns = [
    {
      accessor: 'ordering',
      title: '',
      width: 90,
      render: (record) => (
        <Group gap={4} wrap="nowrap">
          <ActionIcon variant="subtle" size="sm" aria-label="drag handle">
            <IconArrowsSort size={14} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            size="sm"
            onClick={(event) => {
              event.stopPropagation()
              moveRecord(record.id, 'up')
            }}
            aria-label="move up"
          >
            ▲
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            size="sm"
            onClick={(event) => {
              event.stopPropagation()
              moveRecord(record.id, 'down')
            }}
            aria-label="move down"
          >
            ▼
          </ActionIcon>
        </Group>
      ),
    },
    { accessor: 'mainMenu', title: 'Main Menu' },
    {
      accessor: 'imagePreview',
      title: 'Image Preview',
      render: ({ imagePreview }) => <Image src={imagePreview} alt="preview" w={64} h={40} radius="sm" fit="cover" />,
    },
    {
      accessor: 'isPublic',
      title: 'Public',
      render: ({ isPublic }) => (
        <Badge color={isPublic ? 'teal' : 'gray'} variant="light">
          {isPublic ? 'Public' : 'Hidden'}
        </Badge>
      ),
    },
    { accessor: 'createdAt', title: 'Created At' },
    { accessor: 'updatedAt', title: 'Updated At' },
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
              <Menu.Item leftSection={<IconCopy size={14} />} onClick={() => onRowMenuAction(record, 'duplicate')}>
                Duplicate
              </Menu.Item>
              <Menu.Item onClick={() => onRowMenuAction(record, 'toggle-public')}>
                {record.isPublic ? 'Hidden' : 'Public'}
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
      const bySearch = !search || record.mainMenu.toLowerCase().includes(search.toLowerCase())
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
          <Title order={2}>Knowledge Base</Title>
          <Text c="dimmed">List view from specs/pages/Media & Content/Knowledge Base/table.md.</Text>
        </div>
        <Button>Add New Item</Button>
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
