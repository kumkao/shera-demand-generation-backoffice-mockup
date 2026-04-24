import { useEffect, useMemo } from 'react'
import { Badge, Button, Card, Group, Stack, Tabs, Text, Title } from '@mantine/core'
import { DataTable } from 'mantine-datatable'
import Markdown from 'react-markdown'
import { useNavigate, useParams } from 'react-router-dom'

function SpecPage({ page, mode = 'list' }) {
  const navigate = useNavigate()
  const { id } = useParams()

  const availableViews = useMemo(() => {
    const views = []

    if (page.hasListView) {
      views.push('list')
    }

    if (page.hasDetailView) {
      views.push('detail')
    }

    if (page.hasReportView) {
      views.push('report')
    }

    return views.length > 0 ? views : ['list']
  }, [page.hasDetailView, page.hasListView, page.hasReportView])

  const activeView = availableViews.includes(mode) ? mode : availableViews[0]
  const selectedRecord = useMemo(() => page.rows.find((row) => String(row.id) === String(id)) || null, [id, page.rows])

  const navigateToView = (nextView, nextId) => {
    if (nextView === 'list') {
      navigate(`${page.route}/list`)
      return
    }

    if (nextView === 'detail') {
      if (nextId !== undefined && nextId !== null) {
        navigate(`${page.route}/detail/${nextId}`)
        return
      }

      navigate(`${page.route}/detail`)
      return
    }

    if (nextView === 'report') {
      navigate(`${page.route}/report`)
    }
  }

  useEffect(() => {
    if (!availableViews.includes(mode)) {
      navigate(`${page.route}/${availableViews[0]}`, { replace: true })
    }
  }, [availableViews, mode, navigate, page.route])

  const selectedSummary = selectedRecord
    ? Object.entries(selectedRecord)
        .map(([key, value]) => `${key}: ${String(value)}`)
        .join(' | ')
    : 'Select a row from list view to inspect details.'

  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2}>{page.title}</Title>
          <Text c="dimmed">Views are generated from available files in specs/pages for this menu.</Text>
        </div>
        <Button radius="md">Primary Action</Button>
      </Group>

      <Tabs
        value={activeView}
        onChange={(nextValue) => navigateToView(nextValue || availableViews[0], selectedRecord?.id)}
        radius="md"
      >
        <Tabs.List>
          {page.hasListView ? <Tabs.Tab value="list">List View</Tabs.Tab> : null}
          {page.hasDetailView ? <Tabs.Tab value="detail">Detail View</Tabs.Tab> : null}
          {page.hasReportView ? <Tabs.Tab value="report">Report View</Tabs.Tab> : null}
        </Tabs.List>

        <Tabs.Panel value="list" pt="md">
          <Card withBorder radius="md" p="md">
            <Group justify="space-between" mb="sm">
              <Text fw={600}>Records</Text>
              <Badge variant="light">{page.rows.length} rows</Badge>
            </Group>
            <DataTable
              withTableBorder
              withColumnBorders
              striped
              highlightOnHover
              records={page.rows}
              columns={page.columns}
              idAccessor="id"
              minHeight={300}
              onRowClick={({ record }) => {
                if (page.hasDetailView) {
                  navigateToView('detail', record.id)
                }
              }}
            />
          </Card>
          {page.tableSpec ? (
            <Card withBorder radius="md" p="md" mt="md">
              <Text fw={600} mb="xs">
                Table Spec
              </Text>
              <div className="markdown-panel">
                <Markdown>{page.tableSpec}</Markdown>
              </div>
            </Card>
          ) : null}
        </Tabs.Panel>

        <Tabs.Panel value="detail" pt="md">
          <Card withBorder radius="md" p="md">
            <Text fw={600} mb="xs">
              Detail Spec
            </Text>
            <Text size="sm" c="dimmed" mb="md">
              {selectedSummary}
            </Text>
            <div className="markdown-panel">
              <Markdown>{page.detailSpec || 'No detail spec provided yet.'}</Markdown>
            </div>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="report" pt="md">
          <Card withBorder radius="md" p="md">
            <Text fw={600} mb="xs">
              Report Spec
            </Text>
            <div className="markdown-panel">
              <Markdown>{page.reportSpec || 'No report spec provided yet.'}</Markdown>
            </div>
          </Card>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  )
}

export default SpecPage
