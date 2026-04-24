import { Button, Card, Grid, Group, Select, Stack, Switch, Text, TextInput, Title } from '@mantine/core'

const sections = [
  {
    "title": "Page Profile",
    "fields": []
  },
  {
    "title": "Section 1: Primary Category Name - e.g., Basic Information",
    "fields": [
      {
        "label": "Label Name",
        "inputType": "Text/Number/Select",
        "required": "Required/Opt",
        "placeholder": "Hint text or Real data"
      },
      {
        "label": "Label Name",
        "inputType": "Date Picker/Toggle",
        "required": "Required/Opt",
        "placeholder": "Default State"
      }
    ]
  },
  {
    "title": "Section 2: Secondary Category Name - e.g., Pricing & Inventory",
    "fields": []
  },
  {
    "title": "Section 3: Additional Info - e.g., Metadata or Logs",
    "fields": []
  },
  {
    "title": "Footer / Floating Actions",
    "fields": []
  }
]

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
          <Title order={2}>QR Code Management</Title>
          <Text c="dimmed">Detail view from specs/pages/Campaign & Point/QR Code Management/detail.md.</Text>
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
