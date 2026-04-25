import { Button, Card, Grid, Group, MultiSelect, Stack, Text, TextInput, Title } from '@mantine/core'

const basicInfoFields = [
  {
    label: 'Family Name',
    inputType: 'TextInput',
    required: 'Required',
    placeholder: '-',
  },
  {
    label: 'Sub-agents',
    inputType: 'MultiSelect',
    required: 'Required',
    placeholder: 'Sub-agent1,Sub-agent2',
  },
]

function renderField(field, index) {
  const label = field.label + ' (' + field.required + ')'

  if (field.inputType === 'MultiSelect') {
    return (
      <MultiSelect
        key={field.label + index}
        label={label}
        data={['Sub-agent1', 'Sub-agent2', 'Sub-agent3']}
        placeholder={field.placeholder}
      />
    )
  }

  return <TextInput key={field.label + index} label={label} placeholder={field.placeholder} />
}

function Page({ selectedId }) {
  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2}>Sub-agent detail</Title>
          <Text c="dimmed">Detail view from specs/pages/User/Sub-agent Family/detail.md.</Text>
          <Text size="sm" c="dimmed">
            Record: {selectedId || 'No record selected'}
          </Text>
        </div>
        <Group>
          <Button type="button" variant="default" color="gray" size="sm">
            Cancel
          </Button>
          <Button type="button" variant="filled" color="blue" size="sm">
            Submit
          </Button>
        </Group>
      </Group>

      <Card withBorder radius="md" p="md">
        <Stack gap="sm">
          <Text fw={700}>Section 1: Basic Information</Text>
          <Grid>
            {basicInfoFields.map((field, index) => (
              <Grid.Col key={field.label + index} span={{ base: 12, md: 6 }}>
                {renderField(field, index)}
              </Grid.Col>
            ))}
          </Grid>
        </Stack>
      </Card>

      <Card withBorder radius="md" p="md">
        <Stack gap="xs">
          <Text fw={700}>Section 2: Additional Info</Text>
          <Group justify="space-between">
            <Text c="dimmed">Created By</Text>
            <Text>User Name</Text>
          </Group>
          <Group justify="space-between">
            <Text c="dimmed">Last Modified</Text>
            <Text>Date in YYYY-MM-DD HH:mm:ss</Text>
          </Group>
          <Group justify="space-between">
            <Text c="dimmed">Created Date</Text>
            <Text>Date in YYYY-MM-DD HH:mm:ss</Text>
          </Group>
        </Stack>
      </Card>
    </Stack>
  )
}

export default Page
