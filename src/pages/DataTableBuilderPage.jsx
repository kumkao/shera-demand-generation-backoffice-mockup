import { useMemo, useState } from 'react'
import {
  ActionIcon,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  MultiSelect,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core'
import { IconPlus, IconTrash } from '@tabler/icons-react'
import Markdown from 'react-markdown'

const INPUT_TYPE_DEFINITIONS = [
  {
    value: 'TextInput',
    label: 'TextInput',
    getDefaultConfig: () => ({ placeholder: '' }),
    configFields: [{ key: 'placeholder', label: 'Placeholder', kind: 'text', placeholder: 'Enter text...' }],
  },
  {
    value: 'Textarea',
    label: 'Textarea',
    getDefaultConfig: () => ({ placeholder: '', minRows: '3' }),
    configFields: [
      { key: 'placeholder', label: 'Placeholder', kind: 'text', placeholder: 'Enter paragraph...' },
      { key: 'minRows', label: 'Min Rows', kind: 'number', placeholder: '3' },
    ],
  },
  {
    value: 'NumberInput',
    label: 'NumberInput',
    getDefaultConfig: () => ({ min: '', max: '', step: '1' }),
    configFields: [
      { key: 'min', label: 'Min', kind: 'number', placeholder: '0' },
      { key: 'max', label: 'Max', kind: 'number', placeholder: '9999' },
      { key: 'step', label: 'Step', kind: 'number', placeholder: '1' },
    ],
  },
  {
    value: 'Select',
    label: 'Select',
    getDefaultConfig: () => ({ options: '' }),
    configFields: [{ key: 'options', label: 'Options (comma-separated)', kind: 'text', placeholder: 'Active, Inactive' }],
  },
  {
    value: 'MultiSelect',
    label: 'MultiSelect',
    getDefaultConfig: () => ({ options: '' }),
    configFields: [{ key: 'options', label: 'Options (comma-separated)', kind: 'text', placeholder: 'Tag A, Tag B' }],
  },
  {
    value: 'DatePickerInput',
    label: 'DatePickerInput',
    getDefaultConfig: () => ({ dateType: 'default' }),
    configFields: [
      {
        key: 'dateType',
        label: 'Picker Type',
        kind: 'select',
        options: [
          { value: 'default', label: 'Single Date' },
          { value: 'range', label: 'Date Range' },
        ],
      },
    ],
  },
  {
    value: 'Switch',
    label: 'Switch',
    getDefaultConfig: () => ({ onLabel: 'Yes', offLabel: 'No' }),
    configFields: [
      { key: 'onLabel', label: 'On Label', kind: 'text', placeholder: 'Yes' },
      { key: 'offLabel', label: 'Off Label', kind: 'text', placeholder: 'No' },
    ],
  },
]

const BUTTON_VARIANTS = [
  { value: 'filled', label: 'filled' },
  { value: 'light', label: 'light' },
  { value: 'outline', label: 'outline' },
  { value: 'subtle', label: 'subtle' },
  { value: 'default', label: 'default' },
]

const BUTTON_COLORS = [
  { value: 'blue', label: 'blue' },
  { value: 'gray', label: 'gray' },
  { value: 'red', label: 'red' },
  { value: 'green', label: 'green' },
  { value: 'orange', label: 'orange' },
]

const BUTTON_SIZES = [
  { value: 'xs', label: 'xs' },
  { value: 'sm', label: 'sm' },
  { value: 'md', label: 'md' },
  { value: 'lg', label: 'lg' },
]

const SECONDARY_ACTION_TYPE_DEFINITIONS = [
  ...INPUT_TYPE_DEFINITIONS,
  {
    value: 'Button',
    label: 'Button',
    getDefaultConfig: () => ({ label: '', variant: 'filled', color: 'blue', size: 'sm' }),
    configFields: [
      { key: 'label', label: 'Button Label', kind: 'text', placeholder: 'Export CSV' },
      { key: 'variant', label: 'Variant', kind: 'select', options: BUTTON_VARIANTS },
      { key: 'color', label: 'Color', kind: 'select', options: BUTTON_COLORS },
      { key: 'size', label: 'Size', kind: 'select', options: BUTTON_SIZES },
    ],
  },
  {
    value: 'IconButton',
    label: 'IconButton',
    getDefaultConfig: () => ({ icon: 'IconDownload', variant: 'light', color: 'blue', size: 'sm' }),
    configFields: [
      { key: 'icon', label: 'Icon Name', kind: 'text', placeholder: 'IconDownload' },
      { key: 'variant', label: 'Variant', kind: 'select', options: BUTTON_VARIANTS },
      { key: 'color', label: 'Color', kind: 'select', options: BUTTON_COLORS },
      { key: 'size', label: 'Size', kind: 'select', options: BUTTON_SIZES },
    ],
  },
]

const densityOptions = [
  { value: 'High', label: 'High' },
  { value: 'Comfortable', label: 'Comfortable' },
]

const yesNoOptions = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
]

const alignmentOptions = [
  { value: 'Left', label: 'Left' },
  { value: 'Center', label: 'Center' },
  { value: 'Right', label: 'Right' },
]

const paginationTypeOptions = [
  { value: 'Numbered Pages', label: 'Numbered Pages' },
  { value: 'Infinite Scroll', label: 'Infinite Scroll' },
]

const itemsPerPageValueOptions = [
  { value: '10', label: '10' },
  { value: '25', label: '25' },
  { value: '50', label: '50' },
  { value: '100', label: '100' },
]

const createButtonItem = () => ({
  label: '',
  attributes: '',
  styles: '',
})

const createFilterItem = (typeDefinitions = INPUT_TYPE_DEFINITIONS) => ({
  label: '',
  inputType: typeDefinitions[0].value,
  config: typeDefinitions[0].getDefaultConfig(),
})

const createColumnItem = () => ({
  header: '',
  dataType: '',
  sortable: 'Yes',
  alignment: 'Left',
  styleComponentFormat: '',
})

const createMenuItem = () => ({ label: '' })

const createBuilderState = () => ({
  title: '',
  primaryActions: [createButtonItem()],
  utilityBar: {
    globalSearch: {
      label: '',
      placeholder: '',
    },
    primaryFilters: [createFilterItem()],
    secondaryActions: [createFilterItem(SECONDARY_ACTION_TYPE_DEFINITIONS)],
  },
  table: {
    density: 'Comfortable',
    rowSelection: 'Yes',
    columns: [createColumnItem()],
    rowActions: {
      primaryHoverAction: '',
      menuItems: [createMenuItem()],
    },
    footerPagination: {
      paginationType: 'Numbered Pages',
      itemsPerPage: ['10', '25', '50', '100'],
      summaryStats: 'Total: 1,240 items | Selected: 0',
    },
  },
  actions: [createButtonItem()],
})

const escapeMarkdownCell = (value) => (value || '').replaceAll('|', '\\|')

const asBulletList = (items, emptyText = '[]') => {
  if (!items.length) {
    return emptyText
  }

  return items.map((item) => `- ${item}`).join('\n')
}

const getTypeDefinition = (type, typeDefinitions = INPUT_TYPE_DEFINITIONS) =>
  typeDefinitions.find((item) => item.value === type) || typeDefinitions[0]

const hasConfigValue = (config) =>
  Object.values(config || {}).some((value) => {
    if (value === null || value === undefined) {
      return false
    }

    return String(value).trim() !== ''
  })

const getFilterConfigSummary = (filterItem) => {
  if (filterItem.inputType === 'TextInput' || filterItem.inputType === 'Textarea') {
    return filterItem.config?.placeholder || 'None'
  }

  if (filterItem.inputType === 'NumberInput') {
    const parts = []
    if (filterItem.config?.min !== '') {
      parts.push(`min=${filterItem.config.min}`)
    }
    if (filterItem.config?.max !== '') {
      parts.push(`max=${filterItem.config.max}`)
    }
    if (filterItem.config?.step !== '') {
      parts.push(`step=${filterItem.config.step}`)
    }
    return parts.length ? parts.join(', ') : 'None'
  }

  if (filterItem.inputType === 'Select' || filterItem.inputType === 'MultiSelect') {
    return filterItem.config?.options || 'None'
  }

  if (filterItem.inputType === 'DatePickerInput') {
    return filterItem.config?.dateType === 'range' ? 'Range' : 'Single'
  }

  if (filterItem.inputType === 'Switch') {
    return `on=${filterItem.config?.onLabel || 'Yes'}, off=${filterItem.config?.offLabel || 'No'}`
  }

  if (filterItem.inputType === 'Button') {
    return `label=${filterItem.config?.label || 'Button'}, variant=${filterItem.config?.variant || 'filled'}, color=${filterItem.config?.color || 'blue'}, size=${filterItem.config?.size || 'sm'}`
  }

  if (filterItem.inputType === 'IconButton') {
    return `icon=${filterItem.config?.icon || 'IconDownload'}, variant=${filterItem.config?.variant || 'light'}, color=${filterItem.config?.color || 'blue'}, size=${filterItem.config?.size || 'sm'}`
  }

  return 'None'
}

function ConfigFieldEditor({ field, value, onChange }) {
  if (field.kind === 'select') {
    return <Select label={field.label} data={field.options || []} value={value || ''} onChange={(next) => onChange(next || '')} />
  }

  return (
    <TextInput
      label={field.label}
      placeholder={field.placeholder}
      value={value || ''}
      onChange={(event) => onChange(event.currentTarget.value)}
      type={field.kind === 'number' ? 'number' : 'text'}
    />
  )
}

function ButtonListEditor({ title, description, items, onChange }) {
  const updateItem = (index, key, value) => {
    onChange(items.map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item)))
  }

  const addItem = () => {
    onChange([...items, createButtonItem()])
  }

  const removeItem = (index) => {
    onChange(items.filter((_, itemIndex) => itemIndex !== index))
  }

  return (
    <Card withBorder radius="md" p="md">
      <Group justify="space-between" align="flex-start" mb="sm">
        <div>
          <Text fw={700}>{title}</Text>
          <Text size="sm" c="dimmed">
            {description}
          </Text>
        </div>
        <Button leftSection={<IconPlus size={16} />} variant="light" onClick={addItem}>
          Add Button
        </Button>
      </Group>

      <Stack gap="sm">
        {items.map((item, index) => (
          <Card key={`${title}-${index}`} withBorder radius="md" p="sm">
            <Group justify="space-between" mb="xs">
              <Text fw={600}>Button {index + 1}</Text>
              <ActionIcon
                variant="subtle"
                color="red"
                disabled={items.length === 1}
                onClick={() => removeItem(index)}
                aria-label={`Remove ${title} button ${index + 1}`}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Group>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
              <TextInput
                label="Button Label"
                placeholder="Add New Item"
                value={item.label}
                onChange={(event) => updateItem(index, 'label', event.target.value)}
              />
              <TextInput
                label="Button Attributes"
                placeholder="variant=filled; color=orange"
                value={item.attributes}
                onChange={(event) => updateItem(index, 'attributes', event.target.value)}
              />
            </SimpleGrid>
            <TextInput
              mt="sm"
              label="Button Styles"
              placeholder="minWidth: 140px"
              value={item.styles}
              onChange={(event) => updateItem(index, 'styles', event.target.value)}
            />
          </Card>
        ))}
      </Stack>
    </Card>
  )
}

function FilterListEditor({ title, description, items, onChange, typeDefinitions = INPUT_TYPE_DEFINITIONS }) {
  const updateItem = (index, key, value) => {
    onChange(items.map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item)))
  }

  const addItem = () => {
    onChange([...items, createFilterItem(typeDefinitions)])
  }

  const removeItem = (index) => {
    onChange(items.filter((_, itemIndex) => itemIndex !== index))
  }

  return (
    <Card withBorder radius="md" p="md">
      <Group justify="space-between" align="flex-start" mb="sm">
        <div>
          <Text fw={700}>{title}</Text>
          <Text size="sm" c="dimmed">
            {description}
          </Text>
        </div>
        <Button leftSection={<IconPlus size={16} />} variant="light" onClick={addItem}>
          Add Field
        </Button>
      </Group>

      <Stack gap="sm">
        {items.map((item, index) => (
          <Card key={`${title}-${index}`} withBorder radius="md" p="sm">
            {(() => {
              const typeDefinition = getTypeDefinition(item.inputType, typeDefinitions)

              return (
                <>
            <Group justify="space-between" mb="xs">
              <Text fw={600}>Field {index + 1}</Text>
              <ActionIcon
                variant="subtle"
                color="red"
                disabled={items.length === 1}
                onClick={() => removeItem(index)}
                aria-label={`Remove ${title} field ${index + 1}`}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Group>

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
              <TextInput
                label="Label"
                placeholder="Status"
                value={item.label}
                onChange={(event) => updateItem(index, 'label', event.target.value)}
              />
              <Select
                label="Input Type (Mantine Component)"
                data={typeDefinitions}
                value={item.inputType}
                onChange={(nextValue) => {
                  const safeType = nextValue || 'TextInput'
                  const definition = getTypeDefinition(safeType, typeDefinitions)
                  onChange(
                    items.map((currentItem, itemIndex) =>
                      itemIndex === index ? { ...currentItem, inputType: safeType, config: definition.getDefaultConfig() } : currentItem,
                    ),
                  )
                }}
                allowDeselect={false}
              />
            </SimpleGrid>

            <Grid mt="sm">
              {typeDefinition.configFields.map((field) => (
                <Grid.Col key={`${item.inputType}-${field.key}`} span={{ base: 12, md: 6 }}>
                  <ConfigFieldEditor
                    field={field}
                    value={item.config?.[field.key]}
                    onChange={(nextValue) =>
                      onChange(
                        items.map((currentItem, itemIndex) =>
                          itemIndex === index
                            ? {
                                ...currentItem,
                                config: {
                                  ...currentItem.config,
                                  [field.key]: nextValue,
                                },
                              }
                            : currentItem,
                        ),
                      )
                    }
                  />
                </Grid.Col>
              ))}
            </Grid>
                </>
              )
            })()}
          </Card>
        ))}
      </Stack>
    </Card>
  )
}

function ColumnsEditor({ columns, onChange }) {
  const updateColumn = (index, key, value) => {
    onChange(columns.map((column, columnIndex) => (columnIndex === index ? { ...column, [key]: value } : column)))
  }

  const addColumn = () => {
    onChange([...columns, createColumnItem()])
  }

  const removeColumn = (index) => {
    onChange(columns.filter((_, columnIndex) => columnIndex !== index))
  }

  return (
    <Card withBorder radius="md" p="md">
      <Group justify="space-between" align="flex-start" mb="sm">
        <div>
          <Text fw={700}>Columns</Text>
          <Text size="sm" c="dimmed">
            Configure every table column row for markdown output.
          </Text>
        </div>
        <Button leftSection={<IconPlus size={16} />} variant="light" onClick={addColumn}>
          Add Column
        </Button>
      </Group>

      <Stack gap="sm">
        {columns.map((column, index) => (
          <Card key={`column-${index}`} withBorder radius="md" p="sm">
            <Group justify="space-between" mb="xs">
              <Text fw={600}>Column {index + 1}</Text>
              <ActionIcon
                variant="subtle"
                color="red"
                disabled={columns.length === 1}
                onClick={() => removeColumn(index)}
                aria-label={`Remove column ${index + 1}`}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Group>

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
              <TextInput
                label="Header"
                placeholder="Customer ID"
                value={column.header}
                onChange={(event) => updateColumn(index, 'header', event.target.value)}
              />
              <TextInput
                label="Data Type"
                placeholder="String/ID"
                value={column.dataType}
                onChange={(event) => updateColumn(index, 'dataType', event.target.value)}
              />
              <Select
                label="Sortable"
                data={yesNoOptions}
                value={column.sortable}
                onChange={(nextValue) => updateColumn(index, 'sortable', nextValue || 'Yes')}
                allowDeselect={false}
              />
              <Select
                label="Alignment"
                data={alignmentOptions}
                value={column.alignment}
                onChange={(nextValue) => updateColumn(index, 'alignment', nextValue || 'Left')}
                allowDeselect={false}
              />
            </SimpleGrid>

            <TextInput
              mt="sm"
              label="Style/Component/Format"
              placeholder="Badge / pill / currency formatter"
              value={column.styleComponentFormat}
              onChange={(event) => updateColumn(index, 'styleComponentFormat', event.target.value)}
            />
          </Card>
        ))}
      </Stack>
    </Card>
  )
}

function MenuItemsEditor({ items, onChange }) {
  const updateItem = (index, value) => {
    onChange(items.map((item, itemIndex) => (itemIndex === index ? { ...item, label: value } : item)))
  }

  const addItem = () => {
    onChange([...items, createMenuItem()])
  }

  const removeItem = (index) => {
    onChange(items.filter((_, itemIndex) => itemIndex !== index))
  }

  return (
    <Card withBorder radius="md" p="md">
      <Group justify="space-between" align="flex-start" mb="sm">
        <div>
          <Text fw={700}>Menu Items</Text>
          <Text size="sm" c="dimmed">
            Define row action menu entries.
          </Text>
        </div>
        <Button leftSection={<IconPlus size={16} />} variant="light" onClick={addItem}>
          Add Menu Item
        </Button>
      </Group>

      <Stack gap="sm">
        {items.map((item, index) => (
          <Group key={`menu-item-${index}`} align="flex-end">
            <TextInput
              style={{ flex: 1 }}
              label={`Menu Item ${index + 1}`}
              placeholder="View Details"
              value={item.label}
              onChange={(event) => updateItem(index, event.target.value)}
            />
            <ActionIcon
              variant="subtle"
              color="red"
              disabled={items.length === 1}
              onClick={() => removeItem(index)}
              aria-label={`Remove menu item ${index + 1}`}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Group>
        ))}
      </Stack>
    </Card>
  )
}

function DataTableBuilderPage() {
  const [builder, setBuilder] = useState(() => createBuilderState())

  const markdownOutput = useMemo(() => {
    const pageTitle = builder.title || '[e.g., Inventory Management / Order History]'

    const primaryActionLines = builder.primaryActions
      .filter((button) => button.label.trim() || button.attributes.trim() || button.styles.trim())
      .map((button) => {
        const fragments = []

        if (button.label.trim()) {
          fragments.push(`label: ${button.label.trim()}`)
        }

        if (button.attributes.trim()) {
          fragments.push(`attributes: ${button.attributes.trim()}`)
        }

        if (button.styles.trim()) {
          fragments.push(`styles: ${button.styles.trim()}`)
        }

        return fragments.join(' | ') || '[button not configured]'
      })

    const primaryFilterLines = builder.utilityBar.primaryFilters
      .filter((filterItem) => filterItem.label.trim() || hasConfigValue(filterItem.config))
      .map((filterItem) => {
        const config = getFilterConfigSummary(filterItem)
        return `${filterItem.label.trim() || '[Filter Label]'}: [Type: ${filterItem.inputType}] [Config: ${config}]`
      })

    const secondaryActionLines = builder.utilityBar.secondaryActions
      .filter((filterItem) => filterItem.label.trim() || hasConfigValue(filterItem.config))
      .map((filterItem) => {
        const config = getFilterConfigSummary(filterItem)
        return `${filterItem.label.trim() || '[Action Label]'}: [Type: ${filterItem.inputType}] [Config: ${config}]`
      })

    const globalSearchLabel = builder.utilityBar.globalSearch.label.trim() || '[Search Label]'
    const globalSearchPlaceholder =
      builder.utilityBar.globalSearch.placeholder.trim() || '[Placeholder text, e.g., "Search by ID or Name..."]'

    const columnRows = builder.table.columns
      .filter(
        (column) =>
          column.header.trim() ||
          column.dataType.trim() ||
          column.sortable.trim() ||
          column.alignment.trim() ||
          column.styleComponentFormat.trim(),
      )
      .map(
        (column) =>
          `| ${escapeMarkdownCell(column.header || '[Col Name]')} | ${escapeMarkdownCell(column.dataType || '[e.g., String/ID]')} | ${escapeMarkdownCell(column.sortable || '[Yes/No]')} | ${escapeMarkdownCell(column.alignment || '[Left]')} | ${escapeMarkdownCell(column.styleComponentFormat || '[Plain Text]')} |`,
      )

    const menuItems = builder.table.rowActions.menuItems
      .map((item) => item.label.trim())
      .filter(Boolean)
      .join(', ')

    const footerItems = builder.table.footerPagination.itemsPerPage.join(', ') || '10, 25, 50, 100'

    const actionLines = builder.actions
      .filter((button) => button.label.trim() || button.attributes.trim() || button.styles.trim())
      .map((button) => {
        const fragments = []

        if (button.label.trim()) {
          fragments.push(`label: ${button.label.trim()}`)
        }

        if (button.attributes.trim()) {
          fragments.push(`attributes: ${button.attributes.trim()}`)
        }

        if (button.styles.trim()) {
          fragments.push(`styles: ${button.styles.trim()}`)
        }

        return fragments.join(' | ') || '[button not configured]'
      })

    return `## Page Identity
- **Page Title:** ${pageTitle}
- **Primary Page Action:**
${asBulletList(primaryActionLines)}

---

## Utility Bar (Filters & Search)
- **Global Search:** [Label: ${globalSearchLabel}] [Placeholder: ${globalSearchPlaceholder}]
- **Primary Filters:**
${asBulletList(primaryFilterLines)}
- **Secondary Actions:**
${asBulletList(secondaryActionLines)}

---

## Table Configuration
- **Density:** ${builder.table.density}
- **Row Selection:** ${builder.table.rowSelection}

| Column Header | Data Type | Sortable | Alignment | Style/Component |
| :--- | :--- | :--- | :--- | :--- |
${columnRows.length ? columnRows.join('\n') : '| [Col Name] | [e.g., String/ID] | [Yes/No] | [Left] | [Plain Text] |'}

---

## Row Actions
*What happens when a user interacts with a specific row?*
- **Primary Hover Action:** ${builder.table.rowActions.primaryHoverAction.trim() || '[e.g., Quick Edit]'}
- **Menu Items:** ${menuItems || '[e.g., View Details, Duplicate, Archive, Delete (Danger)]'}

---

## Footer & Pagination
- **Pagination Type:** ${builder.table.footerPagination.paginationType}
- **Items Per Page:** [${footerItems}]
- **Summary Stats:** ${builder.table.footerPagination.summaryStats.trim() || '[e.g., Total: 1,240 items | Selected: 0]'}

---

## Actions
- **Buttons:**
${asBulletList(actionLines)}`
  }, [builder])

  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2}>DataTable Builder</Title>
          <Text c="dimmed">Build config on the left and copy generated table markdown from the right.</Text>
        </div>
        <Button variant="default" onClick={() => setBuilder(createBuilderState())}>
          Reset Builder
        </Button>
      </Group>

      <Grid gutter="md" align="start">
        <Grid.Col span={{ base: 12, lg: 7 }}>
          <Stack gap="md">
          <Card withBorder radius="md" p="md">
            <Text fw={700} mb="xs">
              Page Identity
            </Text>
            <TextInput
              label="Title"
              placeholder="Inventory Management"
              value={builder.title}
              onChange={(event) => setBuilder((prev) => ({ ...prev, title: event.target.value }))}
            />
          </Card>

          <ButtonListEditor
            title="Primary Actions"
            description="Top-right actions shown near title."
            items={builder.primaryActions}
            onChange={(primaryActions) => setBuilder((prev) => ({ ...prev, primaryActions }))}
          />

          <Card withBorder radius="md" p="md">
            <Text fw={700} mb="sm">
              Utility Bar
            </Text>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
              <TextInput
                label="Global Search Label"
                placeholder="Global Search"
                value={builder.utilityBar.globalSearch.label}
                onChange={(event) =>
                  setBuilder((prev) => ({
                    ...prev,
                    utilityBar: {
                      ...prev.utilityBar,
                      globalSearch: {
                        ...prev.utilityBar.globalSearch,
                        label: event.target.value,
                      },
                    },
                  }))
                }
              />
              <TextInput
                label="Global Search Placeholder"
                placeholder="Search by ID or Name..."
                value={builder.utilityBar.globalSearch.placeholder}
                onChange={(event) =>
                  setBuilder((prev) => ({
                    ...prev,
                    utilityBar: {
                      ...prev.utilityBar,
                      globalSearch: {
                        ...prev.utilityBar.globalSearch,
                        placeholder: event.target.value,
                      },
                    },
                  }))
                }
              />
            </SimpleGrid>

            <Stack gap="md" mt="md">
              <FilterListEditor
                title="Primary Filters"
                description="Main filters beside search."
                items={builder.utilityBar.primaryFilters}
                typeDefinitions={INPUT_TYPE_DEFINITIONS}
                onChange={(primaryFilters) =>
                  setBuilder((prev) => ({
                    ...prev,
                    utilityBar: {
                      ...prev.utilityBar,
                      primaryFilters,
                    },
                  }))
                }
              />

              <FilterListEditor
                title="Secondary Actions"
                description="Actions in the secondary dropdown/action area."
                items={builder.utilityBar.secondaryActions}
                typeDefinitions={SECONDARY_ACTION_TYPE_DEFINITIONS}
                onChange={(secondaryActions) =>
                  setBuilder((prev) => ({
                    ...prev,
                    utilityBar: {
                      ...prev.utilityBar,
                      secondaryActions,
                    },
                  }))
                }
              />
            </Stack>
          </Card>

          <Card withBorder radius="md" p="md">
            <Text fw={700} mb="sm">
              Table
            </Text>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
              <Select
                label="Density"
                data={densityOptions}
                value={builder.table.density}
                onChange={(nextValue) =>
                  setBuilder((prev) => ({
                    ...prev,
                    table: {
                      ...prev.table,
                      density: nextValue || 'Comfortable',
                    },
                  }))
                }
                allowDeselect={false}
              />
              <Select
                label="Row Selection"
                data={yesNoOptions}
                value={builder.table.rowSelection}
                onChange={(nextValue) =>
                  setBuilder((prev) => ({
                    ...prev,
                    table: {
                      ...prev.table,
                      rowSelection: nextValue || 'Yes',
                    },
                  }))
                }
                allowDeselect={false}
              />
            </SimpleGrid>

            <Divider my="md" />

            <ColumnsEditor
              columns={builder.table.columns}
              onChange={(columns) =>
                setBuilder((prev) => ({
                  ...prev,
                  table: {
                    ...prev.table,
                    columns,
                  },
                }))
              }
            />

            <Divider my="md" />

            <Card withBorder radius="md" p="md">
              <Text fw={700} mb="sm">
                Row Actions
              </Text>
              <TextInput
                label="Primary Hover Action"
                placeholder="Quick Edit"
                value={builder.table.rowActions.primaryHoverAction}
                onChange={(event) =>
                  setBuilder((prev) => ({
                    ...prev,
                    table: {
                      ...prev.table,
                      rowActions: {
                        ...prev.table.rowActions,
                        primaryHoverAction: event.target.value,
                      },
                    },
                  }))
                }
              />

              <MenuItemsEditor
                items={builder.table.rowActions.menuItems}
                onChange={(menuItems) =>
                  setBuilder((prev) => ({
                    ...prev,
                    table: {
                      ...prev.table,
                      rowActions: {
                        ...prev.table.rowActions,
                        menuItems,
                      },
                    },
                  }))
                }
              />
            </Card>

            <Divider my="md" />

            <Card withBorder radius="md" p="md">
              <Text fw={700} mb="sm">
                Footer & Pagination
              </Text>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
                <Select
                  label="Pagination Type"
                  data={paginationTypeOptions}
                  value={builder.table.footerPagination.paginationType}
                  onChange={(nextValue) =>
                    setBuilder((prev) => ({
                      ...prev,
                      table: {
                        ...prev.table,
                        footerPagination: {
                          ...prev.table.footerPagination,
                          paginationType: nextValue || 'Numbered Pages',
                        },
                      },
                    }))
                  }
                  allowDeselect={false}
                />

                <MultiSelect
                  label="Items Per Page"
                  data={itemsPerPageValueOptions}
                  value={builder.table.footerPagination.itemsPerPage}
                  onChange={(nextValue) => {
                    const normalized = nextValue.length ? nextValue : ['10', '25', '50', '100']
                    setBuilder((prev) => ({
                      ...prev,
                      table: {
                        ...prev.table,
                        footerPagination: {
                          ...prev.table.footerPagination,
                          itemsPerPage: normalized,
                        },
                      },
                    }))
                  }}
                />
              </SimpleGrid>

              <TextInput
                mt="sm"
                label="Summary Stats"
                placeholder="Total: 1,240 items | Selected: 0"
                value={builder.table.footerPagination.summaryStats}
                onChange={(event) =>
                  setBuilder((prev) => ({
                    ...prev,
                    table: {
                      ...prev.table,
                      footerPagination: {
                        ...prev.table.footerPagination,
                        summaryStats: event.target.value,
                      },
                    },
                  }))
                }
              />
            </Card>
          </Card>

          <ButtonListEditor
            title="Actions"
            description="Additional page-level actions section."
            items={builder.actions}
            onChange={(actions) => setBuilder((prev) => ({ ...prev, actions }))}
          />
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 5 }}>
          <Card withBorder radius="md" p="md" style={{ position: 'sticky', top: 20 }}>
            <Stack gap="sm">
              <Text fw={700}>Markdown Output</Text>
              <Tabs defaultValue="raw" radius="md">
                <Tabs.List>
                  <Tabs.Tab value="raw">Raw Markdown</Tabs.Tab>
                  <Tabs.Tab value="preview">Preview</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="raw" pt="sm">
                  <Textarea value={markdownOutput} readOnly autosize minRows={18} maxRows={32} />
                </Tabs.Panel>

                <Tabs.Panel value="preview" pt="sm">
                  <Paper withBorder radius="sm" p="sm" mah={720} style={{ overflow: 'auto' }}>
                    <div className="markdown-panel">
                      <Markdown>{markdownOutput}</Markdown>
                    </div>
                  </Paper>
                </Tabs.Panel>
              </Tabs>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  )
}

export default DataTableBuilderPage
