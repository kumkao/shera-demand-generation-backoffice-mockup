const fs = require('fs')
const path = require('path')

const root = process.cwd()
const specsRoot = path.join(root, 'specs/pages')
const outRoot = path.join(root, 'src/pages/modules')
const registryPath = path.join(root, 'src/lib/pageRegistry.js')

const slugify = (value) => value.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const walk = (dir) => {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(full))
    else if (entry.isFile() && entry.name.endsWith('.md')) out.push(full)
  }
  return out
}

const parseTableColumns = (md) => {
  const lines = md
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('|') && !line.includes(':---'))

  if (lines.length < 2) {
    return ['ID', 'Name', 'Status', 'Updated At']
  }

  const cols = lines
    .slice(1)
    .map((row) => row.split('|').map((cell) => cell.trim()).filter(Boolean)[0] || '')
    .map((cell) => cell.replace(/[\[\]]/g, '').trim())
    .filter(Boolean)

  return cols.length ? cols.slice(0, 6) : ['ID', 'Name', 'Status', 'Updated At']
}

const parseDetailSections = (md) => {
  const lines = md.split('\n')
  const sections = []
  let current = null

  for (const raw of lines) {
    const line = raw.trim()
    const match = line.match(/^##\s+(.*)$/)
    if (match) {
      if (current) sections.push(current)
      current = { title: match[1].replace(/[\[\]*]/g, '').trim(), fields: [] }
      continue
    }

    if (!current || !line.startsWith('|') || line.includes(':---')) {
      continue
    }

    const cells = line.split('|').map((cell) => cell.trim()).filter(Boolean)
    if (!cells.length || cells[0].toLowerCase() === 'field label') {
      continue
    }

    current.fields.push({
      label: (cells[0] || 'Field').replace(/[\[\]*]/g, '').trim(),
      inputType: (cells[1] || 'Text').replace(/[\[\]*]/g, '').trim(),
      required: (cells[2] || 'Optional').replace(/[\[\]*]/g, '').trim(),
      placeholder: (cells[3] || '').replace(/[\[\]*]/g, '').trim(),
    })
  }

  if (current) sections.push(current)

  return sections.length
    ? sections
    : [
        {
          title: 'General Information',
          fields: [{ label: 'Name', inputType: 'Text', required: 'Required', placeholder: 'Enter value' }],
        },
      ]
}

const buildListComponent = (page, columnsLiteral) => `import { Badge, Button, Card, Group, Stack, Text, TextInput, Title } from '@mantine/core'
import { DataTable } from 'mantine-datatable'

const columns = [
  ${columnsLiteral}
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
          <Title order={2}>${page.pageTitle.replace(/'/g, "\\'")}</Title>
          <Text c="dimmed">List view from specs/pages/${page.section}/${page.pageTitle}/table.md.</Text>
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
`

const buildDetailComponent = (page, sectionsLiteral) => `import { Button, Card, Grid, Group, Select, Stack, Switch, Text, TextInput, Title } from '@mantine/core'

const sections = ${sectionsLiteral}

function renderField(field, index) {
  const label = field.label + ' (' + (field.required || 'Optional') + ')'
  const type = (field.inputType || '').toLowerCase()

  if (type.includes('select')) {
    return (
      <Select
        key={field.label + index}
        label={label}
        data={['Option A', 'Option B', 'Option C']}
        placeholder={field.placeholder || 'Select'}
      />
    )
  }

  if (type.includes('toggle')) {
    return <Switch key={field.label + index} label={label} />
  }

  return <TextInput key={field.label + index} label={label} placeholder={field.placeholder || 'Enter value'} />
}

function Page({ selectedId }) {
  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2}>${page.pageTitle.replace(/'/g, "\\'")}</Title>
          <Text c="dimmed">Detail view from specs/pages/${page.section}/${page.pageTitle}/detail.md.</Text>
          <Text size="sm" c="dimmed">
            Record: {selectedId || 'No record selected'}
          </Text>
        </div>
        <Group>
          <Button variant="default">Cancel</Button>
          <Button>Save Changes</Button>
        </Group>
      </Group>
      {sections.map((section) => (
        <Card withBorder radius="md" p="md" key={section.title}>
          <Stack gap="sm">
            <Text fw={700}>{section.title}</Text>
            <Grid>
              {section.fields.map((field, index) => (
                <Grid.Col key={section.title + field.label + index} span={{ base: 12, md: 6 }}>
                  {renderField(field, index)}
                </Grid.Col>
              ))}
            </Grid>
          </Stack>
        </Card>
      ))}
    </Stack>
  )
}

export default Page
`

const buildReportComponent = (page) => `import { Badge, Card, Group, RingProgress, SimpleGrid, Stack, Text, Title } from '@mantine/core'

const metrics = [
  { label: 'Completion', value: 76, color: 'blue' },
  { label: 'Accuracy', value: 91, color: 'teal' },
  { label: 'Coverage', value: 64, color: 'orange' },
]

function Page() {
  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2}>${page.pageTitle.replace(/'/g, "\\'")}</Title>
          <Text c="dimmed">Report view generated from specs.</Text>
        </div>
        <Badge variant="light">Auto Report</Badge>
      </Group>
      <SimpleGrid cols={{ base: 1, md: 3 }}>
        {metrics.map((metric) => (
          <Card key={metric.label} withBorder radius="md" p="md">
            <Group justify="space-between">
              <Text fw={600}>{metric.label}</Text>
              <RingProgress
                size={72}
                thickness={8}
                sections={[{ value: metric.value, color: metric.color }]}
                label={<Text size="xs">{metric.value}%</Text>}
              />
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </Stack>
  )
}

export default Page
`

fs.mkdirSync(outRoot, { recursive: true })

const pageMap = new Map()
for (const file of walk(specsRoot)) {
  const rel = path.relative(specsRoot, file).split(path.sep)
  if (rel.length < 3) continue

  const section = rel[0]
  const pageTitle = rel[1]
  const type = rel[2].toLowerCase().replace('.md', '')
  const key = `${section}::${pageTitle}`

  const current = pageMap.get(key) || { section, pageTitle }
  current[type] = fs.readFileSync(file, 'utf8')
  pageMap.set(key, current)
}

const imports = []
const entries = []
let idx = 0

for (const page of pageMap.values()) {
  idx += 1

  const sectionSlug = slugify(page.section)
  const pageSlug = slugify(page.pageTitle)
  const pageDir = path.join(outRoot, sectionSlug, pageSlug)
  fs.mkdirSync(pageDir, { recursive: true })

  const routeBase = `/${sectionSlug}/${pageSlug}`
  const varBase = `P${idx}`

  if (page.table) {
    const columnsLiteral = parseTableColumns(page.table)
      .map((title, i) => `{ accessor: 'col${i + 1}', title: ${JSON.stringify(title)} }`)
      .join(',\n  ')

    fs.writeFileSync(path.join(pageDir, 'ListPage.jsx'), buildListComponent(page, columnsLiteral))
    imports.push(`import ${varBase}List from '../pages/modules/${sectionSlug}/${pageSlug}/ListPage'`)
  }

  if (page.detail) {
    const sectionsLiteral = JSON.stringify(parseDetailSections(page.detail), null, 2)
    fs.writeFileSync(path.join(pageDir, 'DetailPage.jsx'), buildDetailComponent(page, sectionsLiteral))
    imports.push(`import ${varBase}Detail from '../pages/modules/${sectionSlug}/${pageSlug}/DetailPage'`)
  }

  if (page.report) {
    fs.writeFileSync(path.join(pageDir, 'ReportPage.jsx'), buildReportComponent(page))
    imports.push(`import ${varBase}Report from '../pages/modules/${sectionSlug}/${pageSlug}/ReportPage'`)
  }

  entries.push(`  {
    section: ${JSON.stringify(page.section)},
    title: ${JSON.stringify(page.pageTitle)},
    route: ${JSON.stringify(routeBase)},
    hasListView: ${Boolean(page.table)},
    hasDetailView: ${Boolean(page.detail)},
    hasReportView: ${Boolean(page.report)},
    ListComponent: ${page.table ? `${varBase}List` : 'null'},
    DetailComponent: ${page.detail ? `${varBase}Detail` : 'null'},
    ReportComponent: ${page.report ? `${varBase}Report` : 'null'},
  }`)
}

const registryCode = `${imports.join('\n')}

export const pageRegistry = [
${entries.join(',\n')}
]
`

fs.writeFileSync(registryPath, registryCode)
console.log(`Generated ${entries.length} page entries`)
