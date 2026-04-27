import { Button, Card, Grid, Group, Image, Select, Stack, Text, TextInput, Title } from '@mantine/core'
import { DateInput } from '@mantine/dates'

function Page({ selectedId }) {
  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2}>QR Code Details #1029</Title>
          <Text size="sm" c="dimmed">
            Record: {selectedId || 'No record selected'}
          </Text>
        </div>
        <Group>
          <Button variant="light">Print QRCode</Button>
          <Button>Download QRCode</Button>
        </Group>
      </Group>

      <Card withBorder radius="md" p="md">
        <Stack gap="sm">
          <Text fw={700}>Section 1: Basic Information</Text>
          <Text size="sm" c="dimmed">Brief summary of what this section handles.</Text>
          <Grid>
            <Grid.Col span={{ base: 12, md: 12 }}>
              <TextInput label="Name" required placeholder="" />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap={6}>
                <Image src="/qrcode.png" alt="QRCode preview" w={120} h={120} radius="sm" fit="cover" />
                <TextInput label="QRCode Value" required value="A1B2C3D4E5F6" readOnly />
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 12 }}>
              <Select label="Link to Reward" required data={['Reward A', 'Reward B', 'Reward C']} defaultValue="Reward A" />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 12 }}>
              <TextInput label="Link to Custom Link" required placeholder="Scan to open Link" />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 12 }}>
              <DateInput label="Expired At" required placeholder="DatePicker" />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 12 }}>
              <Select label="Active" required data={['Active', 'Inactive']} defaultValue="Active" />
            </Grid.Col>
          </Grid>
        </Stack>
      </Card>

      <Card withBorder radius="md" p="md">
        <Stack gap="xs">
          <Text fw={700}>Section 2: Additional Info</Text>
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
