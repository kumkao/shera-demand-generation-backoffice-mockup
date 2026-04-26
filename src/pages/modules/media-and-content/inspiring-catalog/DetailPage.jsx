import { useState } from 'react'
import { ActionIcon, Button, Card, FileInput, Grid, Group, Image, Select, Stack, Switch, Text, TextInput, Title } from '@mantine/core'
import { IconArrowsSort, IconCopy, IconTrash } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'

function Page({ selectedId }) {
  const [filters, setFilters] = useState([
    {
      id: 1,
      filterName: 'Roof Tile',
      imagePreview: 'https://picsum.photos/seed/filter-1/80/48',
      iconImage: null,
      queryParameter: 'type=roof-tile',
      isPublic: true,
    },
    {
      id: 2,
      filterName: 'Wall',
      imagePreview: 'https://picsum.photos/seed/filter-2/80/48',
      iconImage: null,
      queryParameter: 'type=wall',
      isPublic: false,
    },
  ])

  const updateFilter = (id, patch) => {
    setFilters((prev) => prev.map((row) => (row.id === id ? { ...row, ...patch } : row)))
  }

  const moveFilter = (id, direction) => {
    setFilters((prev) => {
      const index = prev.findIndex((item) => item.id === id)
      if (index < 0) return prev

      const nextIndex = direction === 'up' ? index - 1 : index + 1
      if (nextIndex < 0 || nextIndex >= prev.length) return prev

      const next = [...prev]
      ;[next[index], next[nextIndex]] = [next[nextIndex], next[index]]
      return next
    })
  }

  const duplicateFilter = (id) => {
    setFilters((prev) => {
      const target = prev.find((row) => row.id === id)
      if (!target) return prev
      const nextId = Math.max(...prev.map((row) => row.id)) + 1
      return [...prev, { ...target, id: nextId, filterName: `${target.filterName} Copy` }]
    })
  }

  const removeFilter = (id) => {
    setFilters((prev) => prev.filter((row) => row.id !== id))
  }

  const filterColumns = [
    {
      accessor: 'ordering',
      title: '',
      width: 90,
      render: (row) => (
        <Group gap={4} wrap="nowrap">
          <ActionIcon variant="subtle" size="sm">
            <IconArrowsSort size={14} />
          </ActionIcon>
          <ActionIcon size="sm" variant="subtle" onClick={() => moveFilter(row.id, 'up')}>
            ▲
          </ActionIcon>
          <ActionIcon size="sm" variant="subtle" onClick={() => moveFilter(row.id, 'down')}>
            ▼
          </ActionIcon>
        </Group>
      ),
    },
    {
      accessor: 'filterName',
      title: 'Filter Name',
      render: (row) => (
        <TextInput
          value={row.filterName}
          placeholder="-"
          onChange={(event) => updateFilter(row.id, { filterName: event.currentTarget.value })}
        />
      ),
    },
    {
      accessor: 'imagePreview',
      title: 'Image Preview',
      render: (row) => <Image src={row.imagePreview} alt="filter preview" w={64} h={40} radius="sm" fit="cover" />,
    },
    {
      accessor: 'iconImage',
      title: 'Icon Image',
      render: (row) => <FileInput placeholder="-" onChange={(file) => updateFilter(row.id, { iconImage: file })} />,
    },
    {
      accessor: 'queryParameter',
      title: 'Query Parameter',
      render: (row) => (
        <TextInput
          value={row.queryParameter}
          placeholder="type=example"
          description="example: https://www.shera.com/th/catalog/post1?type=example"
          onChange={(event) => updateFilter(row.id, { queryParameter: event.currentTarget.value })}
        />
      ),
    },
    {
      accessor: 'isPublic',
      title: 'Is Public?',
      render: (row) => (
        <Switch
          checked={Boolean(row.isPublic)}
          onChange={(event) => updateFilter(row.id, { isPublic: event.currentTarget.checked })}
          onLabel="Yes"
          offLabel="No"
        />
      ),
    },
    {
      accessor: 'action',
      title: 'Action',
      render: (row) => (
        <Group gap={6} wrap="nowrap">
          <ActionIcon color="red" variant="light" onClick={() => removeFilter(row.id)} aria-label="remove">
            <IconTrash size={14} />
          </ActionIcon>
          <ActionIcon color="blue" variant="light" onClick={() => duplicateFilter(row.id)} aria-label="duplicate">
            <IconCopy size={14} />
          </ActionIcon>
        </Group>
      ),
    },
  ]

  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2}>Inspiring Catalog Details #1029</Title>
          <Text c="dimmed">Detail view from specs/pages/Media & Content/Inspiring Catalog/detail.md.</Text>
          <Text size="sm" c="dimmed">
            Record: {selectedId || 'No record selected'}
          </Text>
        </div>
        <Group>
          <Button variant="default">Cancel</Button>
          <Button variant="light">Duplicate</Button>
          <Button>Save Changes</Button>
        </Group>
      </Group>

      <Card withBorder radius="md" p="md">
        <Stack gap="sm">
          <Text fw={700}>Section 1: Primary Category Name - e.g., Basic Information</Text>
          <Text size="sm" c="dimmed">Brief summary of what this section handles.</Text>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput label="Main Menu Name" required placeholder="" />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap={6}>
                <Text size="sm" fw={500}>
                  Icon Image Preview
                </Text>
                <Image src="https://picsum.photos/seed/main-icon/120/72" alt="Main menu icon preview" w={120} h={72} radius="sm" fit="cover" />
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <FileInput label="Upload Image" required placeholder="" />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                type="url"
                label="Main Menu URL"
                required
                placeholder=""
                description="https://www.shera.com/th/catalog"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Select label="Status" required data={['Public', 'Hidden']} defaultValue="Public" />
            </Grid.Col>
          </Grid>
        </Stack>
      </Card>

      <Card withBorder radius="md" p="md">
        <Stack gap="sm">
          <Text fw={700}>Section 2: Filters</Text>
          <Text size="sm" c="dimmed">show the table of input with inline edit and row dragging for ordering</Text>
          <DataTable withTableBorder withColumnBorders striped records={filters} columns={filterColumns} minHeight={220} />
        </Stack>
      </Card>

      <Card withBorder radius="md" p="md">
        <Stack gap="xs">
          <Text fw={700}>Section 3: Additional Info</Text>
          <Group justify="space-between">
            <Text c="dimmed">Created By</Text>
            <Text>System Label</Text>
          </Group>
          <Group justify="space-between">
            <Text c="dimmed">Last Modified</Text>
            <Text>Timestamp</Text>
          </Group>
          <Group justify="space-between">
            <Text c="dimmed">Created Date</Text>
            <Text>Date in YYYY-MM-DD HH:mm:ss</Text>
          </Group>
        </Stack>
      </Card>

      <Card withBorder radius="md" p="md">
        <Group justify="space-between" align="center">
          <Button color="red" variant="light">
            Delete
          </Button>
          <Group>
            <Button variant="default">Cancel</Button>
            <Button>Submit</Button>
          </Group>
        </Group>
      </Card>
    </Stack>
  )
}

export default Page
