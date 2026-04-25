import { useMemo, useState } from 'react'
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Checkbox,
  Divider,
  Grid,
  Group,
  Paper,
  Select,
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

let runningId = 1

const nextId = () => {
  runningId += 1
  return String(runningId)
}

const createInput = () => ({
  id: nextId(),
  label: '',
  type: 'TextInput',
  required: true,
  config: INPUT_TYPE_DEFINITIONS[0].getDefaultConfig(),
})

const createSection = () => ({
  id: nextId(),
  name: '',
  inputs: [createInput()],
})

const createActionButton = (label = 'Submit', variant = 'filled', color = 'blue') => ({
  id: nextId(),
  label,
  attributes: { buttonType: 'button', disabled: false },
  styles: { variant, color, size: 'sm' },
})

const getTypeDefinition = (type) => INPUT_TYPE_DEFINITIONS.find((item) => item.value === type) || INPUT_TYPE_DEFINITIONS[0]

const isNumberLike = (value) => /^-?\d+(\.\d+)?$/.test(String(value).trim())

const getConfigSummary = (input) => {
  if (input.type === 'TextInput' || input.type === 'Textarea') {
    return input.config.placeholder || '-'
  }

  if (input.type === 'NumberInput') {
    const parts = []

    if (input.config.min !== '') {
      parts.push(`min=${input.config.min}`)
    }

    if (input.config.max !== '') {
      parts.push(`max=${input.config.max}`)
    }

    if (input.config.step !== '') {
      parts.push(`step=${input.config.step}`)
    }

    return parts.length > 0 ? parts.join(', ') : '-'
  }

  if (input.type === 'Select' || input.type === 'MultiSelect') {
    return input.config.options || '-'
  }

  if (input.type === 'DatePickerInput') {
    return input.config.dateType === 'range' ? 'Range' : 'Single'
  }

  if (input.type === 'Switch') {
    return `on=${input.config.onLabel || 'Yes'}, off=${input.config.offLabel || 'No'}`
  }

  return '-'
}

const toBracketButtons = (buttons) => {
  if (buttons.length === 0) {
    return '[No actions configured]'
  }

  return buttons.map((button) => `[${button.label || 'Unnamed Button'}]`).join(' ')
}

const toMarkdown = ({ title, sections, buttons }) => {
  const primaryAction = buttons[0]?.label || 'Submit'
  const secondaryAction = buttons[1]?.label || 'Cancel'

  const sectionBlocks = sections
    .map((section, sectionIndex) => {
      const sectionName = section.name || `Section ${sectionIndex + 1}`
      const header = `## Section ${sectionIndex + 1}: ${sectionName}`
      const description = '*Description: Inputs configured from the form builder.*'
      const tableHeader = [
        '| Field Label | Input Type | Requirement | Placeholder/Value |',
        '| :--- | :--- | :--- | :--- |',
      ]

      const rows =
        section.inputs.length > 0
          ? section.inputs.map((input) => {
              const label = input.label || 'Untitled Field'
              const requirement = input.required ? 'Required' : 'Opt'
              const summary = getConfigSummary(input)
              return `| ${label} | ${input.type} | ${requirement} | ${summary} |`
            })
          : ['| No fields configured | N/A | N/A | N/A |']

      return [header, description, '', ...tableHeader, ...rows, '', '---'].join('\n')
    })
    .join('\n\n')

  const actionLines =
    buttons.length > 0
      ? buttons
          .map((button) => {
            const attributes = [
              `type=${button.attributes.buttonType}`,
              `disabled=${button.attributes.disabled ? 'true' : 'false'}`,
            ].join(', ')
            const styles = [
              `variant=${button.styles.variant}`,
              `color=${button.styles.color}`,
              `size=${button.styles.size}`,
            ].join(', ')

            return `- **${button.label || 'Unnamed Button'}:** Attributes: ${attributes} | Styles: ${styles}`
          })
          .join('\n')
      : '- **No buttons configured yet.**'

  const leftSideAction =
    buttons.find((button) => button.styles.color === 'red')?.label || buttons[0]?.label || 'Delete Button (Danger Style)'
  const rightSideActions = toBracketButtons(buttons)

  return [
    '## Page Profile',
    `- **Page Title:** ${title || 'Untitled Form'}`,
    '- **Layout:** 2-Column Split',
    `- **Primary Action:** ${primaryAction}`,
    `- **Secondary Action:** ${secondaryAction}`,
    '',
    '---',
    '',
    sectionBlocks,
    '',
    '## Section 3: Additional Info',
    '- **Created By:** [System Label]',
    '- **Last Modified:** [Timestamp]',
    '- **Status:** [Status Badge: Draft]',
    '',
    '---',
    '',
    '## Footer / Floating Actions',
    `- [Left Side]: [${leftSideAction}]`,
    `- [Right Side]: ${rightSideActions}`,
    '',
    '### Action Buttons Configuration',
    actionLines,
  ].join('\n')
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

function Page() {
  const [formTitle, setFormTitle] = useState('Create New Form')
  const [sections, setSections] = useState([{ id: '1', name: 'Basic Information', inputs: [createInput()] }])
  const [buttons, setButtons] = useState([
    createActionButton('Cancel', 'default', 'gray'),
    createActionButton('Submit', 'filled', 'blue'),
  ])

  const markdownOutput = useMemo(() => {
    const normalizedSections = sections.map((section) => ({
      ...section,
      inputs: section.inputs.map((input) => ({
        ...input,
        config: Object.fromEntries(
          Object.entries(input.config).map(([key, value]) => {
            if (isNumberLike(value)) {
              return [key, String(value)]
            }

            return [key, value]
          }),
        ),
      })),
    }))

    return toMarkdown({
      title: formTitle,
      sections: normalizedSections,
      buttons,
    })
  }, [buttons, formTitle, sections])

  const updateSection = (sectionId, updater) => {
    setSections((prev) => prev.map((section) => (section.id === sectionId ? updater(section) : section)))
  }

  const removeSection = (sectionId) => {
    setSections((prev) => prev.filter((section) => section.id !== sectionId))
  }

  const addSection = () => {
    setSections((prev) => [...prev, createSection()])
  }

  const addInputToSection = (sectionId) => {
    updateSection(sectionId, (section) => ({ ...section, inputs: [...section.inputs, createInput()] }))
  }

  const removeInput = (sectionId, inputId) => {
    updateSection(sectionId, (section) => ({
      ...section,
      inputs: section.inputs.filter((input) => input.id !== inputId),
    }))
  }

  const updateInput = (sectionId, inputId, updater) => {
    updateSection(sectionId, (section) => ({
      ...section,
      inputs: section.inputs.map((input) => (input.id === inputId ? updater(input) : input)),
    }))
  }

  const addButton = () => {
    setButtons((prev) => [...prev, createActionButton('New Button', 'light', 'blue')])
  }

  const updateButton = (buttonId, updater) => {
    setButtons((prev) => prev.map((button) => (button.id === buttonId ? updater(button) : button)))
  }

  const removeButton = (buttonId) => {
    setButtons((prev) => prev.filter((button) => button.id !== buttonId))
  }

  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2}>Form Builder</Title>
          <Text c="dimmed">Build detail-form specs on the left and export markdown output on the right.</Text>
        </div>
        <Badge color="orange" variant="light">
          Detail Template Generator
        </Badge>
      </Group>

      <Grid gutter="md" align="start">
        <Grid.Col span={{ base: 12, lg: 7 }}>
          <Stack gap="md">
            <Card withBorder radius="md" p="md">
              <Stack gap="sm">
                <Text fw={700}>Form Builder</Text>
                <TextInput
                  label="Form Title"
                  placeholder="Create New Menu Item"
                  value={formTitle}
                  onChange={(event) => setFormTitle(event.target.value)}
                />
              </Stack>
            </Card>

            <Card withBorder radius="md" p="md">
              <Stack gap="md">
                <Group justify="space-between" align="center">
                  <Text fw={700}>Sections</Text>
                  <Button leftSection={<IconPlus size={16} />} variant="light" onClick={addSection}>
                    Add Section
                  </Button>
                </Group>

                {sections.map((section, sectionIndex) => (
                  <Paper withBorder radius="md" p="md" key={section.id}>
                    <Stack gap="sm">
                      <Group justify="space-between" align="center">
                        <Text fw={600}>Section {sectionIndex + 1}</Text>
                        <ActionIcon
                          color="red"
                          variant="subtle"
                          onClick={() => removeSection(section.id)}
                          disabled={sections.length === 1}
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Group>

                      <TextInput
                        label="Section Name"
                        placeholder="Basic Information"
                        value={section.name}
                        onChange={(event) =>
                          updateSection(section.id, (current) => ({
                            ...current,
                            name: event.target.value,
                          }))
                        }
                      />

                      <Divider />

                      <Group justify="space-between" align="center">
                        <Text fw={600}>Input List</Text>
                        <Button variant="subtle" size="xs" leftSection={<IconPlus size={14} />} onClick={() => addInputToSection(section.id)}>
                          Add Input
                        </Button>
                      </Group>

                      {section.inputs.map((input, inputIndex) => {
                        const typeDefinition = getTypeDefinition(input.type)

                        return (
                          <Paper withBorder radius="md" p="sm" key={input.id}>
                            <Stack gap="sm">
                              <Group justify="space-between" align="center">
                                <Text size="sm" fw={600}>
                                  Input {inputIndex + 1}
                                </Text>
                                <ActionIcon
                                  color="red"
                                  variant="subtle"
                                  onClick={() => removeInput(section.id, input.id)}
                                  disabled={section.inputs.length === 1}
                                >
                                  <IconTrash size={16} />
                                </ActionIcon>
                              </Group>

                              <TextInput
                                label="Label"
                                placeholder="Field label"
                                value={input.label}
                                onChange={(event) =>
                                  updateInput(section.id, input.id, (current) => ({
                                    ...current,
                                    label: event.target.value,
                                  }))
                                }
                              />

                              <Select
                                label="Input Type"
                                data={INPUT_TYPE_DEFINITIONS}
                                value={input.type}
                                onChange={(nextValue) => {
                                  const safeType = nextValue || 'TextInput'
                                  const definition = getTypeDefinition(safeType)

                                  updateInput(section.id, input.id, (current) => ({
                                    ...current,
                                    type: safeType,
                                    config: definition.getDefaultConfig(),
                                  }))
                                }}
                              />

                              <Checkbox
                                label="Required"
                                checked={input.required}
                                onChange={(event) =>
                                  updateInput(section.id, input.id, (current) => ({
                                    ...current,
                                    required: event.currentTarget.checked,
                                  }))
                                }
                              />

                              <Grid>
                                {typeDefinition.configFields.map((field) => (
                                  <Grid.Col key={field.key} span={{ base: 12, md: 6 }}>
                                    <ConfigFieldEditor
                                      field={field}
                                      value={input.config[field.key]}
                                      onChange={(nextValue) =>
                                        updateInput(section.id, input.id, (current) => ({
                                          ...current,
                                          config: {
                                            ...current.config,
                                            [field.key]: nextValue,
                                          },
                                        }))
                                      }
                                    />
                                  </Grid.Col>
                                ))}
                              </Grid>
                            </Stack>
                          </Paper>
                        )
                      })}
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Card>

            <Card withBorder radius="md" p="md">
              <Stack gap="md">
                <Group justify="space-between" align="center">
                  <Text fw={700}>Actions</Text>
                  <Button leftSection={<IconPlus size={16} />} variant="light" onClick={addButton}>
                    Add Button
                  </Button>
                </Group>

                {buttons.map((button, index) => (
                  <Paper withBorder radius="md" p="sm" key={button.id}>
                    <Stack gap="sm">
                      <Group justify="space-between" align="center">
                        <Text size="sm" fw={600}>
                          Button {index + 1}
                        </Text>
                        <ActionIcon color="red" variant="subtle" onClick={() => removeButton(button.id)} disabled={buttons.length === 1}>
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Group>

                      <Grid>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <TextInput
                            label="Button Label"
                            value={button.label}
                            onChange={(event) =>
                              updateButton(button.id, (current) => ({
                                ...current,
                                label: event.target.value,
                              }))
                            }
                          />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <Select
                            label="Button Type Attribute"
                            data={[
                              { value: 'button', label: 'button' },
                              { value: 'submit', label: 'submit' },
                              { value: 'reset', label: 'reset' },
                            ]}
                            value={button.attributes.buttonType}
                            onChange={(nextValue) =>
                              updateButton(button.id, (current) => ({
                                ...current,
                                attributes: {
                                  ...current.attributes,
                                  buttonType: nextValue || 'button',
                                },
                              }))
                            }
                          />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <Select
                            label="Variant (Style)"
                            data={BUTTON_VARIANTS}
                            value={button.styles.variant}
                            onChange={(nextValue) =>
                              updateButton(button.id, (current) => ({
                                ...current,
                                styles: {
                                  ...current.styles,
                                  variant: nextValue || 'filled',
                                },
                              }))
                            }
                          />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <Select
                            label="Color (Style)"
                            data={BUTTON_COLORS}
                            value={button.styles.color}
                            onChange={(nextValue) =>
                              updateButton(button.id, (current) => ({
                                ...current,
                                styles: {
                                  ...current.styles,
                                  color: nextValue || 'blue',
                                },
                              }))
                            }
                          />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <Select
                            label="Size (Style)"
                            data={BUTTON_SIZES}
                            value={button.styles.size}
                            onChange={(nextValue) =>
                              updateButton(button.id, (current) => ({
                                ...current,
                                styles: {
                                  ...current.styles,
                                  size: nextValue || 'sm',
                                },
                              }))
                            }
                          />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <Checkbox
                            mt={28}
                            label="Disabled"
                            checked={button.attributes.disabled}
                            onChange={(event) =>
                              updateButton(button.id, (current) => ({
                                ...current,
                                attributes: {
                                  ...current.attributes,
                                  disabled: event.currentTarget.checked,
                                },
                              }))
                            }
                          />
                        </Grid.Col>
                      </Grid>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Card>
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

export default Page